import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { RESOURCE_TYPES, RESOURCE_STATUS, validateResource } from '../../utils/models';

const AddResourceModal = ({ isOpen, onClose, skillId, editResource = null }) => {
    const { addResource, updateResource } = useApp();
    const [title, setTitle] = useState(editResource?.title || '');
    const [type, setType] = useState(editResource?.type || RESOURCE_TYPES.VIDEO_COURSE);
    const [url, setUrl] = useState(editResource?.url || '');
    const [platform, setPlatform] = useState(editResource?.platform || '');
    const [total, setTotal] = useState(editResource?.progress.total || 0);
    const [error, setError] = useState('');

    const typeIcons = {
        [RESOURCE_TYPES.VIDEO_COURSE]: '📹',
        [RESOURCE_TYPES.YOUTUBE]: '🎥',
        [RESOURCE_TYPES.BOOK]: '📖',
        [RESOURCE_TYPES.ARTICLE]: '📝',
        [RESOURCE_TYPES.DOCS]: '📄',
        [RESOURCE_TYPES.PROJECT]: '🏋️',
    };

    const typeLabels = {
        [RESOURCE_TYPES.VIDEO_COURSE]: 'Video Course',
        [RESOURCE_TYPES.YOUTUBE]: 'YouTube Video/Playlist',
        [RESOURCE_TYPES.BOOK]: 'Book',
        [RESOURCE_TYPES.ARTICLE]: 'Article/Blog',
        [RESOURCE_TYPES.DOCS]: 'Documentation',
        [RESOURCE_TYPES.PROJECT]: 'Practice Project',
    };

    const totalLabel = {
        [RESOURCE_TYPES.VIDEO_COURSE]: 'Total Lectures',
        [RESOURCE_TYPES.YOUTUBE]: 'Total Videos',
        [RESOURCE_TYPES.BOOK]: 'Total Pages/Chapters',
        [RESOURCE_TYPES.ARTICLE]: 'Articles to Read',
        [RESOURCE_TYPES.DOCS]: 'Sections',
        [RESOURCE_TYPES.PROJECT]: 'Milestones',
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        const resourceData = {
            skillId,
            type,
            title,
            url,
            platform,
            progress: {
                current: editResource?.progress.current || 0,
                total: Number(total),
                percentage: 0,
            },
        };

        const validation = validateResource(resourceData);
        if (!validation.valid) {
            setError(validation.error);
            return;
        }

        if (editResource) {
            updateResource(editResource.id, { title, type, url, platform, progress: { ...editResource.progress, total: Number(total) } });
        } else {
            addResource(skillId, type, title, Number(total));
            if (url) {
                // Update with URL after creation
                const newRes = addResource(skillId, type, title, Number(total));
                updateResource(newRes.id, { url, platform });
            }
        }

        handleClose();
    };

    const handleClose = () => {
        setTitle('');
        setType(RESOURCE_TYPES.VIDEO_COURSE);
        setUrl('');
        setPlatform('');
        setTotal(0);
        setError('');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div
            className="modal-overlay animate-in fade-in duration-200"
            onClick={handleClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="resource-modal-title"
        >
            <div
                className="modal-content animate-in zoom-in duration-200 max-w-lg"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 id="resource-modal-title" className="text-2xl font-bold mb-6 bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                    {editResource ? 'Edit Resource' : 'Add Learning Resource'}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label htmlFor="resource-type" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            Resource Type *
                        </label>
                        <select
                            id="resource-type"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            className="input"
                            required
                        >
                            {Object.entries(RESOURCE_TYPES).map(([key, value]) => (
                                <option key={value} value={value}>
                                    {typeIcons[value]} {typeLabels[value]}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="resource-title" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            Title *
                        </label>
                        <input
                            id="resource-title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g., React - The Complete Guide"
                            className="input"
                            required
                            autoFocus
                        />
                    </div>

                    <div>
                        <label htmlFor="resource-url" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            URL (Optional)
                        </label>
                        <input
                            id="resource-url"
                            type="url"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="https://..."
                            className="input"
                        />
                    </div>

                    <div>
                        <label htmlFor="resource-platform" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            Platform (Optional)
                        </label>
                        <input
                            id="resource-platform"
                            type="text"
                            value={platform}
                            onChange={(e) => setPlatform(e.target.value)}
                            placeholder="e.g., Udemy, Coursera, YouTube"
                            className="input"
                        />
                    </div>

                    <div>
                        <label htmlFor="resource-total" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            {totalLabel[type] || 'Total Items'}
                        </label>
                        <input
                            id="resource-total"
                            type="number"
                            min="0"
                            value={total}
                            onChange={(e) => setTotal(e.target.value)}
                            placeholder="0"
                            className="input"
                        />
                        <p className="mt-1 text-xs text-slate-500">
                            Leave 0 if not applicable
                        </p>
                    </div>

                    {error && (
                        <div className="p-3 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg text-red-700 dark:text-red-300 text-sm">
                            {error}
                        </div>
                    )}

                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="btn-secondary flex-1"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn-primary flex-1"
                        >
                            {editResource ? 'Update' : 'Add'} Resource
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddResourceModal;
