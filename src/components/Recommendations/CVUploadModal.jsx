import React, { useState } from 'react';
import { FiUpload, FiFile, FiX, FiCheck, FiAlertCircle } from 'react-icons/fi';
import { extractTextFromPDF } from '../../utils/CVParser';

/**
 * CV Upload Modal Component
 * Allows users to upload their CV (PDF) for skill analysis
 */
const CVUploadModal = ({ isOpen, onClose, onCVUploaded }) => {
    const [file, setFile] = useState(null);
    const [extractedText, setExtractedText] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState('');
    const [isDragging, setIsDragging] = useState(false);

    if (!isOpen) return null;

    const handleFileSelect = async (selectedFile) => {
        setError('');

        // Validate file type
        if (!selectedFile.name.toLowerCase().endsWith('.pdf')) {
            setError('Please upload a PDF file');
            return;
        }

        // Validate file size (max 5MB)
        if (selectedFile.size > 5 * 1024 * 1024) {
            setError('File size must be less than 5MB');
            return;
        }

        setFile(selectedFile);
        setIsProcessing(true);

        try {
            const text = await extractTextFromPDF(selectedFile);
            setExtractedText(text);
            setIsProcessing(false);
        } catch (err) {
            setError(err.message || 'Failed to process PDF');
            setIsProcessing(false);
            setFile(null);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);

        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile) {
            handleFileSelect(droppedFile);
        }
    };

    const handleFileInput = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            handleFileSelect(selectedFile);
        }
    };

    const handleAnalyze = () => {
        if (extractedText.trim()) {
            onCVUploaded(extractedText);
        }
    };

    const handleClose = () => {
        setFile(null);
        setExtractedText('');
        setError('');
        setIsProcessing(false);
        onClose();
    };

    return (
        <div className="modal-overlay" onClick={handleClose}>
            <div
                className="modal-content max-w-3xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                            Upload Your CV
                        </h2>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                            Get personalized skill recommendations based on your experience
                        </p>
                    </div>
                    <button
                        onClick={handleClose}
                        className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 transition-colors"
                        aria-label="Close modal"
                    >
                        <FiX size={24} />
                    </button>
                </div>

                {/* Upload Area */}
                {!file && (
                    <div>
                        <div
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all ${isDragging
                                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/10'
                                    : 'border-slate-300 dark:border-slate-600 hover:border-primary-400'
                                }`}
                        >
                            <div className="flex flex-col items-center gap-4">
                                <div className={`p-4 rounded-full ${isDragging
                                        ? 'bg-primary-100 dark:bg-primary-900/20'
                                        : 'bg-slate-100 dark:bg-slate-800'
                                    }`}>
                                    <FiUpload
                                        size={48}
                                        className={isDragging ? 'text-primary-600' : 'text-slate-400'}
                                    />
                                </div>

                                <div>
                                    <p className="text-lg font-medium text-slate-900 dark:text-white mb-1">
                                        Drop your CV here or click to browse
                                    </p>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">
                                        PDF format only • Max 5MB
                                    </p>
                                </div>

                                <input
                                    type="file"
                                    accept=".pdf"
                                    onChange={handleFileInput}
                                    className="hidden"
                                    id="cv-upload"
                                />
                                <label
                                    htmlFor="cv-upload"
                                    className="btn-primary cursor-pointer"
                                >
                                    Choose File
                                </label>
                            </div>
                        </div>

                        {/* Privacy Notice */}
                        <div className="mt-4 p-4 glass rounded-xl flex items-start gap-3">
                            <FiAlertCircle className="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" size={20} />
                            <div className="text-sm text-slate-700 dark:text-slate-300">
                                <p className="font-medium mb-1">Your privacy matters</p>
                                <p className="text-slate-600 dark:text-slate-400">
                                    Your CV is processed locally in your browser. No data is sent to external servers.
                                    Everything stays private on your device.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Processing State */}
                {isProcessing && (
                    <div className="text-center py-12">
                        <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-200 border-t-primary-600 mx-auto mb-4"></div>
                        <p className="text-lg font-medium text-slate-900 dark:text-white">
                            Processing your CV...
                        </p>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                            Extracting text and analyzing skills
                        </p>
                    </div>
                )}

                {/* Extracted Text Preview */}
                {file && !isProcessing && extractedText && (
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 p-4 glass rounded-xl">
                            <FiFile className="text-primary-600 dark:text-primary-400" size={24} />
                            <div className="flex-1">
                                <p className="font-medium text-slate-900 dark:text-white">
                                    {file.name}
                                </p>
                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                    {(file.size / 1024).toFixed(1)} KB • {extractedText.length} characters extracted
                                </p>
                            </div>
                            <FiCheck className="text-accent-600" size={24} />
                        </div>

                        {/* Text Preview */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                Extracted Text Preview
                            </label>
                            <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-xl max-h-64 overflow-y-auto">
                                <p className="text-sm text-slate-700 dark:text-slate-300 font-mono whitespace-pre-wrap">
                                    {extractedText.substring(0, 1000)}
                                    {extractedText.length > 1000 && '...'}
                                </p>
                            </div>
                            <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
                                Showing first 1000 characters
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3">
                            <button
                                onClick={() => {
                                    setFile(null);
                                    setExtractedText('');
                                }}
                                className="btn-secondary flex-1"
                            >
                                Choose Different File
                            </button>
                            <button
                                onClick={handleAnalyze}
                                className="btn-primary flex-1"
                            >
                                Analyze CV & Get Recommendations
                            </button>
                        </div>
                    </div>
                )}

                {/* Error Message */}
                {error && (
                    <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                        <div className="flex items-center gap-2 text-red-800 dark:text-red-400">
                            <FiAlertCircle size={20} />
                            <p className="font-medium">{error}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CVUploadModal;
