import { createContext, useContext, useState, useEffect } from 'react';
import * as storage from '../utils/localStorage';
import { createSkill, createStudySession, createGoal } from '../utils/models';

const AppContext = createContext();

export const useApp = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useApp must be used within AppProvider');
    }
    return context;
};

export const AppProvider = ({ children }) => {
    const [skills, setSkills] = useState([]);
    const [sessions, setSessions] = useState([]);
    const [goals, setGoals] = useState([]);
    const [settings, setSettings] = useState({});
    const [loading, setLoading] = useState(true);

    // Load data from localStorage on mount
    useEffect(() => {
        const loadData = () => {
            setSkills(storage.getSkills());
            setSessions(storage.getStudySessions());
            setGoals(storage.getGoals());
            setSettings(storage.getSettings());
            setLoading(false);
        };
        loadData();
    }, []);

    // Skills operations
    const addSkill = (name, targetProgress = 100) => {
        const newSkill = createSkill(name, targetProgress);
        const updatedSkills = [...skills, newSkill];
        setSkills(updatedSkills);
        storage.saveSkills(updatedSkills);
        return newSkill;
    };

    const updateSkill = (id, updates) => {
        const updatedSkills = skills.map(skill =>
            skill.id === id
                ? { ...skill, ...updates, updatedAt: new Date().toISOString() }
                : skill
        );
        setSkills(updatedSkills);
        storage.saveSkills(updatedSkills);
    };

    const deleteSkill = (id) => {
        const updatedSkills = skills.filter(skill => skill.id !== id);
        setSkills(updatedSkills);
        storage.saveSkills(updatedSkills);
    };

    const increaseSkillProgress = (id, amount) => {
        const skill = skills.find(s => s.id === id);
        if (skill) {
            const newProgress = Math.min(100, skill.currentProgress + amount);
            updateSkill(id, { currentProgress: newProgress });
        }
    };

    // Study session operations
    const addSession = (skillId, duration, notes = '') => {
        const newSession = createStudySession(skillId, duration, notes);
        const updatedSessions = [...sessions, newSession];
        setSessions(updatedSessions);
        storage.saveStudySessions(updatedSessions);
        return newSession;
    };

    // Goal operations
    const getTodayGoal = () => {
        const today = new Date().toISOString().split('T')[0];
        return goals.find(g => g.date === today);
    };

    const setTodayGoal = (targetHours) => {
        const today = new Date().toISOString().split('T')[0];
        const existingGoalIndex = goals.findIndex(g => g.date === today);

        let updatedGoals;
        if (existingGoalIndex !== -1) {
            updatedGoals = [...goals];
            updatedGoals[existingGoalIndex] = { ...updatedGoals[existingGoalIndex], targetHours };
        } else {
            const newGoal = createGoal(targetHours);
            updatedGoals = [...goals, newGoal];
        }

        setGoals(updatedGoals);
        storage.saveGoals(updatedGoals);
    };

    const updateTodayGoalProgress = (completedHours) => {
        const today = new Date().toISOString().split('T')[0];
        const existingGoalIndex = goals.findIndex(g => g.date === today);

        if (existingGoalIndex !== -1) {
            const updatedGoals = [...goals];
            const goal = updatedGoals[existingGoalIndex];
            updatedGoals[existingGoalIndex] = {
                ...goal,
                completedHours,
                completed: completedHours >= goal.targetHours,
            };
            setGoals(updatedGoals);
            storage.saveGoals(updatedGoals);
        }
    };

    // Settings operations
    const updateSettings = (newSettings) => {
        const updatedSettings = { ...settings, ...newSettings };
        setSettings(updatedSettings);
        storage.saveSettings(updatedSettings);
    };

    // Export/Import operations
    const exportData = () => {
        return storage.exportAllData();
    };

    const importData = (data) => {
        const result = storage.importAllData(data);
        if (result.success) {
            // Reload data
            setSkills(storage.getSkills());
            setSessions(storage.getStudySessions());
            setGoals(storage.getGoals());
            setSettings(storage.getSettings());
        }
        return result;
    };

    const clearAllData = () => {
        storage.clearAllData();
        setSkills([]);
        setSessions([]);
        setGoals([]);
        setSettings(storage.getSettings());
    };

    const value = {
        skills,
        sessions,
        goals,
        settings,
        loading,
        addSkill,
        updateSkill,
        deleteSkill,
        increaseSkillProgress,
        addSession,
        getTodayGoal,
        setTodayGoal,
        updateTodayGoalProgress,
        updateSettings,
        exportData,
        importData,
        clearAllData,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
