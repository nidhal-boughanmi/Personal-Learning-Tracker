import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import SkillCard from './SkillCard';
import AddSkillModal from './AddSkillModal';
import ResourcesView from '../Resources/ResourcesView';
import { FiPlus, FiBook } from 'react-icons/fi';

const SkillDashboard = ({ onStartQuiz }) => {
    const { skills } = useApp();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingSkill, setEditingSkill] = useState(null);
    const [viewingSkill, setViewingSkill] = useState(null);

    const handleEdit = (skill) => {
        setEditingSkill(skill);
        setIsModalOpen(true);
    };

    const handleViewResources = (skill) => {
        setViewingSkill(skill);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingSkill(null);
    };

    const completedSkills = skills.filter(s => s.currentProgress >= s.targetProgress).length;
    const averageProgress = skills.length > 0
        ? Math.round(skills.reduce((sum, s) => sum + s.currentProgress, 0) / skills.length)
        : 0;

    // If viewing a skill's resources, show ResourcesView
    if (viewingSkill) {
        return <ResourcesView skill={viewingSkill} onClose={() => setViewingSkill(null)} />;
    }

    return (
        <div className="space-y-6">
            {/* Header Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="stat-card">
                    <div className="stat-value">{skills.length}</div>
                    <div className="stat-label">Total Skills</div>
                </div>
                <div className="stat-card">
                    <div className="stat-value">{completedSkills}</div>
                    <div className="stat-label">Completed</div>
                </div>
                <div className="stat-card">
                    <div className="stat-value">{averageProgress}%</div>
                    <div className="stat-label">Avg Progress</div>
                </div>
            </div>

            {/* Add Skill Button */}
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <FiBook className="text-primary-600" />
                    My Skills
                </h2>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="btn-primary flex items-center gap-2"
                >
                    <FiPlus size={20} />
                    Add Skill
                </button>
            </div>

            {/* Skills Grid */}
            {skills.length === 0 ? (
                <div className="card text-center py-16">
                    <div className="text-6xl mb-4">📚</div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                        No skills yet
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-md mx-auto">
                        Start tracking your learning journey by adding your first skill.
                        Whether it's React, Python, or any other technology, we'll help you track your progress!
                    </p>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="btn-primary inline-flex items-center gap-2"
                    >
                        <FiPlus size={20} />
                        Add Your First Skill
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {skills.map((skill) => (
                        <SkillCard
                            key={skill.id}
                            skill={skill}
                            onEdit={handleEdit}
                            onViewResources={handleViewResources}
                            onStartQuiz={onStartQuiz}
                        />
                    ))}
                </div>
            )}

            {/* Modal */}
            <AddSkillModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                editSkill={editingSkill}
            />
        </div>
    );
};

export default SkillDashboard;
