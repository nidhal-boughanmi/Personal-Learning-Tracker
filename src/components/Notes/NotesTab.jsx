import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FiPlus, FiEdit2, FiTrash2, FiBookOpen } from 'react-icons/fi';

const NotesTab = ({ skillId }) => {
    const { notes, addNote, updateNote, deleteNote, getNotesBySkill } = useApp();
    const [isEditing, setIsEditing] = useState(false);
    const [editingNote, setEditingNote] = useState(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const skillNotes = getNotesBySkill(skillId);

    const handleSave = () => {
        if (editingNote) {
            updateNote(editingNote.id, { title, content });
        } else {
            addNote(skillId, title, content);
        }
        handleCancel();
    };

    const handleEdit = (note) => {
        setEditingNote(note);
        setTitle(note.title);
        setContent(note.content);
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditingNote(null);
        setTitle('');
        setContent('');
    };

    const handleDelete = (id) => {
        if (window.confirm('Delete this note?')) {
            deleteNote(id);
        }
    };

    if (isEditing) {
        return (
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                        {editingNote ? 'Edit Note' : 'New Note'}
                    </h3>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Title
                    </label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Note title..."
                        className="input"
                        autoFocus
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Content (Markdown supported)
                    </label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Write your notes here... (supports **bold**, *italic*, `code`, etc.)"
                        className="input min-h-[300px] font-mono text-sm"
                    />
                    <p className="mt-2 text-xs text-slate-500">
                        💡 Tip: Use markdown for formatting: **bold**, *italic*, `code`, - lists
                    </p>
                </div>

                <div className="flex gap-3">
                    <button onClick={handleCancel} className="btn-secondary flex-1">
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={!title.trim()}
                        className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {editingNote ? 'Update' : 'Save'} Note
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <FiBookOpen className="text-primary-600" size={20} />
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                        Notes ({skillNotes.length})
                    </h3>
                </div>
                <button
                    onClick={() => setIsEditing(true)}
                    className="btn-primary flex items-center gap-2 text-sm"
                >
                    <FiPlus size={18} />
                    New Note
                </button>
            </div>

            {skillNotes.length === 0 ? (
                <div className="card text-center py-12">
                    <div className="text-6xl mb-4">📝</div>
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                        No notes yet
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-md mx-auto">
                        Take notes while you learn! Write down key concepts, code snippets, or anything you want to remember.
                    </p>
                    <button
                        onClick={() => setIsEditing(true)}
                        className="btn-primary inline-flex items-center gap-2"
                    >
                        <FiPlus size={20} />
                        Create First Note
                    </button>
                </div>
            ) : (
                <div className="space-y-3">
                    {skillNotes.map((note) => (
                        <div key={note.id} className="card group">
                            <div className="flex items-start justify-between mb-3">
                                <h4 className="text-base font-semibold text-slate-900 dark:text-white flex-1">
                                    {note.title}
                                </h4>
                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => handleEdit(note)}
                                        className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400"
                                    >
                                        <FiEdit2 size={14} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(note.id)}
                                        className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400"
                                    >
                                        <FiTrash2 size={14} />
                                    </button>
                                </div>
                            </div>
                            <div className="prose prose-sm dark:prose-invert max-w-none">
                                <pre className="whitespace-pre-wrap font-sans text-sm text-slate-700 dark:text-slate-300">
                                    {note.content || 'No content'}
                                </pre>
                            </div>
                            <div className="mt-3 text-xs text-slate-500">
                                Updated: {new Date(note.updatedAt).toLocaleDateString()}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default NotesTab;
