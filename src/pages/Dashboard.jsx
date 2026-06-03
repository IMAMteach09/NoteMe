import { useEffect, useState } from 'react';
import {
  Plus, FileText, Star, Users, Archive, Trash2, Settings, LogOut,
  Search, Bell, Filter, ArrowUpDown, Menu, X
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import NewNoteModal from '../components/NewNoteModal';
import SettingsModal from '../components/SettingsModal';
import { useAuth } from '../contexts/AuthContext.jsx';
// IMPORT FIXED: Added deleteNote to the import
import { getNotes, createNote, updateNote, deleteNote } from '../api/notesApi.js';

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loadingNotes, setLoadingNotes] = useState(true);
  const [error, setError] = useState('');
  const [selectedNote, setSelectedNote] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Sidebar View Filter: 'all' | 'important' | 'shared' | 'archived' | 'trash'
  const [activeFilter, setActiveFilter] = useState('all'); 
  // Sorting: 'latest' | 'oldest' | 'alphabetical'
  const [sortBy, setSortBy] = useState('latest'); 
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const closeSidebar = () => setIsSidebarOpen(false);

  useEffect(() => {
    const loadNotes = async () => {
      try {
        const data = await getNotes();
        setNotes(data);
      } catch (err) {
        setError(err.message || 'Unable to load notes.');
      } finally {
        setLoadingNotes(false);
      }
    };

    if (user) {
      loadNotes();
    } else {
      setLoadingNotes(false);
    }
  }, [user]);

  // Handle saving new or edited notes
  const handleSaveNote = async (notePayload) => {
    try {
      if (selectedNote?._id || selectedNote?.id) {
        const noteId = selectedNote._id || selectedNote.id;
        const updated = await updateNote(noteId, notePayload);
        setNotes((current) => current.map((n) =>
          (n._id || n.id) === noteId ? updated : n
        ));
      } else {
        const newNote = await createNote({
          ...notePayload,
          isArchived: false,
          isDeleted: false,
          isShared: false
        });
        setNotes((current) => [newNote, ...current]);
      }
      setSelectedNote(null);
      setIsModalOpen(false);
    } catch (err) {
      setError(err.message || 'Unable to save note.');
    }
  };

  // LOGIC FIXED: Merge the existing note with updated fields before sending to API 
  // to ensure PUT requests don't wipe out other data or fail validation.
  const handleUpdateNoteField = async (e, noteId, updatedFields) => {
    e.stopPropagation(); // Avoid opening the editor modal
    try {
      const existingNote = notes.find((n) => (n._id || n.id) === noteId);
      const fullUpdatedNote = { ...existingNote, ...updatedFields };
      
      await updateNote(noteId, fullUpdatedNote);
      
      setNotes((current) => current.map((n) =>
        (n._id || n.id) === noteId ? fullUpdatedNote : n
      ));
    } catch (err) {
      setError('Failed to update note status.');
    }
  };

  // LOGIC FIXED: Uncommented the API call so it actually deletes from the database
  const handlePermanentDelete = async (e, noteId) => {
    e.stopPropagation();
    try {
      await deleteNote(noteId); // This now actually removes it permanently via the backend
      setNotes((current) => current.filter((n) => (n._id || n.id) !== noteId));
    } catch (err) {
      setError('Failed to permanently delete note.');
    }
  };

  const handleEditNote = (note) => {
    setSelectedNote(note);
    setIsModalOpen(true);
  };

  // 1. Filter Logic
  const filteredNotes = notes.filter((note) => {
    // Global search matching title, body text or tags
    const matchesSearch = 
      note.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.body?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.tags?.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;

    if (activeFilter === 'trash') return note.isDeleted;
    if (note.isDeleted) return false; // Exclude deleted notes from all other active lists

    switch (activeFilter) {
      case 'important':
        return note.isImportant && !note.isArchived;
      case 'shared':
        return note.isShared && !note.isArchived;
      case 'archived':
        return note.isArchived;
      case 'all':
      default:
        return !note.isArchived;
    }
  });

  // 2. Sort Logic
  const displayedNotes = [...filteredNotes].sort((a, b) => {
    if (sortBy === 'latest') {
      return new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt);
    }
    if (sortBy === 'oldest') {
      return new Date(a.updatedAt || a.createdAt) - new Date(b.updatedAt || b.createdAt);
    }
    if (sortBy === 'alphabetical') {
      return (a.title || '').localeCompare(b.title || '');
    }
    return 0;
  });

  // Sidebar dynamic counter badges
  const countAll = notes.filter(n => !n.isDeleted && !n.isArchived).length;
  const countImportant = notes.filter(n => n.isImportant && !n.isDeleted && !n.isArchived).length;
  const countShared = notes.filter(n => n.isShared && !n.isDeleted && !n.isArchived).length;
  const countArchived = notes.filter(n => n.isArchived && !n.isDeleted).length;
  const countTrash = notes.filter(n => n.isDeleted).length;

  const initials = user?.name
    ? user.name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2)
    : 'ME';

  return (
    <div className="flex min-h-screen bg-[#f8fafe] font-sans text-slate-800">

      {isSidebarOpen && (
        <button
          type="button"
          aria-label="Close menu overlay"
          onClick={closeSidebar}
          className="fixed inset-0 z-30 bg-slate-900/40 md:hidden"
        />
      )}

      {/* LEFT SIDEBAR */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-72 bg-[#f8fafe] border-r border-slate-200 flex flex-col pt-6 pb-4 px-4 shrink-0 transform transition-transform duration-300 md:sticky md:top-0 md:w-64 md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="px-2 mb-8">
          <div className="flex items-center justify-between gap-3">
            <Link to="/" onClick={closeSidebar}>
              <h1 className="text-2xl font-bold text-blue-600 transition-opacity hover:opacity-80">NoteMe</h1>
            </Link>
            <button
              type="button"
              onClick={closeSidebar}
              className="md:hidden inline-flex items-center justify-center rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Profile Card */}
        <div className="flex items-center gap-3 mb-8 px-2">
          <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center shrink-0 text-sm">
            {initials}
          </div>
          <div className="min-w-0">
            <h3 className="font-bold text-slate-900 text-sm truncate">{user?.name || 'User'}</h3>
            <p className="text-xs text-slate-500 truncate">{user?.email || ''}</p>
          </div>
        </div>

        <button
          onClick={() => { setSelectedNote(null); setIsModalOpen(true); }}
          type="button"
          className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-colors mb-6 shadow-sm"
        >
          <Plus className="w-4 h-4" /> Add New Note
        </button>

        <nav className="flex-1 space-y-1">
          <button
            onClick={() => { setActiveFilter('all'); closeSidebar(); }}
            type="button"
            className={`w-full flex items-center gap-3 px-3 py-2 font-medium rounded-lg transition-colors ${activeFilter === 'all' ? 'bg-blue-100 text-blue-700' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}
          >
            <FileText className="w-4 h-4" /> All Notes
            <span className="ml-auto text-xs bg-slate-200 text-slate-600 rounded-full px-2 py-0.5">{countAll}</span>
          </button>
          <button
            onClick={() => { setActiveFilter('important'); closeSidebar(); }}
            type="button"
            className={`w-full flex items-center gap-3 px-3 py-2 font-medium rounded-lg transition-colors ${activeFilter === 'important' ? 'bg-blue-100 text-blue-700' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}
          >
            <Star className="w-4 h-4" /> Important
            <span className="ml-auto text-xs bg-slate-200 text-slate-600 rounded-full px-2 py-0.5">{countImportant}</span>
          </button>
          <button
            onClick={() => { setActiveFilter('shared'); closeSidebar(); }}
            type="button"
            className={`w-full flex items-center gap-3 px-3 py-2 font-medium rounded-lg transition-colors ${activeFilter === 'shared' ? 'bg-blue-100 text-blue-700' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}
          >
            <Users className="w-4 h-4" /> Shared
            <span className="ml-auto text-xs bg-slate-200 text-slate-600 rounded-full px-2 py-0.5">{countShared}</span>
          </button>
          <button
            onClick={() => { setActiveFilter('archived'); closeSidebar(); }}
            type="button"
            className={`w-full flex items-center gap-3 px-3 py-2 font-medium rounded-lg transition-colors ${activeFilter === 'archived' ? 'bg-blue-100 text-blue-700' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}
          >
            <Archive className="w-4 h-4" /> Archived
            <span className="ml-auto text-xs bg-slate-200 text-slate-600 rounded-full px-2 py-0.5">{countArchived}</span>
          </button>
          <button
            onClick={() => { setActiveFilter('trash'); closeSidebar(); }}
            type="button"
            className={`w-full flex items-center gap-3 px-3 py-2 font-medium rounded-lg transition-colors ${activeFilter === 'trash' ? 'bg-blue-100 text-blue-700' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}
          >
            <Trash2 className="w-4 h-4" /> Trash
            <span className="ml-auto text-xs bg-slate-200 text-slate-600 rounded-full px-2 py-0.5">{countTrash}</span>
          </button>
        </nav>

        <div className="mt-auto space-y-1 pt-4 border-t border-slate-200">
          <button 
            onClick={() => setIsSettingsOpen(true)}
            type="button"
            className="w-full flex items-center gap-3 px-3 py-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 font-medium rounded-lg transition-colors"
          >
            <Settings className="w-4 h-4" /> Settings
          </button>
          <button
            onClick={handleLogout}
            type="button"
            className="w-full flex items-center gap-3 px-3 py-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 font-medium rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto relative">
        <header className="h-16 flex items-center justify-between px-4 md:px-8 bg-[#f8fafe] shrink-0 sticky top-0 z-20 border-b border-slate-100">
          <div className="flex items-center gap-3 md:gap-6 text-sm font-medium text-slate-600">
            <button
              type="button"
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white p-2 text-slate-700 hover:bg-slate-50"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden md:flex items-center gap-6">
              <Link to="/features" className="hover:text-blue-600 text-blue-600 border-b-2 border-blue-600 py-5">Features</Link>
              <Link to="/contact" className="hover:text-blue-600 py-5">Contact</Link>
              <Link to="/help" className="hover:text-blue-600 py-5">Help</Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search notes, tags, or content..."
                className="w-64 pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-full text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="hidden md:flex items-center gap-3 text-slate-500">
              <button className="hover:text-slate-800"><Bell className="w-5 h-5" /></button>
              <button onClick={() => setIsSettingsOpen(true)} className="hover:text-slate-800"><Settings className="w-5 h-5" /></button>
            </div>
            <div className="hidden sm:flex items-center gap-2 bg-white border border-slate-200 rounded-full px-3 py-1.5">
              <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-xs">
                {initials}
              </div>
              <span className="text-sm font-medium text-slate-700 max-w-[120px] truncate">{user?.name}</span>
            </div>
          </div>
        </header>

        {/* Dashboard Dynamic View Layer */}
        <div className="p-4 md:p-8 flex-1 max-w-7xl mx-auto w-full">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">
                Welcome back, {user?.name || 'there'} 👋
              </h2>
              <p className="text-slate-500 text-sm">
                {loadingNotes
                  ? 'Loading your notes…'
                  : `Showing ${displayedNotes.length} matching item(s) within ${activeFilter} category.`
                }
              </p>
              {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
            </div>
            
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50">
                <Filter className="w-4 h-4" /> Filter
              </button>

              {/* Sorting Interface Controller Dropdown */}
              <div className="relative">
                <button 
                  onClick={() => setShowSortDropdown(!showSortDropdown)}
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50"
                >
                  <ArrowUpDown className="w-4 h-4" /> Sort: <span className="text-blue-600 capitalize">{sortBy}</span>
                </button>
                {showSortDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-lg z-20 py-1">
                    <button onClick={() => { setSortBy('latest'); setShowSortDropdown(false); }} className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">Latest Updated</button>
                    <button onClick={() => { setSortBy('oldest'); setShowSortDropdown(false); }} className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">Oldest Created</button>
                    <button onClick={() => { setSortBy('alphabetical'); setShowSortDropdown(false); }} className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">Alphabetical (A-Z)</button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Notes Grid Display Wrapper */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loadingNotes ? (
              [1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-xl border border-slate-200 p-5 animate-pulse min-h-[200px]">
                  <div className="h-4 bg-slate-200 rounded w-3/4 mb-3"></div>
                  <div className="h-3 bg-slate-100 rounded w-full mb-2"></div>
                </div>
              ))
            ) : displayedNotes.length === 0 ? (
              <div className="col-span-full flex flex-col items-center justify-center py-24 text-center">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4 text-slate-300">
                  <FileText className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold text-slate-700 mb-1">No notes available</h3>
                <p className="text-sm text-slate-400 mb-6">No matches matched this selection tier or search key query context.</p>
              </div>
            ) : (
              displayedNotes.map((note) => {
                const noteId = note._id || note.id;
                return (
                  <div
                    key={noteId}
                    onClick={() => handleEditNote(note)}
                    className={`bg-white rounded-xl shadow-sm border flex flex-col overflow-hidden hover:shadow-md transition-shadow cursor-pointer group/card ${note.isImportant ? 'border-l-4 border-l-blue-600 border-slate-200' : 'border-slate-200'}`}
                  >
                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          {note.isImportant && (
                            <span className="flex items-center gap-1 bg-blue-50 text-blue-600 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                              <Star className="w-3 h-3 fill-blue-600" /> Important
                            </span>
                          )}
                          {note.isShared && (
                            <span className="bg-purple-50 text-purple-600 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Shared</span>
                          )}
                        </div>
                        <span className="text-xs text-slate-400 font-medium">
                          {note.updatedAt ? new Date(note.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ''}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-slate-900 mb-2 leading-tight">{note.title}</h3>
                      {Array.isArray(note.images) && note.images.length > 0 && (
                        <div className="mb-3 grid grid-cols-2 gap-2">
                          {note.images.slice(0, 2).map((img, index) => (
                            <img
                              key={index}
                              src={img}
                              alt={`${note.title || 'note'} attachment ${index + 1}`}
                              className="h-24 w-full rounded-lg object-cover border border-slate-100"
                            />
                          ))}
                        </div>
                      )}
                      <p className="text-sm text-slate-500 mb-4 line-clamp-3 leading-relaxed">{note.body}</p>

                      <div className="mt-auto pt-3 flex items-center justify-between border-t border-slate-100">
                        <div className="flex flex-wrap gap-1 max-w-[65%] truncate">
                          {note.tags?.slice(0, 2).map((tag, i) => (
                            <span key={i} className="px-2.5 py-0.5 bg-slate-100 text-slate-500 text-[10px] font-semibold rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>
                        
                        {/* Dynamic Quick Action Trigger Menu */}
                        <div className="flex items-center gap-1 opacity-0 group-hover/card:opacity-100 transition-opacity">
                          {activeFilter !== 'trash' ? (
                            <>
                              <button 
                                title="Toggle Share Status"
                                onClick={(e) => handleUpdateNoteField(e, noteId, { isShared: !note.isShared })}
                                className={`p-1.5 rounded hover:bg-slate-100 ${note.isShared ? 'text-purple-600' : 'text-slate-400'}`}
                              >
                                <Users className="w-3.5 h-3.5" />
                              </button>
                              <button 
                                title={note.isArchived ? "Unarchive Note" : "Archive Note"}
                                onClick={(e) => handleUpdateNoteField(e, noteId, { isArchived: !note.isArchived })}
                                className={`p-1.5 rounded hover:bg-slate-100 ${note.isArchived ? 'text-blue-600' : 'text-slate-400'}`}
                              >
                                <Archive className="w-3.5 h-3.5" />
                              </button>
                              <button 
                                title="Send to Trash"
                                onClick={(e) => handleUpdateNoteField(e, noteId, { isDeleted: true })}
                                className="p-1.5 text-slate-400 hover:text-red-600 rounded hover:bg-red-50"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </>
                          ) : (
                            <>
                              <button 
                                onClick={(e) => handleUpdateNoteField(e, noteId, { isDeleted: false })}
                                className="text-[10px] font-bold px-2 py-1 bg-slate-100 hover:bg-blue-50 text-blue-600 rounded"
                              >
                                Restore
                              </button>
                              <button 
                                title="Delete Permanently"
                                onClick={(e) => handlePermanentDelete(e, noteId)}
                                className="p-1.5 text-red-400 hover:text-red-700 rounded hover:bg-red-50"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </>
                          )}
                        </div>

                      </div>
                    </div>
                  </div>
                );
              })
            )}

            {/* In-Grid Add Card Element Link Shortcut */}
            {!loadingNotes && activeFilter === 'all' && (
              <button
                onClick={() => { setSelectedNote(null); setIsModalOpen(true); }}
                className="bg-white rounded-xl border-2 border-dashed border-slate-200 p-5 flex flex-col items-center justify-center text-center hover:border-blue-400 hover:bg-blue-50/50 transition-colors min-h-[200px]"
              >
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-4 text-slate-400">
                  <Plus className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">New Note</h3>
                <p className="text-sm text-slate-500">Capture a thought or start a draft</p>
              </button>
            )}
          </div>
        </div>

        <footer className="px-4 md:px-8 py-6 border-t border-slate-200 mt-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm bg-white shrink-0">
          <div>
            <div className="font-bold text-blue-600 mb-1">NoteMe</div>
            <div className="text-slate-400">© 2026 NoteMe Inc. All rights reserved.</div>
          </div>
          <div className="hidden sm:flex items-center gap-6 text-slate-500 font-medium">
            <Link to="#" className="hover:text-slate-800">Privacy Policy</Link>
            <Link to="#" className="hover:text-slate-800">Terms of Service</Link>
            <Link to="#" className="hover:text-slate-800">Security</Link>
            <Link to="/contact" className="hover:text-slate-800">Contact Us</Link>
          </div>
        </footer>
      </main>

      {/* MODAL VIEW SYSTEM HOOKS */}
      <NewNoteModal
        isOpen={isModalOpen}
        note={selectedNote}
        onClose={() => { setSelectedNote(null); setIsModalOpen(false); }}
        onSave={handleSaveNote}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        user={user}
        onLogout={handleLogout}
      />
    </div>
  );
}