import { createContext, useContext, useState, useEffect } from 'react';
import * as storage from '../utils/localStorage';
import { createSkill, createStudySession, createGoal, createResource, calculateResourceProgress, createNote, createFlashcard, calculateNextReview, getDueFlashcards, createMCQ, getRandomMCQs } from '../utils/models';

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
    const [resources, setResources] = useState([]);
    const [notes, setNotes] = useState([]);
    const [flashcards, setFlashcards] = useState([]);
    const [mcqs, setMcqs] = useState([]);
    const [loading, setLoading] = useState(true);

    // Load data from localStorage on mount
    useEffect(() => {
        const loadData = () => {
            setSkills(storage.getSkills());
            setSessions(storage.getStudySessions());
            setGoals(storage.getGoals());
            setSettings(storage.getSettings());
            setResources(storage.getResources());
            setNotes(storage.getNotes());
            setFlashcards(storage.getFlashcards());
            setMcqs(storage.getMCQs());
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
        setResources([]);
    };

    // Resource operations
    const addResource = (skillId, type, title, total = 0, enrichedData = {}) => {
        const newResource = createResource(skillId, type, title, total, enrichedData);
        const updatedResources = [...resources, newResource];
        setResources(updatedResources);
        storage.saveResources(updatedResources);
        return newResource;
    };

    const updateResource = (id, updates) => {
        const updatedResources = resources.map(resource =>
            resource.id === id
                ? { ...resource, ...updates, updatedAt: new Date().toISOString() }
                : resource
        );
        setResources(updatedResources);
        storage.saveResources(updatedResources);
    };

    const deleteResource = (id) => {
        const updatedResources = resources.filter(resource => resource.id !== id);
        setResources(updatedResources);
        storage.saveResources(updatedResources);
    };

    const updateResourceProgress = (id, current) => {
        const resource = resources.find(r => r.id === id);
        if (resource) {
            const percentage = calculateResourceProgress(current, resource.progress.total);
            const isComplete = current >= resource.progress.total && resource.progress.total > 0;

            updateResource(id, {
                progress: { ...resource.progress, current, percentage },
                status: isComplete ? 'completed' : current > 0 ? 'in_progress' : 'not_started',
                completedAt: isComplete ? new Date().toISOString() : null,
                startedAt: resource.startedAt || (current > 0 ? new Date().toISOString() : null),
            });
        }
    };

    const incrementResourceProgress = (id) => {
        const resource = resources.find(r => r.id === id);
        if (resource) {
            updateResourceProgress(id, Math.min(resource.progress.current + 1, resource.progress.total));
        }
    };

    const getResourcesBySkill = (skillId) => {
        return resources.filter(r => r.skillId === skillId);
    };

    // Note operations
    const addNote = (skillId, title, content = '') => {
        const newNote = createNote(skillId, title, content);
        const updatedNotes = [...notes, newNote];
        setNotes(updatedNotes);
        storage.saveNotes(updatedNotes);
        return newNote;
    };

    const updateNote = (id, updates) => {
        const updatedNotes = notes.map(note =>
            note.id === id
                ? { ...note, ...updates, updatedAt: new Date().toISOString() }
                : note
        );
        setNotes(updatedNotes);
        storage.saveNotes(updatedNotes);
    };

    const deleteNote = (id) => {
        const updatedNotes = notes.filter(note => note.id !== id);
        setNotes(updatedNotes);
        storage.saveNotes(updatedNotes);
    };

    const getNotesBySkill = (skillId) => {
        return notes.filter(n => n.skillId === skillId);
    };

    // Flashcard operations
    const addFlashcard = (skillId, front, back) => {
        const newCard = createFlashcard(skillId, front, back);
        const updatedCards = [...flashcards, newCard];
        setFlashcards(updatedCards);
        storage.saveFlashcards(updatedCards);
        return newCard;
    };

    const updateFlashcard = (id, updates) => {
        const updatedCards = flashcards.map(card =>
            card.id === id
                ? { ...card, ...updates, updatedAt: new Date().toISOString() }
                : card
        );
        setFlashcards(updatedCards);
        storage.saveFlashcards(updatedCards);
    };

    const deleteFlashcard = (id) => {
        const updatedCards = flashcards.filter(card => card.id !== id);
        setFlashcards(updatedCards);
        storage.saveFlashcards(updatedCards);
    };

    const reviewFlashcard = (id, quality) => {
        const card = flashcards.find(c => c.id === id);
        if (card) {
            const reviewData = calculateNextReview(card, quality);
            updateFlashcard(id, reviewData);
        }
    };

    const getDueCards = () => {
        return getDueFlashcards(flashcards);
    };

    const getFlashcardsBySkill = (skillId) => {
        return flashcards.filter(c => c.skillId === skillId);
    };

    // MCQ operations
    const addMCQ = (skillId, question, choices) => {
        const newMCQ = createMCQ(skillId, question, choices);
        const updatedMCQs = [...mcqs, newMCQ];
        setMcqs(updatedMCQs);
        storage.saveMCQs(updatedMCQs);  // Save the entire updated array
        return newMCQ;
    };

    const updateMCQ = (id, updates) => {
        const updatedMCQs = mcqs.map(mcq =>
            mcq.id === id
                ? { ...mcq, ...updates, updatedAt: new Date().toISOString() }
                : mcq
        );
        setMcqs(updatedMCQs);
        storage.saveMCQs(updatedMCQs);
    };

    const deleteMCQ = (id) => {
        const updatedMCQs = mcqs.filter(mcq => mcq.id !== id);
        setMcqs(updatedMCQs);
        storage.saveMCQs(updatedMCQs);
    };

    const getMCQsBySkill = (skillId) => {
        return mcqs.filter(m => m.skillId === skillId);
    };

    const getRandomQuizQuestions = (skillId, count = 10) => {
        const skillMCQs = getMCQsBySkill(skillId);
        return getRandomMCQs(skillMCQs, count);
    };

    const value = {
        skills,
        sessions,
        goals,
        settings,
        resources,
        notes,
        flashcards,
        mcqs,
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
        addResource,
        updateResource,
        deleteResource,
        updateResourceProgress,
        incrementResourceProgress,
        getResourcesBySkill,
        addNote,
        updateNote,
        deleteNote,
        getNotesBySkill,
        addFlashcard,
        updateFlashcard,
        deleteFlashcard,
        reviewFlashcard,
        getDueCards,
        getFlashcardsBySkill,
        addMCQ,
        updateMCQ,
        deleteMCQ,
        getMCQsBySkill,
        getRandomQuizQuestions,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
