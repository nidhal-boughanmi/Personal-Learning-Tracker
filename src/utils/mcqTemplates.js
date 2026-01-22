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
    ],
    'javascript': [
        {
            question: "Qu'est-ce que JavaScript?",
            choices: [
                { text: "Un langage de programmation pour le web", isCorrect: true },
                { text: "Un framework CSS", isCorrect: false },
                { text: "Une base de données", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce que 'let' et 'const'?",
            choices: [
                { text: "Des mots-clés pour déclarer des variables", isCorrect: true },
                { text: "Des fonctions intégrées", isCorrect: false },
                { text: "Des types de données", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce qu'une fonction fléchée (arrow function)?",
            choices: [
                { text: "Une syntaxe plus courte pour écrire des fonctions", isCorrect: true },
                { text: "une fonction qui pointe vers le haut", isCorrect: false },
                { text: "Un type de boucle", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce que le DOM?",
            choices: [
                { text: "Document Object Model - représentation de la page HTML", isCorrect: true },
                { text: "Data Object Management", isCorrect: false },
                { text: "Dynamic Output Method", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce qu'une Promise?",
            choices: [
                { text: "Un objet représentant une opération asynchrone", isCorrect: true },
                { text: "Une fonction de callback", isCorrect: false },
                { text: "Un type de variable", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce que async/await?",
            choices: [
                { text: "Une syntaxe pour gérer les opérations asynchrones", isCorrect: true },
                { text: "Une bibliothèque externe", isCorrect: false },
                { text: "Un framework", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce que JSON?",
            choices: [
                { text: "JavaScript Object Notation - format d'échange de données", isCorrect: true },
                { text: "Un langage de programmation", isCorrect: false },
                { text: "Une base de données", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce que l'Event Loop?",
            choices: [
                { text: "Le mécanisme qui gère l'exécution du code asynchrone", isCorrect: true },
                { text: "Une boucle for améliorée", isCorrect: false },
                { text: "Un type d'événement", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce que le spread operator (...)?",
            choices: [
                { text: "Un opérateur pour étendre/copier des tableaux ou objets", isCorrect: true },
                { text: "Un opérateur mathématique", isCorrect: false },
                { text: "Une fonction de tri", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce que le hoisting?",
            choices: [
                { text: "Le mécanisme qui déplace les déclarations en haut du scope", isCorrect: true },
                { text: "Une méthode de tri", isCorrect: false },
                { text: "Un type de boucle", isCorrect: false }
            ]
        }
    ],
    'typescript': [
        {
            question: "Qu'est-ce que TypeScript?",
            choices: [
                { text: "Un sur-ensemble de JavaScript avec typage statique", isCorrect: true },
                { text: "Un framework frontend", isCorrect: false },
                { text: "Une bibliothèque de test", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce qu'une interface en TypeScript?",
            choices: [
                { text: "Une structure définissant la forme d'un objet", isCorrect: true },
                { text: "Une classe abstraite", isCorrect: false },
                { text: "Un type de variable", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce qu'un type générique?",
            choices: [
                { text: "Un type paramétrable réutilisable", isCorrect: true },
                { text: "Un type de donnée simple", isCorrect: false },
                { text: "Une variable globale", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce que 'any' en TypeScript?",
            choices: [
                { text: "Un type qui accepte n'importe quelle valeur", isCorrect: true },
                { text: "Une fonction intégrée", isCorrect: false },
                { text: "Un opérateur logique", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce qu'un enum?",
            choices: [
                { text: "Un ensemble de constantes nommées", isCorrect: true },
                { text: "Un type de tableau", isCorrect: false },
                { text: "Une classe spéciale", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce que le type 'union'?",
            choices: [
                { text: "Un type qui peut être l'un de plusieurs types", isCorrect: true },
                { text: "Une opération mathématique", isCorrect: false },
                { text: "Un type de boucle", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce qu'un type assertion?",
            choices: [
                { text: "Une façon de dire au compilateur quel est le type", isCorrect: true },
                { text: "Une fonction de validation", isCorrect: false },
                { text: "Un test unitaire", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce que 'readonly' en TypeScript?",
            choices: [
                { text: "Un modificateur rendant une propriété en lecture seule", isCorrect: true },
                { text: "Une fonction de lecture de fichiers", isCorrect: false },
                { text: "Un type de variable", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce qu'un tuple?",
            choices: [
                { text: "Un tableau avec un nombre fixe d'éléments de types connus", isCorrect: true },
                { text: "Une fonction", isCorrect: false },
                { text: "Une classe", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce que le type 'never'?",
            choices: [
                { text: "Un type représentant une valeur qui n'arrive jamais", isCorrect: true },
                { text: "Un type null", isCorrect: false },
                { text: "Un type booléen", isCorrect: false }
            ]
        }
    ],
    'node.js': [
        {
            question: "Qu'est-ce que Node.js?",
            choices: [
                { text: "Un environnement d'exécution JavaScript côté serveur", isCorrect: true },
                { text: "Un framework frontend", isCorrect: false },
                { text: "Une base de données", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce que npm?",
            choices: [
                { text: "Node Package Manager - gestionnaire de paquets", isCorrect: true },
                { text: "Un framework web", isCorrect: false },
                { text: "Un éditeur de code", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce qu'un module en Node.js?",
            choices: [
                { text: "Un fichier JavaScript réutilisable", isCorrect: true },
                { text: "Une fonction spéciale", isCorrect: false },
                { text: "Un type de variable", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce que Express.js?",
            choices: [
                { text: "Un framework web minimaliste pour Node.js", isCorrect: true },
                { text: "Un ORM", isCorrect: false },
                { text: "Une base de données", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce que le module 'fs'?",
            choices: [
                { text: "File System - pour manipuler les fichiers", isCorrect: true },
                { text: "Full Stack", isCorrect: false },
                { text: "Fast Server", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce que middleware dans Express?",
            choices: [
                { text: "Des fonctions qui s'exécutent entre la requête et la réponse", isCorrect: true },
                { text: "Une base de données intermédiaire", isCorrect: false },
                { text: "Un serveur proxy", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce que package.json?",
            choices: [
                { text: "Un fichier de configuration du projet Node.js", isCorrect: true },
                { text: "Un fichier de données JSON", isCorrect: false },
                { text: "Un fichier de logs", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce que le module 'path'?",
            choices: [
                { text: "Un module pour manipuler les chemins de fichiers", isCorrect: true },
                { text: "Un module de routage", isCorrect: false },
                { text: "Un module de base de données", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce que nodemon?",
            choices: [
                { text: "Un outil qui redémarre automatiquement l'application", isCorrect: true },
                { text: "Un framework web", isCorrect: false },
                { text: "Une base de données", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce que process.env?",
            choices: [
                { text: "Un objet contenant les variables d'environnement", isCorrect: true },
                { text: "Une fonction de processus", isCorrect: false },
                { text: "Un type de serveur", isCorrect: false }
            ]
        }
    ],
    'angular': [
        {
            question: "Qu'est-ce qu'Angular?",
            choices: [
                { text: "Un framework TypeScript pour applications web", isCorrect: true },
                { text: "Une bibliothèque JavaScript", isCorrect: false },
                { text: "Un serveur backend", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce qu'un component en Angular?",
            choices: [
                { text: "Un élément UI avec sa logique et son template", isCorrect: true },
                { text: "Un service", isCorrect: false },
                { text: "Un module", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce qu'un service en Angular?",
            choices: [
                { text: "Une classe pour la logique métier réutilisable", isCorrect: true },
                { text: "Un composant UI", isCorrect: false },
                { text: "Un fichier de configuration", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce que l'injection de dépendances?",
            choices: [
                { text: "Un pattern pour fournir des dépendances aux composants", isCorrect: true },
                { text: "Un type d'import", isCorrect: false },
                { text: "Une méthode de test", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce qu'un directive?",
            choices: [
                { text: "Une classe qui ajoute un comportement aux éléments DOM", isCorrect: true },
                { text: "Un composant", isCorrect: false },
                { text: "Un service", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce que ngModel?",
            choices: [
                { text: "Une directive pour le two-way data binding", isCorrect: true },
                { text: "Un service", isCorrect: false },
                { text: "Un composant", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce qu'un pipe en Angular?",
            choices: [
                { text: "Une transformation de données dans les templates", isCorrect: true },
                { text: "Un type de service", isCorrect: false },
                { text: "Un module", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce que RxJS?",
            choices: [
                { text: "Une bibliothèque pour la programmation réactive", isCorrect: true },
                { text: "Un framework CSS", isCorrect: false },
                { text: "Un gestionnaire d'état", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce qu'un Observable?",
            choices: [
                { text: "Un flux de données asynchrone", isCorrect: true },
                { text: "Une Promise", isCorrect: false },
                { text: "Un composant", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce que le routing en Angular?",
            choices: [
                { text: "La navigation entre différentes vues de l'application", isCorrect: true },
                { text: "Un service backend", isCorrect: false },
                { text: "Un module de sécurité", isCorrect: false }
            ]
        }
    ],
    'vue.js': [
        {
            question: "Qu'est-ce que Vue.js?",
            choices: [
                { text: "Un framework JavaScript progressif pour UI", isCorrect: true },
                { text: "Une bibliothèque backend", isCorrect: false },
                { text: "Un gestionnaire de paquets", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce qu'un component Vue?",
            choices: [
                { text: "Une instance Vue réutilisable avec template, script et style", isCorrect: true },
                { text: "Un service", isCorrect: false },
                { text: "Une route", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce que v-model?",
            choices: [
                { text: "Une directive pour le two-way data binding", isCorrect: true },
                { text: "Un composant", isCorrect: false },
                { text: "Une méthode", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce que Vuex?",
            choices: [
                { text: "Un gestionnaire d'état centralisé pour Vue", isCorrect: true },
                { text: "Un framework CSS", isCorrect: false },
                { text: "Un outil de build", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce qu'un computed property?",
            choices: [
                { text: "Une propriété calculée basée sur d'autres données", isCorrect: true },
                { text: "Une méthode", isCorrect: false },
                { text: "Un composant", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce qu'un watcher?",
            choices: [
                { text: "Une fonction qui observe les changements de données", isCorrect: true },
                { text: "Un composant de surveillance", isCorrect: false },
                { text: "Un service", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce que Vue Router?",
            choices: [
                { text: "Le système de routage officiel pour Vue", isCorrect: true },
                { text: "Un serveur backend", isCorrect: false },
                { text: "Un gestionnaire d'état", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce qu'un lifecycle hook?",
            choices: [
                { text: "Des méthodes appelées à différentes étapes du cycle de vie", isCorrect: true },
                { text: "Un type de directive", isCorrect: false },
                { text: "Un plugin", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce que v-if et v-show?",
            choices: [
                { text: "Des directives pour afficher/cacher des éléments", isCorrect: true },
                { text: "Des méthodes", isCorrect: false },
                { text: "Des composants", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce que Composition API?",
            choices: [
                { text: "Une nouvelle façon d'organiser la logique des composants", isCorrect: true },
                { text: "Un framework CSS", isCorrect: false },
                { text: "Un outil de build", isCorrect: false }
            ]
        }
    ],
    'sql': [
        {
            question: "Qu'est-ce que SQL?",
            choices: [
                { text: "Structured Query Language - langage pour bases de données", isCorrect: true },
                { text: "Un framework web", isCorrect: false },
                { text: "Un langage de programmation orienté objet", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce qu'une clé primaire (Primary Key)?",
            choices: [
                { text: "Un identifiant unique pour chaque ligne d'une table", isCorrect: true },
                { text: "Un mot de passe", isCorrect: false },
                { text: "Un index", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce qu'une jointure (JOIN)?",
            choices: [
                { text: "Une opération combinant des lignes de plusieurs tables", isCorrect: true },
                { text: "Une fonction d'agrégation", isCorrect: false },
                { text: "Un type de contrainte", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce qu'un index?",
            choices: [
                { text: "Une structure pour accélérer les recherches", isCorrect: true },
                { text: "Un type de table", isCorrect: false },
                { text: "Une contrainte", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce que GROUP BY?",
            choices: [
                { text: "Une clause pour regrouper des lignes", isCorrect: true },
                { text: "Une fonction de tri", isCorrect: false },
                { text: "Un type de jointure", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce qu'une transaction?",
            choices: [
                { text: "Un ensemble d'opérations traitées comme une unité", isCorrect: true },
                { text: "Une requête SELECT", isCorrect: false },
                { text: "Un type de table", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce que ACID?",
            choices: [
                { text: "Propriétés des transactions (Atomicité, Cohérence, Isolation, Durabilité)", isCorrect: true },
                { text: "Un type de base de données", isCorrect: false },
                { text: "Un langage de requête", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce qu'une clé étrangère (Foreign Key)?",
            choices: [
                { text: "Une colonne référençant la clé primaire d'une autre table", isCorrect: true },
                { text: "Un index", isCorrect: false },
                { text: "Une requête", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce que la normalisation?",
            choices: [
                { text: "L'organisation des données pour réduire la redondance", isCorrect: true },
                { text: "L'optimisation des requêtes", isCorrect: false },
                { text: "La création d'index", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce qu'une vue (VIEW)?",
            choices: [
                { text: "Une table virtuelle basée sur une requête", isCorrect: true },
                { text: "Une fonction", isCorrect: false },
                { text: "Un index", isCorrect: false }
            ]
        }
    ],
    'mongodb': [
        {
            question: "Qu'est-ce que MongoDB?",
            choices: [
                { text: "Une base de données NoSQL orientée documents", isCorrect: true },
                { text: "Un framework web", isCorrect: false },
                { text: "Un langage de programmation", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce qu'une collection en MongoDB?",
            choices: [
                { text: "Un groupe de documents, équivalent d'une table SQL", isCorrect: true },
                { text: "Un type de requête", isCorrect: false },
                { text: "Un index", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce qu'un document en MongoDB?",
            choices: [
                { text: "Un enregistrement au format BSON/JSON", isCorrect: true },
                { text: "Un fichier texte", isCorrect: false },
                { text: "Une table", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce que _id en MongoDB?",
            choices: [
                { text: "Un identifiant unique automatiquement créé", isCorrect: true },
                { text: "Un type de données", isCorrect: false },
                { text: "Une méthode", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce qu'une agrégation en MongoDB?",
            choices: [
                { text: "Un pipeline de traitement de données", isCorrect: true },
                { text: "Une jointure", isCorrect: false },
                { text: "Un index", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce que Mongoose?",
            choices: [
                { text: "Un ODM (Object Data Modeling) pour MongoDB et Node.js", isCorrect: true },
                { text: "Un serveur MongoDB", isCorrect: false },
                { text: "Un langage de requête", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce qu'un schema dans Mongoose?",
            choices: [
                { text: "Une structure définissant la forme des documents", isCorrect: true },
                { text: "Une collection", isCorrect: false },
                { text: "Une requête", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce que le sharding?",
            choices: [
                { text: "La distribution des données sur plusieurs machines", isCorrect: true },
                { text: "Un type d'index", isCorrect: false },
                { text: "Une méthode de backup", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce qu'une projection?",
            choices: [
                { text: "La sélection de champs spécifiques à retourner", isCorrect: true },
                { text: "Un type de jointure", isCorrect: false },
                { text: "Une collection", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce que find() vs findOne()?",
            choices: [
                { text: "find() retourne plusieurs documents, findOne() un seul", isCorrect: true },
                { text: "Ils sont identiques", isCorrect: false },
                { text: "find() est plus rapide", isCorrect: false }
            ]
        }
    ],
    'aws': [
        {
            question: "Qu'est-ce qu'AWS?",
            choices: [
                { text: "Amazon Web Services - plateforme cloud computing", isCorrect: true },
                { text: "Un langage de programmation", isCorrect: false },
                { text: "Un framework web", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce qu'EC2?",
            choices: [
                { text: "Elastic Compute Cloud - serveurs virtuels", isCorrect: true },
                { text: "Un service de stockage", isCorrect: false },
                { text: "Une base de données", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce que S3?",
            choices: [
                { text: "Simple Storage Service - stockage d'objets", isCorrect: true },
                { text: "Un serveur de calcul", isCorrect: false },
                { text: "Un réseau privé virtuel", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce que Lambda?",
            choices: [
                { text: "Un service de computing serverless", isCorrect: true },
                { text: "Une base de données", isCorrect: false },
                { text: "Un service de stockage", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce que RDS?",
            choices: [
                { text: "Relational Database Service - bases de données gérées", isCorrect: true },
                { text: "Un service de calcul", isCorrect: false },
                { text: "Un CDN", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce que CloudFront?",
            choices: [
                { text: "Un CDN (Content Delivery Network)", isCorrect: true },
                { text: "Un service de base de données", isCorrect: false },
                { text: "Un service de calcul", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce qu'IAM?",
            choices: [
                { text: "Identity and Access Management - gestion des accès", isCorrect: true },
                { text: "Un service de stockage", isCorrect: false },
                { text: "Un service de monitoring", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce que VPC?",
            choices: [
                { text: "Virtual Private Cloud - réseau virtuel isolé", isCorrect: true },
                { text: "Un service de calcul", isCorrect: false },
                { text: "Une base de données", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce que CloudWatch?",
            choices: [
                { text: "Un service de monitoring et logging", isCorrect: true },
                { text: "Un service de stockage", isCorrect: false },
                { text: "Un serveur web", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce que DynamoDB?",
            choices: [
                { text: "Une base de données NoSQL entièrement gérée", isCorrect: true },
                { text: "Un service de calcul", isCorrect: false },
                { text: "Un CDN", isCorrect: false }
            ]
        }
    ],
    'docker': [
        {
            question: "Qu'est-ce que Docker?",
            choices: [
                { text: "Une plateforme de conteneurisation", isCorrect: true },
                { text: "Un système d'exploitation", isCorrect: false },
                { text: "Un langage de programmation", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce qu'une image Docker?",
            choices: [
                { text: "Un modèle en lecture seule pour créer des conteneurs", isCorrect: true },
                { text: "Un fichier de configuration", isCorrect: false },
                { text: "Un conteneur en cours d'exécution", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce qu'un conteneur?",
            choices: [
                { text: "Une instance en cours d'exécution d'une image", isCorrect: true },
                { text: "Un fichier de données", isCorrect: false },
                { text: "Un réseau virtuel", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce qu'un Dockerfile?",
            choices: [
                { text: "Un fichier de recette pour construire une image", isCorrect: true },
                { text: "Un fichier de logs", isCorrect: false },
                { text: "Un fichier de configuration réseau", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce que Docker Hub?",
            choices: [
                { text: "Un registre public d'images Docker", isCorrect: true },
                { text: "Un outil de monitoring", isCorrect: false },
                { text: "Un orchestrateur", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce que docker-compose?",
            choices: [
                { text: "Un outil pour définir et gérer des applications multi-conteneurs", isCorrect: true },
                { text: "Un éditeur de Dockerfile", isCorrect: false },
                { text: "Un registre d'images", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce qu'un volume Docker?",
            choices: [
                { text: "Un mécanisme de persistance des données", isCorrect: true },
                { text: "Un type de conteneur", isCorrect: false },
                { text: "Un réseau", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce qu'un network Docker?",
            choices: [
                { text: "Un réseau virtuel pour la communication entre conteneurs", isCorrect: true },
                { text: "Un stockage de données", isCorrect: false },
                { text: "Une image", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce que EXPOSE dans un Dockerfile?",
            choices: [
                { text: "Une instruction documentant les ports utilisés", isCorrect: true },
                { text: "Une commande qui démarre le conteneur", isCorrect: false },
                { text: "Une variable d'environnement", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce que 'docker ps'?",
            choices: [
                { text: "Commande pour lister les conteneurs en cours d'exécution", isCorrect: true },
                { text: "Commande pour créer une image", isCorrect: false },
                { text: "Commande pour supprimer un conteneur", isCorrect: false }
            ]
        }
    ],
    'git': [
        {
            question: "Qu'est-ce que Git?",
            choices: [
                { text: "Un système de contrôle de version distribué", isCorrect: true },
                { text: "Un service d'hébergement de code", isCorrect: false },
                { text: "Un IDE", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce qu'un commit?",
            choices: [
                { text: "Un snapshot des changements dans le repository", isCorrect: true },
                { text: "Une branche", isCorrect: false },
                { text: "Un fichier de configuration", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce qu'une branche (branch)?",
            choices: [
                { text: "Une ligne de développement indépendante", isCorrect: true },
                { text: "Un commit", isCorrect: false },
                { text: "Un repository", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce qu'un merge?",
            choices: [
                { text: "La fusion de deux branches", isCorrect: true },
                { text: "La suppression d'une branche", isCorrect: false },
                { text: "La création d'un commit", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce qu'un repository?",
            choices: [
                { text: "Un espace de stockage du projet et son historique", isCorrect: true },
                { text: "Un fichier de code", isCorrect: false },
                { text: "Une commande Git", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce que 'git clone'?",
            choices: [
                { text: "Copier un repository distant localement", isCorrect: true },
                { text: "Créer un nouveau fichier", isCorrect: false },
                { text: "Fusionner des branches", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce que 'git pull'?",
            choices: [
                { text: "Récupérer et fusionner les changements du repository distant", isCorrect: true },
                { text: "Envoyer les commits locaux", isCorrect: false },
                { text: "Créer une branche", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce qu'un conflit de merge?",
            choices: [
                { text: "Quand Git ne peut pas fusionner automatiquement", isCorrect: true },
                { text: "Une erreur de syntaxe", isCorrect: false },
                { text: "Un fichier supprimé", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce que .gitignore?",
            choices: [
                { text: "Un fichier listant les fichiers à ignorer par Git", isCorrect: true },
                { text: "Une commande Git", isCorrect: false },
                { text: "Un type de branche", isCorrect: false }
            ]
        },
        {
            question: "Qu'est-ce qu'un remote?",
            choices: [
                { text: "Une version distante du repository", isCorrect: true },
                { text: "Un commit", isCorrect: false },
                { text: "Une branche locale", isCorrect: false }
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
