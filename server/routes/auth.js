import express from 'express';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

const createToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email, and password are required.' });
  }

  const existingUser = await User.findOne({ email: email.toLowerCase() });
  if (existingUser) {
    return res.status(409).json({ message: 'Email already registered.' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email: email.toLowerCase(), password: hashedPassword });
  const token = createToken(user);

  res.status(201).json({
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      preferences: user.preferences,
    },
    token,
  });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password.' });
  }

  const passwordIsValid = await bcrypt.compare(password, user.password);
  if (!passwordIsValid) {
    return res.status(401).json({ message: 'Invalid email or password.' });
  }

  const token = createToken(user);
  res.json({
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      preferences: user.preferences,
    },
    token,
  });
});

router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'Email is required.' });
  }

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    return res.status(200).json({ message: 'If this email is registered, a reset link has been sent.' });
  }

  const resetToken = crypto.randomBytes(32).toString('hex');
  user.resetPasswordToken = resetToken;
  user.resetPasswordExpires = Date.now() + 1000 * 60 * 60;
  await user.save();

  const resetLink = `${process.env.CLIENT_URL || 'http://localhost:5173'}/reset-password?token=${resetToken}`;

  res.json({
    message: 'Password reset instructions generated successfully.',
    resetLink,
  });
});

router.post('/reset-password', async (req, res) => {
  const { token, password } = req.body;

  if (!token || !password) {
    return res.status(400).json({ message: 'Reset token and new password are required.' });
  }

  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(400).json({ message: 'Invalid or expired reset token.' });
  }

  user.password = await bcrypt.hash(password, 10);
  user.resetPasswordToken = null;
  user.resetPasswordExpires = null;
  await user.save();

  const authToken = createToken(user);
  res.json({
    message: 'Password has been reset successfully.',
    token: authToken,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      preferences: user.preferences,
    },
  });
});

router.get('/me', protect, async (req, res) => {
  res.json({ user: req.user });
});

router.put('/me', protect, async (req, res) => {
  const { name, email, avatar, preferences } = req.body;

  if (name !== undefined) req.user.name = name;
  if (email !== undefined) req.user.email = email.toLowerCase();
  if (avatar !== undefined) req.user.avatar = avatar;
  if (preferences && typeof preferences === 'object') {
    req.user.preferences = {
      ...(req.user.preferences || {}),
      ...preferences,
    };
  }

  await req.user.save();

  res.json({
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      avatar: req.user.avatar,
      preferences: req.user.preferences,
    },
  });
});

export default router;
