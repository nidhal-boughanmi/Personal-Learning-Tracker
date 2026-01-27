/**
 * Comprehensive Tech Skills Database
 * Used for intelligent skill recommendations based on CV analysis
 */

export const skillsDatabase = [
    // Frontend
    {
        id: 'react',
        name: 'React',
        category: 'Frontend',
        relatedSkills: ['javascript', 'typescript', 'nextjs', 'redux'],
        prerequisites: ['javascript', 'html', 'css'],
        difficulty: 'Medium',
        avgLearningTime: '2-3 months',
        trending: true,
        inDemand: true,
        keywords: ['react', 'reactjs', 'react.js', 'jsx'],
        icon: '⚛️',
        description: 'Popular UI library for building interactive interfaces',
        resources: [
            { title: 'Official React Documentation', url: 'https://react.dev/learn', type: 'Documentation' },
            { title: 'React Crash Course 2024', url: 'https://www.youtube.com/watch?v=w7ejDZ8SWv8', type: 'Video' }
        ]
    },
    {
        id: 'nextjs',
        name: 'Next.js',
        category: 'Frontend',
        relatedSkills: ['react', 'typescript', 'vercel'],
        prerequisites: ['react', 'javascript'],
        difficulty: 'Medium',
        avgLearningTime: '1-2 months',
        trending: true,
        inDemand: true,
        keywords: ['nextjs', 'next.js', 'next'],
        icon: '▲',
        description: 'React framework for production with SSR and SSG',
        resources: [
            { title: 'Next.js Documentation', url: 'https://nextjs.org/docs', type: 'Documentation' },
            { title: 'Next.js Full Course', url: 'https://www.youtube.com/watch?v=ZVnjOPwW4ZA', type: 'Video' }
        ]
    },
    {
        id: 'typescript',
        name: 'TypeScript',
        category: 'Frontend',
        relatedSkills: ['javascript', 'react', 'angular', 'nodejs'],
        prerequisites: ['javascript'],
        difficulty: 'Medium',
        avgLearningTime: '1-2 months',
        trending: true,
        inDemand: true,
        keywords: ['typescript', 'ts', 'typed javascript'],
        icon: '🔷',
        description: 'Typed superset of JavaScript for safer code',
        resources: [
            { title: 'TypeScript Handbook', url: 'https://www.typescriptlang.org/docs/', type: 'Documentation' },
            { title: 'TypeScript for Beginners', url: 'https://www.youtube.com/watch?v=BwuLxPH8IDs', type: 'Video' }
        ]
    },
    {
        id: 'vue',
        name: 'Vue.js',
        category: 'Frontend',
        relatedSkills: ['javascript', 'nuxt', 'vuex'],
        prerequisites: ['javascript', 'html', 'css'],
        difficulty: 'Medium',
        avgLearningTime: '2-3 months',
        trending: true,
        inDemand: true,
        keywords: ['vue', 'vuejs', 'vue.js'],
        icon: '💚',
        description: 'Progressive JavaScript framework'
    },
    {
        id: 'angular',
        name: 'Angular',
        category: 'Frontend',
        relatedSkills: ['typescript', 'rxjs', 'ngrx'],
        prerequisites: ['typescript', 'javascript'],
        difficulty: 'Hard',
        avgLearningTime: '3-4 months',
        trending: false,
        inDemand: true,
        keywords: ['angular', 'angularjs'],
        icon: '🅰️',
        description: 'Comprehensive framework by Google'
    },
    {
        id: 'tailwindcss',
        name: 'Tailwind CSS',
        category: 'Frontend',
        relatedSkills: ['css', 'html', 'react'],
        prerequisites: ['css', 'html'],
        difficulty: 'Easy',
        avgLearningTime: '2-4 weeks',
        trending: true,
        inDemand: true,
        keywords: ['tailwind', 'tailwindcss', 'utility-first css'],
        icon: '🎨',
        description: 'Utility-first CSS framework'
    },

    // Backend
    {
        id: 'nodejs',
        name: 'Node.js',
        category: 'Backend',
        relatedSkills: ['javascript', 'express', 'mongodb', 'typescript'],
        prerequisites: ['javascript'],
        difficulty: 'Medium',
        avgLearningTime: '2-3 months',
        trending: true,
        inDemand: true,
        keywords: ['nodejs', 'node.js', 'node'],
        icon: '🟢',
        description: 'JavaScript runtime for server-side development'
    },
    {
        id: 'express',
        name: 'Express.js',
        category: 'Backend',
        relatedSkills: ['nodejs', 'javascript', 'rest-api'],
        prerequisites: ['nodejs', 'javascript'],
        difficulty: 'Easy',
        avgLearningTime: '1 month',
        trending: true,
        inDemand: true,
        keywords: ['express', 'expressjs', 'express.js'],
        icon: '🚂',
        description: 'Minimal Node.js web framework'
    },
    {
        id: 'python',
        name: 'Python',
        category: 'Backend',
        relatedSkills: ['django', 'flask', 'fastapi', 'data-science'],
        prerequisites: [],
        difficulty: 'Easy',
        avgLearningTime: '2-3 months',
        trending: true,
        inDemand: true,
        keywords: ['python', 'py'],
        icon: '🐍',
        description: 'Versatile programming language'
    },
    {
        id: 'django',
        name: 'Django',
        category: 'Backend',
        relatedSkills: ['python', 'postgresql', 'rest-api'],
        prerequisites: ['python'],
        difficulty: 'Medium',
        avgLearningTime: '2-3 months',
        trending: true,
        inDemand: true,
        keywords: ['django', 'python web framework'],
        icon: '🎸',
        description: 'High-level Python web framework'
    },
    {
        id: 'fastapi',
        name: 'FastAPI',
        category: 'Backend',
        relatedSkills: ['python', 'rest-api', 'swagger'],
        prerequisites: ['python'],
        difficulty: 'Medium',
        avgLearningTime: '1-2 months',
        trending: true,
        inDemand: true,
        keywords: ['fastapi', 'fast api'],
        icon: '⚡',
        description: 'Modern, fast Python API framework'
    },

    // DevOps & Cloud
    {
        id: 'docker',
        name: 'Docker',
        category: 'DevOps',
        relatedSkills: ['kubernetes', 'linux', 'ci-cd'],
        prerequisites: ['linux'],
        difficulty: 'Medium',
        avgLearningTime: '1-2 months',
        trending: true,
        inDemand: true,
        keywords: ['docker', 'containerization', 'containers'],
        icon: '🐳',
        description: 'Platform for containerizing applications'
    },
    {
        id: 'kubernetes',
        name: 'Kubernetes',
        category: 'DevOps',
        relatedSkills: ['docker', 'cloud', 'linux'],
        prerequisites: ['docker', 'linux'],
        difficulty: 'Hard',
        avgLearningTime: '3-4 months',
        trending: true,
        inDemand: true,
        keywords: ['kubernetes', 'k8s', 'container orchestration'],
        icon: '☸️',
        description: 'Container orchestration platform'
    },
    {
        id: 'aws',
        name: 'AWS',
        category: 'Cloud',
        relatedSkills: ['cloud', 'devops', 'linux'],
        prerequisites: [],
        difficulty: 'Medium',
        avgLearningTime: '3-4 months',
        trending: true,
        inDemand: true,
        keywords: ['aws', 'amazon web services', 'ec2', 's3', 'lambda'],
        icon: '☁️',
        description: 'Amazon Web Services cloud platform'
    },
    {
        id: 'cicd',
        name: 'CI/CD',
        category: 'DevOps',
        relatedSkills: ['git', 'docker', 'jenkins', 'github-actions'],
        prerequisites: ['git'],
        difficulty: 'Medium',
        avgLearningTime: '1-2 months',
        trending: true,
        inDemand: true,
        keywords: ['ci/cd', 'cicd', 'continuous integration', 'continuous deployment', 'jenkins', 'github actions'],
        icon: '🔄',
        description: 'Continuous Integration and Deployment'
    },

    // Database
    {
        id: 'mongodb',
        name: 'MongoDB',
        category: 'Database',
        relatedSkills: ['nodejs', 'nosql', 'mongoose'],
        prerequisites: [],
        difficulty: 'Easy',
        avgLearningTime: '1-2 months',
        trending: true,
        inDemand: true,
        keywords: ['mongodb', 'mongo', 'nosql'],
        icon: '🍃',
        description: 'Popular NoSQL database'
    },
    {
        id: 'postgresql',
        name: 'PostgreSQL',
        category: 'Database',
        relatedSkills: ['sql', 'database', 'backend'],
        prerequisites: [],
        difficulty: 'Medium',
        avgLearningTime: '2-3 months',
        trending: true,
        inDemand: true,
        keywords: ['postgresql', 'postgres', 'sql'],
        icon: '🐘',
        description: 'Advanced open-source relational database'
    },

    // AI/ML
    {
        id: 'machine-learning',
        name: 'Machine Learning',
        category: 'AI/ML',
        relatedSkills: ['python', 'tensorflow', 'pytorch', 'data-science'],
        prerequisites: ['python', 'statistics'],
        difficulty: 'Hard',
        avgLearningTime: '4-6 months',
        trending: true,
        inDemand: true,
        keywords: ['machine learning', 'ml', 'ai', 'artificial intelligence'],
        icon: '🤖',
        description: 'Building intelligent systems that learn from data'
    },
    {
        id: 'llm',
        name: 'Large Language Models',
        category: 'AI/ML',
        relatedSkills: ['python', 'machine-learning', 'openai', 'transformers'],
        prerequisites: ['python', 'machine-learning'],
        difficulty: 'Hard',
        avgLearningTime: '3-4 months',
        trending: true,
        inDemand: true,
        keywords: ['llm', 'gpt', 'openai', 'large language models', 'chatgpt', 'gemini'],
        icon: '🧠',
        description: 'Working with AI language models like GPT'
    },

    // Mobile
    {
        id: 'react-native',
        name: 'React Native',
        category: 'Mobile',
        relatedSkills: ['react', 'javascript', 'mobile'],
        prerequisites: ['react', 'javascript'],
        difficulty: 'Medium',
        avgLearningTime: '2-3 months',
        trending: true,
        inDemand: true,
        keywords: ['react native', 'mobile development', 'ios', 'android'],
        icon: '📱',
        description: 'Build native mobile apps with React'
    },

    // Fundamentals
    {
        id: 'git',
        name: 'Git',
        category: 'Tools',
        relatedSkills: ['github', 'version-control'],
        prerequisites: [],
        difficulty: 'Easy',
        avgLearningTime: '2-4 weeks',
        trending: true,
        inDemand: true,
        keywords: ['git', 'version control', 'github', 'gitlab'],
        icon: '🔧',
        description: 'Version control system'
    },
    {
        id: 'testing',
        name: 'Testing',
        category: 'Tools',
        relatedSkills: ['jest', 'cypress', 'unit-testing'],
        prerequisites: ['javascript'],
        difficulty: 'Medium',
        avgLearningTime: '1-2 months',
        trending: true,
        inDemand: true,
        keywords: ['testing', 'unit testing', 'jest', 'cypress', 'tdd'],
        icon: '🧪',
        description: 'Software testing and quality assurance'
    },
];

