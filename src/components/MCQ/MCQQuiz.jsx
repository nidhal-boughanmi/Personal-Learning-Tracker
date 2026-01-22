import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FiCheck, FiX, FiRefreshCw } from 'react-icons/fi';

const MCQQuiz = ({ skillId, onClose }) => {
    const { getRandomQuizQuestions, skills } = useApp();
    const [quizStarted, setQuizStarted] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);
    const [score, setScore] = useState(0);

    const skill = skills.find(s => s.id === skillId);

    // Function to shuffle array
    const shuffleArray = (array) => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };

    const startQuiz = () => {
        const quizQuestions = getRandomQuizQuestions(skillId, 10);
        if (quizQuestions.length === 0) {
            alert('Vous devez créer au moins une question MCQ pour ce skill!');
            return;
        }

        // Shuffle choices for each question
        const questionsWithShuffledChoices = quizQuestions.map(q => ({
            ...q,
            choices: shuffleArray(q.choices)
        }));

        setQuestions(questionsWithShuffledChoices);
        setQuizStarted(true);
        setCurrentQuestion(0);
        setSelectedAnswers({});
        setShowResults(false);
    };

    const handleAnswerSelect = (questionId, choiceId) => {
        setSelectedAnswers({
            ...selectedAnswers,
            [questionId]: choiceId
        });
    };

    const handleNext = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        }
    };

    const handlePrevious = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    const handleSubmit = () => {
        let correctCount = 0;
        questions.forEach(q => {
            const selected = selectedAnswers[q.id];
            const correctChoice = q.choices.find(c => c.isCorrect);
            if (selected === correctChoice.id) {
                correctCount++;
            }
        });
        setScore(correctCount);
        setShowResults(true);
    };

    if (!quizStarted) {
        return (
            <div className="card text-center py-12">
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                    Quiz MCQ: {skill?.name}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-md mx-auto">
                    Testez vos connaissances avec 10 questions à choix multiples!
                </p>
                <div className="flex gap-3 justify-center">
                    <button onClick={onClose} className="btn-secondary">
                        Retour
                    </button>
                    <button onClick={startQuiz} className="btn-primary">
                        Commencer le Quiz
                    </button>
                </div>
            </div>
        );
    }

    if (showResults) {
        const percentage = Math.round((score / questions.length) * 100);
        return (
            <div className="space-y-6">
                <div className="card text-center py-8">
                    <div className="text-6xl mb-4">{percentage >= 70 ? '🎉' : '📚'}</div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                        Score: {score}/{questions.length}
                    </h3>
                    <p className="text-xl text-slate-600 dark:text-slate-400 mb-6">
                        {percentage}%
                    </p>
                    <div className="flex gap-4 justify-center mb-6">
                        <div className="text-center">
                            <div className="text-accent-600 font-bold text-2xl">✅ {score}</div>
                            <div className="text-sm text-slate-500">Correctes</div>
                        </div>
                        <div className="text-center">
                            <div className="text-red-600 font-bold text-2xl">❌ {questions.length - score}</div>
                            <div className="text-sm text-slate-500">Incorrectes</div>
                        </div>
                    </div>
                    <div className="flex gap-3 justify-center">
                        <button onClick={onClose} className="btn-secondary">
                            Retour
                        </button>
                        <button onClick={startQuiz} className="btn-primary flex items-center gap-2">
                            <FiRefreshCw size={18} />
                            Refaire le Quiz
                        </button>
                    </div>
                </div>

                {/* Review Answers */}
                <div className="space-y-4">
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white">Révision des Réponses</h4>
                    {questions.map((question, idx) => {
                        const selected = selectedAnswers[question.id];
                        const correctChoice = question.choices.find(c => c.isCorrect);
                        const isCorrect = selected === correctChoice.id;

                        return (
                            <div key={question.id} className={`card ${isCorrect ? 'ring-2 ring-accent-500' : 'ring-2 ring-red-500'}`}>
                                <div className="flex items-start gap-3 mb-3">
                                    <div className="mt-1">
                                        {isCorrect ? (
                                            <FiCheck className="text-accent-600" size={24} />
                                        ) : (
                                            <FiX className="text-red-600" size={24} />
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <h5 className="font-semibold text-slate-900 dark:text-white mb-3">
                                            {idx + 1}. {question.question}
                                        </h5>
                                        <div className="space-y-2">
                                            {question.choices.map(choice => {
                                                const isSelected = selected === choice.id;
                                                const isCorrectChoice = choice.isCorrect;

                                                return (
                                                    <div
                                                        key={choice.id}
                                                        className={`p-3 rounded-lg border-2 ${isCorrectChoice
                                                            ? 'border-accent-500 bg-accent-100 dark:bg-accent-900/30'
                                                            : isSelected
                                                                ? 'border-red-500 bg-red-100 dark:bg-red-900/30'
                                                                : 'border-slate-200 dark:border-slate-700'
                                                            }`}
                                                    >
                                                        <div className="flex items-center justify-between">
                                                            <span className="text-slate-900 dark:text-white">{choice.text}</span>
                                                            {isCorrectChoice && <span className="text-accent-600">✓ Bonne réponse</span>}
                                                            {isSelected && !isCorrectChoice && <span className="text-red-600">Votre réponse</span>}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }

    const question = questions[currentQuestion];
    const progress = ((currentQuestion + 1) / questions.length) * 100;

    return (
        <div className="space-y-6">
            {/* Progress */}
            <div>
                <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-600 dark:text-slate-400">
                        Question {currentQuestion + 1} sur {questions.length}
                    </span>
                    <span className="font-semibold text-slate-900 dark:text-white">
                        {Math.round(progress)}%
                    </span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                    <div
                        className="bg-gradient-to-r from-primary-500 to-accent-500 h-2 rounded-full transition-all"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            {/* Question */}
            <div className="card">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
                    {question.question}
                </h3>

                <div className="space-y-3">
                    {question.choices.map((choice) => {
                        const isSelected = selectedAnswers[question.id] === choice.id;
                        return (
                            <label
                                key={choice.id}
                                className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${isSelected
                                    ? 'border-primary-500 bg-primary-100 dark:bg-primary-900/30'
                                    : 'border-slate-200 dark:border-slate-700 hover:border-primary-300'
                                    }`}
                            >
                                <input
                                    type="radio"
                                    name={question.id}
                                    checked={isSelected}
                                    onChange={() => handleAnswerSelect(question.id, choice.id)}
                                    className="w-5 h-5 text-primary-600"
                                />
                                <span className="text-slate-900 dark:text-white">{choice.text}</span>
                            </label>
                        );
                    })}
                </div>
            </div>

            {/* Navigation */}
            <div className="flex gap-3">
                <button
                    onClick={handlePrevious}
                    disabled={currentQuestion === 0}
                    className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Précédent
                </button>

                {currentQuestion < questions.length - 1 ? (
                    <button onClick={handleNext} className="btn-primary flex-1">
                        Suivant
                    </button>
                ) : (
                    <button
                        onClick={handleSubmit}
                        disabled={Object.keys(selectedAnswers).length !== questions.length}
                        className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-accent-500 to-emerald-500"
                    >
                        Soumettre le Quiz
                    </button>
                )}
            </div>

            {Object.keys(selectedAnswers).length !== questions.length && (
                <p className="text-sm text-center text-slate-500">
                    Répondez à toutes les questions avant de soumettre
                </p>
            )}
        </div>
    );
};

export default MCQQuiz;
