import { skillsDatabase, careerLevels } from '../data/skillsDatabase';

/**
 * CV Parser Utility
 * Extracts relevant information from CV text for skill recommendations
 */

/**
 * Extract technical skills mentioned in CV
 * @param {string} cvText - Raw CV text
 * @returns {Array} - List of detected skills
 */
export const extractSkills = (cvText) => {
    const lowerText = cvText.toLowerCase();
    const detectedSkills = [];

    skillsDatabase.forEach(skill => {
        const found = skill.keywords.some(keyword =>
            lowerText.includes(keyword.toLowerCase())
        );

        if (found) {
            detectedSkills.push({
                ...skill,
                confidence: calculateConfidence(cvText, skill.keywords)
            });
        }
    });

    return detectedSkills.sort((a, b) => b.confidence - a.confidence);
};

/**
 * Calculate confidence score for a skill detection
 * @param {string} text - CV text
 * @param {Array} keywords - Skill keywords
 * @returns {number} - Confidence score (0-100)
 */
const calculateConfidence = (text, keywords) => {
    const lowerText = text.toLowerCase();
    let mentions = 0;

    keywords.forEach(keyword => {
        const regex = new RegExp(`\\b${keyword.toLowerCase()}\\b`, 'gi');
        const matches = lowerText.match(regex);
        if (matches) {
            mentions += matches.length;
        }
    });

    return Math.min(mentions * 20, 100); // Max 100
};

/**
 * Extract years of experience from CV
 * @param {string} cvText - Raw CV text
 * @returns {number} - Estimated years of experience
 */
export const extractExperience = (cvText) => {
    const patterns = [
        /(\d+)\+?\s*years?\s*(of)?\s*experience/i,
        /experience:\s*(\d+)\+?\s*years?/i,
        /(\d+)\+?\s*ans?\s*d'expérience/i, // French
    ];

    for (const pattern of patterns) {
        const match = cvText.match(pattern);
        if (match) {
            return parseInt(match[1]);
        }
    }

    // Estimate from date ranges
    const yearPattern = /(\d{4})\s*[-–—]\s*(\d{4}|present|aujourd'hui|current)/gi;
    const matches = cvText.matchAll(yearPattern);
    const ranges = Array.from(matches);

    if (ranges.length > 0) {
        const currentYear = new Date().getFullYear();
        let totalYears = 0;

        ranges.forEach(match => {
            const startYear = parseInt(match[1]);
            const endYear = match[2].toLowerCase().includes('present') ||
                match[2].toLowerCase().includes('current') ||
                match[2].toLowerCase().includes('aujourd')
                ? currentYear
                : parseInt(match[2]);

            totalYears += (endYear - startYear);
        });

        return totalYears;
    }

    return 0; // Unknown
};

/**
 * Extract job titles/roles from CV
 * @param {string} cvText - Raw CV text
 * @returns {Array} - List of detected job titles
 */
export const extractJobTitles = (cvText) => {
    const commonTitles = [
        'developer', 'engineer', 'programmer', 'architect', 'lead',
        'senior', 'junior', 'full stack', 'fullstack', 'frontend', 'backend',
        'devops', 'data scientist', 'analyst', 'designer', 'manager',
        'développeur', 'ingénieur', 'architecte', // French
    ];

    const lowerText = cvText.toLowerCase();
    const foundTitles = [];

    commonTitles.forEach(title => {
        if (lowerText.includes(title)) {
            foundTitles.push(title);
        }
    });

    return [...new Set(foundTitles)]; // Remove duplicates
};

/**
 * Detect career level based on CV content
 * @param {string} cvText - Raw CV text
 * @param {number} yearsExp - Years of experience
 * @returns {string} - Career level (JUNIOR, MID, SENIOR)
 */
export const detectCareerLevel = (cvText, yearsExp = null) => {
    const lowerText = cvText.toLowerCase();

    // First try keyword matching
    for (const [level, data] of Object.entries(careerLevels)) {
        const hasKeyword = data.keywords.some(kw => lowerText.includes(kw));
        if (hasKeyword) {
            return level;
        }
    }

    // Fallback to years of experience
    if (yearsExp !== null) {
        if (yearsExp < 2) return 'JUNIOR';
        if (yearsExp < 5) return 'MID';
        return 'SENIOR';
    }

    return 'MID'; // Default
};

/**
 * Extract education/certifications
 * @param {string} cvText - Raw CV text
 * @returns {Array} - List of detected degrees/certs
 */
export const extractEducation = (cvText) => {
    const educationKeywords = [
        'bachelor', 'master', 'phd', 'degree', 'diploma', 'certification',
        'licence', 'master', 'doctorat', 'diplôme', 'certification',
        'computer science', 'engineering', 'software'
    ];

    const lowerText = cvText.toLowerCase();
    const foundEducation = [];

    educationKeywords.forEach(keyword => {
        if (lowerText.includes(keyword)) {
            foundEducation.push(keyword);
        }
    });

    return [...new Set(foundEducation)];
};

/**
 * Parse entire CV and return structured data
 * @param {string} cvText - Raw CV text
 * @returns {Object} - Structured CV data
 */
export const parseCV = (cvText) => {
    const yearsExp = extractExperience(cvText);

    return {
        rawText: cvText,
        skills: extractSkills(cvText),
        yearsExperience: yearsExp,
        careerLevel: detectCareerLevel(cvText, yearsExp),
        jobTitles: extractJobTitles(cvText),
        education: extractEducation(cvText),
        parsedAt: new Date().toISOString(),
    };
};

/**
 * Extract text from PDF file using PDF.js
 * @param {File} file - PDF file object
 * @returns {Promise<string>} - Extracted text
 */
export const extractTextFromPDF = async (file) => {
    try {
        // Dynamically import PDF.js
        const pdfjsLib = await import('pdfjs-dist');

        // Import worker as URL (Vite will handle this)
        const workerUrl = new URL(
            'pdfjs-dist/build/pdf.worker.min.mjs',
            import.meta.url
        ).href;

        pdfjsLib.GlobalWorkerOptions.workerSrc = workerUrl;

        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

        let fullText = '';

        // Extract text from each page
        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            const pageText = textContent.items.map(item => item.str).join(' ');
            fullText += pageText + '\n';
        }

        return fullText;
    } catch (error) {
        console.error('Error extracting PDF text:', error);
        throw new Error('Failed to extract text from PDF. Please try copying and pasting your CV text instead.');
    }
};