/**
 * Career levels with their characteristics
 */
export const careerLevels = {
    JUNIOR: {
        name: 'Junior',
        yearsExperience: [0, 2],
        keywords: ['junior', 'entry level', 'graduate', 'intern', 'trainee'],
        recommendedSkills: ['git', 'testing', 'typescript', 'docker']
    },
    MID: {
        name: 'Mid-Level',
        yearsExperience: [2, 5],
        keywords: ['mid-level', 'intermediate', 'developer', 'engineer'],
        recommendedSkills: ['system-design', 'cicd', 'kubernetes', 'architecture']
    },
    SENIOR: {
        name: 'Senior',
        yearsExperience: [5, 100],
        keywords: ['senior', 'lead', 'principal', 'architect', 'staff'],
        recommendedSkills: ['architecture', 'mentoring', 'system-design', 'leadership']
    }
};

/**
 * Skill complementarity rules
 * If user has skill X, recommend skill Y
 */
export const complementarySkills = {
    'react': ['nextjs', 'typescript', 'testing'],
    'javascript': ['typescript', 'nodejs', 'testing'],
    'python': ['django', 'fastapi', 'machine-learning'],
    'nodejs': ['express', 'mongodb', 'typescript'],
    'docker': ['kubernetes', 'cicd', 'aws'],
    'frontend': ['backend', 'fullstack'],
};

