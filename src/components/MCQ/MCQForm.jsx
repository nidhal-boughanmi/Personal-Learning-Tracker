import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';

const MCQForm = ({ skillId, onSuccess }) => {
    const { addMCQ, updateMCQ } = useApp();
    const [question, setQuestion] = useState('');
    const [choices, setChoices] = useState([
        { text: '', isCorrect: false },
        { text: '', isCorrect: false },
        { text: '', isCorrect: false }
    ]);
    const [error, setError] = useState('');

    const handleChoiceChange = (index, text) => {
        const newChoices = [...choices];
        newChoices[index].text = text;
        setChoices(newChoices);
    };

    const handleCorrectChange = (index) => {
        const newChoices = choices.map((choice, i) => ({
            ...choice,
            isCorrect: i === index
        }));
        setChoices(newChoices);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!question.trim()) {
            setError('La question est requise');
            return;
        }

        if (choices.some(c => !c.text.trim())) {
            setError('Tous les choix doivent avoir un texte');
            return;
        }

        if (!choices.some(c => c.isCorrect)) {
            setError('Vous devez sélectionner la bonne réponse');
            return;
        }

        addMCQ(skillId, question, choices);

        // Reset form
        setQuestion('');
        setChoices([
            { text: '', isCorrect: false },
            { text: '', isCorrect: false },
            { text: '', isCorrect: false }
        ]);

        if (onSuccess) onSuccess();
    };

    return (
        <form onSubmit={handleSubmit} className="card space-y-5">
            <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                Créer une Question MCQ
            </h4>

            <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Question *
                </label>
                <textarea
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Quelle est votre question?"
                    className="input min-h-[80px]"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                    Choix de Réponses (cochez la bonne réponse)
                </label>
                <div className="space-y-3">
                    {choices.map((choice, index) => (
                        <div key={index} className="flex items-center gap-3">
                            <input
                                type="radio"
                                name="correct"
                                checked={choice.isCorrect}
                                onChange={() => handleCorrectChange(index)}
                                className="w-5 h-5 text-accent-600"
                            />
                            <input
                                type="text"
                                value={choice.text}
                                onChange={(e) => handleChoiceChange(index, e.target.value)}
                                placeholder={`Choix ${index + 1}`}
                                className="input flex-1"
                                required
                            />
                        </div>
                    ))}
                </div>
                <p className="mt-2 text-xs text-slate-500">
                    💡 Cochez le bouton radio pour indiquer la bonne réponse
                </p>
            </div>

            {error && (
                <div className="p-3 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg text-red-700 dark:text-red-300 text-sm">
                    {error}
                </div>
            )}

            <button type="submit" className="btn-primary w-full">
                Ajouter la Question
            </button>
        </form>
    );
};

export default MCQForm;
