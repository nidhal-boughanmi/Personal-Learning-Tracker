import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FiTarget, FiEdit2 } from 'react-icons/fi';

const DailyGoals = () => {
    const { getTodayGoal, setTodayGoal, settings, updateSettings } = useApp();
    const [isEditing, setIsEditing] = useState(false);
    const [targetHours, setTargetHours] = useState(settings.dailyTarget || 2);

    const todayGoal = getTodayGoal();
    const currentTarget = todayGoal?.targetHours || settings.dailyTarget;

    const handleSave = () => {
        updateSettings({ dailyTarget: targetHours });
        setTodayGoal(targetHours);
        setIsEditing(false);
    };

    const quickSetGoal = (hours) => {
        setTargetHours(hours);
        updateSettings({ dailyTarget: hours });
        setTodayGoal(hours);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-2">
                <FiTarget className="text-primary-600 dark:text-primary-400" size={28} />
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                    Daily Goals
                </h2>
            </div>

            <div className="card max-w-2xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                        Daily Study Target
                    </h3>
                    <button
                        onClick={() => setIsEditing(!isEditing)}
                        className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 transition-colors"
                        aria-label="Edit goal"
                    >
                        <FiEdit2 size={18} />
                    </button>
                </div>

                {isEditing ? (
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="target-hours" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                Target Hours: {targetHours}h
                            </label>
                            <input
                                id="target-hours"
                                type="range"
                                min="0.5"
                                max="8"
                                step="0.5"
                                value={targetHours}
                                onChange={(e) => setTargetHours(Number(e.target.value))}
                                className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary-600"
                            />
                            <div className="flex justify-between text-xs text-slate-500 mt-1">
                                <span>0.5h</span>
                                <span>4h</span>
                                <span>8h</span>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setIsEditing(false)}
                                className="btn-secondary flex-1"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                className="btn-primary flex-1"
                            >
                                Save Goal
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="text-center mb-6">
                            <div className="text-6xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent mb-2">
                                {currentTarget}h
                            </div>
                            <p className="text-slate-600 dark:text-slate-400">
                                Daily study target
                            </p>
                        </div>

                        <div className="grid grid-cols-4 gap-2">
                            <button
                                onClick={() => quickSetGoal(1)}
                                className={`px-4 py-3 rounded-xl font-medium transition-all ${currentTarget === 1
                                        ? 'bg-gradient-to-r from-primary-600 to-accent-600 text-white shadow-lg'
                                        : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600'
                                    }`}
                            >
                                1h
                            </button>
                            <button
                                onClick={() => quickSetGoal(2)}
                                className={`px-4 py-3 rounded-xl font-medium transition-all ${currentTarget === 2
                                        ? 'bg-gradient-to-r from-primary-600 to-accent-600 text-white shadow-lg'
                                        : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600'
                                    }`}
                            >
                                2h
                            </button>
                            <button
                                onClick={() => quickSetGoal(3)}
                                className={`px-4 py-3 rounded-xl font-medium transition-all ${currentTarget === 3
                                        ? 'bg-gradient-to-r from-primary-600 to-accent-600 text-white shadow-lg'
                                        : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600'
                                    }`}
                            >
                                3h
                            </button>
                            <button
                                onClick={() => quickSetGoal(4)}
                                className={`px-4 py-3 rounded-xl font-medium transition-all ${currentTarget === 4
                                        ? 'bg-gradient-to-r from-primary-600 to-accent-600 text-white shadow-lg'
                                        : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600'
                                    }`}
                            >
                                4h
                            </button>
                        </div>
                    </>
                )}
            </div>

            <div className="card max-w-2xl mx-auto">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                    Tips for Success
                </h3>
                <div className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                    <div className="flex items-start gap-2">
                        <span className="text-lg">💡</span>
                        <p>Set realistic goals that match your schedule and energy levels</p>
                    </div>
                    <div className="flex items-start gap-2">
                        <span className="text-lg">⏰</span>
                        <p>Use the Pomodoro timer to break study sessions into focused intervals</p>
                    </div>
                    <div className="flex items-start gap-2">
                        <span className="text-lg">🎯</span>
                        <p>Consistency beats intensity - aim for daily practice rather than marathon sessions</p>
                    </div>
                    <div className="flex items-start gap-2">
                        <span className="text-lg">🔥</span>
                        <p>Build your streak by studying a little bit every day</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DailyGoals;
