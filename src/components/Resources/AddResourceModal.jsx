import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { RESOURCE_TYPES, RESOURCE_STATUS, validateResource } from '../../utils/models';
import { extractYouTubeID, getYouTubeThumbnail, isYouTubeUrl } from '../../utils/youtubeHelpers';
import { getDomainFromURL, isPDFUrl, formatFileSize } from '../../utils/helpers';
import { FiUpload, FiX } from 'react-icons/fi';

const AddResourceModal = ({ isOpen, onClose, skillId, editResource = null }) => {
    const { addResource, updateResource } = useApp();
    const [title, setTitle] = useState(editResource?.title || '');
    const [type, setType] = useState(editResource?.type || RESOURCE_TYPES.VIDEO_COURSE);
    const [url, setUrl] = useState(editResource?.url || '');
    const [platform, setPlatform] = useState(editResource?.platform || '');
    const [total, setTotal] = useState(editResource?.progress.total || 0);
    const [description, setDescription] = useState(editResource?.description || '');
    const [author, setAuthor] = useState(editResource?.author || '');
    const [duration, setDuration] = useState(editResource?.duration || '');
    const [thumbnail, setThumbnail] = useState(editResource?.thumbnail || null);
    const [youtubeId, setYoutubeId] = useState(editResource?.youtubeId || null);
    const [fileData, setFileData] = useState(editResource?.fileData || null);
    const [fileSize, setFileSize] = useState(editResource?.fileSize || 0);
    const [fileName, setFileName] = useState('');
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

    // Auto-detect YouTube URLs
    useEffect(() => {
        if (url && isYouTubeUrl(url)) {
            const videoId = extractYouTubeID(url);
            if (videoId) {
                setYoutubeId(videoId);
                setThumbnail(getYouTubeThumbnail(videoId, 'high'));
                setType(RESOURCE_TYPES.YOUTUBE);
                if (!platform) setPlatform('YouTube');
            }
        }
    }, [url]);

    // Auto-extract domain for articles
    useEffect(() => {
        if (url && type === RESOURCE_TYPES.ARTICLE) {
            const domain = getDomainFromURL(url);
            if (domain && !platform) {
                setPlatform(domain);
            }
        }
    }, [url, type]);

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const maxSize = 5 * 1024 * 1024; // 5MB
        if (file.size > maxSize) {
            setError(`Le fichier est trop grand (${formatFileSize(file.size)}). Maximum: 5MB. Utilisez un lien URL à la place.`);
            return;
        }

        setFileName(file.name);
        setFileSize(file.size);

        const reader = new FileReader();
        reader.onload = (event) => {
            setFileData(event.target.result);
            if (!title) setTitle(file.name.replace('.pdf', ''));
        };
        reader.readAsDataURL(file);
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
            // Edit existing resource
            const enrichedData = {
                title,
                type,
                url,
                platform,
                progress: { ...editResource.progress, total: Number(total) },
                description,
                author,
                duration: duration ? Number(duration) : null,
                thumbnail,
                youtubeId,
                fileData,
                fileSize,
            };
            updateResource(editResource.id, enrichedData);
        } else {
            // Add new resource with all enriched data in one call
            const enrichedData = {
                url,
                platform,
                description,
                author,
                duration: duration ? Number(duration) : null,
                thumbnail,
                youtubeId,
                fileData,
                fileSize,
            };
            addResource(skillId, type, title, Number(total), enrichedData);
        }

        handleClose();
    };

    const handleClose = () => {
        setTitle('');
        setType(RESOURCE_TYPES.VIDEO_COURSE);
        setUrl('');
        setPlatform('');
        setTotal(0);
        setDescription('');
        setAuthor('');
        setDuration('');
        setThumbnail(null);
        setYoutubeId(null);
        setFileData(null);
        setFileSize(0);
        setFileName('');
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
                className="modal-content animate-in zoom-in duration-200 max-w-2xl max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 id="resource-modal-title" className="text-2xl font-bold mb-6 bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                    {editResource ? 'Edit Resource' : 'Add Learning Resource'}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Resource Type */}
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

                    {/* Title */}
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

                    {/* URL (not for uploaded PDFs) */}
                    {!(type === RESOURCE_TYPES.DOCS && fileData) && (
                        <div>
                            <label htmlFor="resource-url" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                URL {type === RESOURCE_TYPES.YOUTUBE ? '*' : '(Optional)'}
                            </label>
                            <input
                                id="resource-url"
                                type="url"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                placeholder={type === RESOURCE_TYPES.YOUTUBE ? "https://youtube.com/watch?v=..." : "https://..."}
                                className="input"
                                required={type === RESOURCE_TYPES.YOUTUBE}
                            />
                            {type === RESOURCE_TYPES.YOUTUBE && url && (
                                <p className="mt-1 text-xs text-green-600 dark:text-green-400">
                                    ✓ YouTube détecté automatiquement
                                </p>
                            )}
                        </div>
                    )}

                    {/* YouTube Thumbnail Preview */}
                    {type === RESOURCE_TYPES.YOUTUBE && thumbnail && (
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                Preview
                            </label>
                            <div className="relative w-full aspect-video bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden">
                                <img
                                    src={thumbnail}
                                    alt="YouTube thumbnail"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                    <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
                                        <div className="w-0 h-0 border-l-[16px] border-l-white border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent ml-1"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* PDF Upload */}
                    {type === RESOURCE_TYPES.DOCS && (
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                Upload PDF (max 5MB) ou utilisez URL
                            </label>
                            <div className="flex items-center gap-3">
                                <label className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg hover:border-primary-500 dark:hover:border-primary-500 cursor-pointer transition-colors">
                                    <FiUpload size={20} />
                                    <span className="text-sm">
                                        {fileName || 'Choisir un fichier PDF'}
                                    </span>
                                    <input
                                        type="file"
                                        accept=".pdf,application/pdf"
                                        onChange={handleFileUpload}
                                        className="hidden"
                                    />
                                </label>
                                {fileName && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setFileData(null);
                                            setFileName('');
                                            setFileSize(0);
                                        }}
                                        className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                                    >
                                        <FiX size={20} />
                                    </button>
                                )}
                            </div>
                            {fileName && (
                                <p className="mt-1 text-xs text-slate-500">
                                    {fileName} ({formatFileSize(fileSize)})
                                </p>
                            )}
                        </div>
                    )}

                    {/* Description (for Articles, Books) */}
                    {(type === RESOURCE_TYPES.ARTICLE || type === RESOURCE_TYPES.BOOK) && (
                        <div>
                            <label htmlFor="resource-description" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                Description (Optional)
                            </label>
                            <textarea
                                id="resource-description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Brief description of the content..."
                                className="input min-h-[80px]"
                                rows={3}
                            />
                        </div>
                    )}

                    {/* Author (for Books, Articles) */}
                    {(type === RESOURCE_TYPES.BOOK || type === RESOURCE_TYPES.ARTICLE) && (
                        <div>
                            <label htmlFor="resource-author" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                Author (Optional)
                            </label>
                            <input
                                id="resource-author"
                                type="text"
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                                placeholder="Author name"
                                className="input"
                            />
                        </div>
                    )}

                    {/* Platform */}
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

                    {/* Duration (for Videos) */}
                    {(type === RESOURCE_TYPES.VIDEO_COURSE || type === RESOURCE_TYPES.YOUTUBE) && (
                        <div>
                            <label htmlFor="resource-duration" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                Duration (minutes, optional)
                            </label>
                            <input
                                id="resource-duration"
                                type="number"
                                min="0"
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                                placeholder="e.g., 45"
                                className="input"
                            />
                        </div>
                    )}

                    {/* Total Progress Items */}
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
