// LocalStorage utility functions with error handling

const STORAGE_KEYS = {
    SKILLS: 'devskilltracker_skills',
    SESSIONS: 'devskilltracker_sessions',
    GOALS: 'devskilltracker_goals',
    SETTINGS: 'devskilltracker_settings',
    RESOURCES: 'devskilltracker_resources',
    NOTES: 'devskilltracker_notes',
    FLASHCARDS: 'devskilltracker_flashcards',
    MCQS: 'devskilltracker_mcqs',
    CV_DATA: 'devskilltracker_cv_data',
    RECOMMENDATIONS: 'devskilltracker_recommendations',
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

// Resources
export const getResources = () => getItem(STORAGE_KEYS.RESOURCES, []);

export const saveResources = (resources) => setItem(STORAGE_KEYS.RESOURCES, resources);

export const addResource = (resource) => {
    const resources = getResources();
    resources.push(resource);
    return saveResources(resources);
};

export const updateResource = (id, updates) => {
    const resources = getResources();
    const index = resources.findIndex(r => r.id === id);
    if (index !== -1) {
        resources[index] = { ...resources[index], ...updates, updatedAt: new Date().toISOString() };
        return saveResources(resources);
    }
    return false;
};

export const deleteResource = (id) => {
    const resources = getResources();
    const filtered = resources.filter(r => r.id !== id);
    return saveResources(filtered);
};

export const getResourcesBySkillId = (skillId) => {
    const resources = getResources();
    return resources.filter(r => r.skillId === skillId);
};

// Notes
export const getNotes = () => getItem(STORAGE_KEYS.NOTES, []);

export const saveNotes = (notes) => setItem(STORAGE_KEYS.NOTES, notes);

export const addNote = (note) => {
    const notes = getNotes();
    notes.push(note);
    return saveNotes(notes);
};

export const updateNote = (id, updates) => {
    const notes = getNotes();
    const index = notes.findIndex(n => n.id === id);
    if (index !== -1) {
        notes[index] = { ...notes[index], ...updates, updatedAt: new Date().toISOString() };
        return saveNotes(notes);
    }
    return false;
};

export const deleteNote = (id) => {
    const notes = getNotes();
    const filtered = notes.filter(n => n.id !== id);
    return saveNotes(filtered);
};

export const getNotesBySkillId = (skillId) => {
    const notes = getNotes();
    return notes.filter(n => n.skillId === skillId);
};

// Flashcards
export const getFlashcards = () => getItem(STORAGE_KEYS.FLASHCARDS, []);

export const saveFlashcards = (flashcards) => setItem(STORAGE_KEYS.FLASHCARDS, flashcards);

export const addFlashcard = (flashcard) => {
    const flashcards = getFlashcards();
    flashcards.push(flashcard);
    return saveFlashcards(flashcards);
};

export const updateFlashcard = (id, updates) => {
    const flashcards = getFlashcards();
    const index = flashcards.findIndex(f => f.id === id);
    if (index !== -1) {
        flashcards[index] = { ...flashcards[index], ...updates, updatedAt: new Date().toISOString() };
        return saveFlashcards(flashcards);
    }
    return false;
};

export const deleteFlashcard = (id) => {
    const flashcards = getFlashcards();
    const filtered = flashcards.filter(f => f.id !== id);
    return saveFlashcards(filtered);
};

export const getFlashcardsBySkillId = (skillId) => {
    const flashcards = getFlashcards();
    return flashcards.filter(f => f.skillId === skillId);
};

// MCQs (Multiple Choice Questions)
export const getMCQs = () => getItem(STORAGE_KEYS.MCQS, []);

export const saveMCQs = (mcqs) => setItem(STORAGE_KEYS.MCQS, mcqs);

export const addMCQ = (mcq) => {
    const mcqs = getMCQs();
    mcqs.push(mcq);
    return saveMCQs(mcqs);
};

export const updateMCQ = (id, updates) => {
    const mcqs = getMCQs();
    const index = mcqs.findIndex(m => m.id === id);
    if (index !== -1) {
        mcqs[index] = { ...mcqs[index], ...updates, updatedAt: new Date().toISOString() };
        return saveMCQs(mcqs);
    }
    return false;
};

export const deleteMCQ = (id) => {
    const mcqs = getMCQs();
    const filtered = mcqs.filter(m => m.id !== id);
    return saveMCQs(filtered);
};

export const getMCQsBySkillId = (skillId) => {
    const mcqs = getMCQs();
    return mcqs.filter(m => m.skillId === skillId);
};

// CV Data
export const getCVData = () => getItem(STORAGE_KEYS.CV_DATA, null);

export const saveCVData = (cvData) => setItem(STORAGE_KEYS.CV_DATA, cvData);

export const clearCVData = () => {
    localStorage.removeItem(STORAGE_KEYS.CV_DATA);
    localStorage.removeItem(STORAGE_KEYS.RECOMMENDATIONS);
};

// Recommendations
export const getRecommendations = () => getItem(STORAGE_KEYS.RECOMMENDATIONS, []);

export const saveRecommendations = (recommendations) => setItem(STORAGE_KEYS.RECOMMENDATIONS, recommendations);



