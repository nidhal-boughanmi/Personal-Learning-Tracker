import React from 'react';
import { useApp } from '../../context/AppContext';
import { formatDuration, getTotalStudyTime } from '../../utils/helpers';
import { FiClock, FiTarget } from 'react-icons/fi';

const DailyTimeCounter = () => {
    const { sessions, getTodayGoal } = useApp();

    const today = new Date().toISOString().split('T')[0];
    const todayMinutes = getTotalStudyTime(sessions, today);
    const goal = getTodayGoal();
    const goalMinutes = goal ? goal.targetHours * 60 : 120; // Default 2 hours
    const progress = Math.min(100, Math.round((todayMinutes / goalMinutes) * 100));

    return (
        <div className="glass rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <FiClock className="text-primary-600 dark:text-primary-400" size={24} />
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                        Today's Progress
                    </h3>
                </div>
                <div className="text-right">
                    <div className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                        {formatDuration(todayMinutes)}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                        studied today
                    </div>
                </div>
            </div>

            {/* Progress bar */}
            <div className="relative">
                <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-primary-500 via-primary-600 to-accent-500 transition-all duration-700 ease-out"
                        style={{ width: `${progress}%` }}
                    />
                </div>
                <div className="flex justify-between items-center mt-2 text-xs text-slate-600 dark:text-slate-400">
                    <div className="flex items-center gap-1">
                        <FiTarget size={12} />
                        <span>Goal: {formatDuration(goalMinutes)}</span>
                    </div>
                    <span className="font-semibold">{progress}%</span>
                </div>
            </div>

            {progress >= 100 && (
                <div className="mt-3 p-2 bg-gradient-to-r from-accent-500/20 to-emerald-500/20 border border-accent-500/50 rounded-lg text-center">
                    <p className="text-sm font-bold text-accent-700 dark:text-accent-400">
                        🎯 Daily goal achieved!
                    </p>
                </div>
            )}
        </div>
    );
};

export default DailyTimeCounter;
