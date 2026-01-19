import { useState, useEffect, useRef } from 'react';
import { showNotification, requestNotificationPermission } from '../utils/helpers';

const TIMER_MODES = {
    WORK: 'work',
    SHORT_BREAK: 'short_break',
    LONG_BREAK: 'long_break',
};

export const useTimer = (settings) => {
    const [mode, setMode] = useState(TIMER_MODES.WORK);
    const [secondsLeft, setSecondsLeft] = useState(settings.pomodoroWork * 60);
    const [isActive, setIsActive] = useState(false);
    const [completedSessions, setCompletedSessions] = useState(0);
    const intervalRef = useRef(null);
    const hasRequestedPermission = useRef(false);

    // Request notification permission on first mount
    useEffect(() => {
        if (settings.notificationsEnabled && !hasRequestedPermission.current) {
            requestNotificationPermission();
            hasRequestedPermission.current = true;
        }
    }, [settings.notificationsEnabled]);

    // Update timer when mode changes
    useEffect(() => {
        if (mode === TIMER_MODES.WORK) {
            setSecondsLeft(settings.pomodoroWork * 60);
        } else if (mode === TIMER_MODES.SHORT_BREAK) {
            setSecondsLeft(settings.pomodoroBreak * 60);
        } else {
            setSecondsLeft(settings.pomodoroLongBreak * 60);
        }
    }, [mode, settings]);

    // Timer countdown logic
    useEffect(() => {
        if (isActive && secondsLeft > 0) {
            intervalRef.current = setInterval(() => {
                setSecondsLeft((prev) => prev - 1);
            }, 1000);
        } else if (secondsLeft === 0 && isActive) {
            handleTimerComplete();
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isActive, secondsLeft]);

    const handleTimerComplete = () => {
        setIsActive(false);

        // Show notification
        if (settings.notificationsEnabled) {
            if (mode === TIMER_MODES.WORK) {
                showNotification('Time for a break!', {
                    body: 'Great work! Take a short break.',
                });
                setCompletedSessions((prev) => prev + 1);
            } else {
                showNotification('Break is over!', {
                    body: 'Ready to get back to work?',
                });
            }
        }

        // Play audio alert (optional)
        try {
            const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjaN0/LPgjAFJIHH8N2SQwsVYbbr7KRSFAtDneHwr2MhBjGN0fHQhDAFJIDG8N2RQgsVYbfr7KVSEwtCneHwr2MhBjGN0fLPgzAFJIDG8N2RQgsVYbfr7KVSEwtCneHwr2MhBjGN0fLPgzAFJIDG8N2RQgsVYbfr7KVSEwtCneHwr2MhBjGN0fLPgzAFJIDG8N2RQgsVYbfr7KVSEwtCneHwr2MhBjGN0fLPgzAFJIDG8N2RQgsVYbfr7KVSEwtCneHwr2MhBjGN0fLPgzAFJIDG8N2RQgsVYbfr7KVSEwtCneHwr2MhBjGN0fLPgzAFJIDG8N2RQgsVYbfr7KVSEwtCneHwr2MhBjGN0fLPgzAFJIDG8N2RQgsVYbfr7KVSEwtCneHwr2MhBjGN0fLPgzAFJIDG8N2RQgsVYbfr7KVSEwtCneHwr2MhBjGN0fLPgzAFJIDG8N2RQgsVYbfr7KVSEwtCneHwr2MhBjGN0fLPgzAFJIDG8N2RQgsVYbfr7KVSEwtCneHwr2MhBjGN0fLPgzAFJIDG8N2RQgsVYbfr7KVSEwtCneHwr2MhBjGN0fLPgzAFJIDG8N2RQgsVYbfr7KVSEwtCneHwr2MhBjGN0fLPgzAFJIDG8N2RQgsVYbfr7KVSEwtCneHwr2MhBjGN0fLPgzAFJIDG8N2RQgsVYbfr');
            audio.play();
        } catch (e) {
            // Silently fail if audio doesn't work
        }
    };

    const start = () => setIsActive(true);

    const pause = () => setIsActive(false);

    const reset = () => {
        setIsActive(false);
        if (mode === TIMER_MODES.WORK) {
            setSecondsLeft(settings.pomodoroWork * 60);
        } else if (mode === TIMER_MODES.SHORT_BREAK) {
            setSecondsLeft(settings.pomodoroBreak * 60);
        } else {
            setSecondsLeft(settings.pomodoroLongBreak * 60);
        }
    };

    const skip = () => {
        setIsActive(false);

        if (mode === TIMER_MODES.WORK) {
            // After work, go to short break or long break
            if (completedSessions > 0 && completedSessions % 4 === 0) {
                setMode(TIMER_MODES.LONG_BREAK);
            } else {
                setMode(TIMER_MODES.SHORT_BREAK);
            }
        } else {
            // After break, go back to work
            setMode(TIMER_MODES.WORK);
        }
    };

    const switchMode = (newMode) => {
        setIsActive(false);
        setMode(newMode);
    };

    return {
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
    };
};
