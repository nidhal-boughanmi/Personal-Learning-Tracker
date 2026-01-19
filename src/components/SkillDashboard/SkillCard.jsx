import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import ProgressBar from '../common/ProgressBar';
import { FiEdit2, FiTrash2, FiTrendingUp } from 'react-icons/fi';
import { HiSparkles } from 'react-icons/hi';

const SkillCard = ({ skill, onEdit }) => {
    const { deleteSkill, increaseSkillProgress } = useApp();
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const handleDelete = () => {
        if (showDeleteConfirm) {
            deleteSkill(skill.id);
        } else {
            setShowDeleteConfirm(true);
            setTimeout(() => setShowDeleteConfirm(false), 3000);
        }
    };

    const handleQuickUpdate = (amount) => {
        increaseSkillProgress(skill.id, amount);
    };

    const isComplete = skill.currentProgress >= skill.targetProgress;

    return (
        <div className={`card group ${isComplete ? 'ring-2 ring-gold-500' : ''}`}>
            <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                    <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                            {skill.name}
                        </h3>
                        {isComplete && (
                            <HiSparkles className="text-gold-500 animate-pulse-slow" size={20} />
                        )}
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Target: {skill.targetProgress}%
                    </p>
                </div>

                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        onClick={() => onEdit(skill)}
                        className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 transition-colors"
                        aria-label="Edit skill"
                    >
                        <FiEdit2 size={16} />
                    </button>
                    <button
                        onClick={handleDelete}
                        className={`p-2 rounded-lg transition-all ${showDeleteConfirm
                                ? 'bg-red-500 text-white'
                                : 'hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400'
                            }`}
                        aria-label={showDeleteConfirm ? 'Confirm delete' : 'Delete skill'}
                    >
                        <FiTrash2 size={16} />
                    </button>
                </div>
            </div>

            <ProgressBar progress={skill.currentProgress} />

            {!isComplete && (
                <div className="mt-4 flex gap-2">
                    <button
                        onClick={() => handleQuickUpdate(5)}
                        className="flex-1 px-3 py-2 text-sm bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-lg hover:bg-primary-200 dark:hover:bg-primary-900/50 transition-colors font-medium"
                    >
                        +5%
                    </button>
                    <button
                        onClick={() => handleQuickUpdate(10)}
                        className="flex-1 px-3 py-2 text-sm bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-lg hover:bg-primary-200 dark:hover:bg-primary-900/50 transition-colors font-medium"
                    >
                        +10%
                    </button>
                    <button
                        onClick={() => increaseSkillProgress(skill.id, 100 - skill.currentProgress)}
                        className="flex-1 px-3 py-2 text-sm bg-gradient-to-r from-accent-500 to-emerald-500 text-white rounded-lg hover:from-accent-600 hover:to-emerald-600 transition-all font-medium flex items-center justify-center gap-1"
                    >
                        <FiTrendingUp size={14} />
                        Complete
                    </button>
                </div>
            )}

            {isComplete && (
                <div className="mt-4 p-3 bg-gradient-to-r from-gold-500/20 to-gold-600/20 border border-gold-500/50 rounded-lg text-center">
                    <p className="text-sm font-bold text-gold-700 dark:text-gold-400">
                        🎉 Skill Completed!
                    </p>
                </div>
            )}
        </div>
    );
};

export default SkillCard;
