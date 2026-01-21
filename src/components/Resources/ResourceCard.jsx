import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { RESOURCE_TYPES, RESOURCE_STATUS } from '../../utils/models';
import ProgressBar from '../common/ProgressBar';
import { FiEdit2, FiTrash2, FiExternalLink, FiCheckCircle, FiPlay } from 'react-icons/fi';

const ResourceCard = ({ resource, onEdit }) => {
    const { deleteResource, incrementResourceProgress, updateResource } = useApp();
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

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

    const isCompleted = resource.status === RESOURCE_STATUS.COMPLETED;
    const hasProgress = resource.progress.total > 0;

    return (
        <div className={`card group ${isCompleted ? 'ring-2 ring-accent-500' : ''}`}>
            <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                    <span className="text-2xl">{typeIcons[resource.type]}</span>
                    <div className="flex-1 min-w-0">
                        <h4 className="text-base font-semibold text-slate-900 dark:text-white truncate">
                            {resource.title}
                        </h4>
                        {resource.platform && (
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                                {resource.platform}
                            </p>
                        )}
                    </div>
                </div>

                <div className="flex gap-2 ml-2">
                    {resource.url && (
                        <a
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 transition-colors"
                            aria-label="Open resource"
                        >
                            <FiExternalLink size={16} />
                        </a>
                    )}
                    <button
                        onClick={() => onEdit(resource)}
                        className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 transition-colors opacity-0 group-hover:opacity-100"
                        aria-label="Edit resource"
                    >
                        <FiEdit2 size={16} />
                    </button>
                    <button
                        onClick={handleDelete}
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
                        onClick={() => incrementResourceProgress(resource.id)}
                        className="flex-1 px-3 py-2 text-sm bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-lg hover:bg-primary-200 dark:hover:bg-primary-900/50 transition-colors font-medium"
                    >
                        +1
                    </button>
                    <button
                        onClick={handleMarkComplete}
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
    );
};

export default ResourceCard;
