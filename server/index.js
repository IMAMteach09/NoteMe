import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import notesRoutes from './routes/notes.js';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();

const corsOptions = process.env.NODE_ENV === 'development'
  ? { origin: true, credentials: true }
  : { origin: process.env.CLIENT_URL || 'http://localhost:5173', credentials: true };
app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan('dev'));

connectDB();

app.get('/', (req, res) => {
  res.json({ message: 'NoteMe API is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || 'Internal server error' });
});



const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

server.on('error', (err) => {
  if (err && err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Free the port or set a different PORT.`);
    process.exit(1);
  }
  console.error(err);
  process.exit(1);
});
