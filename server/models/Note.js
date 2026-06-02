import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    body: {
      type: String,
      trim: true,
      default: '',
    },
    tags: {
      type: [String],
      default: [],
    },
    images: {
      type: [String],
      default: [],
    },
    isImportant: {
      type: Boolean,
      default: false,
    },
    isArchived: {
      type: Boolean,
      default: false,
    },
    isShared: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Note = mongoose.model('Note', noteSchema);
export default Note;
