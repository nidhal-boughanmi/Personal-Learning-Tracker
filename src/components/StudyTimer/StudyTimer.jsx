import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { useTimer } from '../../hooks/useTimer';
import DailyTimeCounter from './DailyTimeCounter';
import LofiMusicPlayer from './LofiMusicPlayer';
import { formatTimerDisplay } from '../../utils/helpers';
import { FiPlay, FiPause, FiRotateCcw, FiSkipForward, FiCoffee } from 'react-icons/fi';
import { HiFire } from 'react-icons/hi';

const StudyTimer = () => {
    const { skills, addSession, settings } = useApp();
    const [selectedSkillId, setSelectedSkillId] = useState('');
    const [sessionStartTime, setSessionStartTime] = useState(null);

    const {
        mode,
        secondsLeft,
        isActive,
        completedSessions,
        start,
        pause,
        reset,
        skip,
        switchMode,
        TIMER_MODES,
    } = useTimer(settings);

    // Auto-select first skill if available
    useEffect(() => {
        if (skills.length > 0 && !selectedSkillId) {
            setSelectedSkillId(skills[0].id);
        }
    }, [skills, selectedSkillId]);

    // Track session start time
    useEffect(() => {
        if (isActive && !sessionStartTime && mode === TIMER_MODES.WORK) {
            setSessionStartTime(Date.now());
        } else if (!isActive && sessionStartTime && mode === TIMER_MODES.WORK) {
            // Save session when paused or completed
            const duration = Math.round((Date.now() - sessionStartTime) / 1000 / 60); // minutes
            if (duration > 0 && selectedSkillId) {
                addSession(selectedSkillId, duration);
            }
            setSessionStartTime(null);
        }
    }, [isActive, sessionStartTime, mode]);

    const handleStart = () => {
        if (mode === TIMER_MODES.WORK && !selectedSkillId && skills.length > 0) {
            alert('Please select a skill to track your study time');
            return;
        }
        start();
    };

    const getModeLabel = () => {
        if (mode === TIMER_MODES.WORK) return 'Work Session';
        if (mode === TIMER_MODES.SHORT_BREAK) return 'Short Break';
        return 'Long Break';
    };

    const getModeIcon = () => {
        if (mode === TIMER_MODES.WORK) return <HiFire className="animate-pulse-slow" />;
        return <FiCoffee />;
    };

    const getModeColor = () => {
        if (mode === TIMER_MODES.WORK) return 'from-primary-600 to-accent-600';
        return 'from-emerald-500 to-teal-500';
    };

    const progress = mode === TIMER_MODES.WORK
        ? ((settings.pomodoroWork * 60 - secondsLeft) / (settings.pomodoroWork * 60)) * 100
        : ((settings.pomodoroBreak * 60 - secondsLeft) / (settings.pomodoroBreak * 60)) * 100;

    return (
        <div className="space-y-6">
            <DailyTimeCounter />

            <div className="card max-w-2xl mx-auto">
                {/* Mode Selector */}
                <div className="flex gap-2 mb-6">
                    <button
                        onClick={() => switchMode(TIMER_MODES.WORK)}
                        className={`flex-1 px-4 py-2 rounded-xl font-medium transition-all ${mode === TIMER_MODES.WORK
                            ? 'bg-gradient-to-r from-primary-600 to-accent-600 text-white shadow-lg'
                            : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                            }`}
                    >
                        Work
                    </button>
                    <button
                        onClick={() => switchMode(TIMER_MODES.SHORT_BREAK)}
                        className={`flex-1 px-4 py-2 rounded-xl font-medium transition-all ${mode === TIMER_MODES.SHORT_BREAK
                            ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg'
                            : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                            }`}
                    >
                        Short Break
                    </button>
                    <button
                        onClick={() => switchMode(TIMER_MODES.LONG_BREAK)}
                        className={`flex-1 px-4 py-2 rounded-xl font-medium transition-all ${mode === TIMER_MODES.LONG_BREAK
                            ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg'
                            : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                            }`}
                    >
                        Long Break
                    </button>
                </div>

                {/* Timer Display */}
                <div className="text-center mb-8">
                    <div className={`inline-flex items-center gap-2 mb-4 text-2xl font-bold bg-gradient-to-r ${getModeColor()} bg-clip-text text-transparent`}>
                        {getModeIcon()}
                        {getModeLabel()}
                    </div>

                    <div className="relative inline-block">
                        {/* Circular progress */}
                        <svg className="w-64 h-64 transform -rotate-90">
                            <circle
                                cx="128"
                                cy="128"
                                r="120"
                                stroke="currentColor"
                                strokeWidth="8"
                                fill="none"
                                className="text-slate-200 dark:text-slate-700"
                            />
                            <circle
                                cx="128"
                                cy="128"
                                r="120"
                                stroke="url(#gradient)"
                                strokeWidth="8"
                                fill="none"
                                strokeDasharray={`${2 * Math.PI * 120}`}
                                strokeDashoffset={`${2 * Math.PI * 120 * (1 - progress / 100)}`}
                                className="transition-all duration-1000 ease-linear"
                                strokeLinecap="round"
                            />
                            <defs>
                                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" className="text-primary-500" stopColor="currentColor" />
                                    <stop offset="100%" className="text-accent-500" stopColor="currentColor" />
                                </linearGradient>
                            </defs>
                        </svg>

                        {/* Time display */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-6xl font-bold text-slate-900 dark:text-white font-mono">
                                {formatTimerDisplay(secondsLeft)}
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 text-sm text-slate-600 dark:text-slate-400">
                        Sessions completed: <span className="font-bold text-primary-600">{completedSessions}</span>
                    </div>
                </div>

                {/* Skill Selector (only for work mode) */}
                {mode === TIMER_MODES.WORK && (
                    <div className="mb-6">
                        <label htmlFor="skill-select" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            Studying:
                        </label>
                        <select
                            id="skill-select"
                            value={selectedSkillId}
                            onChange={(e) => setSelectedSkillId(e.target.value)}
                            className="input"
                            disabled={isActive || skills.length === 0}
                        >
                            {skills.length === 0 ? (
                                <option>No skills added yet</option>
                            ) : (
                                skills.map((skill) => (
                                    <option key={skill.id} value={skill.id}>
                                        {skill.name} ({skill.currentProgress}%)
                                    </option>
                                ))
                            )}
                        </select>
                    </div>
                )}

                {/* Controls */}
                <div className="flex gap-3 justify-center">
                    <button
                        onClick={reset}
                        className="p-4 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600 transition-all active:scale-95"
                        aria-label="Reset timer"
                    >
                        <FiRotateCcw size={24} />
                    </button>

                    <button
                        onClick={isActive ? pause : handleStart}
                        className="p-6 rounded-full bg-gradient-to-r from-primary-600 to-accent-600 text-white hover:from-primary-700 hover:to-accent-700 transition-all active:scale-95 shadow-xl shadow-primary-500/30"
                        aria-label={isActive ? 'Pause timer' : 'Start timer'}
                    >
                        {isActive ? <FiPause size={32} /> : <FiPlay size={32} className="ml-1" />}
                    </button>

                    <button
                        onClick={skip}
                        className="p-4 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600 transition-all active:scale-95"
                        aria-label="Skip to next phase"
                    >
                        <FiSkipForward size={24} />
                    </button>
                </div>
            </div>

            {/* Lofi Music Player */}
            <LofiMusicPlayer isStudyActive={isActive && mode === TIMER_MODES.WORK} />
        </div>
    );
};

export default StudyTimer;
