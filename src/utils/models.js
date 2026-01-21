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

// Resource model and factory
export const RESOURCE_TYPES = {
    VIDEO_COURSE: 'video_course',
    YOUTUBE: 'youtube',
    BOOK: 'book',
    ARTICLE: 'article',
    DOCS: 'documentation',
    PROJECT: 'project',
};

export const RESOURCE_STATUS = {
    NOT_STARTED: 'not_started',
    IN_PROGRESS: 'in_progress',
    COMPLETED: 'completed',
    PAUSED: 'paused',
};

export const createResource = (skillId, type, title, total = 0) => ({
    id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    skillId,
    type,
    title: title.trim(),
    url: '',
    platform: '',
    progress: {
        current: 0,
        total,
        percentage: 0,
    },
    status: RESOURCE_STATUS.NOT_STARTED,
    rating: 0,
    notes: '',
    tags: [],
    startedAt: null,
    completedAt: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
});

export const validateResource = (resource) => {
    if (!resource.title || resource.title.trim().length === 0) {
        return { valid: false, error: 'Resource title is required' };
    }
    if (!resource.skillId) {
        return { valid: false, error: 'Resource must be linked to a skill' };
    }
    if (!Object.values(RESOURCE_TYPES).includes(resource.type)) {
        return { valid: false, error: 'Invalid resource type' };
    }
    if (resource.progress.total < 0) {
        return { valid: false, error: 'Total progress must be 0 or greater' };
    }
    return { valid: true };
};

export const calculateResourceProgress = (current, total) => {
    if (total === 0) return 0;
    return Math.min(100, Math.round((current / total) * 100));
};

// Note model
export const createNote = (skillId, title, content = '') => ({
    id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    skillId,
    title: title.trim(),
    content,
    tags: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
});

export const validateNote = (note) => {
    if (!note.title || note.title.trim().length === 0) {
        return { valid: false, error: 'Note title is required' };
    }
    if (!note.skillId) {
        return { valid: false, error: 'Note must be linked to a skill' };
    }
    return { valid: true };
};

// Flashcard model with Spaced Repetition (SM-2 Algorithm)
export const createFlashcard = (skillId, front, back) => ({
    id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    skillId,
    front: front.trim(),
    back: back.trim(),

    // SM-2 Algorithm parameters
    easeFactor: 2.5,
    interval: 0,
    repetitions: 0,
    nextReview: new Date().toISOString(), // Due now for new cards
    lastReviewed: null,

    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
});

export const validateFlashcard = (flashcard) => {
    if (!flashcard.front || flashcard.front.trim().length === 0) {
        return { valid: false, error: 'Question (front) is required' };
    }
    if (!flashcard.back || flashcard.back.trim().length === 0) {
        return { valid: false, error: 'Answer (back) is required' };
    }
    if (!flashcard.skillId) {
        return { valid: false, error: 'Flashcard must be linked to a skill' };
    }
    return { valid: true };
};

// SM-2 Spaced Repetition Algorithm
// quality: 0-5 (0=wrong, 5=perfect)
// We'll map: Again=1, Hard=2, Good=3, Easy=4
export const calculateNextReview = (flashcard, quality) => {
    let { easeFactor, interval, repetitions } = flashcard;

    if (quality >= 3) {
        // Correct answer
        if (repetitions === 0) {
            interval = 1; // 1 day
        } else if (repetitions === 1) {
            interval = 6; // 6 days
        } else {
            interval = Math.round(interval * easeFactor);
        }
        repetitions += 1;
    } else {
        // Incorrect answer - reset
        repetitions = 0;
        interval = 1;
    }

    // Update ease factor (min: 1.3)
    easeFactor = Math.max(1.3, easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)));

    // Calculate next review date
    const nextReview = new Date();
    nextReview.setDate(nextReview.getDate() + interval);

    return {
        easeFactor,
        interval,
        repetitions,
        nextReview: nextReview.toISOString(),
        lastReviewed: new Date().toISOString(),
    };
};

export const getDueFlashcards = (flashcards) => {
    const now = new Date();
    return flashcards.filter(card => new Date(card.nextReview) <= now);
};

// MCQ (Multiple Choice Question) model
export const createMCQ = (skillId, question, choices) => ({
    id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    skillId,
    question: question.trim(),
    choices: choices.map((choice, index) => ({
        id: `choice_${index}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        text: choice.text.trim(),
        isCorrect: choice.isCorrect
    })),
    difficulty: 'medium',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
});

export const validateMCQ = (mcq) => {
    if (!mcq.question || mcq.question.trim().length === 0) {
        return { valid: false, error: 'La question est requise' };
    }
    if (!mcq.choices || mcq.choices.length !== 3) {
        return { valid: false, error: 'Vous devez avoir exactement 3 choix de réponse' };
    }
    const correctAnswers = mcq.choices.filter(c => c.isCorrect).length;
    if (correctAnswers !== 1) {
        return { valid: false, error: 'Vous devez avoir exactement 1 réponse correcte' };
    }
    if (mcq.choices.some(c => !c.text || c.text.trim().length === 0)) {
        return { valid: false, error: 'Tous les choix doivent avoir un texte' };
    }
    if (!mcq.skillId) {
        return { valid: false, error: 'Le MCQ doit être lié à une compétence' };
    }
    return { valid: true };
};

// Get random MCQs for quiz (10 questions)
export const getRandomMCQs = (mcqs, count = 10) => {
    const shuffled = [...mcqs].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(count, mcqs.length));
};



