import { format, startOfWeek, endOfWeek, eachDayOfInterval, differenceInDays, parseISO } from 'date-fns';

// Format time duration from minutes to readable string
export const formatDuration = (minutes) => {
    if (minutes < 60) {
        return `${minutes}m`;
    }
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
};

// Format time for timer display (MM:SS)
export const formatTimerDisplay = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

// Get week days for weekly stats
export const getWeekDays = (date = new Date()) => {
    const start = startOfWeek(date, { weekStartsOn: 1 }); // Monday
    const end = endOfWeek(date, { weekStartsOn: 1 });
    return eachDayOfInterval({ start, end });
};

// Calculate study streak
export const calculateStreak = (sessions) => {
    if (sessions.length === 0) return 0;

    // Get unique dates with sessions
    const uniqueDates = [...new Set(sessions.map(s => s.date.split('T')[0]))].sort().reverse();

    if (uniqueDates.length === 0) return 0;

    const today = new Date().toISOString().split('T')[0];
    let streak = 0;

    // Check if studied today or yesterday
    const lastStudyDate = uniqueDates[0];
    const daysSinceLastStudy = differenceInDays(parseISO(today), parseISO(lastStudyDate));

    if (daysSinceLastStudy > 1) return 0; // Streak broken

    // Count consecutive days
    for (let i = 0; i < uniqueDates.length - 1; i++) {
        const current = parseISO(uniqueDates[i]);
        const next = parseISO(uniqueDates[i + 1]);
        const diff = differenceInDays(current, next);

        if (diff === 1) {
            streak++;
        } else {
            break;
        }
    }

    return streak + 1; // +1 for the last study day
};

// Get total study time for a date
export const getTotalStudyTime = (sessions, date) => {
    const dateStr = typeof date === 'string' ? date : date.toISOString().split('T')[0];
    return sessions
        .filter(s => s.date.startsWith(dateStr))
        .reduce((total, s) => total + s.duration, 0);
};

// Get weekly study hours (array of 7 days)
export const getWeeklyStudyHours = (sessions) => {
    const weekDays = getWeekDays();
    return weekDays.map(day => {
        const dateStr = format(day, 'yyyy-MM-dd');
        const totalMinutes = getTotalStudyTime(sessions, dateStr);
        return {
            date: dateStr,
            day: format(day, 'EEE'),
            hours: totalMinutes / 60,
        };
    });
};

// Get skill-specific study time
export const getSkillStudyTime = (sessions, skillId) => {
    return sessions
        .filter(s => s.skillId === skillId)
        .reduce((total, s) => total + s.duration, 0);
};

// Download JSON file
export const downloadJSON = (data, filename = 'devskilltracker-export.json') => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
};

// Request notification permission
export const requestNotificationPermission = async () => {
    if ('Notification' in window && Notification.permission === 'default') {
        const permission = await Notification.requestPermission();
        return permission === 'granted';
    }
    return Notification.permission === 'granted';
};

// Show browser notification
export const showNotification = (title, options = {}) => {
    if ('Notification' in window && Notification.permission === 'granted') {
        new Notification(title, {
            icon: '/vite.svg',
            badge: '/vite.svg',
            ...options,
        });
    }
};

// Validate if string is a valid URL
export const isValidURL = (string) => {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
};

// Extract domain from URL
export const getDomainFromURL = (url) => {
    try {
        const urlObj = new URL(url);
        return urlObj.hostname.replace('www.', '');
    } catch (_) {
        return '';
    }
};

// Get file extension from URL or filename
export const getFileExtension = (url) => {
    try {
        const pathname = new URL(url).pathname;
        const extension = pathname.split('.').pop();
        return extension.toLowerCase();
    } catch (_) {
        // If not a valid URL, try as filename
        const parts = url.split('.');
        return parts.length > 1 ? parts.pop().toLowerCase() : '';
    }
};

// Check if URL points to a PDF
export const isPDFUrl = (url) => {
    return getFileExtension(url) === 'pdf';
};

// Format file size in bytes to human readable
export const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};

