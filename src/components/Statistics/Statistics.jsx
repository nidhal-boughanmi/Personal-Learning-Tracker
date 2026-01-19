import React from 'react';
import { useApp } from '../../context/AppContext';
import WeeklyChart from './WeeklyChart';
import StreakCounter from './StreakCounter';
import { formatDuration } from '../../utils/helpers';
import { FiBarChart2, FiAward } from 'react-icons/fi';

const Statistics = () => {
    const { skills, sessions } = useApp();

    const totalStudyTime = sessions.reduce((sum, s) => sum + s.duration, 0);
    const completedSkills = skills.filter(s => s.currentProgress >= s.targetProgress).length;
    const totalSkills = skills.length;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-2">
                <FiBarChart2 className="text-primary-600 dark:text-primary-400" size={28} />
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                    Statistics & Analytics
                </h2>
            </div>

            {/* Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="stat-card">
                    <div className="stat-value">{formatDuration(totalStudyTime)}</div>
                    <div className="stat-label">Total Study Time</div>
                </div>

                <div className="stat-card">
                    <div className="stat-value">{totalSkills}</div>
                    <div className="stat-label">Active Skills</div>
                </div>

                <div className="stat-card">
                    <div className="stat-value">{completedSkills}</div>
                    <div className="stat-label">Skills Completed</div>
                </div>

                <StreakCounter />
            </div>

            {/* Weekly Chart */}
            <WeeklyChart />

            {/* Skill Progress Overview */}
            {skills.length > 0 && (
                <div className="card">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                        <FiAward className="text-accent-600" />
                        Skill Progress Overview
                    </h3>
                    <div className="space-y-3">
                        {skills.map((skill) => {
                            const isComplete = skill.currentProgress >= skill.targetProgress;
                            return (
                                <div key={skill.id} className="flex items-center gap-3">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-sm font-medium text-slate-700 dark:text-slate-300 truncate">
                                                {skill.name}
                                            </span>
                                            <span className="text-sm font-semibold text-slate-900 dark:text-white ml-2">
                                                {skill.currentProgress}%
                                            </span>
                                        </div>
                                        <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full transition-all duration-700 ease-out ${isComplete
                                                        ? 'bg-gradient-to-r from-gold-500 to-gold-600'
                                                        : 'bg-gradient-to-r from-primary-500 to-accent-500'
                                                    }`}
                                                style={{ width: `${skill.currentProgress}%` }}
                                            />
                                        </div>
                                    </div>
                                    {isComplete && <span className="text-xl">🏆</span>}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Empty State */}
            {sessions.length === 0 && (
                <div className="card text-center py-12">
                    <div className="text-6xl mb-4">📊</div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                        No data yet
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto">
                        Start studying to see your statistics and progress visualizations here.
                    </p>
                </div>
            )}
        </div>
    );
};

export default Statistics;
