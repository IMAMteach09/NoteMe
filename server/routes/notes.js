import express from 'express';
import Note from '../models/Note.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();
router.use(protect);

router.get('/', async (req, res) => {
  const notes = await Note.find({ user: req.user._id }).sort('-updatedAt');
  res.json(notes);
});

router.post('/', async (req, res) => {
  const { title, body, tags, images, isImportant, isArchived, isShared, isDeleted } = req.body;

  if (!title) {
    return res.status(400).json({ message: 'Note title is required.' });
  }

  const note = await Note.create({
    user: req.user._id,
    title,
    body: body || '',
    tags: Array.isArray(tags) ? tags : [],
    images: Array.isArray(images) ? images : [],
    isImportant: Boolean(isImportant),
    isArchived: Boolean(isArchived),
    isShared: Boolean(isShared),
    isDeleted: Boolean(isDeleted),
  });

  res.status(201).json(note);
});

router.put('/:id', async (req, res) => {
  const { title, body, tags, images, isImportant, isArchived, isShared, isDeleted } = req.body;
  const note = await Note.findOne({ _id: req.params.id, user: req.user._id });

  if (!note) {
    return res.status(404).json({ message: 'Note not found.' });
  }

  note.title = title ?? note.title;
  note.body = body ?? note.body;
  note.tags = Array.isArray(tags) ? tags : note.tags;
  note.images = Array.isArray(images) ? images : note.images;
  note.isImportant = typeof isImportant === 'boolean' ? isImportant : note.isImportant;
  note.isArchived = typeof isArchived === 'boolean' ? isArchived : note.isArchived;
  note.isShared = typeof isShared === 'boolean' ? isShared : note.isShared;
  note.isDeleted = typeof isDeleted === 'boolean' ? isDeleted : note.isDeleted;

  await note.save();
  res.json(note);
});

router.delete('/:id', async (req, res) => {
  const note = await Note.findOneAndDelete({ _id: req.params.id, user: req.user._id });
  if (!note) {
    return res.status(404).json({ message: 'Note not found.' });
  }

  res.json({ message: 'Note deleted successfully.' });
});

export default router;
