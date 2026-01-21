import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import FlashcardQuiz from './FlashcardQuiz';
import MCQQuiz from '../MCQ/MCQQuiz';
import MCQForm from '../MCQ/MCQForm';
import { FiPlus, FiEdit2, FiTrash2, FiClock, FiZap } from 'react-icons/fi';
import { getQuestionsForSkill } from '../../utils/mcqTemplates';
import { createMCQ } from '../../utils/models';
import * as storage from '../../utils/localStorage';

const FlashcardsTab = ({ skillId }) => {
    const { skills, flashcards, addFlashcard, updateFlashcard, deleteFlashcard, getFlashcardsBySkill, getMCQsBySkill, deleteMCQ, addMCQ } = useApp();
    const [activeView, setActiveView] = useState('flashcards'); // flashcards | mcq | mcq-form | mcq-quiz
    const [isEditing, setIsEditing] = useState(false);
    const [editingCard, setEditingCard] = useState(null);
    const [front, setFront] = useState('');
    const [back, setBack] = useState('');

    const skill = skills.find(s => s.id === skillId);
    const skillFlashcards = getFlashcardsBySkill(skillId);
    const skillMCQs = getMCQsBySkill(skillId);
    const dueCards = skillFlashcards.filter(card => new Date(card.nextReview) <= new Date());

    const handleGenerateQuestions = () => {
        if (!skill) return;
        const templates = getQuestionsForSkill(skill.name);
        if (templates.length === 0) {
            alert(`Aucune question prédéfinie trouvée pour "${skill.name}".\n\nQuestions disponibles pour: React JS, DevOps, Java, Python, Data Science`);
            return;
        }

        // Create all new MCQs
        const newMCQs = templates.map(template =>
            createMCQ(skillId, template.question, template.choices)
        );

        // Save directly to localStorage
        const currentMCQs = storage.getMCQs();
        storage.saveMCQs([...currentMCQs, ...newMCQs]);

        alert(`✅ ${newMCQs.length} questions générées automatiquement pour ${skill.name}!`);
        window.location.reload(); // Reload to refresh state
    };

    const handleSave = () => {
        if (editingCard) {
            updateFlashcard(editingCard.id, { front, back });
        } else {
            addFlashcard(skillId, front, back);
        }
        handleCancel();
    };

    const handleEdit = (card) => {
        setEditingCard(card);
        setFront(card.front);
        setBack(card.back);
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditingCard(null);
        setFront('');
        setBack('');
    };

    const handleDelete = (id) => {
        if (window.confirm('Supprimer cette flashcard?')) {
            deleteFlashcard(id);
        }
    };

    const handleDeleteMCQ = (id) => {
        if (window.confirm('Supprimer cette question MCQ?')) {
            deleteMCQ(id);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffDays = Math.floor((date - now) / (1000 * 60 * 60 * 24));

        if (diffDays < 0) return 'Dû maintenant';
        if (diffDays === 0) return 'Dû aujourd\'hui';
        if (diffDays === 1) return 'Dû demain';
        return `Dû dans ${diffDays} jours`;
    };

    // MCQ Quiz View
    if (activeView === 'mcq-quiz') {
        return <MCQQuiz skillId={skillId} onClose={() => setActiveView('mcq')} />;
    }

    // MCQ Form View
    if (activeView === 'mcq-form') {
        return (
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                        Questions MCQ
                    </h3>
                    <button onClick={() => setActiveView('mcq')} className="btn-secondary text-sm">
                        Retour à la liste
                    </button>
                </div>
                <MCQForm skillId={skillId} onSuccess={() => setActiveView('mcq')} />
            </div>
        );
    }

    // MCQ List View
    if (activeView === 'mcq') {
        const hasTemplates = getQuestionsForSkill(skill?.name || '').length > 0;
        return (
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                            Quiz MCQ ({skillMCQs.length} questions)
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                            Questions à choix multiples pour tester vos connaissances
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <button onClick={() => setActiveView('flashcards')} className="btn-secondary text-sm">
                            Flashcards
                        </button>
                        {hasTemplates && skillMCQs.length === 0 && (
                            <button onClick={handleGenerateQuestions} className="btn-primary text-sm flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500">
                                ✨ Générer Questions Auto
                            </button>
                        )}
                        <button onClick={() => setActiveView('mcq-form')} className="btn-primary text-sm flex items-center gap-2">
                            <FiPlus size={18} />
                            Nouvelle Question
                        </button>
                    </div>
                </div>

                {skillMCQs.length >= 1 && (
                    <button
                        onClick={() => setActiveView('mcq-quiz')}
                        className="w-full p-4 bg-gradient-to-r from-accent-500 to-emerald-500 text-white rounded-lg hover:from-accent-600 hover:to-emerald-600 transition-all font-bold text-lg flex items-center justify-center gap-2"
                    >
                        <FiZap size={24} />
                        Commencer le Quiz ({Math.min(10, skillMCQs.length)} questions)
                    </button>
                )}

                {skillMCQs.length === 0 ? (
                    <div className="card text-center py-12">
                        <div className="text-6xl mb-4">📝</div>
                        <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                            Aucune question MCQ
                        </h4>
                        <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-md mx-auto">
                            Créez des questions à choix multiples pour tester vos connaissances!
                        </p>
                        <button
                            onClick={() => setActiveView('mcq-form')}
                            className="btn-primary inline-flex items-center gap-2"
                        >
                            <FiPlus size={20} />
                            Créer la Première Question
                        </button>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {skillMCQs.map((mcq, idx) => (
                            <div key={mcq.id} className="card group">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex-1">
                                        <h5 className="font-semibold text-slate-900 dark:text-white">
                                            {idx + 1}. {mcq.question}
                                        </h5>
                                    </div>
                                    <button
                                        onClick={() => handleDeleteMCQ(mcq.id)}
                                        className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <FiTrash2 size={14} />
                                    </button>
                                </div>
                                <div className="space-y-2 text-sm">
                                    {mcq.choices.map((choice, i) => (
                                        <div
                                            key={choice.id}
                                            className={`p-2 rounded ${choice.isCorrect
                                                ? 'bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-300'
                                                : 'bg-slate-100 dark:bg-slate-700'
                                                }`}
                                        >
                                            {choice.text} {choice.isCorrect && '✓'}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    }

    // Flashcards View (existing code with edit check)
    if (isEditing) {
        return (
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                        {editingCard ? 'Modifier Flashcard' : 'Nouvelle Flashcard'}
                    </h3>
                    <button onClick={() => setActiveView('mcq')} className="text-sm text-primary-600 dark:text-primary-400 hover:underline">
                        → Quiz MCQ
                    </button>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Question (Recto)
                    </label>
                    <textarea
                        value={front}
                        onChange={(e) => setFront(e.target.value)}
                        placeholder="Quelle est la question?"
                        className="input min-h-[100px]"
                        autoFocus
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Réponse (Verso)
                    </label>
                    <textarea
                        value={back}
                        onChange={(e) => setBack(e.target.value)}
                        placeholder="Quelle est la réponse?"
                        className="input min-h-[100px]"
                    />
                </div>

                <div className="flex gap-3">
                    <button onClick={handleCancel} className="btn-secondary flex-1">
                        Annuler
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={!front.trim() || !back.trim()}
                        className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {editingCard ? 'Mettre à jour' : 'Créer'} Flashcard
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                        Flashcards ({skillFlashcards.length})
                    </h3>
                    {dueCards.length > 0 && (
                        <p className="text-sm text-accent-600 dark:text-accent-400 mt-1">
                            {dueCards.length} carte{dueCards.length !== 1 ? 's' : ''} à réviser
                        </p>
                    )}
                </div>
                <div className="flex gap-2">
                    <button onClick={() => setActiveView('mcq')} className="btn-secondary text-sm flex items-center gap-2">
                        <FiZap size={16} />
                        Quiz MCQ ({skillMCQs.length})
                    </button>
                    <button
                        onClick={() => setIsEditing(true)}
                        className="btn-primary flex items-center gap-2 text-sm"
                    >
                        <FiPlus size={18} />
                        Nouvelle Carte
                    </button>
                </div>
            </div>

            {skillFlashcards.length === 0 ? (
                <div className="card text-center py-12">
                    <div className="text-6xl mb-4">🎴</div>
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                        Aucune flashcard
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-md mx-auto">
                        Créez des flashcards pour tester vos connaissances! L'app utilise la répétition espacée pour vous aider à mieux mémoriser.
                    </p>
                    <div className="flex gap-3 justify-center">
                        <button
                            onClick={() => setIsEditing(true)}
                            className="btn-primary inline-flex items-center gap-2"
                        >
                            <FiPlus size={20} />
                            Créer une Flashcard
                        </button>
                        <button
                            onClick={() => setActiveView('mcq')}
                            className="btn-secondary inline-flex items-center gap-2"
                        >
                            <FiZap size={20} />
                            Ou créer un Quiz MCQ
                        </button>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {skillFlashcards.map((card) => {
                        const isDue = new Date(card.nextReview) <= new Date();
                        return (
                            <div key={card.id} className={`card group ${isDue ? 'ring-2 ring-accent-500' : ''}`}>
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            {isDue && (
                                                <span className="text-xs px-2 py-1 rounded bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-300 font-medium">
                                                    Dû maintenant
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => handleEdit(card)}
                                            className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400"
                                        >
                                            <FiEdit2 size={14} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(card.id)}
                                            className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400"
                                        >
                                            <FiTrash2 size={14} />
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div>
                                        <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Question:</div>
                                        <p className="text-sm font-medium text-slate-900 dark:text-white">
                                            {card.front}
                                        </p>
                                    </div>
                                    <div>
                                        <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Réponse:</div>
                                        <p className="text-sm text-slate-700 dark:text-slate-300">
                                            {card.back}
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                                    <div className="flex items-center gap-1">
                                        <FiClock size={12} />
                                        {formatDate(card.nextReview)}
                                    </div>
                                    <div>
                                        Reps: {card.repetitions} | Ease: {card.easeFactor.toFixed(1)}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default FlashcardsTab;
