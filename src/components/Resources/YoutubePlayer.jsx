import React from 'react';
import { FiX } from 'react-icons/fi';
import { getYouTubeEmbedUrl } from '../../utils/youtubeHelpers';

const YoutubePlayer = ({ videoId, isOpen, onClose, onVideoWatched }) => {
    if (!isOpen || !videoId) return null;

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleVideoEnd = () => {
        if (onVideoWatched) {
            onVideoWatched();
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 animate-in fade-in duration-200"
            onClick={handleBackdropClick}
            role="dialog"
            aria-modal="true"
            aria-labelledby="youtube-player-title"
        >
            <div className="relative w-full max-w-5xl mx-4 animate-in zoom-in duration-200">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute -top-12 right-0 p-2 text-white hover:text-accent-400 transition-colors z-10"
                    aria-label="Close video player"
                >
                    <FiX size={32} />
                </button>

                {/* Video Player */}
                <div className="relative w-full pb-[56.25%] bg-black rounded-lg overflow-hidden shadow-2xl">
                    <iframe
                        className="absolute inset-0 w-full h-full"
                        src={`${getYouTubeEmbedUrl(videoId)}?autoplay=1&rel=0`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        onEnded={handleVideoEnd}
                    />
                </div>

                {/* Instruction */}
                <p className="text-center text-white/70 text-sm mt-4">
                    Appuyez sur <kbd className="px-2 py-1 bg-white/20 rounded">ESC</kbd> ou cliquez en dehors pour fermer
                </p>
            </div>
        </div>
    );
};

export default YoutubePlayer;
