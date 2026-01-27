import React from 'react';
import { FiX, FiDownload, FiMaximize2 } from 'react-icons/fi';

const PDFViewer = ({ pdfUrl, pdfData, fileName, isOpen, onClose }) => {
    if (!isOpen || (!pdfUrl && !pdfData)) return null;

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleDownload = () => {
        const link = document.createElement('a');
        if (pdfData) {
            link.href = pdfData;
            link.download = fileName || 'document.pdf';
        } else {
            link.href = pdfUrl;
            link.target = '_blank';
        }
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const pdfSource = pdfData || pdfUrl;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 animate-in fade-in duration-200"
            onClick={handleBackdropClick}
            role="dialog"
            aria-modal="true"
            aria-labelledby="pdf-viewer-title"
        >
            <div className="relative w-full h-full max-w-6xl max-h-[90vh] mx-4 my-8 animate-in zoom-in duration-200">
                {/* Header */}
                <div className="absolute -top-16 left-0 right-0 flex items-center justify-between text-white">
                    <h3 id="pdf-viewer-title" className="text-lg font-semibold truncate">
                        {fileName || 'Document PDF'}
                    </h3>
                    <div className="flex gap-2">
                        <button
                            onClick={handleDownload}
                            className="p-2 hover:bg-white/10 rounded-lg transition-colors flex items-center gap-2"
                            aria-label="Download PDF"
                        >
                            <FiDownload size={20} />
                            <span className="text-sm hidden sm:inline">Télécharger</span>
                        </button>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                            aria-label="Close PDF viewer"
                        >
                            <FiX size={24} />
                        </button>
                    </div>
                </div>

                {/* PDF Container */}
                <div className="w-full h-full bg-white rounded-lg shadow-2xl overflow-hidden">
                    <iframe
                        src={pdfSource}
                        className="w-full h-full"
                        title="PDF Viewer"
                        frameBorder="0"
                    />
                </div>

                {/* Instruction */}
                <p className="absolute -bottom-12 left-0 right-0 text-center text-white/70 text-sm">
                    Appuyez sur <kbd className="px-2 py-1 bg-white/20 rounded">ESC</kbd> ou cliquez en dehors pour fermer
                </p>
            </div>
        </div>
    );
};

export default PDFViewer;
