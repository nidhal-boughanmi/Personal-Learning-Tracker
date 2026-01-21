// Questions MCQ pré-définies par skill
export const MCQ_TEMPLATES = {
    'react js': [
        {
            question: "Qu'est-ce que React?",
            choices: [
                { text: "Une bibliothèque JavaScript pour construire des interfaces utilisateur", isCorrect: true },
                { text: "Un framework backend", isCorrect: false },
                { text: "Une base de données", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce qu'un Hook en React?",
            choices: [
                { text: "Des fonctions qui permettent d'utiliser l'état et les effets dans les composants fonctionnels", isCorrect: true },
                { text: "Un type de composant", isCorrect: false },
                { text: "Une méthode de style CSS", isCorrect: false }
            ]
        },
        {
            question: "Quel Hook est utilisé pour gérer l'état local?",
            choices: [
                { text: "useState", isCorrect: true },
                { text: "useContext", isCorrect: false },
                { text: "useRef", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce que JSX?",
            choices: [
                { text: "JavaScript XML - syntaxe pour écrire du HTML dans JavaScript", isCorrect: true },
                { text: "Un nouveau langage de programmation", isCorrect: false },
                { text: "Une base de données JSON", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce que le Virtual DOM?",
            choices: [
                { text: "Une représentation légère du DOM réel en mémoire", isCorrect: true },
                { text: "Un serveur virtuel", isCorrect: false },
                { text: "Un type de composant React", isCorrect: false }
            ]
        },
        {
            question: "Quel Hook permet d'exécuter des effets secondaires?",
            choices: [
                { text: "useEffect", isCorrect: true },
                { text: "useState", isCorrect: false },
                { text: "useMemo", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce que Props en React?",
            choices: [
                { text: "Des paramètres passés aux composants", isCorrect: true },
                { text: "Des méthodes de style", isCorrect: false },
                { text: "Des hooks personnalisés", isCorrect: false }
            ]
        },
        {
            question: "Comment créer un composant React?",
            choices: [
                { text: "Avec une fonction ou une classe", isCorrect: true },
                { text: "Uniquement avec des classes", isCorrect: false },
                { text: "Avec du HTML pur", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce que le Context API?",
            choices: [
                { text: "Un moyen de partager des données entre composants sans props drilling", isCorrect: true },
                { text: "Une bibliothèque de routage", isCorrect: false },
                { text: "Un gestionnaire d'événements", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce qu'un composant contrôlé?",
            choices: [
                { text: "Un composant input dont la valeur est gérée par l'état React", isCorrect: true },
                { text: "Un composant avec des permissions", isCorrect: false },
                { text: "Un composant de classe", isCorrect: false }
            ]
        },
        {
            question: "Quel est le rôle de key dans les listes React?",
            choices: [
                { text: "Aider React à identifier quels éléments ont changé", isCorrect: true },
                { text: "Sécuriser les données", isCorrect: false },
                { text: "Styliser les éléments", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce que React Router?",
            choices: [
                { text: "Une bibliothèque pour gérer la navigation dans les applications React", isCorrect: true },
                { text: "Un serveur backend", isCorrect: false },
                { text: "Un gestionnaire d'état", isCorrect: false }
            ]
        }
    ],
    'devops': [
        {
            question: "Qu'est-ce que DevOps?",
            choices: [
                { text: "Une culture combinant développement et opérations IT", isCorrect: true },
                { text: "Un langage de programmation", isCorrect: false },
                { text: "Un système d'exploitation", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce que CI/CD?",
            choices: [
                { text: "Continuous Integration / Continuous Deployment", isCorrect: true },
                { text: "Code Integration / Code Development", isCorrect: false },
                { text: "Computer Intelligence / Computer Design", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce que Docker?",
            choices: [
                { text: "Une plateforme de conteneurisation d'applications", isCorrect: true },
                { text: "Un langage de programmation", isCorrect: false },
                { text: "Un système de base de données", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce que Kubernetes?",
            choices: [
                { text: "Un système d'orchestration de conteneurs", isCorrect: true },
                { text: "Un éditeur de code", isCorrect: false },
                { text: "Un framework web", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce que Jenkins?",
            choices: [
                { text: "Un serveur d'automatisation pour CI/CD", isCorrect: true },
                { text: "Une base de données", isCorrect: false },
                { text: "Un langage de script", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce qu'un conteneur Docker?",
            choices: [
                { text: "Une unité d'exécution légère et portable", isCorrect: true },
                { text: "Un fichier de configuration", isCorrect: false },
                { text: "Un serveur virtuel complet", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce que Git?",
            choices: [
                { text: "Un système de contrôle de version distribué", isCorrect: true },
                { text: "Un IDE de développement", isCorrect: false },
                { text: "Un serveur web", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce que l'Infrastructure as Code (IaC)?",
            choices: [
                { text: "Gérer l'infrastructure via du code plutôt que manuellement", isCorrect: true },
                { text: "Écrire du code sur serveur", isCorrect: false },
                { text: "Compiler du code", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce que Terraform?",
            choices: [
                { text: "Un outil d'infrastructure as code", isCorrect: true },
                { text: "Un langage de programmation", isCorrect: false },
                { text: "Un système de monitoring", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce qu'un pipeline CI/CD?",
            choices: [
                { text: "Un processus automatisé de build, test et déploiement", isCorrect: true },
                { text: "Un tube de réseau", isCorrect: false },
                { text: "Un framework de test", isCorrect: false }
            ]
        }
    ],
    'java': [
        {
            question: "Qu'est-ce que Java?",
            choices: [
                { text: "Un langage de programmation orienté objet", isCorrect: true },
                { text: "Un framework JavaScript", isCorrect: false },
                { text: "Une base de données", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce que la JVM?",
            choices: [
                { text: "Java Virtual Machine - environnement d'exécution Java", isCorrect: true },
                { text: "Java Version Manager", isCorrect: false },
                { text: "Java Visual Module", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce qu'une classe en Java?",
            choices: [
                { text: "Un modèle pour créer des objets", isCorrect: true },
                { text: "Une fonction", isCorrect: false },
                { text: "Une variable", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce que l'héritage en Java?",
            choices: [
                { text: "Un mécanisme où une classe peut hériter des propriétés d'une autre", isCorrect: true },
                { text: "Un type de variable", isCorrect: false },
                { text: "Une méthode de boucle", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce qu'une interface en Java?",
            choices: [
                { text: "Un contrat définissant des méthodes qu'une classe doit implémenter", isCorrect: true },
                { text: "Un type de classe", isCorrect: false },
                { text: "Une interface graphique", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce que le polymorphisme?",
            choices: [
                { text: "La capacité d'un objet à prendre plusieurs formes", isCorrect: true },
                { text: "Un type de boucle", isCorrect: false },
                { text: "Une méthode de tri", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce qu'une exception en Java?",
            choices: [
                { text: "Un événement qui interrompt le flux normal du programme", isCorrect: true },
                { text: "Une variable spéciale", isCorrect: false },
                { text: "Un type de classe", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce que Spring Boot?",
            choices: [
                { text: "Un framework Java pour créer des applications rapidement", isCorrect: true },
                { text: "Un IDE Java", isCorrect: false },
                { text: "Un serveur web", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce que Maven?",
            choices: [
                { text: "Un outil de gestion de projet et de dépendances", isCorrect: true },
                { text: "Un framework web", isCorrect: false },
                { text: "Un compilateur", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce que le garbage collector?",
            choices: [
                { text: "Un processus automatique de gestion de la mémoire", isCorrect: true },
                { text: "Un outil de nettoyage de code", isCorrect: false },
                { text: "Un antivirus", isCorrect: false }
            ]
        }
    ],
    'python': [
        {
            question: "Qu'est-ce que Python?",
            choices: [
                { text: "Un langage de programmation interprété et de haut niveau", isCorrect: true },
                { text: "Un framework web", isCorrect: false },
                { text: "Un système d'exploitation", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce qu'un dictionnaire en Python?",
            choices: [
                { text: "Une structure de données clé-valeur", isCorrect: true },
                { text: "Un fichier texte", isCorrect: false },
                { text: "Une classe spéciale", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce que pip?",
            choices: [
                { text: "Le gestionnaire de paquets Python", isCorrect: true },
                { text: "Un framework web", isCorrect: false },
                { text: "Un compilateur", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce que Django?",
            choices: [
                { text: "Un framework web Python", isCorrect: true },
                { text: "Une bibliothèque de data science", isCorrect: false },
                { text: "Un éditeur de code", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce qu'une list comprehension?",
            choices: [
                { text: "Un moyen concis de créer des listes", isCorrect: true },
                { text: "Une fonction de tri", isCorrect: false },
                { text: "Un type de boucle", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce que NumPy?",
            choices: [
                { text: "Une bibliothèque pour le calcul scientifique", isCorrect: true },
                { text: "Un framework web", isCorrect: false },
                { text: "Un gestionnaire de base de données", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce qu'un décorateur en Python?",
            choices: [
                { text: "Une fonction qui modifie le comportement d'une autre fonction", isCorrect: true },
                { text: "Un outil de formatage de code", isCorrect: false },
                { text: "Un type de variable", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce que virtualenv?",
            choices: [
                { text: "Un outil pour créer des environnements Python isolés", isCorrect: true },
                { text: "Un serveur virtuel", isCorrect: false },
                { text: "Un compilateur", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce que Pandas?",
            choices: [
                { text: "Une bibliothèque d'analyse de données", isCorrect: true },
                { text: "Un framework web", isCorrect: false },
                { text: "Un serveur de base de données", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce que Flask?",
            choices: [
                { text: "Un micro-framework web Python", isCorrect: true },
                { text: "Un gestionnaire de paquets", isCorrect: false },
                { text: "Une bibliothèque de graphiques", isCorrect: false }
            ]
        }
    ],
    'data science': [
        {
            question: "Qu'est-ce que le Machine Learning?",
            choices: [
                { text: "L'apprentissage automatique par des algorithmes à partir de données", isCorrect: true },
                { text: "Un langage de programmation", isCorrect: false },
                { text: "Un type de base de données", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce qu'un algorithme supervisé?",
            choices: [
                { text: "Un algorithme qui apprend à partir de données étiquetées", isCorrect: true },
                { text: "Un algorithme sans données", isCorrect: false },
                { text: "Un algorithme de tri", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce qu'un DataFrame?",
            choices: [
                { text: "Une structure de données tabulaire (lignes/colonnes)", isCorrect: true },
                { text: "Une classe Python", isCorrect: false },
                { text: "Un type de graphique", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce que la régression linéaire?",
            choices: [
                { text: "Un algorithme pour prédire des valeurs continues", isCorrect: true },
                { text: "Un type de base de données", isCorrect: false },
                { text: "Un framework web", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce que scikit-learn?",
            choices: [
                { text: "Une bibliothèque Python de machine learning", isCorrect: true },
                { text: "Un langage de programmation", isCorrect: false },
                { text: "Un système de fichiers", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce que TensorFlow?",
            choices: [
                { text: "Une bibliothèque de deep learning", isCorrect: true },
                { text: "Un serveur web", isCorrect: false },
                { text: "Un éditeur de code", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce qu'un réseau de neurones?",
            choices: [
                { text: "Un modèle inspiré du cerveau humain pour l'apprentissage", isCorrect: true },
                { text: "Un type de réseau informatique", isCorrect: false },
                { text: "Une base de données", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce que le overfitting?",
            choices: [
                { text: "Quand un modèle apprend trop les données d'entraînement", isCorrect: true },
                { text: "Quand on a trop de données", isCorrect: false },
                { text: "Quand le modèle est trop simple", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce que la validation croisée?",
            choices: [
                { text: "Une technique pour évaluer la performance d'un modèle", isCorrect: true },
                { text: "Un type de boucle", isCorrect: false },
                { text: "Une méthode de tri", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce que Jupyter Notebook?",
            choices: [
                { text: "Un environnement interactif pour la data science", isCorrect: true },
                { text: "Un framework web", isCorrect: false },
                { text: "Un compilateur", isCorrect: false }
            ]
        }
    ]
};

// Fonction pour normaliser le nom du skill
export const normalizeSkillName = (skillName) => {
    return skillName.toLowerCase().trim();
};

// Fonction pour obtenir les questions pour un skill
export const getQuestionsForSkill = (skillName) => {
    const normalized = normalizeSkillName(skillName);
    return MCQ_TEMPLATES[normalized] || [];
};
