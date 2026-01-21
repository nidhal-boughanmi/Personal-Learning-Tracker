import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import ResourceCard from './ResourceCard';
import AddResourceModal from './AddResourceModal';
import { FiPlus, FiBook, FiFilter } from 'react-icons/fi';
import { RESOURCE_STATUS } from '../../utils/models';

const ResourceList = ({ skillId }) => {
    const { resources } = useApp();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingResource, setEditingResource] = useState(null);
    const [filterStatus, setFilterStatus] = useState('all');

    const skillResources = resources.filter(r => r.skillId === skillId);

    const filteredResources = filterStatus === 'all'
        ? skillResources
        : skillResources.filter(r => r.status === filterStatus);

    const resourceCounts = {
        total: skillResources.length,
        in_progress: skillResources.filter(r => r.status === RESOURCE_STATUS.IN_PROGRESS).length,
        completed: skillResources.filter(r => r.status === RESOURCE_STATUS.COMPLETED).length,
        not_started: skillResources.filter(r => r.status === RESOURCE_STATUS.NOT_STARTED).length,
    };

    const handleEdit = (resource) => {
        setEditingResource(resource);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingResource(null);
    };

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <FiBook className="text-primary-600 dark:text-primary-400" size={20} />
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                        Learning Resources ({resourceCounts.total})
                    </h3>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="btn-primary flex items-center gap-2 text-sm"
                >
                    <FiPlus size={18} />
                    Add Resource
                </button>
            </div>

            {/* Stats */}
            {skillResources.length > 0 && (
                <div className="grid grid-cols-3 gap-3">
                    <div className="glass rounded-lg p-3 text-center">
                        <div className="text-2xl font-bold text-primary-600">{resourceCounts.in_progress}</div>
                        <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">In Progress</div>
                    </div>
                    <div className="glass rounded-lg p-3 text-center">
                        <div className="text-2xl font-bold text-accent-600">{resourceCounts.completed}</div>
                        <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">Completed</div>
                    </div>
                    <div className="glass rounded-lg p-3 text-center">
                        <div className="text-2xl font-bold text-slate-600">{resourceCounts.not_started}</div>
                        <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">Not Started</div>
                    </div>
                </div>
            )}

            {/* Filter */}
            {skillResources.length > 0 && (
                <div className="flex items-center gap-2">
                    <FiFilter className="text-slate-600 dark:text-slate-400" size={16} />
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="text-sm px-3 py-1.5 rounded-lg bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                        <option value="all">All Resources</option>
                        <option value={RESOURCE_STATUS.IN_PROGRESS}>In Progress</option>
                        <option value={RESOURCE_STATUS.NOT_STARTED}>Not Started</option>
                        <option value={RESOURCE_STATUS.COMPLETED}>Completed</option>
                        <option value={RESOURCE_STATUS.PAUSED}>Paused</option>
                    </select>
                </div>
            )}

            {/* Resources Grid */}
            {filteredResources.length === 0 && skillResources.length > 0 && (
                <div className="card text-center py-8">
                    <p className="text-slate-600 dark:text-slate-400">
                        No resources match this filter
                    </p>
                </div>
            )}

            {skillResources.length === 0 ? (
                <div className="card text-center py-12">
                    <div className="text-6xl mb-4">📚</div>
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                        No resources yet
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-md mx-auto">
                        Add courses, books, videos, or any learning materials you're using to develop this skill.
                    </p>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="btn-primary inline-flex items-center gap-2"
                    >
                        <FiPlus size={20} />
                        Add Your First Resource
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredResources.map((resource) => (
                        <ResourceCard key={resource.id} resource={resource} onEdit={handleEdit} />
                    ))}
                </div>
            )}

            {/* Modal */}
            <AddResourceModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                skillId={skillId}
                editResource={editingResource}
            />
        </div>
    );
};

export default ResourceList;
