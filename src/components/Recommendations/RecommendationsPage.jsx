import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import CVUploadModal from './CVUploadModal';
import { parseCV } from '../../utils/CVParser';
import { generateRecommendations, groupByPriority, calculateJobMatches } from '../../utils/SkillRecommendationEngine';
import { FiUpload, FiPlus, FiX, FiTrendingUp, FiClock, FiAward, FiRefreshCw, FiBookOpen, FiVideo, FiExternalLink, FiChevronDown, FiChevronUp, FiTrash2, FiBriefcase, FiCheck, FiGlobe, FiSearch } from 'react-icons/fi';

/**
 * Recommendations Page Component
 * Displays skill recommendations based on CV analysis
 */
const RecommendationsPage = () => {
    const { skills, addSkill, cvData, setCVData, recommendations, setRecommendations } = useApp();
    const [jobMatches, setJobMatches] = useState([]);
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [dismissedIds, setDismissedIds] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [isRefreshing, setIsRefreshing] = useState(false);

    useEffect(() => {
        // Load dismissed recommendations from localStorage
        const dismissed = JSON.parse(localStorage.getItem('devskilltracker_dismissed_recommendations') || '[]');
        setDismissedIds(dismissed);
    }, []);

    const handleCVUpload = (cvText) => {
        // Parse CV
        const parsed = parseCV(cvText);
        setCVData(parsed);

        // Generate recommendations
        const recs = generateRecommendations(parsed, skills);
        setRecommendations(recs);

        // Calculate job matches
        const matches = calculateJobMatches(parsed);
        setJobMatches(matches);

        setShowUploadModal(false);
    };

    const handleAddSkill = (recommendation) => {
        // Create skill with pre-filled data
        const newSkill = addSkill(recommendation.name, 'learning');

        // Optionally set target hours based on learning time
        // Could be enhanced to parse "2-3 months" into hours

        // Dismiss this recommendation
        handleDismiss(recommendation.id);
    };

    const handleDismiss = (recId) => {
        const updated = [...dismissedIds, recId];
        setDismissedIds(updated);
        localStorage.setItem('devskilltracker_dismissed_recommendations', JSON.stringify(updated));
    };

    const handleReanalyze = () => {
        if (cvData) {
            setIsRefreshing(true);
            // Add small delay to show loading state
            setTimeout(() => {
                const recs = generateRecommendations(cvData, skills);
                setRecommendations(recs);
                const matches = calculateJobMatches(cvData);
                setJobMatches(matches);
                setIsRefreshing(false);
            }, 800);
        }
    };

    const handleReset = () => {
        if (window.confirm('Are you sure you want to clear your CV data and recommendations? This action cannot be undone.')) {
            setCVData(null);
            setRecommendations([]);
            localStorage.removeItem('devskilltracker_dismissed_recommendations');
        }
    };

    // Helper to generate job search URLs
    const getJobSearchUrl = (roleTitle, platform) => {
        const query = encodeURIComponent(roleTitle);
        switch (platform) {
            case 'linkedin':
                return `https://www.linkedin.com/jobs/search/?keywords=${query}`;
            case 'remoteok':
                return `https://remoteok.com/remote-${roleTitle.toLowerCase().replace(/\s+/g, '-')}-jobs`;
            case 'google':
                return `https://www.google.com/search?q=${query}+jobs&ibp=htl;jobs`;
            default:
                return '#';
        }
    };

    // Filter out dismissed recommendations
    const visibleRecs = recommendations.filter(rec => !dismissedIds.includes(rec.id));

    // Group by priority
    const grouped = groupByPriority(visibleRecs);

    // Filter by category
    const filterByCategory = (recs) => {
        if (selectedCategory === 'all') return recs;
        return recs.filter(r => r.category === selectedCategory);
    };

    const categories = ['all', ...new Set(recommendations.map(r => r.category))];

    // No CV uploaded state
    if (!cvData) {
        return (
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                        Skill Recommendations
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400 mt-2">
                        Get personalized learning suggestions based on your experience
                    </p>
                </div>

                <div className="card text-center py-16">
                    <div className="max-w-md mx-auto">
                        <div className="text-6xl mb-6">🤖</div>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                            AI-Powered Skill Recommendations
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400 mb-8">
                            Upload your CV to get intelligent recommendations on what skills to learn next based on:
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 text-left">
                            <div className="p-4 glass rounded-xl">
                                <div className="text-2xl mb-2">📊</div>
                                <h3 className="font-bold text-slate-900 dark:text-white mb-1">Your Experience</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                    Analyzes your current skills and background
                                </p>
                            </div>
                            <div className="p-4 glass rounded-xl">
                                <div className="text-2xl mb-2">📈</div>
                                <h3 className="font-bold text-slate-900 dark:text-white mb-1">Industry Trends</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                    Suggests in-demand and trending technologies
                                </p>
                            </div>
                            <div className="p-4 glass rounded-xl">
                                <div className="text-2xl mb-2">🎯</div>
                                <h3 className="font-bold text-slate-900 dark:text-white mb-1">Career Growth</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                    Recommends skills for your career level
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={() => setShowUploadModal(true)}
                            className="btn-primary inline-flex items-center gap-2"
                        >
                            <FiUpload size={20} />
                            Upload Your CV
                        </button>

                        <p className="text-xs text-slate-500 dark:text-slate-500 mt-4">
                            🔒 Your CV is processed locally. No data is sent to external servers.
                        </p>
                    </div>
                </div>

                <CVUploadModal
                    isOpen={showUploadModal}
                    onClose={() => setShowUploadModal(false)}
                    onCVUploaded={handleCVUpload}
                />
            </div>
        );
    }

    // Recommendations view
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                        Skill Recommendations
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400 mt-2">
                        {visibleRecs.length} personalized recommendations • {cvData.careerLevel} level
                    </p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={handleReset}
                        className="btn-secondary flex items-center gap-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                        title="Clear data and upload new CV"
                    >
                        <FiTrash2 size={18} />
                        Reset Data
                    </button>
                    <button
                        onClick={handleReanalyze}
                        disabled={isRefreshing}
                        className="btn-secondary flex items-center gap-2"
                    >
                        <FiRefreshCw size={18} className={isRefreshing ? 'animate-spin' : ''} />
                        {isRefreshing ? 'Refreshing...' : 'Refresh'}
                    </button>
                    <button
                        onClick={() => setShowUploadModal(true)}
                        className="btn-primary flex items-center gap-2"
                    >
                        <FiUpload size={18} />
                        Upload New CV
                    </button>
                </div>
            </div>

            {/* CV Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="glass rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <FiAward className="text-primary-600" size={20} />
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Level</span>
                    </div>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">
                        {cvData.careerLevel}
                    </p>
                </div>
                <div className="glass rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <FiClock className="text-accent-600" size={20} />
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Experience</span>
                    </div>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">
                        {cvData.yearsExperience || 'N/A'} {cvData.yearsExperience === 1 ? 'year' : 'years'}
                    </p>
                </div>
                <div className="glass rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <FiTrendingUp className="text-emerald-600" size={20} />
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Skills Found</span>
                    </div>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">
                        {cvData.skills.length}
                    </p>
                </div>
                <div className="glass rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <FiPlus className="text-purple-600" size={20} />
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Recommended</span>
                    </div>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">
                        {visibleRecs.length}
                    </p>
                </div>
            </div>

            {/* Job Fit Section */}
            {jobMatches.length > 0 && (
                <div className="mb-8">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                        <FiBriefcase className="text-blue-500" />
                        Job Roles You Match
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {jobMatches.map((role) => (
                            <div key={role.id} className="card relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-2 opacity-10 text-9xl pointer-events-none select-none">
                                    {role.icon}
                                </div>
                                <div className="relative z-10">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="text-3xl mb-2">{role.icon}</div>
                                        <div className={`px-2 py-1 rounded text-xs font-bold ${role.matchPercentage >= 80 ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                                            role.matchPercentage >= 50 ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                                                'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                                            }`}>
                                            {role.matchPercentage}% Match
                                        </div>
                                    </div>

                                    <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-1">
                                        {role.title}
                                    </h3>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 h-8 overflow-hidden">
                                        {role.description}
                                    </p>

                                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 mb-4">
                                        <div
                                            className={`h-2 rounded-full transition-all duration-500 ${role.matchPercentage >= 80 ? 'bg-green-500' :
                                                role.matchPercentage >= 50 ? 'bg-yellow-500' :
                                                    'bg-slate-400'
                                                }`}
                                            style={{ width: `${role.matchPercentage}%` }}
                                        ></div>
                                    </div>

                                    {role.missingRequired.length > 0 ? (
                                        <div className="bg-red-50 dark:bg-red-900/20 p-2 rounded-lg border border-red-100 dark:border-red-900/30">
                                            <p className="text-xs font-semibold text-red-600 dark:text-red-400 mb-1">
                                                Missing Required Skills:
                                            </p>
                                            <div className="flex flex-wrap gap-1">
                                                {role.missingRequired.slice(0, 3).map(skill => (
                                                    <span key={skill} className="text-[10px] px-1.5 py-0.5 bg-white dark:bg-slate-800 rounded border border-red-200 dark:border-red-800 text-slate-700 dark:text-slate-300 capitalize">
                                                        {skill}
                                                    </span>
                                                ))}
                                                {role.missingRequired.length > 3 && (
                                                    <span className="text-[10px] text-red-500">+{role.missingRequired.length - 3} more</span>
                                                )}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded-lg border border-green-100 dark:border-green-900/30 flex items-center gap-2">
                                            <FiCheck className="text-green-600 dark:text-green-400" />
                                            <p className="text-xs font-medium text-green-700 dark:text-green-300">
                                                You have all required skills!
                                            </p>
                                        </div>
                                    )}

                                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700">
                                        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">
                                            Find Matching Jobs:
                                        </p>
                                        <div className="flex gap-2">
                                            <a
                                                href={getJobSearchUrl(role.title, 'linkedin')}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex-1 btn-secondary text-xs py-1.5 px-2 flex items-center justify-center gap-1 hover:text-blue-600 dark:hover:text-blue-400"
                                                title="Search on LinkedIn"
                                            >
                                                <FiBriefcase size={12} /> LinkedIn
                                            </a>
                                            <a
                                                href={getJobSearchUrl(role.title, 'remoteok')}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex-1 btn-secondary text-xs py-1.5 px-2 flex items-center justify-center gap-1 hover:text-emerald-600 dark:hover:text-emerald-400"
                                                title="Remote Jobs Worldwide"
                                            >
                                                <FiGlobe size={12} /> Remote
                                            </a>
                                            <a
                                                href={getJobSearchUrl(role.title, 'google')}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex-1 btn-secondary text-xs py-1.5 px-2 flex items-center justify-center gap-1"
                                                title="Search on Google"
                                            >
                                                <FiSearch size={12} /> Google
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2">
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-4 py-2 rounded-xl font-medium whitespace-nowrap transition-all ${selectedCategory === cat
                            ? 'bg-gradient-to-r from-primary-600 to-accent-600 text-white shadow-lg'
                            : 'glass text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                            }`}
                    >
                        {cat === 'all' ? 'All Categories' : cat}
                    </button>
                ))}
            </div>

            {/* High Priority */}
            {filterByCategory(grouped.high).length > 0 && (
                <div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                        <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                        High Priority
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {filterByCategory(grouped.high).map(rec => (
                            <RecommendationCard
                                key={rec.id}
                                recommendation={rec}
                                existingSkills={skills}
                                cvSkills={cvData.skills}
                                onAdd={handleAddSkill}
                                onDismiss={handleDismiss}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* Medium Priority */}
            {filterByCategory(grouped.medium).length > 0 && (
                <div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                        <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                        Medium Priority
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filterByCategory(grouped.medium).map(rec => (
                            <RecommendationCard
                                key={rec.id}
                                recommendation={rec}
                                existingSkills={skills}
                                cvSkills={cvData.skills}
                                onAdd={handleAddSkill}
                                onDismiss={handleDismiss}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* Low Priority */}
            {filterByCategory(grouped.low).length > 0 && (
                <div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                        <span className="w-3 h-3 bg-slate-400 rounded-full"></span>
                        Nice to Have
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filterByCategory(grouped.low).map(rec => (
                            <RecommendationCard
                                key={rec.id}
                                recommendation={rec}
                                existingSkills={skills}
                                cvSkills={cvData.skills}
                                onAdd={handleAddSkill}
                                onDismiss={handleDismiss}
                            />
                        ))}
                    </div>
                </div>
            )}

            <CVUploadModal
                isOpen={showUploadModal}
                onClose={() => setShowUploadModal(false)}
                onCVUploaded={handleCVUpload}
            />
        </div>
    );
};

/**
 * Recommendation Card Component
 */
const RecommendationCard = ({ recommendation, existingSkills, cvSkills, onAdd, onDismiss }) => {
    const [showResources, setShowResources] = useState(false);

    // Check prerequisites status
    const prerequisitesDisplay = recommendation.prerequisites?.map(prereqId => {
        // Find if user has this skill (either in tracker or CV)
        const inTracker = existingSkills?.find(s => s.name.toLowerCase() === prereqId.toLowerCase());
        const inCV = cvSkills?.find(s => s.id === prereqId || s.name.toLowerCase() === prereqId.toLowerCase());
        const isMastered = !!(inTracker || inCV);

        // Format name (capitalize first letter)
        const name = prereqId.charAt(0).toUpperCase() + prereqId.slice(1);

        return { name, isMastered };
    });

    return (
        <div className="card group hover:shadow-xl transition-all flex flex-col h-full">
            <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                    <span className="text-3xl">{recommendation.icon}</span>
                    <div>
                        <h3 className="font-bold text-slate-900 dark:text-white">
                            {recommendation.name}
                        </h3>
                        <p className="text-xs text-slate-600 dark:text-slate-400">
                            {recommendation.category}
                        </p>
                    </div>
                </div>
                <button
                    onClick={() => onDismiss(recommendation.id)}
                    className="p-1 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Dismiss"
                >
                    <FiX size={18} />
                </button>
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 flex-grow">
                {recommendation.description}
            </p>

            {/* Prerequisites Section */}
            {prerequisitesDisplay && prerequisitesDisplay.length > 0 && (
                <div className="mb-4 bg-slate-50 dark:bg-slate-800/50 p-2.5 rounded-lg border border-slate-100 dark:border-slate-700">
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">
                        Prerequisites
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {prerequisitesDisplay.map(prereq => (
                            <div
                                key={prereq.name}
                                className={`flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium border ${prereq.isMastered
                                    ? 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800'
                                    : 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-700 dark:text-slate-400 dark:border-slate-600'
                                    }`}
                            >
                                {prereq.isMastered ? (
                                    <span className="text-green-600 dark:text-green-400">✓</span>
                                ) : (
                                    <span className="text-slate-400">○</span>
                                )}
                                {prereq.name}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="flex items-center gap-2 mb-3">
                <div className="flex-1 bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                    <div
                        className="bg-gradient-to-r from-primary-600 to-accent-600 h-full rounded-full"
                        style={{ width: `${recommendation.relevance}%` }}
                    />
                </div>
                <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                    {recommendation.relevance}% match
                </span>
            </div>

            <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-400">Difficulty:</span>
                    <span className={`font-medium ${recommendation.difficulty === 'Easy' ? 'text-green-600 dark:text-green-400' :
                        recommendation.difficulty === 'Medium' ? 'text-yellow-600 dark:text-yellow-400' :
                            'text-red-600 dark:text-red-400'
                        }`}>
                        {recommendation.difficulty}
                    </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-400">Time to learn:</span>
                    <span className="font-medium text-slate-900 dark:text-white">
                        {recommendation.avgLearningTime}
                    </span>
                </div>
            </div>

            <div className="p-3 glass rounded-lg mb-4">
                <p className="text-sm text-slate-700 dark:text-slate-300">
                    <span className="font-medium">Why:</span> {recommendation.reason}
                </p>
            </div>

            {/* Learning Resources */}
            {recommendation.resources && recommendation.resources.length > 0 && (
                <div className="mb-4">
                    <button
                        onClick={() => setShowResources(!showResources)}
                        className="flex items-center gap-2 text-primary-600 dark:text-primary-400 text-sm font-medium hover:underline w-full"
                    >
                        {showResources ? <FiChevronUp /> : <FiChevronDown />}
                        {showResources ? 'Hide Resources' : 'View Learning Resources'}
                    </button>

                    {showResources && (
                        <div className="mt-2 space-y-2 animate-in fade-in slide-in-from-top-2">
                            {recommendation.resources.map((res, idx) => (
                                <a
                                    key={idx}
                                    href={res.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 p-2 rounded-lg bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors group/link"
                                >
                                    <div className={`p-1.5 rounded-md ${res.type === 'Video'
                                        ? 'bg-red-100 text-red-600 dark:bg-red-900/30'
                                        : 'bg-blue-100 text-blue-600 dark:bg-blue-900/30'
                                        }`}>
                                        {res.type === 'Video' ? <FiVideo size={14} /> : <FiBookOpen size={14} />}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-slate-900 dark:text-white truncate group-hover/link:text-primary-600 transition-colors">
                                            {res.title}
                                        </p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">
                                            {res.type}
                                        </p>
                                    </div>
                                    <FiExternalLink size={14} className="text-slate-400 group-hover/link:text-primary-600" />
                                </a>
                            ))}
                        </div>
                    )}
                </div>
            )}

            <button
                onClick={() => onAdd(recommendation)}
                className="w-full btn-primary flex items-center justify-center gap-2 mt-auto"
            >
                <FiPlus size={18} />
                Add to My Skills
            </button>
        </div>
    );
};

export default RecommendationsPage;
