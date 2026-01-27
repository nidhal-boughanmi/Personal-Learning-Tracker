import React, { useState, useEffect } from 'react';
import { FiMusic, FiVolume2, FiVolumeX, FiX } from 'react-icons/fi';

/**
 * Lofi Music Player Component
 * Provides ambient background music for study sessions
 * Uses curated YouTube Lofi playlists
 */
const LofiMusicPlayer = ({ isStudyActive = false }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(30);
    const [showPlayer, setShowPlayer] = useState(false);
    const [selectedStation, setSelectedStation] = useState(0);

    // Curated Lofi stations (YouTube videos/playlists)
    const lofiStations = [
        {
            name: 'Lofi Hip Hop Radio',
            id: 'jfKfPfyJRdk', // Lofi Girl - beats to relax/study to
            thumbnail: 'https://i.ytimg.com/vi/jfKfPfyJRdk/hqdefault.jpg'
        },
        {
            name: 'Chill Lofi Beats',
            id: '5qap5aO4i9A', // ChilledCow alternative
            thumbnail: 'https://i.ytimg.com/vi/5qap5aO4i9A/hqdefault.jpg'
        },
        {
            name: 'Jazz Lofi',
            id: 'Dx5qFachd3A', // Lofi Jazz
            thumbnail: 'https://i.ytimg.com/vi/Dx5qFachd3A/hqdefault.jpg'
        },
        {
            name: 'Nature Sounds',
            id: 'lTRiuFIWV54', // Rain sounds
            thumbnail: 'https://i.ytimg.com/vi/lTRiuFIWV54/hqdefault.jpg'
        },
    ];

    // Auto-pause when study ends (optional behavior)
    useEffect(() => {
        if (!isStudyActive && isPlaying) {
            // Optionally pause when study session ends
            // setIsPlaying(false);
        }
    }, [isStudyActive]);

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
        if (!showPlayer) setShowPlayer(true);
    };

    const handleVolumeChange = (e) => {
        setVolume(e.target.value);
    };

    const changeStation = (index) => {
        setSelectedStation(index);
        setIsPlaying(true);
    };

    const currentStation = lofiStations[selectedStation];

    return (
        <div className="fixed bottom-6 right-6 z-40">
            {/* Compact Player Toggle Button */}
            {!showPlayer && (
                <button
                    onClick={togglePlay}
                    className={`p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 ${isPlaying
                            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white animate-pulse'
                            : 'glass text-slate-700 dark:text-slate-300'
                        }`}
                    aria-label="Toggle music player"
                >
                    <FiMusic size={24} />
                </button>
            )}

            {/* Expanded Player */}
            {showPlayer && (
                <div className="glass rounded-2xl p-4 w-80 shadow-2xl border border-slate-200 dark:border-slate-700 animate-in fade-in zoom-in">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <FiMusic className="text-purple-600 dark:text-purple-400" size={20} />
                            <h3 className="font-bold text-slate-900 dark:text-white">Lofi Player</h3>
                        </div>
                        <button
                            onClick={() => {
                                setShowPlayer(false);
                                setIsPlaying(false);
                            }}
                            className="p-1 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 transition-colors"
                            aria-label="Close player"
                        >
                            <FiX size={20} />
                        </button>
                    </div>

                    {/* Station Info */}
                    <div className="mb-3">
                        <div className="flex items-center gap-3">
                            <img
                                src={currentStation.thumbnail}
                                alt={currentStation.name}
                                className="w-16 h-16 rounded-lg object-cover"
                            />
                            <div className="flex-1">
                                <p className="font-medium text-slate-900 dark:text-white">
                                    {currentStation.name}
                                </p>
                                <p className="text-xs text-slate-600 dark:text-slate-400">
                                    {isPlaying ? 'Now Playing' : 'Paused'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Volume Control */}
                    <div className="mb-3">
                        <div className="flex items-center gap-2">
                            {volume > 0 ? (
                                <FiVolume2 className="text-slate-600 dark:text-slate-400" size={18} />
                            ) : (
                                <FiVolumeX className="text-slate-600 dark:text-slate-400" size={18} />
                            )}
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={volume}
                                onChange={handleVolumeChange}
                                className="flex-1 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-600"
                            />
                            <span className="text-xs text-slate-600 dark:text-slate-400 w-8 text-right">
                                {volume}%
                            </span>
                        </div>
                    </div>

                    {/* Station Selector */}
                    <div className="mb-3">
                        <p className="text-xs font-medium text-slate-700 dark:text-slate-300 mb-2">
                            Select Station
                        </p>
                        <div className="grid grid-cols-2 gap-2">
                            {lofiStations.map((station, index) => (
                                <button
                                    key={station.id}
                                    onClick={() => changeStation(index)}
                                    className={`p-2 rounded-lg text-xs font-medium transition-all ${selectedStation === index
                                            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                                            : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600'
                                        }`}
                                >
                                    {station.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Play/Pause Button */}
                    <button
                        onClick={togglePlay}
                        className={`w-full py-3 rounded-xl font-medium transition-all ${isPlaying
                                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg hover:from-purple-700 hover:to-pink-700'
                                : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600'
                            }`}
                    >
                        {isPlaying ? 'Pause Music' : 'Play Music'}
                    </button>

                    {/* Hidden YouTube Iframe */}
                    {isPlaying && (
                        <iframe
                            className="hidden"
                            src={`https://www.youtube.com/embed/${currentStation.id}?autoplay=1&loop=1&playlist=${currentStation.id}&volume=${volume}`}
                            allow="autoplay; encrypted-media"
                            title={`Lofi Music - ${currentStation.name}`}
                        />
                    )}
                </div>
            )}
        </div>
    );
};

export default LofiMusicPlayer;
