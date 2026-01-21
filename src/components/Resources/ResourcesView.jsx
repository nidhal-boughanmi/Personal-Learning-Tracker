import React, { useState } from 'react';
import ResourceList from '../Resources/ResourceList';
import NotesTab from '../Notes/NotesTab';
import FlashcardsTab from '../Flashcards/FlashcardsTab';
import { FiX, FiBook, FiFileText, FiZap } from 'react-icons/fi';

const ResourcesView = ({ skill, onClose }) => {
    const [activeTab, setActiveTab] = useState('resources');

    if (!skill) return null;

    const tabs = [
        { id: 'resources', label: 'Resources', icon: FiBook },
        { id: 'notes', label: 'Notes', icon: FiFileText },
        { id: 'flashcards', label: 'Flashcards', icon: FiZap },
    ];

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 transition-colors"
                        aria-label="Back to skills"
                    >
                        <FiX size={24} />
                    </button>
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                            {skill.name}
                        </h2>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                            Learning materials and study tools
                        </p>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 border-b border-slate-200 dark:border-slate-700">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-4 py-2 font-medium transition-colors border-b-2 ${activeTab === tab.id
                                ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                                }`}
                        >
                            <Icon size={18} />
                            {tab.label}
                        </button>
                    );
                })}
            </div>

            {/* Tab Content */}
            <div>
                {activeTab === 'resources' && <ResourceList skillId={skill.id} />}
                {activeTab === 'notes' && <NotesTab skillId={skill.id} />}
                {activeTab === 'flashcards' && <FlashcardsTab skillId={skill.id} />}
            </div>
        </div>
    );
};

export default ResourcesView;
