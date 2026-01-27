// YouTube helper utilities for URL parsing and thumbnail extraction

/**
 * Extract YouTube video ID from various URL formats
 * Supports: youtube.com/watch?v=, youtu.be/, youtube.com/embed/
 * @param {string} url - YouTube URL
 * @returns {string|null} Video ID or null if not a valid YouTube URL
 */
export const extractYouTubeID = (url) => {
    if (!url) return null;

    // Match patterns for different YouTube URL formats
    const patterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
        /youtube\.com\/watch\?.*v=([a-zA-Z0-9_-]{11})/,
    ];

    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match && match[1]) {
            return match[1];
        }
    }

    return null;
};

/**
 * Get YouTube thumbnail URL for a video ID
 * @param {string} videoId - YouTube video ID
 * @param {string} quality - Thumbnail quality: 'default', 'medium', 'high', 'maxres'
 * @returns {string} Thumbnail URL
 */
export const getYouTubeThumbnail = (videoId, quality = 'medium') => {
    if (!videoId) return null;

    const qualityMap = {
        default: 'default.jpg',      // 120x90
        medium: 'mqdefault.jpg',     // 320x180
        high: 'hqdefault.jpg',       // 480x360
        maxres: 'maxresdefault.jpg', // 1280x720
    };

    const thumbnailFile = qualityMap[quality] || qualityMap.medium;
    return `https://img.youtube.com/vi/${videoId}/${thumbnailFile}`;
};

/**
 * Get YouTube embed URL for iframe
 * @param {string} videoId - YouTube video ID
 * @returns {string} Embed URL
 */
export const getYouTubeEmbedUrl = (videoId) => {
    if (!videoId) return null;
    return `https://www.youtube.com/embed/${videoId}`;
};

/**
 * Check if a URL is a YouTube URL
 * @param {string} url - URL to check
 * @returns {boolean} True if YouTube URL
 */
export const isYouTubeUrl = (url) => {
    if (!url) return false;
    return /(?:youtube\.com|youtu\.be)/.test(url);
};

/**
 * Get YouTube watch URL from video ID
 * @param {string} videoId - YouTube video ID
 * @returns {string} Watch URL
 */
export const getYouTubeWatchUrl = (videoId) => {
    if (!videoId) return null;
    return `https://www.youtube.com/watch?v=${videoId}`;
};