/**
 * Job Roles for "Job Fit" analysis
 * Defines required skills and experience for common roles
 */
export const jobRoles = [
    {
        id: 'frontend-dev',
        title: 'Frontend Developer',
        description: 'Building modern, interactive user interfaces',
        icon: '🎨',
        requiredSkills: ['html', 'css', 'javascript', 'react', 'git'],
        preferredSkills: ['typescript', 'nextjs', 'tailwindcss', 'testing'],
        minExperience: 1
    },
    {
        id: 'backend-dev',
        title: 'Backend Developer',
        description: 'Server-side logic, databases, and APIs',
        icon: '⚙️',
        requiredSkills: ['nodejs', 'javascript', 'database', 'rest-api', 'git'],
        preferredSkills: ['python', 'docker', 'mongodb', 'postgresql'],
        minExperience: 1
    },
    {
        id: 'fullstack-dev',
        title: 'Full Stack Developer',
        description: 'Handling both client-side and server-side development',
        icon: '🚀',
        requiredSkills: ['javascript', 'react', 'nodejs', 'database', 'git'],
        preferredSkills: ['typescript', 'nextjs', 'docker', 'cloud'],
        minExperience: 2
    },
    {
        id: 'devops-eng',
        title: 'DevOps Engineer',
        description: 'Bridging development and operations with automation',
        icon: '🔄',
        requiredSkills: ['linux', 'git', 'docker', 'cicd'],
        preferredSkills: ['kubernetes', 'aws', 'python', 'bash'],
        minExperience: 2
    }
];
