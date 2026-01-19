import React from 'react';
import { useApp } from '../../context/AppContext';
import { calculateStreak } from '../../utils/helpers';
import { HiFire } from 'react-icons/hi';

const StreakCounter = () => {
    const { sessions } = useApp();
    const currentStreak = calculateStreak(sessions);

    return (
        <div className="stat-card relative overflow-hidden">
            <div className="relative z-10">
                <div className="flex items-center justify-center gap-2 mb-2">
                    <HiFire className={`text-4xl ${currentStreak > 0 ? 'text-orange-500 animate-pulse-slow' : 'text-slate-400'}`} />
                </div>
                <div className="stat-value">{currentStreak}</div>
                <div className="stat-label">Day Streak</div>
                {currentStreak >= 3 && (
                    <div className="mt-2 text-xs text-orange-600 dark:text-orange-400 font-medium">
                        🔥 On Fire!
                    </div>
                )}
                {currentStreak >= 7 && (
                    <div className="mt-2 text-xs text-orange-600 dark:text-orange-400 font-medium">
                        ⚡ Unstoppable!
                    </div>
                )}
            </div>
            {currentStreak > 0 && (
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-500/10 animate-pulse-slow" />
            )}
        </div>
    );
};

export default StreakCounter;
