// Data model definitions and factory functions

export const createSkill = (name, targetProgress = 100) => ({
    id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    name: name.trim(),
    targetProgress: Math.min(100, Math.max(0, targetProgress)),
    currentProgress: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
});

export const createStudySession = (skillId, duration, notes = '') => ({
    id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    skillId,
    duration, // in minutes
    date: new Date().toISOString(),
    notes: notes.trim(),
});

export const createGoal = (targetHours) => ({
    id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    date: new Date().toISOString().split('T')[0], // YYYY-MM-DD
    targetHours,
    completedHours: 0,
    completed: false,
});

export const createSettings = () => ({
    dailyTarget: 2, // hours
    notificationsEnabled: true,
    theme: 'light',
    pomodoroWork: 25, // minutes
    pomodoroBreak: 5,
    pomodoroLongBreak: 15,
});

// Validators
export const validateSkill = (skill) => {
    if (!skill.name || skill.name.trim().length === 0) {
        return { valid: false, error: 'Skill name is required' };
    }
    if (skill.name.length > 50) {
        return { valid: false, error: 'Skill name must be less than 50 characters' };
    }
    if (skill.currentProgress < 0 || skill.currentProgress > 100) {
        return { valid: false, error: 'Progress must be between 0 and 100' };
    }
    return { valid: true };
};

export const validateStudySession = (session) => {
    if (!session.skillId) {
        return { valid: false, error: 'Skill ID is required' };
    }
    if (session.duration <= 0) {
        return { valid: false, error: 'Duration must be greater than 0' };
    }
    return { valid: true };
};

export const validateGoal = (goal) => {
    if (goal.targetHours <= 0) {
        return { valid: false, error: 'Target hours must be greater than 0' };
    }
    return { valid: true };
};
