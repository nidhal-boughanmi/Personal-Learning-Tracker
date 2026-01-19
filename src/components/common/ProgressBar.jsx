import React from 'react';

const ProgressBar = ({ progress, className = '', showLabel = true, animated = true }) => {
    const getColorClass = (progress) => {
        if (progress === 100) return 'from-gold-500 via-gold-600 to-gold-400';
        if (progress >= 75) return 'from-accent-500 via-accent-600 to-emerald-500';
        if (progress >= 50) return 'from-primary-500 via-primary-600 to-blue-500';
        if (progress >= 25) return 'from-blue-400 via-primary-500 to-primary-600';
        return 'from-slate-400 via-slate-500 to-slate-600';
    };

    return (
        <div className={`relative w-full ${className}`}>
            <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                    className={`h-full bg-gradient-to-r ${getColorClass(progress)} ${animated ? 'transition-all duration-700 ease-out' : ''
                        } relative overflow-hidden`}
                    style={{ width: `${progress}%` }}
                >
                    {animated && (
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                    )}
                </div>
            </div>
            {showLabel && (
                <div className="mt-1 text-right">
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                        {progress}%
                    </span>
                </div>
            )}
        </div>
    );
};

export default ProgressBar;
