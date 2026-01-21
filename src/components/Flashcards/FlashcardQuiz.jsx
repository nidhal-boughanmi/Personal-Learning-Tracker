import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { FiZap, FiRefreshCw, FiCheck } from 'react-icons/fi';

const FlashcardQuiz = ({ skillId = null }) => {
    const { getDueCards, reviewFlashcard, skills, getFlashcardsBySkill } = useApp();
    const [dueCards, setDueCards] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);
    const [stats, setStats] = useState({ reviewed: 0, total: 0 });

    useEffect(() => {
        loadDueCards();
    }, [skillId]);

    const loadDueCards = () => {
        let cards;
        if (skillId) {
            // Filter flashcards by specific skill
            const skillCards = getFlashcardsBySkill(skillId);
            cards = skillCards.filter(card => new Date(card.nextReview) <= new Date());
        } else {
            // Get all due cards
            cards = getDueCards();
        }
        setDueCards(cards);
        setStats({ reviewed: 0, total: cards.length });
        setCurrentIndex(0);
        setShowAnswer(false);
    };

    const handleReview = (quality) => {
        if (currentIndex < dueCards.length) {
            const currentCard = dueCards[currentIndex];
            reviewFlashcard(currentCard.id, quality);

            setStats(prev => ({ ...prev, reviewed: prev.reviewed + 1 }));

            if (currentIndex + 1 < dueCards.length) {
                setCurrentIndex(currentIndex + 1);
                setShowAnswer(false);
            } else {
                // Finished!
                setCurrentIndex(currentIndex + 1);
            }
        }
    };

    const getSkillName = (skillId) => {
        const skill = skills.find(s => s.id === skillId);
        return skill ? skill.name : 'Unknown';
    };

    if (dueCards.length === 0) {
        const currentSkillName = skillId ? skills.find(s => s.id === skillId)?.name : null;
        return (
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <FiZap className="text-accent-600" size={24} />
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                            Flashcard Quiz{currentSkillName ? `: ${currentSkillName}` : ''}
                        </h2>
                    </div>
                </div>

                <div className="card text-center py-16">
                    <div className="text-6xl mb-4">🎉</div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                        All caught up!
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-md mx-auto">
                        You have no flashcards due for review right now. Create some flashcards or come back later!
                    </p>
                    <button
                        onClick={loadDueCards}
                        className="btn-primary inline-flex items-center gap-2"
                    >
                        <FiRefreshCw size={20} />
                        Check Again
                    </button>
                </div>
            </div>
        );
    }

    if (currentIndex >= dueCards.length) {
        // Quiz complete
        const currentSkillName = skillId ? skills.find(s => s.id === skillId)?.name : null;
        return (
            <div className="space-y-6">
                <div className="flex items-center gap-2">
                    <FiZap className="text-accent-600" size={24} />
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                        Flashcard Quiz{currentSkillName ? `: ${currentSkillName}` : ''}
                    </h2>
                </div>

                <div className="card text-center py-16">
                    <div className="text-6xl mb-4">✅</div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                        Review Complete!
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-4">
                        You reviewed {stats.reviewed} flashcard{stats.reviewed !== 1 ? 's' : ''}
                    </p>
                    <div className="flex gap-3 justify-center">
                        <button
                            onClick={loadDueCards}
                            className="btn-primary inline-flex items-center gap-2"
                        >
                            <FiRefreshCw size={20} />
                            Review Again
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const currentCard = dueCards[currentIndex];
    const currentSkillName = skillId ? skills.find(s => s.id === skillId)?.name : null;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <FiZap className="text-accent-600" size={24} />
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                        Flashcard Quiz{currentSkillName ? `: ${currentSkillName}` : ''}
                    </h2>
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                    {currentIndex + 1} / {dueCards.length}
                </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                <div
                    className="bg-gradient-to-r from-accent-500 to-emerald-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((currentIndex + 1) / dueCards.length) * 100}%` }}
                />
            </div>

            {/* Card */}
            <div className="card min-h-[400px] flex flex-col">
                <div className="mb-4">
                    <span className="inline-block px-3 py-1 rounded-lg text-sm font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300">
                        {getSkillName(currentCard.skillId)}
                    </span>
                </div>

                <div className="flex-1 flex flex-col justify-center items-center text-center py-8">
                    <h3 className="text-sm uppercase text-slate-500 dark:text-slate-400 mb-4 font-semibold">
                        {showAnswer ? 'Answer' : 'Question'}
                    </h3>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white mb-8 max-w-2xl">
                        {showAnswer ? currentCard.back : currentCard.front}
                    </p>

                    {!showAnswer ? (
                        <button
                            onClick={() => setShowAnswer(true)}
                            className="btn-primary px-8 py-3"
                        >
                            Show Answer
                        </button>
                    ) : (
                        <div className="w-full max-w-2xl space-y-3">
                            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                                How well did you remember?
                            </p>
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    onClick={() => handleReview(1)}
                                    className="px-4 py-3 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors font-medium"
                                >
                                    ❌ Again
                                    <p className="text-xs mt-1 opacity-75">Review tomorrow</p>
                                </button>
                                <button
                                    onClick={() => handleReview(2)}
                                    className="px-4 py-3 rounded-lg bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 hover:bg-orange-200 dark:hover:bg-orange-900/50 transition-colors font-medium"
                                >
                                    😐 Hard
                                    <p className="text-xs mt-1 opacity-75">Review soon</p>
                                </button>
                                <button
                                    onClick={() => handleReview(3)}
                                    className="px-4 py-3 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors font-medium"
                                >
                                    👍 Good
                                    <p className="text-xs mt-1 opacity-75">Normal interval</p>
                                </button>
                                <button
                                    onClick={() => handleReview(4)}
                                    className="px-4 py-3 rounded-lg bg-gradient-to-r from-accent-500 to-emerald-500 text-white hover:from-accent-600 hover:to-emerald-600 transition-all font-medium"
                                >
                                    ✅ Easy
                                    <p className="text-xs mt-1 opacity-75">Longer interval</p>
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Card Stats */}
                <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700 grid grid-cols-3 gap-4 text-center text-sm">
                    <div>
                        <div className="text-slate-500 dark:text-slate-400">Repetitions</div>
                        <div className="font-semibold text-slate-900 dark:text-white">{currentCard.repetitions}</div>
                    </div>
                    <div>
                        <div className="text-slate-500 dark:text-slate-400">Interval</div>
                        <div className="font-semibold text-slate-900 dark:text-white">{currentCard.interval}d</div>
                    </div>
                    <div>
                        <div className="text-slate-500 dark:text-slate-400">Ease</div>
                        <div className="font-semibold text-slate-900 dark:text-white">{currentCard.easeFactor.toFixed(1)}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FlashcardQuiz;
