import { skillsDatabase, careerLevels, complementarySkills, jobRoles } from '../data/skillsDatabase';

/**
 * Skill Recommendation Engine
 * Generates intelligent skill recommendations based on CV analysis
 */

/**
 * Calculate match score for job roles based on CV data
 * @param {Object} cvData - Parsed CV data from CVParser
 * @returns {Array} - List of job roles with match scores
 */
export const calculateJobMatches = (cvData) => {
    if (!cvData) return [];

    const detectedSkillIds = new Set(cvData.skills.map(s => s.id));
    const detectedSkillNames = new Set(cvData.skills.map(s => s.name.toLowerCase()));

    // Helper to check if user has a skill
    const hasSkill = (skillId) => {
        return detectedSkillIds.has(skillId) || detectedSkillNames.has(skillId.toLowerCase());
    };

    return jobRoles.map(role => {
        let score = 0;
        let totalWeight = 0;

        // 1. Required Skills (High Weight)
        const missingRequired = [];
        role.requiredSkills.forEach(skillId => {
            totalWeight += 10;
            if (hasSkill(skillId)) {
                score += 10;
            } else {
                missingRequired.push(skillId);
            }
        });

        // 2. Preferred Skills (Medium Weight)
        const missingPreferred = [];
        role.preferredSkills.forEach(skillId => {
            totalWeight += 5;
            if (hasSkill(skillId)) {
                score += 5;
            } else {
                missingPreferred.push(skillId);
            }
        });

        // 3. Experience (Low Weight but important)
        totalWeight += 5;
        if ((cvData.yearsExperience || 0) >= role.minExperience) {
            score += 5;
        }

        const matchPercentage = Math.round((score / totalWeight) * 100);

        return {
            ...role,
            matchPercentage,
            missingRequired,
            missingPreferred,
            isMatch: matchPercentage >= 60 // Threshold for "Good Match"
        };
    }).sort((a, b) => b.matchPercentage - a.matchPercentage);
};

/**
 * Generate skill recommendations based on parsed CV data
 * @param {Object} cvData - Parsed CV data from CVParser
 * @param {Array} existingSkills - User's existing skills in the app
 * @returns {Array} - Sorted list of recommended skills
 */
export const generateRecommendations = (cvData, existingSkills = []) => {
    const recommendations = [];
    const detectedSkillIds = cvData.skills.map(s => s.id);
    const existingSkillNames = existingSkills.map(s => s.name.toLowerCase());

    // 1. Complementary skills based on detected skills
    const complementaryRecs = getComplementarySkills(detectedSkillIds, existingSkillNames);
    recommendations.push(...complementaryRecs);

    // 2. Trending skills in same categories
    const trendingRecs = getTrendingSkills(cvData.skills, existingSkillNames);
    recommendations.push(...trendingRecs);

    // 3. Career level appropriate skills
    const careerRecs = getCareerLevelSkills(cvData.careerLevel, existingSkillNames);
    recommendations.push(...careerRecs);

    // 4. Fill gaps - essential skills not yet learned
    const gapRecs = getEssentialGaps(detectedSkillIds, existingSkillNames);
    recommendations.push(...gapRecs);

    // Remove duplicates and already existing skills
    const uniqueRecs = removeDuplicates(recommendations, existingSkillNames);

    // Calculate priority and sort
    const scoredRecs = uniqueRecs.map(rec => ({
        ...rec,
        priority: calculatePriority(rec, cvData)
    }));

    return scoredRecs.sort((a, b) => b.relevance - a.relevance);
};

/**
 * Get complementary skills based on detected skills
 */
const getComplementarySkills = (detectedSkillIds, existingSkillNames) => {
    const recommendations = [];

    detectedSkillIds.forEach(skillId => {
        const complements = complementarySkills[skillId] || [];

        complements.forEach(complementId => {
            const skill = skillsDatabase.find(s => s.id === complementId);
            if (skill && !existingSkillNames.includes(skill.name.toLowerCase())) {
                recommendations.push({
                    ...skill,
                    relevance: 90,
                    reason: `Complements your ${skillId.replace('-', ' ')} skills`,
                    source: 'complementary'
                });
            }
        });
    });

    return recommendations;
};

