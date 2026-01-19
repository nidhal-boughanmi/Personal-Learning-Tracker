// LocalStorage utility functions with error handling

const STORAGE_KEYS = {
    SKILLS: 'devskilltracker_skills',
    SESSIONS: 'devskilltracker_sessions',
    GOALS: 'devskilltracker_goals',
    SETTINGS: 'devskilltracker_settings',
};

// Generic storage functions
const getItem = (key, defaultValue = null) => {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
        console.error(`Error reading ${key} from localStorage:`, error);
        return defaultValue;
    }
};

const setItem = (key, value) => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (error) {
        if (error.name === 'QuotaExceededError') {
            console.error('LocalStorage quota exceeded');
            alert('Storage quota exceeded. Please export your data and clear old entries.');
        } else {
            console.error(`Error writing ${key} to localStorage:`, error);
        }
        return false;
    }
};

// Skills
export const getSkills = () => getItem(STORAGE_KEYS.SKILLS, []);

export const saveSkills = (skills) => setItem(STORAGE_KEYS.SKILLS, skills);

export const addSkill = (skill) => {
    const skills = getSkills();
    skills.push(skill);
    return saveSkills(skills);
};

export const updateSkill = (id, updates) => {
    const skills = getSkills();
    const index = skills.findIndex(s => s.id === id);
    if (index !== -1) {
        skills[index] = { ...skills[index], ...updates, updatedAt: new Date().toISOString() };
        return saveSkills(skills);
    }
    return false;
};

export const deleteSkill = (id) => {
    const skills = getSkills();
    const filtered = skills.filter(s => s.id !== id);
    return saveSkills(filtered);
};

// Study Sessions
export const getStudySessions = () => getItem(STORAGE_KEYS.SESSIONS, []);

export const saveStudySessions = (sessions) => setItem(STORAGE_KEYS.SESSIONS, sessions);

export const addStudySession = (session) => {
    const sessions = getStudySessions();
    sessions.push(session);
    return saveStudySessions(sessions);
};

export const getSessionsByDate = (date) => {
    const sessions = getStudySessions();
    return sessions.filter(s => s.date.startsWith(date));
};

export const getSessionsBySkillId = (skillId) => {
    const sessions = getStudySessions();
    return sessions.filter(s => s.skillId === skillId);
};

// Goals
export const getGoals = () => getItem(STORAGE_KEYS.GOALS, []);

export const saveGoals = (goals) => setItem(STORAGE_KEYS.GOALS, goals);

export const getTodayGoal = () => {
    const goals = getGoals();
    const today = new Date().toISOString().split('T')[0];
    return goals.find(g => g.date === today);
};

export const updateGoal = (date, updates) => {
    const goals = getGoals();
    const index = goals.findIndex(g => g.date === date);
    if (index !== -1) {
        goals[index] = { ...goals[index], ...updates };
    } else {
        goals.push({ date, ...updates });
    }
    return saveGoals(goals);
};

// Settings
export const getSettings = () => getItem(STORAGE_KEYS.SETTINGS, {
    dailyTarget: 2,
    notificationsEnabled: true,
    theme: 'light',
    pomodoroWork: 25,
    pomodoroBreak: 5,
    pomodoroLongBreak: 15,
});

export const saveSettings = (settings) => setItem(STORAGE_KEYS.SETTINGS, settings);

// Export/Import
export const exportAllData = () => {
    return {
        skills: getSkills(),
        sessions: getStudySessions(),
        goals: getGoals(),
        settings: getSettings(),
        exportDate: new Date().toISOString(),
        version: '1.0',
    };
};

export const importAllData = (data) => {
    try {
        // Validate data structure
        if (!data || typeof data !== 'object') {
            throw new Error('Invalid data format');
        }

        if (data.skills) saveSkills(data.skills);
        if (data.sessions) saveStudySessions(data.sessions);
        if (data.goals) saveGoals(data.goals);
        if (data.settings) saveSettings(data.settings);

        return { success: true };
    } catch (error) {
        console.error('Error importing data:', error);
        return { success: false, error: error.message };
    }
};

export const clearAllData = () => {
    Object.values(STORAGE_KEYS).forEach(key => {
        localStorage.removeItem(key);
    });
};
