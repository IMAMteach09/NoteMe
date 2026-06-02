import { useEffect, useRef, useState } from 'react';
import {
  Star, X, List, ListOrdered, Link2, Image as ImageIcon,
  MoreVertical, Plus, Cloud, Trash2
} from 'lucide-react';

export default function NewNoteModal({ isOpen, note, onClose, onSave }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [isImportant, setIsImportant] = useState(false);
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [images, setImages] = useState([]); 
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      setTitle(''); setBody(''); setTags([]); setTagInput('');
      setIsImportant(false); setError(''); setIsSaving(false); setImages([]);
      return;
    }
    if (note) {
      setTitle(note.title || '');
      setBody(note.body || '');
      setTags(Array.isArray(note.tags) ? note.tags : []);
      setIsImportant(Boolean(note.isImportant));
      setImages(Array.isArray(note.images) ? note.images.map((url, index) => ({ url, name: `image-${index + 1}` })) : []);
    } else {
      setTitle(''); setBody(''); setTags([]); setIsImportant(false); setImages([]);
    }
  }, [isOpen, note]);

  if (!isOpen) return null;

  const handleAddTag = () => {
    const cleaned = tagInput.trim();
    if (cleaned && !tags.includes(cleaned)) setTags((c) => [...c, cleaned]);
    setTagInput('');
  };

  const handleRemoveTag = (tag) => setTags((c) => c.filter((t) => t !== tag));

  const processFiles = (files) => {
    const allowed = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    Array.from(files).forEach((file) => {
      if (!allowed.includes(file.type)) return;
      const reader = new FileReader();
      reader.onload = () => {
        setImages((c) => [...c, { url: reader.result, name: file.name }]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFileInput = (e) => processFiles(e.target.files);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    processFiles(e.dataTransfer.files);
  };

  const handleRemoveImage = (idx) => {
    setImages((c) => c.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!title.trim()) { setError('A title is required to save your note.'); return; }
    setError(''); setIsSaving(true);
    try {
      // Preserves status properties by spreading the existing note object
      await onSave?.({ 
        ...note,
        title: title.trim(), 
        body: body.trim(), 
        tags, 
        images: images.map((image) => image.url),
        isImportant 
      });
    } catch (err) {
      setError(err.message || 'Unable to save note.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-6">
      <form
        className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
      >
        {/* Header */}
        <div className="flex justify-between items-start px-8 pt-8 pb-4">
          <div className="flex-1">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Untitled Note"
              className="text-4xl font-bold text-slate-800 placeholder:text-slate-300 focus:outline-none w-full bg-transparent transition-colors"
            />
            <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-wider">
              {note?.updatedAt
                ? `Last edited: ${new Date(note.updatedAt).toLocaleDateString()}`
                : 'New note'}
            </p>
            {error && <p className="text-sm text-red-600 mt-3">{error}</p>}
          </div>

          <div className="flex items-center gap-3 ml-4 shrink-0">
            <button
              type="button"
              onClick={() => setIsImportant((c) => !c)}
              className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold transition-colors ${isImportant ? 'bg-blue-600 text-white' : 'border border-slate-200 text-slate-600 hover:bg-slate-50'}`}
            >
              <Star className={`w-4 h-4 ${isImportant ? 'fill-white' : ''}`} />
              {isImportant ? 'Important ✓' : 'Important'}
            </button>
            <button type="button" onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Toolbar */}
        <div className="px-8 mb-4 shrink-0">
          <div className="flex items-center justify-between bg-[#f4f5f9] rounded-xl px-4 py-2">
            <div className="flex items-center gap-1">
              <button type="button" className="w-8 h-8 flex items-center justify-center text-slate-700 hover:bg-slate-200 rounded-lg font-serif font-bold text-lg">B</button>
              <button type="button" className="w-8 h-8 flex items-center justify-center text-slate-700 hover:bg-slate-200 rounded-lg font-serif italic text-lg">I</button>
              <button type="button" className="w-8 h-8 flex items-center justify-center text-slate-500 hover:bg-slate-200 rounded-lg"><List className="w-4 h-4" /></button>
              <button type="button" className="w-8 h-8 flex items-center justify-center text-slate-500 hover:bg-slate-200 rounded-lg"><ListOrdered className="w-4 h-4" /></button>
              <div className="w-px h-5 bg-slate-300 mx-2"></div>
              <button type="button" className="w-8 h-8 flex items-center justify-center text-slate-500 hover:bg-slate-200 rounded-lg"><Link2 className="w-4 h-4" /></button>
              <button type="button" onClick={() => fileInputRef.current?.click()} className="w-8 h-8 flex items-center justify-center text-slate-500 hover:bg-slate-200 rounded-lg">
                <ImageIcon className="w-4 h-4" />
              </button>
            </div>
            <button type="button" className="w-8 h-8 flex items-center justify-center text-slate-500 hover:bg-slate-200 rounded-lg">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Note Body Text Content Area */}
        <div className="px-8 flex-1 overflow-y-auto flex flex-col gap-4">
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full min-h-[120px] resize-none focus:outline-none text-slate-600 placeholder:text-slate-400 text-sm leading-relaxed bg-transparent"
            placeholder="Start typing your thoughts here..."
          />

          {images.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {images.map((img, idx) => (
                <div key={idx} className="relative group w-28 h-28 rounded-xl overflow-hidden border border-slate-200">
                  <img src={img.url} alt={img.name} className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(idx)}
                    className="absolute top-1 right-1 bg-white/80 hover:bg-white text-red-500 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-xl py-8 flex flex-col items-center justify-center text-center cursor-pointer transition-colors ${isDragging ? 'border-blue-400 bg-blue-50' : 'border-slate-200 hover:bg-[#f8fafe] hover:border-blue-200'}`}
          >
            <div className="w-12 h-12 bg-indigo-100 text-indigo-500 rounded-full flex items-center justify-center mb-3">
              <ImageIcon className="w-5 h-5" />
            </div>
            <p className="text-sm font-bold text-slate-800 mb-1">Add Image</p>
            <p className="text-xs text-slate-500">Drag & drop or click to upload (JPG, PNG, GIF, WebP)</p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleFileInput}
            />
          </div>
        </div>

        {/* Tags Row */}
        <div className="px-8 mt-4 mb-4 flex flex-wrap items-center gap-2 shrink-0">
          <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">Tags:</span>
          {tags.map((tag) => (
            <span key={tag} className="flex items-center gap-1 px-3 py-1 bg-[#f0f2f8] text-slate-600 text-xs font-bold rounded-full">
              {tag}
              <button type="button" onClick={() => handleRemoveTag(tag)} className="text-slate-400 hover:text-red-500 ml-1">
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddTag(); } }}
              placeholder="Add tag"
              className="px-3 py-1 rounded-full border border-slate-200 text-xs text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white"
            />
            <button type="button" onClick={handleAddTag} className="w-7 h-7 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-50">
              <Plus className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Modal Submit Footer */}
        <div className="px-8 py-4 border-t border-slate-100 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-2 text-slate-400">
            <Cloud className="w-4 h-4" />
            <span className="text-[11px] font-bold tracking-wide">Changes synced to cloud</span>
          </div>
          <div className="flex items-center gap-6">
            <button type="button" onClick={onClose} className="text-xs font-bold text-slate-500 hover:text-slate-800">Cancel</button>
            <button
              type="submit"
              disabled={isSaving}
              className="bg-[#2751cb] hover:bg-blue-700 text-white text-sm font-bold px-6 py-2.5 rounded-lg shadow-sm disabled:opacity-70"
            >
              {isSaving ? 'Saving…' : 'Save Note'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}