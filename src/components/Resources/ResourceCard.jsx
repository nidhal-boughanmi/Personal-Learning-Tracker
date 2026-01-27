import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { RESOURCE_TYPES, RESOURCE_STATUS } from '../../utils/models';
import ProgressBar from '../common/ProgressBar';
import { FiEdit2, FiTrash2, FiExternalLink, FiCheckCircle, FiPlay, FiFileText, FiBookOpen } from 'react-icons/fi';
import YoutubePlayer from './YoutubePlayer';
import PDFViewer from './PDFViewer';

const ResourceCard = ({ resource, onEdit }) => {
    const { deleteResource, incrementResourceProgress, updateResource } = useApp();
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [showYoutubePlayer, setShowYoutubePlayer] = useState(false);
    const [showPDFViewer, setShowPDFViewer] = useState(false);

    const typeIcons = {
        [RESOURCE_TYPES.VIDEO_COURSE]: '📹',
        [RESOURCE_TYPES.YOUTUBE]: '🎥',
        [RESOURCE_TYPES.BOOK]: '📖',
        [RESOURCE_TYPES.ARTICLE]: '📝',
        [RESOURCE_TYPES.DOCS]: '📄',
        [RESOURCE_TYPES.PROJECT]: '🏋️',
    };

    const statusColors = {
        [RESOURCE_STATUS.NOT_STARTED]: 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400',
        [RESOURCE_STATUS.IN_PROGRESS]: 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300',
        [RESOURCE_STATUS.COMPLETED]: 'bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-300',
        [RESOURCE_STATUS.PAUSED]: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300',
    };

    const statusLabels = {
        [RESOURCE_STATUS.NOT_STARTED]: 'Not Started',
        [RESOURCE_STATUS.IN_PROGRESS]: 'In Progress',
        [RESOURCE_STATUS.COMPLETED]: 'Completed',
        [RESOURCE_STATUS.PAUSED]: 'Paused',
    };

    const handleDelete = () => {
        if (showDeleteConfirm) {
            deleteResource(resource.id);
        } else {
            setShowDeleteConfirm(true);
            setTimeout(() => setShowDeleteConfirm(false), 3000);
        }
    };

    const handleMarkComplete = () => {
        updateResource(resource.id, {
            status: RESOURCE_STATUS.COMPLETED,
            progress: {
                ...resource.progress,
                current: resource.progress.total,
                percentage: 100,
            },
            completedAt: new Date().toISOString(),
        });
    };

    const handleCardClick = () => {
        if (resource.type === RESOURCE_TYPES.YOUTUBE && resource.youtubeId) {
            setShowYoutubePlayer(true);
        } else if (resource.type === RESOURCE_TYPES.DOCS && (resource.fileData || resource.url)) {
            setShowPDFViewer(true);
        } else if (resource.url) {
            window.open(resource.url, '_blank');
        }
    };

    const handleVideoWatched = () => {
        incrementResourceProgress(resource.id);
        setShowYoutubePlayer(false);
    };

    const isCompleted = resource.status === RESOURCE_STATUS.COMPLETED;
    const hasProgress = resource.progress.total > 0;
    const isClickable = resource.type === RESOURCE_TYPES.YOUTUBE || resource.type === RESOURCE_TYPES.DOCS || resource.url;

    return (
        <>
            <div className={`card group hover:shadow-lg transition-all duration-200 ${isCompleted ? 'ring-2 ring-accent-500' : ''} ${isClickable ? 'cursor-pointer hover:-translate-y-1' : ''}`}>
                {/* Thumbnail for YouTube */}
                {resource.type === RESOURCE_TYPES.YOUTUBE && resource.thumbnail && (
                    <div className="relative w-full aspect-video mb-4 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800" onClick={handleCardClick}>
                        <img
                            src={resource.thumbnail}
                            alt={resource.title}
                            className="w-full h-full object-cover"
                        />
                        {/* Play button overlay */}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
                            <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                <FiPlay className="w-6 h-6 text-white ml-1" />
                            </div>
                        </div>
                        {resource.duration && (
                            <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 text-white text-xs rounded">
                                {resource.duration} min
                            </div>
                        )}
                    </div>
                )}

                {/* PDF Icon */}
                {resource.type === RESOURCE_TYPES.DOCS && !resource.thumbnail && (
                    <div className="relative w-full aspect-video mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center cursor-pointer" onClick={handleCardClick}>
                        <FiFileText className="w-20 h-20 text-white opacity-90" />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-colors">
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="px-4 py-2 bg-white/90 text-slate-900 rounded-lg font-semibold text-sm">
                                    Ouvrir PDF
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2 flex-1 min-w-0" onClick={resource.type !== RESOURCE_TYPES.YOUTUBE && resource.type !== RESOURCE_TYPES.DOCS ? handleCardClick : undefined}>
                        {(!resource.thumbnail || resource.type !== RESOURCE_TYPES.YOUTUBE) && resource.type !== RESOURCE_TYPES.DOCS && (
                            <span className="text-2xl">{typeIcons[resource.type]}</span>
                        )}
                        <div className="flex-1 min-w-0">
                            <h4 className="text-base font-semibold text-slate-900 dark:text-white line-clamp-2">
                                {resource.title}
                            </h4>
                            {resource.platform && (
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                    📍 {resource.platform}
                                </p>
                            )}
                            {resource.author && (
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                    ✍️ {resource.author}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="flex gap-2 ml-2">
                        {resource.url && resource.type !== RESOURCE_TYPES.YOUTUBE && resource.type !== RESOURCE_TYPES.DOCS && (
                            <a
                                href={resource.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 transition-colors"
                                aria-label="Open resource"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <FiExternalLink size={16} />
                            </a>
                        )}
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onEdit(resource);
                            }}
                            className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 transition-colors opacity-0 group-hover:opacity-100"
                            aria-label="Edit resource"
                        >
                            <FiEdit2 size={16} />
                        </button>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                handleDelete();
                            }}
                            className={`p-2 rounded-lg transition-all ${showDeleteConfirm
                                ? 'bg-red-500 text-white opacity-100'
                                : 'hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 opacity-0 group-hover:opacity-100'
                                }`}
                            aria-label={showDeleteConfirm ? 'Confirm delete' : 'Delete resource'}
                        >
                            <FiTrash2 size={16} />
                        </button>
                    </div>
                </div>

                {/* Description */}
                {resource.description && (
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 line-clamp-2">
                        {resource.description}
                    </p>
                )}

                {/* Status Badge */}
                <div className="mb-3">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium ${statusColors[resource.status]}`}>
                        {isCompleted && <FiCheckCircle size={12} />}
                        {resource.status === RESOURCE_STATUS.IN_PROGRESS && <FiPlay size={12} />}
                        {statusLabels[resource.status]}
                    </span>
                </div>

                {/* Progress */}
                {hasProgress && (
                    <div className="mb-4">
                        <div className="flex items-center justify-between mb-2 text-sm">
                            <span className="text-slate-600 dark:text-slate-400">
                                Progress: {resource.progress.current}/{resource.progress.total}
                            </span>
                            <span className="font-semibold text-slate-900 dark:text-white">
                                {resource.progress.percentage}%
                            </span>
                        </div>
                        <ProgressBar progress={resource.progress.percentage} showLabel={false} />
                    </div>
                )}

                {/* Quick Actions */}
                {!isCompleted && hasProgress && (
                    <div className="flex gap-2 mt-4">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                incrementResourceProgress(resource.id);
                            }}
                            className="flex-1 px-3 py-2 text-sm bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-lg hover:bg-primary-200 dark:hover:bg-primary-900/50 transition-colors font-medium"
                        >
                            +1
                        </button>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                handleMarkComplete();
                            }}
                            className="flex-1 px-3 py-2 text-sm bg-gradient-to-r from-accent-500 to-emerald-500 text-white rounded-lg hover:from-accent-600 hover:to-emerald-600 transition-all font-medium flex items-center justify-center gap-1"
                        >
                            <FiCheckCircle size={14} />
                            Complete
                        </button>
                    </div>
                )}

                {isCompleted && (
                    <div className="mt-3 p-2 bg-gradient-to-r from-accent-500/20 to-emerald-500/20 border border-accent-500/50 rounded-lg text-center">
                        <p className="text-sm font-bold text-accent-700 dark:text-accent-400">
                            ✓ Completed!
                        </p>
                    </div>
                )}
            </div>

            {/* YouTube Player Modal */}
            <YoutubePlayer
                videoId={resource.youtubeId}
                isOpen={showYoutubePlayer}
                onClose={() => setShowYoutubePlayer(false)}
                onVideoWatched={handleVideoWatched}
            />

            {/* PDF Viewer Modal */}
            <PDFViewer
                pdfUrl={resource.url}
                pdfData={resource.fileData}
                fileName={resource.title}
                isOpen={showPDFViewer}
                onClose={() => setShowPDFViewer(false)}
            />
        </>
    );
};

export default ResourceCard;