/**
 * Get trending skills in the same categories as detected skills
 */
const getTrendingSkills = (detectedSkills, existingSkillNames) => {
    const recommendations = [];
    const categories = [...new Set(detectedSkills.map(s => s.category))];

    categories.forEach(category => {
        const trendingInCategory = skillsDatabase.filter(s =>
            s.category === category &&
            s.trending &&
            !existingSkillNames.includes(s.name.toLowerCase())
        );

        trendingInCategory.forEach(skill => {
            recommendations.push({
                ...skill,
                relevance: 80,
                reason: `Trending ${category} skill`,
                source: 'trending'
            });
        });
    });

    return recommendations;
};

/**
 * Get skills appropriate for career level
 */
const getCareerLevelSkills = (careerLevel, existingSkillNames) => {
    const recommendations = [];
    const levelData = careerLevels[careerLevel];

    if (levelData && levelData.recommendedSkills) {
        levelData.recommendedSkills.forEach(skillId => {
            const skill = skillsDatabase.find(s => s.id === skillId);
            if (skill && !existingSkillNames.includes(skill.name.toLowerCase())) {
                recommendations.push({
                    ...skill,
                    relevance: 75,
                    reason: `Important for ${levelData.name} developers`,
                    source: 'career-level'
                });
            }
        });
    }

    return recommendations;
};

/**
 * Identify essential skills that are missing
 */
const getEssentialGaps = (detectedSkillIds, existingSkillNames) => {
    const recommendations = [];
    const essentialSkills = ['git', 'testing', 'typescript'];

    essentialSkills.forEach(skillId => {
        if (!detectedSkillIds.includes(skillId)) {
            const skill = skillsDatabase.find(s => s.id === skillId);
            if (skill && !existingSkillNames.includes(skill.name.toLowerCase())) {
                recommendations.push({
                    ...skill,
                    relevance: 85,
                    reason: 'Essential skill for modern development',
                    source: 'gap-analysis'
                });
            }
        }
    });

    return recommendations;
};

/**
 * Remove duplicate recommendations
 */
const removeDuplicates = (recommendations, existingSkillNames) => {
    const seen = new Set(existingSkillNames);
    const unique = [];

    recommendations.forEach(rec => {
        const key = rec.id || rec.name.toLowerCase();
        if (!seen.has(key)) {
            seen.add(key);
            unique.push(rec);
        }
    });

    return unique;
};

/**
 * Calculate priority level (High/Medium/Low)
 */
const calculatePriority = (recommendation, cvData) => {
    const { relevance, inDemand, trending, source } = recommendation;

    // High priority: High relevance + in demand + trending
    if (relevance >= 85 && inDemand && trending) {
        return 'High';
    }

    // Medium priority
    if (relevance >= 70 || source === 'complementary') {
        return 'Medium';
    }

    return 'Low';
};

/**
 * Get top N recommendations
 * @param {Array} recommendations - All recommendations
 * @param {number} count - Number to return
 * @returns {Array} - Top N recommendations
 */
export const getTopRecommendations = (recommendations, count = 10) => {
    return recommendations.slice(0, count);
};

/**
 * Group recommendations by priority
 * @param {Array} recommendations - All recommendations
 * @returns {Object} - Grouped by priority
 */
export const groupByPriority = (recommendations) => {
    return {
        high: recommendations.filter(r => r.priority === 'High'),
        medium: recommendations.filter(r => r.priority === 'Medium'),
        low: recommendations.filter(r => r.priority === 'Low'),
    };
};

/**
 * Group recommendations by category
 * @param {Array} recommendations - All recommendations
 * @returns {Object} - Grouped by category
 */
export const groupByCategory = (recommendations) => {
    const grouped = {};

    recommendations.forEach(rec => {
        const category = rec.category || 'Other';
        if (!grouped[category]) {
            grouped[category] = [];
        }
        grouped[category].push(rec);
    });

    return grouped;
};
