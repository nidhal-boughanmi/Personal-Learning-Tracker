import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { validateSkill } from '../../utils/models';

const AddSkillModal = ({ isOpen, onClose, editSkill = null }) => {
    const { addSkill, updateSkill } = useApp();
    const [name, setName] = useState(editSkill?.name || '');
    const [targetProgress, setTargetProgress] = useState(editSkill?.targetProgress || 100);
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        const skillData = {
            name,
            currentProgress: editSkill?.currentProgress || 0,
            targetProgress,
        };

        const validation = validateSkill(skillData);
        if (!validation.valid) {
            setError(validation.error);
            return;
        }

        if (editSkill) {
            updateSkill(editSkill.id, { name, targetProgress });
        } else {
            addSkill(name, targetProgress);
        }

        setName('');
        setTargetProgress(100);
        onClose();
    };

    const handleClose = () => {
        setName('');
        setTargetProgress(100);
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
            aria-labelledby="modal-title"
        >
            <div
                className="modal-content animate-in zoom-in duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 id="modal-title" className="text-2xl font-bold mb-6 bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                    {editSkill ? 'Edit Skill' : 'Add New Skill'}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="skill-name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            Skill Name *
                        </label>
                        <input
                            id="skill-name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g., React, Python, TypeScript"
                            className="input"
                            maxLength={50}
                            required
                            autoFocus
                        />
                        <p className="mt-1 text-xs text-slate-500">
                            {name.length}/50 characters
                        </p>
                    </div>

                    <div>
                        <label htmlFor="target-progress" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            Target Progress: {targetProgress}%
                        </label>
                        <input
                            id="target-progress"
                            type="range"
                            min="0"
                            max="100"
                            step="5"
                            value={targetProgress}
                            onChange={(e) => setTargetProgress(Number(e.target.value))}
                            className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary-600"
                        />
                        <div className="flex justify-between text-xs text-slate-500 mt-1">
                            <span>0%</span>
                            <span>50%</span>
                            <span>100%</span>
                        </div>
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
                            {editSkill ? 'Update' : 'Add'} Skill
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddSkillModal;
