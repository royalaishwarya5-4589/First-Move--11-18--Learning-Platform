export interface CourseArea {
  id: string;
  name: string;
  icon: string;
  description: string;
  industryExamples: string[];
}

export interface CourseTool {
  id: string;
  name: string;
  category: 'core' | 'framework' | 'tool' | 'runtime' | 'platform' | 'testing';
  icon: string;
  description: string;
  relevance: string;
}

export interface CourseJobRole {
  id: string;
  title: string;
  description: string;
  experienceLevel: 'Entry-Level' | 'Mid-Level' | 'Senior' | 'All Levels';
  typicalResponsibilities: string[];
  keySkills: string[];
  industryDemand: 'High' | 'Very High' | 'Growing' | 'Essential';
}

export interface SkillCategoryGroup {
  technical: string[];
  problemSolving: string[];
  professional: string[];
}

export interface CareerPathwayStep {
  courseName: string;
  skills: string[];
  tools: string[];
  areas: string[];
  jobRoles: string[];
}

export interface CourseLearningStage {
  stage: number;
  name: string;
  subtitle: string;
  skillsCovered: string[];
  projectsMilestones: string[];
  hours: number;
}

export interface CourseProjectSummary {
  name: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Capstone';
  skillsUsed: string[];
  toolsUsed: string[];
  description: string;
  practicalOutput: string;
}

export interface CourseCareerMetadata {
  slug: string;
  tagline: string;
  overviewSummary: string;
  areas: CourseArea[];
  tools: CourseTool[];
  jobRoles: CourseJobRole[];
  skills: SkillCategoryGroup;
  pathway: CareerPathwayStep;
  learningStages: CourseLearningStage[];
  realWorldProjects: CourseProjectSummary[];
  careerCompassDomainSlug: string;
}

export const COURSE_CAREER_REGISTRY: Record<string, CourseCareerMetadata> = {
  java: {
    slug: 'java',
    tagline: 'Master enterprise backend architectures, object-oriented design, and resilient distributed services.',
    overviewSummary: 'Java powers over 60% of Fortune 500 enterprise architectures, mission-critical financial networks, high-throughput Android applications, and cloud-native microservices.',
    careerCompassDomainSlug: 'java',
    areas: [
      {
        id: 'enterprise',
        name: 'Enterprise Backend Systems',
        icon: '🏢',
        description: 'Design secure, fault-tolerant transactional engines and microservices handling millions of daily requests.',
        industryExamples: ['Banking Core Engines', 'E-Commerce Backends', 'Payment Gateways'],
      },
      {
        id: 'cloud',
        name: 'Cloud Microservices',
        icon: '☁️',
        description: 'Containerize and orchestrate scalable Java REST APIs using Spring Boot, Docker, and Kubernetes.',
        industryExamples: ['AWS Lambda Services', 'Microservice Registries', 'Streaming APIs'],
      },
      {
        id: 'android',
        name: 'Android & Mobile Platforms',
        icon: '📱',
        description: 'Build native high-performance mobile application logic, services, and offline-first storage.',
        industryExamples: ['Fintech Mobile Apps', 'Enterprise Field Tools', 'Android SDKs'],
      },
      {
        id: 'distributed',
        name: 'Distributed Big Data',
        icon: '⚡',
        description: 'Process terabytes of telemetry data with Java-powered big data ecosystems like Apache Kafka and Spark.',
        industryExamples: ['Real-Time Event Streams', 'Telemetry Pipelines', 'Fraud Detection Engines'],
      },
    ],
    tools: [
      { id: 'java-jdk', name: 'Java SE / OpenJDK', category: 'core', icon: '☕', description: 'Modern Java LTS runtime, JVM memory model, and garbage collection tuning.', relevance: 'Primary Language' },
      { id: 'spring-boot', name: 'Spring Boot', category: 'framework', icon: '🍃', description: 'Industry-standard framework for building production-grade microservices and REST APIs.', relevance: 'Backend Framework' },
      { id: 'git', name: 'Git & GitHub', category: 'tool', icon: '🐙', description: 'Distributed version control, branching strategies, and CI/CD pull request reviews.', relevance: 'DevOps & Collaboration' },
      { id: 'intellij', name: 'IntelliJ IDEA', category: 'tool', icon: '💡', description: 'Professional IDE with bytecode inspection, refactoring, and interactive debuggers.', relevance: 'Developer Environment' },
      { id: 'maven', name: 'Maven / Gradle', category: 'tool', icon: '📦', description: 'Build lifecycle management, multi-module dependencies, and test automation packaging.', relevance: 'Build System' },
      { id: 'postgresql', name: 'PostgreSQL & JDBC', category: 'platform', icon: '🐘', description: 'Relational data modeling, JDBC driver connection pooling, and ACID transaction safety.', relevance: 'Data Persistence' },
    ],
    skills: {
      technical: ['Object-Oriented Programming (OOP)', 'Java Collections Framework', 'JVM Concurrency & Multithreading', 'Spring Boot REST APIs', 'JDBC & SQL Transactions', 'Exception Architecture'],
      problemSolving: ['Algorithmic Logic Design', 'Memory Leak Analysis & Profiling', 'Defensive Input Sanitization', 'Async Deadlock Prevention', 'Modular Code Refactoring'],
      professional: ['Git Feature-Branch Workflow', 'Clean Architecture Principles', 'Code Review & Pull Requests', 'API Documentation (OpenAPI)', 'Unit Testing Best Practices'],
    },
    jobRoles: [
      {
        id: 'jr-backend',
        title: 'Backend Software Engineer',
        description: 'Architect, implement, and maintain scalable REST APIs, microservices, and persistent database layers.',
        experienceLevel: 'Entry-Level',
        typicalResponsibilities: ['Write robust Spring Boot REST controllers', 'Optimize SQL queries and connection pools', 'Maintain 90%+ unit test coverage'],
        keySkills: ['Java', 'Spring Boot', 'SQL', 'Git', 'REST APIs'],
        industryDemand: 'Very High',
      },
      {
        id: 'fullstack-java',
        title: 'Full Stack Java Developer',
        description: 'Connect modern frontend interfaces with robust Java enterprise services and backend integrations.',
        experienceLevel: 'Mid-Level',
        typicalResponsibilities: ['Build end-to-end user workflows', 'Implement JWT authentication & role-based access', 'Deploy containerized services'],
        keySkills: ['Java', 'Spring Boot', 'React/Next.js', 'PostgreSQL', 'Docker'],
        industryDemand: 'High',
      },
      {
        id: 'systems-eng',
        title: 'Enterprise Software Engineer',
        description: 'Develop mission-critical transactional platforms for banking, logistics, healthcare, and enterprise SaaS.',
        experienceLevel: 'Mid-Level',
        typicalResponsibilities: ['Ensure high availability and fault tolerance', 'Integrate Kafka message queues', 'Conduct production profiling & memory tuning'],
        keySkills: ['Java Core', 'Multithreading', 'Kafka', 'Cloud Architecture', 'CI/CD'],
        industryDemand: 'High',
      },
      {
        id: 'lead-java',
        title: 'Senior Java Systems Architect',
        description: 'Guide multi-team technical strategy, microservice decoupling, and distributed event-driven architectures.',
        experienceLevel: 'Senior',
        typicalResponsibilities: ['Design domain-driven microservices', 'Enforce enterprise security standards', 'Mentor junior and mid-level engineering teams'],
        keySkills: ['Distributed Systems', 'Spring Cloud', 'Kubernetes', 'System Design'],
        industryDemand: 'Very High',
      },
    ],
    pathway: {
      courseName: 'Java Programming',
      skills: ['OOP Architecture', 'Collections', 'Multithreading', 'Spring Boot', 'SQL & JDBC'],
      tools: ['IntelliJ IDEA', 'Maven', 'Git & GitHub', 'Spring Boot', 'PostgreSQL'],
      areas: ['Enterprise Backends', 'Cloud Microservices', 'Android Platforms', 'Distributed Data'],
      jobRoles: ['Backend Engineer', 'Full Stack Developer', 'Enterprise Engineer', 'Systems Architect'],
    },
    learningStages: [
      { stage: 1, name: 'Foundation', subtitle: 'Syntax, JVM Memory, and Control Flow', skillsCovered: ['Data Types', 'Loops', 'Methods', 'Arrays'], projectsMilestones: ['CLI Student Record Registry'], hours: 8 },
      { stage: 2, name: 'Core Concepts', subtitle: 'Object-Oriented Programming & Polymorphism', skillsCovered: ['Encapsulation', 'Inheritance', 'Interfaces', 'Abstract Classes'], projectsMilestones: ['Banking Transaction Engine'], hours: 10 },
      { stage: 3, name: 'Intermediate Skills', subtitle: 'Collections Framework & Exception Handling', skillsCovered: ['ArrayLists', 'HashMaps', 'Custom Exceptions', 'File I/O'], projectsMilestones: ['Inventory & Order Manager'], hours: 12 },
      { stage: 4, name: 'Real-World Projects', subtitle: 'Multithreading & Concurrency', skillsCovered: ['Threads', 'ExecutorService', 'Synchronization', 'Deadlock Prevention'], projectsMilestones: ['Concurrent Task Queue Engine'], hours: 14 },
      { stage: 5, name: 'Advanced Engineering', subtitle: 'Spring Boot REST APIs & JDBC Persistence', skillsCovered: ['Spring MVC', 'JPA/Hibernate', 'REST Design', 'JWT Auth'], projectsMilestones: ['Production E-Commerce Backend API'], hours: 16 },
      { stage: 6, name: 'Career Readiness', subtitle: 'System Design & Interview Preparation', skillsCovered: ['SOLID Principles', 'Design Patterns', 'System Scalability'], projectsMilestones: ['Capstone Portfolio Review'], hours: 12 },
    ],
    realWorldProjects: [
      {
        name: 'Secure Banking Transaction Engine',
        difficulty: 'Intermediate',
        skillsUsed: ['OOP', 'Custom Exceptions', 'ACID Transactions', 'File I/O'],
        toolsUsed: ['Java 21', 'IntelliJ IDEA', 'Maven', 'JUnit 5'],
        description: 'Build a double-entry ledger banking simulation that processes deposits, multi-currency transfers, and cryptographic audit logs.',
        practicalOutput: 'Production-ready ledger with automated balance consistency verification.',
      },
      {
        name: 'Enterprise E-Commerce REST API',
        difficulty: 'Advanced',
        skillsUsed: ['Spring Boot', 'Spring Data JPA', 'JWT Auth', 'PostgreSQL'],
        toolsUsed: ['Spring Boot 3', 'PostgreSQL', 'Docker', 'Swagger UI'],
        description: 'Architect a scalable product catalog and order processing microservice with role-based JWT security and automated test suites.',
        practicalOutput: 'Containerized REST microservice ready to deploy on AWS or Docker.',
      },
      {
        name: 'Concurrent High-Throughput Task Queue',
        difficulty: 'Capstone',
        skillsUsed: ['Multithreading', 'BlockingQueue', 'Atomic References', 'Deadlock Prevention'],
        toolsUsed: ['Java Concurrency Utilities', 'VisualVM', 'JUnit 5'],
        description: 'Implement a non-blocking producer-consumer pipeline capable of processing 10,000 asynchronous events per second safely.',
        practicalOutput: 'Benchmarked asynchronous processing engine with telemetry metrics.',
      },
    ],
  },

  dsa: {
    slug: 'dsa',
    tagline: 'Master algorithmic problem solving, time-space efficiency, and foundational technical interview patterns.',
    overviewSummary: 'Data Structures and Algorithms represent the global standard for evaluating engineering competency, enabling developers to build systems that scale gracefully from thousands to billions of users.',
    careerCompassDomainSlug: 'dsa',
    areas: [
      {
        id: 'software-eng',
        name: 'Software Engineering Interviews',
        icon: '🎯',
        description: 'Crack coding assessments and live whiteboarding rounds at top tech companies and high-growth startups.',
        industryExamples: ['FAANG/Big Tech Interviews', 'Startup Engineering Challenges', 'Competitive Coding'],
      },
      {
        id: 'performance',
        name: 'High-Performance Systems',
        icon: '⚡',
        description: 'Optimize execution time and memory consumption for high-frequency trading, game engines, and databases.',
        industryExamples: ['Query Engines', 'Trading Platforms', 'Game Physics Loops'],
      },
      {
        id: 'system-design',
        name: 'System Design Foundations',
        icon: '🏛️',
        description: 'Apply graph partitioning, caching algorithms (LRU/LFU), and tree indices to distributed web architectures.',
        industryExamples: ['Distributed Caches (Redis)', 'B-Tree Database Indexing', 'Graph Routing Engines'],
      },
      {
        id: 'routing',
        name: 'Network & Search Algorithms',
        icon: '🗺️',
        description: 'Implement shortest path routing (Dijkstra, A*), Trie prefix autocomplete, and indexing algorithms.',
        industryExamples: ['Navigation Apps (GPS)', 'Search Engine Autocomplete', 'Recommendation Networks'],
      },
    ],
    tools: [
      { id: 'language', name: 'Python / Java / C++', category: 'core', icon: '💻', description: 'Universal programming languages for implementing algorithmic solutions.', relevance: 'Primary Language' },
      { id: 'monaco', name: 'Interactive Code Workbench', category: 'tool', icon: '⚡', description: 'In-browser code execution engine with live test suite verification and time metrics.', relevance: 'Practice Tool' },
      { id: 'git', name: 'Git & GitHub', category: 'tool', icon: '🐙', description: 'Version control for maintaining an engineering algorithmic solution repository.', relevance: 'Portfolio' },
      { id: 'profiler', name: 'Complexity Profiler', category: 'tool', icon: '⏱️', description: 'Real-time Big-O analysis of asymptotic execution time and peak memory consumption.', relevance: 'Benchmarking' },
    ],
    skills: {
      technical: ['Big-O Asymptotic Analysis', 'Arrays, Strings & Two Pointers', 'Linked Lists, Stacks & Queues', 'Binary Trees & BSTs', 'Dynamic Programming & Memoization', 'Graph Traversals (BFS/DFS)'],
      problemSolving: ['Pattern Recognition (Sliding Window, Fast/Slow)', 'Optimal Substructure Identification', 'Edge Case Detection', 'Trade-off Evaluation (Time vs Space)', 'Recursive Breakdown'],
      professional: ['Clear Whiteboard Communication', 'Dry-Run Code Tracing', 'Test-Driven Edge Case Writing', 'Complexity Explanation', 'Interview Presence'],
    },
    jobRoles: [
      {
        id: 'swe-entry',
        title: 'Software Development Engineer (SDE I)',
        description: 'Pass engineering screening rounds and build robust production application features.',
        experienceLevel: 'Entry-Level',
        typicalResponsibilities: ['Write efficient, scalable algorithmic code', 'Resolve production performance bottlenecks', 'Implement clean unit tests'],
        keySkills: ['Data Structures', 'Algorithms', 'Java / Python / C++', 'Debugging'],
        industryDemand: 'Very High',
      },
      {
        id: 'swe-ii',
        title: 'Software Development Engineer (SDE II)',
        description: 'Design modular systems, eliminate compute inefficiencies, and optimize database indexing algorithms.',
        experienceLevel: 'Mid-Level',
        typicalResponsibilities: ['Optimize backend response latencies', 'Design caching algorithms', 'Conduct peer code reviews'],
        keySkills: ['Advanced Algorithms', 'Concurrency', 'System Performance', 'Microservices'],
        industryDemand: 'Very High',
      },
      {
        id: 'performance-eng',
        title: 'Performance & Optimization Engineer',
        description: 'Specialize in squeezing millisecond performance out of mission-critical compute-bound services.',
        experienceLevel: 'Senior',
        typicalResponsibilities: ['Profile memory and CPU cache lines', 'Refactor O(N²) hotspots to O(N log N)', 'Design custom tree/hash structures'],
        keySkills: ['Big-O Optimization', 'Memory Locality', 'Profiling Tools', 'C++ / Rust / Go'],
        industryDemand: 'High',
      },
    ],
    pathway: {
      courseName: 'Data Structures & Algorithms',
      skills: ['Big-O Analysis', 'Trees & Graphs', 'Dynamic Programming', 'Sliding Window', 'Binary Search'],
      tools: ['Python / Java', 'Monaco IDE', 'Complexity Profiler', 'GitHub Solution Log'],
      areas: ['Engineering Interviews', 'Performance Tuning', 'Distributed Caches', 'Search Routing'],
      jobRoles: ['SDE I (Software Engineer)', 'SDE II', 'Performance Engineer', 'Algorithm Specialist'],
    },
    learningStages: [
      { stage: 1, name: 'Foundation', subtitle: 'Big-O Analysis, Arrays & Strings', skillsCovered: ['Time Complexity', 'Space Complexity', 'Two Pointers', 'Prefix Sums'], projectsMilestones: ['Complexity Benchmarking Suite'], hours: 8 },
      { stage: 2, name: 'Core Structures', subtitle: 'Linked Lists, Stacks & Queues', skillsCovered: ['Pointers', 'Monotonic Stacks', 'Circular Queues', 'Recursion'], projectsMilestones: ['Expression Evaluator & Undo Stack'], hours: 10 },
      { stage: 3, name: 'Non-Linear Structures', subtitle: 'Binary Trees, BSTs & Heaps', skillsCovered: ['Tree Traversals', 'Priority Queues', 'Balancing', 'Lowest Common Ancestor'], projectsMilestones: ['Autocomplete Trie & Huffman Encoder'], hours: 12 },
      { stage: 4, name: 'Graph Theory', subtitle: 'BFS, DFS, Dijkstra & Topological Sort', skillsCovered: ['Adjacency Lists', 'Cycle Detection', 'Shortest Paths', 'Bipartite Graphs'], projectsMilestones: ['Network Routing & Dependency Resolver'], hours: 14 },
      { stage: 5, name: 'Dynamic Programming', subtitle: 'Memoization, Tabulation & Space Optimization', skillsCovered: ['1D/2D DP', 'Knapsack Pattern', 'Subsequence Matching', 'State Compression'], projectsMilestones: ['Portfolio Resource Allocator'], hours: 16 },
      { stage: 6, name: 'Interview Readiness', subtitle: 'Mock Technical Rounds & Timed Challenges', skillsCovered: ['Live Whiteboarding', 'Interview Strategy', 'Edge Case Auditing'], projectsMilestones: ['Comprehensive Interview Capstone'], hours: 12 },
    ],
    realWorldProjects: [
      {
        name: 'In-Memory Key-Value Cache with LRU Eviction',
        difficulty: 'Intermediate',
        skillsUsed: ['Doubly Linked List', 'Hash Map', 'O(1) Get/Put Operations', 'Concurrency'],
        toolsUsed: ['Java / Python', 'Unit Test Framework', 'Benchmark Suite'],
        description: 'Construct a production-grade LRU cache matching Redis architecture with strict O(1) read and write time guarantees.',
        practicalOutput: 'High-speed caching library with automated eviction testing.',
      },
      {
        name: 'Real-Time Prefix Autocomplete Trie Engine',
        difficulty: 'Intermediate',
        skillsUsed: ['Trie Data Structure', 'Prefix Traversal', 'Priority Queue Top-K', 'String Indexing'],
        toolsUsed: ['Monaco Workbench', 'Dictionary Dataset'],
        description: 'Build a search autocomplete service that indexes 100,000 English vocabulary words and returns the top 5 relevant completions in sub-millisecond time.',
        practicalOutput: 'Interactive autocomplete component with latency statistics.',
      },
      {
        name: 'GPS Shortest Path Urban Transit Navigator',
        difficulty: 'Advanced',
        skillsUsed: ['Graph Representation', 'Dijkstra Algorithm', 'A* Heuristic Search', 'Min-Heap'],
        toolsUsed: ['OpenStreetMap Graph Data', 'Python / Java'],
        description: 'Model a city roadmap as a directed weighted graph and compute fastest multi-stop routes factoring in traffic constraints.',
        practicalOutput: 'Route calculation algorithm with waypoint optimization.',
      },
    ],
  },

  python: {
    slug: 'python',
    tagline: 'Master Python programming, automated workflows, modern data structures, and backend application services.',
    overviewSummary: 'Python is the world’s most versatile programming language, leading the global software ecosystem in AI research, data analytics, automated cloud scripting, and rapid web backend engineering.',
    careerCompassDomainSlug: 'python',
    areas: [
      {
        id: 'ai-data',
        name: 'AI & Data Engineering',
        icon: '🤖',
        description: 'Clean, transform, and feed datasets into modern machine learning pipelines and neural networks.',
        industryExamples: ['Pandas ETL Pipelines', 'AI Model Training', 'Data Warehousing'],
      },
      {
        id: 'automation',
        name: 'Scripting & Automation',
        icon: '⚙️',
        description: 'Automate repetitive desktop workflows, parse CSV/JSON datasets, and orchestrate cloud tasks.',
        industryExamples: ['Web Scraping Bots', 'Server Health Checkers', 'File System Cleaners'],
      },
      {
        id: 'backend',
        name: 'Web Backends & APIs',
        icon: '🌐',
        description: 'Build robust asynchronous REST APIs using FastAPI, Django, or Flask with high developer velocity.',
        industryExamples: ['FastAPI Microservices', 'Django Enterprise Portals', 'Authentication Services'],
      },
      {
        id: 'cyber',
        name: 'Cybersecurity Tooling',
        icon: '🛡️',
        description: 'Write custom security scripts for packet analysis, port auditing, and automated vulnerability scanning.',
        industryExamples: ['Network Scanners', 'Log Anomaly Detectors', 'Penetration Testing Tools'],
      },
    ],
    tools: [
      { id: 'python-core', name: 'Python 3.12+', category: 'core', icon: '🐍', description: 'Modern Python interpreter, type hinting, and standard libraries.', relevance: 'Core Language' },
      { id: 'fastapi', name: 'FastAPI / Flask', category: 'framework', icon: '⚡', description: 'Asynchronous web frameworks for building high-performance REST APIs.', relevance: 'Web Framework' },
      { id: 'pandas', name: 'Pandas & NumPy', category: 'tool', icon: '🐼', description: 'Fast numerical computing, multidimensional matrices, and data frame manipulation.', relevance: 'Data Tool' },
      { id: 'git', name: 'Git & GitHub', category: 'tool', icon: '🐙', description: 'Version control and automated GitHub Actions workflows.', relevance: 'DevOps' },
      { id: 'vscode', name: 'VS Code & Pyodide', category: 'tool', icon: '💻', description: 'In-browser WebAssembly Python execution and professional editor environment.', relevance: 'Workbench' },
    ],
    skills: {
      technical: ['Python Idioms (List Comprehensions, Generators)', 'Object-Oriented Design (OOP)', 'File System I/O (pathlib, CSV, JSON)', 'REST API Development (FastAPI)', 'Error Handling (try/except)', 'Unit Testing (pytest)'],
      problemSolving: ['Data Aggregation & Filtering', 'State Machine Modeling', 'Defensive Input Parsing', 'Script Performance Profiling', 'Algorithmic Optimization'],
      professional: ['PEP 8 Clean Code Standards', 'Type Annotations & Documentation', 'Git Version Control', 'Virtual Environments (venv)', 'Collaborative Code Reviews'],
    },
    jobRoles: [
      {
        id: 'py-dev',
        title: 'Python Software Developer',
        description: 'Build backend APIs, automation scripts, and business logic for web applications.',
        experienceLevel: 'Entry-Level',
        typicalResponsibilities: ['Develop clean Python modules and functions', 'Integrate third-party REST APIs', 'Write automated pytest test suites'],
        keySkills: ['Python 3', 'FastAPI/Flask', 'SQL', 'Git', 'Data Structures'],
        industryDemand: 'Very High',
      },
      {
        id: 'data-eng',
        title: 'Junior Data Engineer',
        description: 'Design and execute ETL data pipelines, transform raw business logs, and load data into analytical lakes.',
        experienceLevel: 'Entry-Level',
        typicalResponsibilities: ['Extract and transform messy CSV/JSON logs', 'Schedule automated ingestion scripts', 'Validate data integrity'],
        keySkills: ['Python', 'Pandas', 'SQL', 'ETL Pipelines', 'Airflow Basics'],
        industryDemand: 'Very High',
      },
      {
        id: 'automation-eng',
        title: 'Automation & DevOps Engineer',
        description: 'Automate deployment pipelines, cloud provisioning, server monitoring, and reliability checks.',
        experienceLevel: 'Mid-Level',
        typicalResponsibilities: ['Write infrastructure maintenance scripts', 'Create automated CI/CD test runners', 'Monitor cloud metric anomalies'],
        keySkills: ['Python Scripting', 'Bash', 'Docker', 'Linux', 'AWS'],
        industryDemand: 'High',
      },
    ],
    pathway: {
      courseName: 'Python Programming',
      skills: ['Python Fundamentals', 'OOP & Modular Code', 'File I/O & Automation', 'FastAPI Services', 'Pytest Testing'],
      tools: ['Python 3', 'VS Code', 'Pandas', 'FastAPI', 'Git & GitHub'],
      areas: ['Data Engineering', 'Web Backends', 'Automation Scripting', 'Security Tooling'],
      jobRoles: ['Python Developer', 'Junior Data Engineer', 'Automation Engineer', 'Backend Specialist'],
    },
    learningStages: [
      { stage: 1, name: 'Foundation', subtitle: 'Variables, Types, and Conditional Logic', skillsCovered: ['Data Types', 'Conditionals', 'Loops', 'Functions'], projectsMilestones: ['CLI Student Management System'], hours: 8 },
      { stage: 2, name: 'Core Data Structures', subtitle: 'Lists, Dictionaries, Sets & Tuples', skillsCovered: ['Dictionary Mappings', 'List Comprehensions', 'Data Nesting'], projectsMilestones: ['Personal Expense Tracker'], hours: 10 },
      { stage: 3, name: 'Modular Programming', subtitle: 'Files, Pathlib & Exception Handling', skillsCovered: ['pathlib File I/O', 'CSV/JSON Serialization', 'try/except'], projectsMilestones: ['Automated File Organizer Utility'], hours: 12 },
      { stage: 4, name: 'Object-Oriented Design', subtitle: 'Classes, Dunder Methods & Inheritance', skillsCovered: ['Encapsulation', 'Polymorphism', 'Dunder Methods'], projectsMilestones: ['E-Commerce Inventory Engine'], hours: 14 },
      { stage: 5, name: 'Web Services & APIs', subtitle: 'FastAPI & Async Network Programming', skillsCovered: ['REST Architecture', 'Pydantic Schemas', 'Async/Await'], projectsMilestones: ['Production REST API Service'], hours: 16 },
      { stage: 6, name: 'Career Readiness', subtitle: 'Packaging, Pytest & Interview Challenges', skillsCovered: ['Pytest', 'Virtual Environments', 'Algorithmic Drills'], projectsMilestones: ['Capstone Portfolio Demonstration'], hours: 10 },
    ],
    realWorldProjects: [
      {
        name: 'Interactive CLI Student Academic Registry',
        difficulty: 'Beginner',
        skillsUsed: ['Dictionaries', 'File Serialization', 'Input Validation', 'Menu Loops'],
        toolsUsed: ['Python 3', 'JSON Standard Library'],
        description: 'Build a production-grade Command-Line Interface application that persists student GPA records and queries academic standing.',
        practicalOutput: 'Persistent terminal software ready for daily administrative usage.',
      },
      {
        name: 'Automated Desktop File Organizer & Cleaner',
        difficulty: 'Intermediate',
        skillsUsed: ['pathlib', 'shutil', 'Execution Logging', 'Dry-Run Simulation'],
        toolsUsed: ['Python 3', 'Logging Module', 'OS Utilities'],
        description: 'Build a background system utility that scans cluttered directories, classifies extensions, and organizes files safely with collision resolution.',
        practicalOutput: 'Automated utility script that executes on system schedule.',
      },
      {
        name: 'High-Performance Asynchronous FastAPI Service',
        difficulty: 'Advanced',
        skillsUsed: ['FastAPI', 'Pydantic Data Models', 'Async Handlers', 'JWT Tokens'],
        toolsUsed: ['FastAPI', 'Uvicorn', 'SQLite / PostgreSQL', 'Swagger UI'],
        description: 'Architect a secure web API with automated OpenAPI documentation, token authorization, and database persistence.',
        practicalOutput: 'Deployable REST API container with live interactive docs.',
      },
    ],
  },

  'html-css': {
    slug: 'html-css',
    tagline: 'Build semantic, accessible, responsive, and aesthetically stunning modern web applications.',
    overviewSummary: 'Web development forms the digital front door for all modern software. Mastering semantic HTML5, responsive CSS Grid/Flexbox, and modern UX design unlocks the ability to build world-class user experiences.',
    careerCompassDomainSlug: 'web-development',
    areas: [
      {
        id: 'frontend',
        name: 'Frontend Web Engineering',
        icon: '💻',
        description: 'Craft responsive landing pages, customer portals, and web interfaces across all device viewports.',
        industryExamples: ['SaaS Web Apps', 'Marketing Landing Pages', 'E-Commerce Storefronts'],
      },
      {
        id: 'design-systems',
        name: 'UI/UX & Design Systems',
        icon: '🎨',
        description: 'Translate Figma designs into pixel-perfect, accessible CSS token architectures and component libraries.',
        industryExamples: ['Component Libraries', 'Tailwind/CSS Design Tokens', 'Design Handoff'],
      },
      {
        id: 'accessibility',
        name: 'Web Accessibility & Performance',
        icon: '♿',
        description: 'Ensure compliance with WCAG 2.1 AA accessibility guidelines, fast Core Web Vitals, and SEO tags.',
        industryExamples: ['High-Performance Blogs', 'Government Web Portals', 'SEO Optimized Sites'],
      },
    ],
    tools: [
      { id: 'html5', name: 'Semantic HTML5', category: 'core', icon: '🌐', description: 'Semantic structure, metadata SEO, ARIA roles, and accessible form controls.', relevance: 'Markup Core' },
      { id: 'css3', name: 'Modern CSS3 & Flexbox/Grid', category: 'core', icon: '🎨', description: 'CSS custom properties (variables), animations, transitions, and layout engines.', relevance: 'Styling Core' },
      { id: 'git', name: 'Git & GitHub Pages / Vercel', category: 'tool', icon: '🚀', description: 'Instant continuous deployment and web hosting pipelines.', relevance: 'Deployment' },
      { id: 'devtools', name: 'Chrome Developer Tools', category: 'tool', icon: '🔍', description: 'DOM inspection, responsive viewport emulation, and performance auditing.', relevance: 'Inspection' },
    ],
    skills: {
      technical: ['Semantic HTML5 Markup', 'CSS Flexbox & CSS Grid', 'Responsive Breakpoint Design', 'CSS Custom Properties (Variables)', 'WCAG Accessibility & ARIA', 'SEO Metadata & OpenGraph'],
      problemSolving: ['Cross-Browser Compatibility Debugging', 'Layout Shift Prevention (CLS)', 'CSS Specificity Hierarchy Management', 'Fluid Responsive Typography Scaling'],
      professional: ['Figma-to-Code Translation', 'Clean CSS Organization & BEM', 'Mobile-First Philosophy', 'Code Documentation & Accessibility Auditing'],
    },
    jobRoles: [
      {
        id: 'frontend-jr',
        title: 'Junior Frontend Developer',
        description: 'Convert UI/UX mockups into pixel-perfect, responsive web pages and reusable components.',
        experienceLevel: 'Entry-Level',
        typicalResponsibilities: ['Code responsive HTML/CSS templates', 'Ensure cross-device mobile responsiveness', 'Optimize image assets and Core Web Vitals'],
        keySkills: ['HTML5', 'CSS3', 'Responsive Design', 'Git', 'Basic JavaScript'],
        industryDemand: 'Very High',
      },
      {
        id: 'ui-eng',
        title: 'UI Engineer / Web Designer',
        description: 'Bridge the gap between product design and engineering by implementing polished design systems.',
        experienceLevel: 'Mid-Level',
        typicalResponsibilities: ['Build scalable CSS theme architectures', 'Implement fluid micro-animations', 'Maintain company design token standards'],
        keySkills: ['Advanced CSS', 'CSS Variables', 'Animations', 'Accessibility (a11y)', 'Figma'],
        industryDemand: 'High',
      },
    ],
    pathway: {
      courseName: 'Web Development (HTML & CSS)',
      skills: ['Semantic HTML5', 'CSS Flexbox & Grid', 'Responsive Layouts', 'Web Accessibility', 'Modern CSS Variables'],
      tools: ['HTML5', 'CSS3', 'Chrome DevTools', 'VS Code', 'Vercel / GitHub Pages'],
      areas: ['Frontend Engineering', 'Responsive Design', 'Design Systems', 'Web Accessibility'],
      jobRoles: ['Frontend Developer', 'UI Engineer', 'Web Designer', 'Website Specialist'],
    },
    learningStages: [
      { stage: 1, name: 'Foundation', subtitle: 'Semantic HTML Structure and Document Hierarchy', skillsCovered: ['Headings', 'Paragraphs', 'Links', 'Lists', 'Forms'], projectsMilestones: ['Personal Bio & Portfolio Structure'], hours: 6 },
      { stage: 2, name: 'Core Styling', subtitle: 'Box Model, Typography, and Color Harmonies', skillsCovered: ['Margins', 'Padding', 'Borders', 'Web Fonts', 'Colors'], projectsMilestones: ['Styling The Modern Business Card'], hours: 8 },
      { stage: 3, name: 'Modern Layouts', subtitle: 'CSS Flexbox Alignment and Flow Systems', skillsCovered: ['Flex Direction', 'Justify Content', 'Align Items', 'Flex Wrap'], projectsMilestones: ['Responsive Navigation & Card Grid'], hours: 10 },
      { stage: 4, name: 'Advanced Layouts', subtitle: 'CSS Grid, Templates, and Two-Dimensional Alignment', skillsCovered: ['Grid Templates', 'Repeat & MinMax', 'Grid Areas', 'Gap Systems'], projectsMilestones: ['Magazine Layout & Analytics Dashboard'], hours: 12 },
      { stage: 5, name: 'Responsive Web Design', subtitle: 'Media Queries, Fluid Sizing, and Mobile-First UX', skillsCovered: ['Breakpoints', 'Clamp() Sizing', 'Responsive Images', 'Mobile Menus'], projectsMilestones: ['Full Responsive Multi-Page Website'], hours: 14 },
      { stage: 6, name: 'Career Readiness', subtitle: 'Accessibility (a11y), Animations, and Deployment', skillsCovered: ['WCAG Compliance', 'Keyframe Animations', 'Vercel Deployment'], projectsMilestones: ['Production Portfolio Launch'], hours: 8 },
    ],
    realWorldProjects: [
      {
        name: 'Modern SaaS Product Landing Page',
        difficulty: 'Beginner',
        skillsUsed: ['Semantic HTML5', 'CSS Flexbox & Grid', 'Fluid Typography', 'Custom Properties'],
        toolsUsed: ['HTML5', 'CSS3', 'Google Fonts', 'Chrome DevTools'],
        description: 'Build a high-converting software landing page complete with hero section, feature cards, pricing table, and testimonials.',
        practicalOutput: 'Production-ready responsive marketing site ready for hosting on Vercel.',
      },
      {
        name: 'Interactive Analytics & Metrics Dashboard Layout',
        difficulty: 'Intermediate',
        skillsUsed: ['CSS Grid Areas', 'Glassmorphism Effects', 'Dark/Light Theme Variables', 'Responsive Breakpoints'],
        toolsUsed: ['CSS3 Variables', 'SVG Icons', 'Responsive Emulators'],
        description: 'Design a sleek administration dashboard with collapsible side navigation, stat cards, metric charts, and data tables.',
        practicalOutput: 'Modular dashboard interface template for modern web applications.',
      },
    ],
  },

  'cloud-devops': {
    slug: 'cloud-devops',
    tagline: 'Orchestrate resilient cloud infrastructure, automated CI/CD pipelines, and containerized microservices.',
    overviewSummary: 'Cloud Computing and DevOps bridge the boundary between code and production, enabling continuous integration, zero-downtime deployments, and elastic scalability across global cloud networks.',
    careerCompassDomainSlug: 'cloud-computing',
    areas: [
      {
        id: 'cloud-infra',
        name: 'Cloud Infrastructure (AWS & GCP)',
        icon: '☁️',
        description: 'Provision compute instances, virtual private networks, load balancers, and distributed object storage.',
        industryExamples: ['AWS EC2 & S3', 'Serverless Functions', 'Virtual Private Clouds (VPC)'],
      },
      {
        id: 'containerization',
        name: 'Containerization & Orchestration',
        icon: '🐳',
        description: 'Package applications into lightweight, reproducible Docker containers and orchestrate clusters with Kubernetes.',
        industryExamples: ['Docker Microservices', 'Kubernetes Pods', 'Helm Deployment Charts'],
      },
      {
        id: 'cicd',
        name: 'CI/CD Automation Pipelines',
        icon: '🔄',
        description: 'Automate testing, linting, security scans, and production deployments on every Git pull request.',
        industryExamples: ['GitHub Actions Workflows', 'GitLab CI Runners', 'Automated Release Tags'],
      },
      {
        id: 'observability',
        name: 'Monitoring & Site Reliability',
        icon: '📊',
        description: 'Track server telemetry, error rates, CPU bottlenecks, and uptime SLAs using Prometheus and Grafana.',
        industryExamples: ['Uptime Dashboards', 'Alerting Bots', 'Log Aggregation'],
      },
    ],
    tools: [
      { id: 'aws', name: 'Amazon Web Services (AWS)', category: 'platform', icon: '☁️', description: 'Industry-leading cloud platform offering compute (EC2), storage (S3), and networking.', relevance: 'Primary Cloud' },
      { id: 'docker', name: 'Docker', category: 'tool', icon: '🐳', description: 'Containerization engine for standardizing software dependencies across development and production.', relevance: 'Containers' },
      { id: 'k8s', name: 'Kubernetes', category: 'platform', icon: '☸️', description: 'Container orchestration platform managing deployment scaling, self-healing, and service discovery.', relevance: 'Orchestration' },
      { id: 'terraform', name: 'Terraform (IaC)', category: 'tool', icon: '🏗️', description: 'Infrastructure as Code language for declaring and provisioning cloud topology programmatically.', relevance: 'Infrastructure Code' },
      { id: 'github-actions', name: 'GitHub Actions', category: 'tool', icon: '🐙', description: 'Automated CI/CD workflows triggered on repository events and code pushes.', relevance: 'CI/CD Pipeline' },
      { id: 'linux', name: 'Linux Server Administration', category: 'core', icon: '🐧', description: 'Bash scripting, systemd service management, SSH keys, and network firewalls.', relevance: 'Server OS' },
    ],
    skills: {
      technical: ['Docker Container Building & Multi-Stage Builds', 'Kubernetes Pod & Service Deployment', 'AWS Cloud Core Services (EC2, S3, IAM, VPC)', 'CI/CD Pipeline Construction (GitHub Actions)', 'Infrastructure as Code (Terraform)', 'Linux CLI & Shell Automation'],
      problemSolving: ['Deployment Failure Diagnosis', 'Resource Constraint Tuning', 'Network Security Group Auditing', 'Container Image Minimization', 'Zero-Downtime Rollback Strategies'],
      professional: ['Infrastructure Version Control', 'Security Best Practices (Least Privilege IAM)', 'Production Incident Runbooks', 'Cost Optimization in Cloud'],
    },
    jobRoles: [
      {
        id: 'devops-jr',
        title: 'Junior DevOps Engineer',
        description: 'Maintain automated CI/CD pipelines, containerize microservices, and assist with cloud server monitoring.',
        experienceLevel: 'Entry-Level',
        typicalResponsibilities: ['Write Dockerfiles and docker-compose configurations', 'Build GitHub Actions test automation workflows', 'Monitor cloud server health metrics'],
        keySkills: ['Linux', 'Docker', 'AWS Basics', 'Git', 'Bash Scripting'],
        industryDemand: 'Very High',
      },
      {
        id: 'cloud-eng',
        title: 'Cloud Infrastructure Engineer',
        description: 'Design and deploy scalable, secure virtual networks, compute clusters, and storage infrastructure.',
        experienceLevel: 'Mid-Level',
        typicalResponsibilities: ['Provision cloud resources using Terraform', 'Configure load balancers and auto-scaling groups', 'Enforce IAM security policies'],
        keySkills: ['AWS / GCP', 'Terraform', 'Kubernetes', 'Networking (VPC, DNS, TLS)'],
        industryDemand: 'Very High',
      },
      {
        id: 'sre',
        title: 'Site Reliability Engineer (SRE)',
        description: 'Guarantee 99.99% system uptime, automate disaster recovery, and optimize infrastructure latency.',
        experienceLevel: 'Mid-Level',
        typicalResponsibilities: ['Set up Prometheus & Grafana alerting dashboards', 'Conduct post-incident blameless postmortems', 'Automate self-healing cluster recovery'],
        keySkills: ['Kubernetes', 'Monitoring (Grafana, Prometheus)', 'Incident Response', 'Python/Go'],
        industryDemand: 'High',
      },
    ],
    pathway: {
      courseName: 'Cloud Computing & DevOps',
      skills: ['Linux Administration', 'Docker Containers', 'AWS Cloud Core', 'CI/CD Pipelines', 'Kubernetes Orchestration'],
      tools: ['Docker', 'AWS', 'Kubernetes', 'GitHub Actions', 'Terraform', 'Linux'],
      areas: ['Cloud Infrastructure', 'Container Orchestration', 'CI/CD Automation', 'Site Reliability'],
      jobRoles: ['DevOps Engineer', 'Cloud Engineer', 'Site Reliability Engineer (SRE)', 'Platform Engineer'],
    },
    learningStages: [
      { stage: 1, name: 'Foundation', subtitle: 'Linux Server Administration and Shell Scripting', skillsCovered: ['Bash', 'File Permissions', 'SSH', 'Process Management'], projectsMilestones: ['Automated Server Health Inspector Script'], hours: 8 },
      { stage: 2, name: 'Containerization', subtitle: 'Docker Containers and Multi-Stage Builds', skillsCovered: ['Dockerfiles', 'Image Optimization', 'Docker Compose', 'Volumes'], projectsMilestones: ['Multi-Container Application Environment'], hours: 10 },
      { stage: 3, name: 'Cloud Infrastructure', subtitle: 'Amazon Web Services (AWS) Core Platforms', skillsCovered: ['AWS EC2', 'S3 Storage', 'IAM Roles', 'VPC Networking'], projectsMilestones: ['Resilient Cloud Web Server Deployment'], hours: 12 },
      { stage: 4, name: 'Automation Pipelines', subtitle: 'Continuous Integration & Continuous Delivery (CI/CD)', skillsCovered: ['GitHub Actions', 'Automated Testing', 'Docker Hub Push', 'Auto-Deploy'], projectsMilestones: ['Production CI/CD Deployment Pipeline'], hours: 14 },
      { stage: 5, name: 'Container Orchestration', subtitle: 'Kubernetes Pods, Services, and Scaling', skillsCovered: ['Deployments', 'ConfigMaps', 'Horizontal Pod Autoscaling', 'Ingress'], projectsMilestones: ['Kubernetes High-Availability Cluster'], hours: 16 },
      { stage: 6, name: 'Career Readiness', subtitle: 'Infrastructure as Code (Terraform) & SRE Observability', skillsCovered: ['Terraform', 'Grafana', 'Prometheus Alerts', 'Disaster Recovery'], projectsMilestones: ['End-to-End Enterprise Cloud Platform Capstone'], hours: 12 },
    ],
    realWorldProjects: [
      {
        name: 'Multi-Tier Containerized Application with Docker Compose',
        difficulty: 'Intermediate',
        skillsUsed: ['Docker', 'Docker Compose', 'Networking Bridges', 'Environment Variables'],
        toolsUsed: ['Docker', 'Node.js/Python API', 'PostgreSQL', 'Redis'],
        description: 'Package a complete microservice stack including frontend, backend API, relational database, and caching layer into a one-command reproducible environment.',
        practicalOutput: 'Zero-configuration containerized developer and production environment.',
      },
      {
        name: 'End-to-End Automated CI/CD Deployment Pipeline',
        difficulty: 'Intermediate',
        skillsUsed: ['GitHub Actions', 'Docker Hub Registry', 'SSH Automated Deploy', 'Security Linting'],
        toolsUsed: ['GitHub Actions', 'Docker', 'AWS EC2', 'Slack Webhook Alerts'],
        description: 'Construct an automated pipeline that executes unit tests, lints code, builds a slim Docker container, and deploys to a live cloud server upon merging into main branch.',
        practicalOutput: 'Live production CI/CD pipeline with build status notifications.',
      },
      {
        name: 'Infrastructure as Code (Terraform) AWS Cloud Architecture',
        difficulty: 'Advanced',
        skillsUsed: ['Terraform', 'AWS VPC', 'Auto-Scaling Groups', 'Application Load Balancers'],
        toolsUsed: ['Terraform CLI', 'AWS Cloud Console', 'Git'],
        description: 'Write declarative code to provision an entire multi-AZ virtual private cloud network, public/private subnets, security firewalls, and load-balanced server fleet.',
        practicalOutput: 'Repeatable, version-controlled cloud infrastructure configuration.',
      },
    ],
  },

  'genai-llm-agents': {
    slug: 'genai-llm-agents',
    tagline: 'Build autonomous AI agents, Retrieval-Augmented Generation (RAG) systems, and LLM-powered applications.',
    overviewSummary: 'Generative AI and Large Language Models represent the most transformative technological shift of our generation. Master prompt engineering, semantic embeddings, vector databases, and multi-agent coordination.',
    careerCompassDomainSlug: 'ai-ml',
    areas: [
      { id: 'ml', name: 'Machine Learning', icon: '📊', description: 'Train predictive models, analyze classification & regression tasks, and engineer data features.', industryExamples: ['Predictive Analytics', 'Recommendation Engines', 'Fraud Detection'] },
      { id: 'dl', name: 'Deep Learning', icon: '🧠', description: 'Architect multi-layer artificial neural networks for high-dimensional feature abstraction.', industryExamples: ['Neural Networks', 'Autonomous Driving', 'Voice Synthesis'] },
      { id: 'nlp', name: 'NLP', icon: '🗣️', description: 'Analyze human language, tokenization, sentiment detection, and transformer embeddings.', industryExamples: ['Conversational Bots', 'Translation Engines', 'Text Summarizers'] },
      { id: 'cv', name: 'Computer Vision', icon: '👁️', description: 'Process visual feeds, object segmentation, facial recognition, and OCR image pipelines.', industryExamples: ['Medical Imaging', 'Autonomous Vehicles', 'Industrial Inspection'] },
      { id: 'genai', name: 'Generative AI', icon: '✨', description: 'Architect multi-agent autonomous decision loops, enterprise RAG, and prompt workflows.', industryExamples: ['Autonomous Research Agents', 'AI Code Assistants', 'Enterprise RAG'] },
    ],
    tools: [
      { id: 'pandas-numpy', name: 'Pandas, NumPy, Matplotlib, Seaborn', category: 'tool', icon: '📊', description: 'Fundamental scientific computing, numerical array manipulation, and data visualization.', relevance: 'Data Science Core' },
      { id: 'pytorch-tf', name: 'PyTorch, TensorFlow, Keras', category: 'framework', icon: '🔥', description: 'Deep learning frameworks for tensor gradient backpropagation and GPU neural training.', relevance: 'Neural Networks' },
      { id: 'sklearn', name: 'Scikit-learn and StatsModels', category: 'framework', icon: '📈', description: 'Classical machine learning algorithms, cross-validation, and regression testing.', relevance: 'ML Foundations' },
      { id: 'tf-keras', name: 'TensorFlow, Keras', category: 'framework', icon: '⚡', description: 'Production model serialization, ONNX inference runtimes, and mobile edge deployment.', relevance: 'Model Deployment' },
      { id: 'chatgpt', name: 'ChatGPT', category: 'platform', icon: '🤖', description: 'State-of-the-art foundation model prompting, few-shot generation, and API inference.', relevance: 'Foundation Model' },
      { id: 'fastapi-react', name: 'FastAPI, React', category: 'core', icon: '⚡', description: 'Modern web full-stack framework pairing async Python inference endpoints with responsive UI.', relevance: 'Application Stack' },
      { id: 'huggingface', name: 'Hugging Face', category: 'platform', icon: '🤗', description: 'Open-weights model hub, transformers library, dataset repository, and spaces hosting.', relevance: 'Model Hub' },
      { id: 'langchain', name: 'LangChain', category: 'framework', icon: '🦜', description: 'Agent orchestration, prompt templates, vector store memory, and tool integration.', relevance: 'Agent Framework' },
    ],
    skills: {
      technical: ['Prompt Engineering & Few-Shot Learning', 'Embedding Vector Generation', 'Retrieval-Augmented Generation (RAG)', 'Tool Calling & Function Calling', 'LangChain Agent Chains', 'Token Optimization & Cost Control'],
      problemSolving: ['Hallucination Mitigation Strategies', 'Context Window Management', 'Semantic Chunking Strategies', 'Model Evaluation & Benchmarking'],
      professional: ['Responsible AI & Safety Guardrails', 'API Rate Limiting & Fallback Architectures', 'Product-Led AI Design', 'Cost Estimation'],
    },
    jobRoles: [
      { id: 'data-scientist', title: 'Data Analyst / Data Scientist', description: 'Extract insights from raw data, build statistical models, and communicate strategic findings to stakeholders.', experienceLevel: 'All Levels', typicalResponsibilities: ['Build ETL analysis workflows', 'Train predictive algorithms', 'Create executive dashboards'], keySkills: ['Pandas', 'SQL', 'Scikit-learn', 'Statistics'], industryDemand: 'Very High' },
      { id: 'ml-eng', title: 'Machine Learning Engineer', description: 'Deploy and scale production ML models, automate retraining pipelines, and monitor data drift.', experienceLevel: 'Mid-Level', typicalResponsibilities: ['Optimize model inference latency', 'Manage MLOps pipelines', 'Deploy GPU microservices'], keySkills: ['PyTorch', 'TensorFlow', 'Docker', 'Python'], industryDemand: 'Very High' },
      { id: 'dl-eng', title: 'Deep Learning Engineer', description: 'Research and build custom neural architectures for computer vision, speech, and generative tasks.', experienceLevel: 'Senior', typicalResponsibilities: ['Train transformer architectures', 'Tune hyperparameter grids', 'Scale multi-GPU training'], keySkills: ['Deep Learning', 'PyTorch', 'CUDA', 'Transformers'], industryDemand: 'High' },
      { id: 'cv-eng', title: 'Computer Vision Engineer', description: 'Develop visual AI systems for object detection, segmentation, 3D reconstruction, and video analysis.', experienceLevel: 'Mid-Level', typicalResponsibilities: ['Build real-time video inference', 'Fine-tune YOLO/Diffusion models', 'Process point clouds'], keySkills: ['OpenCV', 'PyTorch', 'CNNs', '3D Vision'], industryDemand: 'High' },
      { id: 'nlp-eng', title: 'NLP Engineer', description: 'Build conversational interfaces, semantic search engines, classification systems, and translation tools.', experienceLevel: 'Mid-Level', typicalResponsibilities: ['Fine-tune LLM checkpoints', 'Design vector retrieval indices', 'Mitigate hallucination'], keySkills: ['Transformers', 'Hugging Face', 'LangChain', 'Embeddings'], industryDemand: 'Very High' },
      { id: 'ai-dev', title: 'AI Developer', description: 'Integrate pre-trained AI APIs and foundation models into full-stack web and mobile products.', experienceLevel: 'Entry-Level', typicalResponsibilities: ['Connect OpenAI/Gemini APIs', 'Build responsive chatbot frontends', 'Implement prompt templates'], keySkills: ['FastAPI', 'React', 'Prompt Engineering', 'REST APIs'], industryDemand: 'Very High' },
      { id: 'ai-image-spec', title: 'AI Image Generation Specialist', description: 'Specialize in generative diffusion models, image synthesis, prompt tuning, and creative AI workflows.', experienceLevel: 'Mid-Level', typicalResponsibilities: ['Design diffusion generation pipelines', 'Fine-tune LoRAs and ControlNets', 'Automate asset generation'], keySkills: ['Stable Diffusion', 'Midjourney', 'LoRA', 'ComfyUI'], industryDemand: 'Growing' },
      { id: 'bi-dev', title: 'BI Developer', description: 'Transform business metrics into interactive analytics models and executive business intelligence reports.', experienceLevel: 'Entry-Level', typicalResponsibilities: ['Build business data models', 'Publish real-time KPI dashboards', 'Audit data warehouse accuracy'], keySkills: ['SQL', 'Tableau / PowerBI', 'Python', 'ETL'], industryDemand: 'High' },
    ],
    pathway: {
      courseName: 'Generative AI & Autonomous Agents',
      skills: ['Machine Learning', 'Deep Learning', 'NLP', 'Computer Vision', 'Generative AI & RAG'],
      tools: ['Pandas & NumPy', 'PyTorch & TensorFlow', 'FastAPI & React', 'Hugging Face', 'LangChain'],
      areas: ['Machine Learning', 'Deep Learning', 'NLP', 'Computer Vision', 'Generative AI'],
      jobRoles: ['Data Scientist', 'Machine Learning Engineer', 'Deep Learning Engineer', 'NLP Engineer', 'AI Developer'],
    },
    learningStages: [
      { stage: 1, name: 'Foundation', subtitle: 'Prompt Engineering and Model Fundamentals', skillsCovered: ['Tokens', 'Temperature', 'System Prompts', 'Structured Output'], projectsMilestones: ['Structured Data Extraction Agent'], hours: 6 },
      { stage: 2, name: 'Semantic Search', subtitle: 'Embeddings and Vector Similarity Search', skillsCovered: ['Cosine Distance', 'Text Embeddings', 'Vector Storage'], projectsMilestones: ['Semantic Document Matcher'], hours: 8 },
      { stage: 3, name: 'RAG Architecture', subtitle: 'Retrieval-Augmented Generation Over Documents', skillsCovered: ['Document Chunking', 'Hybrid Search', 'Context Injection'], projectsMilestones: ['Enterprise PDF Knowledge Assistant'], hours: 12 },
      { stage: 4, name: 'Tool Calling', subtitle: 'Function Calling and External API Integrations', skillsCovered: ['Function Schemas', 'Calculators', 'Web Search Tools'], projectsMilestones: ['Real-Time Live Web Information Agent'], hours: 12 },
      { stage: 5, name: 'Autonomous Multi-Agents', subtitle: 'State Machines, Memory, and Coordination Loops', skillsCovered: ['LangGraph', 'Agent Memory', 'Self-Correction Loops'], projectsMilestones: ['Autonomous Coding & Bug-Fixing Agent'], hours: 14 },
      { stage: 6, name: 'Career Readiness', subtitle: 'Evaluation, Latency Optimization, and Deployment', skillsCovered: ['Ragas Evaluation', 'Streaming Responses', 'Safety Filters'], projectsMilestones: ['Full AI Product Deployment Capstone'], hours: 10 },
    ],
    realWorldProjects: [
      {
        name: 'Enterprise PDF Document RAG Assistant',
        difficulty: 'Intermediate',
        skillsUsed: ['Text Chunking', 'Vector Embeddings', 'ChromaDB', 'Hallucination Checks'],
        toolsUsed: ['Python', 'LangChain', 'ChromaDB', 'OpenAI/Gemini API'],
        description: 'Build a document analysis portal that indexes 500-page corporate PDFs and answers natural language questions with exact page citations.',
        practicalOutput: 'Interactive Q&A web portal with source citation highlighting.',
      },
      {
        name: 'Autonomous Multi-Agent Market Research Team',
        difficulty: 'Advanced',
        skillsUsed: ['Multi-Agent Coordination', 'Live Web Search Tool', 'Markdown Synthesis', 'Agent Memory'],
        toolsUsed: ['LangGraph / CrewAI', 'DuckDuckGo API', 'Python'],
        description: 'Coordinate three specialized AI agents (Searcher, Analyst, and Writer) to research any technical topic and compile a comprehensive executive report.',
        practicalOutput: 'Autonomous research pipeline producing publication-grade markdown dossiers.',
      },
    ],
  },

  'web-security': {
    slug: 'web-security',
    tagline: 'Master web application security, ethical hacking, defensive countermeasures, and offensive vulnerability testing.',
    overviewSummary: 'Cybersecurity is a critical imperative across all modern software systems. Master network protocol auditing, web vulnerability exploitation (OWASP Top 10), penetration testing methodologies, and defensive fortification.',
    careerCompassDomainSlug: 'security',
    areas: [
      { id: 'os-sec', name: 'Operating System', icon: '🖥️', description: 'Audit OS kernel permissions, privilege escalation vectors, process security, and access control lists.', industryExamples: ['Linux Hardening', 'Windows Active Directory Security', 'Kernel Audits'] },
      { id: 'net-sec', name: 'Networking', icon: '🌐', description: 'Analyze packet flows, TCP/IP handshakes, routing anomalies, DNS security, and TLS cryptographic suites.', industryExamples: ['Packet Inspection', 'Firewall Rules', 'Network Architecture Audits'] },
      { id: 'network-sec', name: 'Network Security', icon: '🛡️', description: 'Deploy Intrusion Detection Systems (IDS), VPNs, secure proxies, and defense-in-depth perimeters.', industryExamples: ['Snort / Suricata IDS', 'Zero Trust Networks', 'WAF Deployment'] },
      { id: 'ethical-hack', name: 'Ethical Hacking', icon: '⚔️', description: 'Conduct authorized penetration testing, vulnerability discovery, exploit verification, and security reporting.', industryExamples: ['Red Team Exercises', 'Bug Bounty Programs', 'Penetration Tests'] },
      { id: 'cloud-sec', name: 'Cloud Security', icon: '☁️', description: 'Secure multi-tenant cloud workloads, identity federation, secret management, and compliance frameworks.', industryExamples: ['AWS IAM Auditing', 'Kubernetes Security', 'Container Scanning'] },
    ],
    tools: [
      { id: 'wireshark', name: 'Wireshark & Tcpdump', category: 'tool', icon: '🦈', description: 'Packet sniffing and real-time network protocol decoding.', relevance: 'Traffic Analysis' },
      { id: 'nmap', name: 'Nmap & Netcat', category: 'tool', icon: '🔍', description: 'Network exploration, host discovery, and port auditing engine.', relevance: 'Reconnaissance' },
      { id: 'burpsuite', name: 'Burp Suite & OWASP ZAP', category: 'tool', icon: '🕷️', description: 'Interactive proxy for intercepting and testing web application HTTP traffic.', relevance: 'Web Security' },
      { id: 'metasploit', name: 'Metasploit Framework', category: 'framework', icon: '💣', description: 'Modular penetration testing platform and exploit payload verification.', relevance: 'Exploitation' },
      { id: 'kali', name: 'Kali Linux', category: 'platform', icon: '🐉', description: 'Dedicated security testing distribution packed with hundreds of audit tools.', relevance: 'Security OS' },
      { id: 'snort', name: 'Snort / Suricata', category: 'tool', icon: '🛡️', description: 'Open-source network intrusion detection and prevention systems.', relevance: 'Defense' },
    ],
    skills: {
      technical: ['OWASP Top 10 Vulnerabilities', 'SQL Injection & XSS Exploitation/Defense', 'Network Packet Analysis (Wireshark)', 'Nmap Port & Service Scanning', 'Burp Suite Traffic Manipulation', 'Cryptographic Hashing & Salting'],
      problemSolving: ['Vulnerability Root-Cause Diagnosis', 'Exploit Chain Reconstruction', 'Defense-in-Depth Planning', 'Security Incident Triage'],
      professional: ['Responsible Disclosure Standards', 'Technical Remediation Writing', 'Compliance Standards (ISO 27001, SOC 2)', 'Threat Modeling'],
    },
    jobRoles: [
      { id: 'cyber-analyst', title: 'Cybersecurity Analyst', description: 'Monitor security event feeds, triage alerts, investigate incidents, and maintain defensive posture.', experienceLevel: 'Entry-Level', typicalResponsibilities: ['Analyze SIEM log alerts', 'Investigate phishing incidents', 'Maintain vulnerability scanners'], keySkills: ['Wireshark', 'Splunk/SIEM', 'Linux', 'Networking'], industryDemand: 'Very High' },
      { id: 'pen-tester', title: 'Penetration Tester / Ethical Hacker', description: 'Simulate cyber attacks against web applications and networks to uncover security weaknesses before attackers do.', experienceLevel: 'Mid-Level', typicalResponsibilities: ['Perform authorized web pen-tests', 'Draft comprehensive audit reports', 'Advise engineering on patches'], keySkills: ['Burp Suite', 'Metasploit', 'Nmap', 'OWASP Top 10'], industryDemand: 'Very High' },
      { id: 'soc-analyst', title: 'Security Operations Center (SOC) Analyst', description: 'Provide 24/7 security monitoring, threat containment, and rapid incident response.', experienceLevel: 'Entry-Level', typicalResponsibilities: ['Triage intrusion detection alerts', 'Coordinate containment playbooks', 'Analyze malware signatures'], keySkills: ['Snort/Suricata', 'Firewalls', 'Incident Response', 'Network Analysis'], industryDemand: 'Very High' },
      { id: 'sec-eng', title: 'Security Engineer', description: 'Architect and implement resilient security controls across CI/CD pipelines, cloud workloads, and services.', experienceLevel: 'Mid-Level', typicalResponsibilities: ['Implement automated security scanners', 'Enforce IAM and encryption policies', 'Design zero-trust architectures'], keySkills: ['Cloud Security', 'Cryptography', 'Python', 'DevSecOps'], industryDemand: 'Very High' },
      { id: 'forensics-spec', title: 'Digital Forensics & Incident Responder', description: 'Perform post-breach forensic artifact recovery, timeline reconstruction, and legal evidence handling.', experienceLevel: 'Senior', typicalResponsibilities: ['Recover disk and memory images', 'Reconstruct breach attack paths', 'Present forensic findings'], keySkills: ['Volatility', 'Autopsy', 'Disk Forensics', 'Malware Analysis'], industryDemand: 'High' },
    ],
    pathway: {
      courseName: 'Web Application Security & Ethical Hacking',
      skills: ['Network Fundamentals', 'OWASP Top 10', 'Burp Suite Testing', 'Penetration Testing', 'Security Hardening'],
      tools: ['Wireshark', 'Nmap', 'Burp Suite', 'Kali Linux', 'Metasploit'],
      areas: ['Operating System', 'Networking', 'Network Security', 'Ethical Hacking', 'Cloud Security'],
      jobRoles: ['Cybersecurity Analyst', 'Penetration Tester', 'SOC Analyst', 'Security Engineer'],
    },
    learningStages: [
      { stage: 1, name: 'Foundation', subtitle: 'Networking Protocols, TCP/IP, and Port Auditing', skillsCovered: ['TCP/IP', 'DNS', 'HTTP/S', 'Port Scanning'], projectsMilestones: ['Network Traffic Decryption Lab'], hours: 8 },
      { stage: 2, name: 'Web Fundamentals', subtitle: 'HTTP Headers, Cookies, and Authentication Handshakes', skillsCovered: ['Cookies', 'Sessions', 'JWT', 'Same-Origin Policy'], projectsMilestones: ['Session Hijacking Vulnerability Lab'], hours: 10 },
      { stage: 3, name: 'OWASP Top 10', subtitle: 'SQL Injection, XSS, and Cross-Site Request Forgery', skillsCovered: ['SQLi', 'Reflected/Stored XSS', 'CSRF', 'IDOR'], projectsMilestones: ['Defensive Input Sanitizer Gateway'], hours: 12 },
      { stage: 4, name: 'Interception & Proxies', subtitle: 'Burp Suite Traffic Tampering and Fuzzing', skillsCovered: ['Burp Repeater', 'Intruder', 'Parameter Tampering'], projectsMilestones: ['Automated Vulnerability Scanner Script'], hours: 14 },
      { stage: 5, name: 'Defensive Fortification', subtitle: 'Content Security Policy, WAF Rules, and Encryption', skillsCovered: ['CSP Headers', 'Rate Limiting', 'Argon2 Hashing', 'TLS Config'], projectsMilestones: ['Hardened Enterprise Security Proxy'], hours: 16 },
      { stage: 6, name: 'Career Readiness', subtitle: 'Pen-Test Reporting, Threat Modeling, and Mock Audits', skillsCovered: ['STRIDE Model', 'CVSS Scoring', 'Audit Dossier Writing'], projectsMilestones: ['Full Penetration Test Portfolio Dossier'], hours: 12 },
    ],
    realWorldProjects: [
      {
        name: 'Full Web Application Penetration Test & Audit Report',
        difficulty: 'Advanced',
        skillsUsed: ['OWASP Top 10', 'Burp Suite', 'SQL Injection Verification', 'CVSS Severity Scoring'],
        toolsUsed: ['Burp Suite', 'OWASP Juice Shop', 'Kali Linux'],
        description: 'Conduct a systematic security assessment on a vulnerable web application, verify critical exploits, and generate an executive remediation report.',
        practicalOutput: 'Professional penetration testing report with proof-of-concept exploits.',
      },
      {
        name: 'Automated Intrusion Detection & IP Blacklisting Guard',
        difficulty: 'Intermediate',
        skillsUsed: ['Network Sniffing', 'Log Parsing', 'Threshold Alerting', 'Firewall Automation'],
        toolsUsed: ['Python', 'Tcpdump', 'Iptables / UFW'],
        description: 'Build a background security monitoring daemon that inspects live traffic, detects brute-force authentication attacks, and dynamically blacklists offending IPs.',
        practicalOutput: 'Deployable defensive network daemon with automated alert notifications.',
      },
    ],
  },

  react: {
    slug: 'react',
    tagline: 'Build dynamic, performant, and accessible modern web applications with React 19 and Next.js.',
    overviewSummary: 'React powers the majority of modern enterprise web applications. Master component architecture, modern hooks, state management, Server Components, and seamless Next.js full-stack capabilities.',
    careerCompassDomainSlug: 'web-development',
    areas: [
      { id: 'spa', name: 'Single Page Applications (SPA)', icon: '⚡', description: 'Build lightning-fast, reactive client applications with seamless client-side routing and optimistic state.', industryExamples: ['SaaS Dashboards', 'Social Media Feeds', 'Productivity Apps'] },
      { id: 'nextjs', name: 'Next.js Full-Stack Web', icon: '🚀', description: 'Leverage Server Components, streaming SSR, API routes, and edge runtime rendering for maximum SEO and performance.', industryExamples: ['E-Commerce Storefronts', 'Content Platforms', 'B2B Portals'] },
      { id: 'ui-design', name: 'Component Design Systems', icon: '🎨', description: 'Engineer reusable, accessible UI component libraries with Tailwind, CSS variables, and Storybook.', industryExamples: ['Enterprise Design Kits', 'Figma Implementations', 'Themeable UI Libraries'] },
      { id: 'state', name: 'Complex State & Data Hydration', icon: '🔄', description: 'Manage global server cache and client state using TanStack Query, Zustand, and React Context.', industryExamples: ['Real-Time Collaboration', 'Multi-Step Checkout Flows', 'Interactive Dashboards'] },
    ],
    tools: [
      { id: 'react-core', name: 'React 19 & JSX', category: 'core', icon: '⚛️', description: 'Modern React features including hooks, transitions, and component lifecycle.', relevance: 'Primary Framework' },
      { id: 'nextjs-tool', name: 'Next.js 15+ App Router', category: 'framework', icon: '▲', description: 'Production-ready framework with Server Components, nested routing, and fast Turbopack bundling.', relevance: 'Full-Stack Framework' },
      { id: 'typescript', name: 'TypeScript', category: 'core', icon: '🔷', description: 'Static typing for props, state, and API response contracts to eliminate runtime bugs.', relevance: 'Type Safety' },
      { id: 'tailwind', name: 'Tailwind CSS / Vanilla CSS', category: 'tool', icon: '🎨', description: 'Rapid utility-first styling and flexible token-based design systems.', relevance: 'Styling' },
      { id: 'vite', name: 'Vite & Turbopack', category: 'tool', icon: '⚡', description: 'Next-generation development servers and lightning-fast HMR bundlers.', relevance: 'Build Tooling' },
    ],
    skills: {
      technical: ['React Hooks (useState, useEffect, useMemo, useCallback)', 'Custom Hooks & State Extraction', 'Next.js App Router & Server Components', 'Async Data Fetching & Caching', 'TypeScript Props & Generics', 'Responsive Component Styling'],
      problemSolving: ['Re-render Optimization & Profiling', 'Hydration Mismatch Debugging', 'State Hoisting & Normalization', 'Layout Shift Prevention (CLS)'],
      professional: ['Component Composition Patterns', 'Design Handoff Translation', 'Accessibility (a11y) & Keyboard Navigation', 'Code Splitting & Lazy Loading'],
    },
    jobRoles: [
      { id: 'react-dev', title: 'React Developer', description: 'Build interactive user interfaces, connect REST/GraphQL APIs, and optimize frontend render speeds.', experienceLevel: 'Entry-Level', typicalResponsibilities: ['Build reusable UI components', 'Integrate backend endpoints', 'Ensure cross-browser compatibility'], keySkills: ['React', 'JavaScript/TypeScript', 'CSS', 'Git'], industryDemand: 'Very High' },
      { id: 'frontend-eng', title: 'Frontend Engineer', description: 'Architect complex client-side applications, implement design systems, and champion web accessibility.', experienceLevel: 'Mid-Level', typicalResponsibilities: ['Lead component library architecture', 'Optimize Core Web Vitals', 'Conduct frontend code reviews'], keySkills: ['React', 'Next.js', 'TypeScript', 'State Management'], industryDemand: 'Very High' },
      { id: 'fullstack-js', title: 'Full Stack Next.js Engineer', description: 'Deliver complete end-to-end features spanning server components, database queries, and interactive clients.', experienceLevel: 'Mid-Level', typicalResponsibilities: ['Build server actions and API routes', 'Connect database models', 'Deploy automated CI/CD pipelines'], keySkills: ['Next.js', 'Node.js', 'PostgreSQL', 'Tailwind'], industryDemand: 'Very High' },
    ],
    pathway: {
      courseName: 'React & Next.js Full Stack Development',
      skills: ['React Fundamentals', 'Advanced Hooks', 'State Management', 'Next.js App Router', 'Full-Stack Deployment'],
      tools: ['React 19', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel'],
      areas: ['Single Page Apps', 'Next.js Full-Stack', 'Component Design Systems', 'Complex State Management'],
      jobRoles: ['React Developer', 'Frontend Engineer', 'Full Stack Next.js Engineer', 'UI Architect'],
    },
    learningStages: [
      { stage: 1, name: 'Foundation', subtitle: 'JSX, Components, and Props Architecture', skillsCovered: ['JSX Syntax', 'Component Hierarchy', 'Props Passing', 'Conditional Rendering'], projectsMilestones: ['Interactive Course Card Grid'], hours: 8 },
      { stage: 2, name: 'Interactivity & State', subtitle: 'useState, Events, and Form Handling', skillsCovered: ['useState', 'Controlled Inputs', 'Event Bubbling', 'List Keys'], projectsMilestones: ['Dynamic Task & Workflow Manager'], hours: 10 },
      { stage: 3, name: 'Side Effects & Data', subtitle: 'useEffect, Custom Hooks, and API Ingestion', skillsCovered: ['useEffect', 'Fetch API', 'AbortController', 'Custom Hooks'], projectsMilestones: ['Live Crypto & Currency Tracker'], hours: 12 },
      { stage: 4, name: 'Next.js App Router', subtitle: 'Server Components, Dynamic Routing, and Layouts', skillsCovered: ['App Router', 'RSC vs Client Components', 'Metadata', 'Nested Layouts'], projectsMilestones: ['Multi-Page E-Commerce Catalog'], hours: 14 },
      { stage: 5, name: 'Full-Stack Capabilities', subtitle: 'Server Actions, Database Queries, and Authentication', skillsCovered: ['Server Actions', 'Optimistic UI', 'Cookie Auth', 'Zod Validation'], projectsMilestones: ['Full-Stack Collaborative Project Portal'], hours: 16 },
      { stage: 6, name: 'Career Readiness', subtitle: 'Performance Profiling, Testing, and Deployment', skillsCovered: ['React DevTools Profiler', 'Vitest / React Testing Library', 'Vercel CD'], projectsMilestones: ['Production Portfolio Web Application'], hours: 10 },
    ],
    realWorldProjects: [
      {
        name: 'Collaborative Kanban Project Management Workspace',
        difficulty: 'Intermediate',
        skillsUsed: ['React Hooks', 'Optimistic UI', 'Local Storage Persistence', 'Drag-and-Drop'],
        toolsUsed: ['React', 'TypeScript', 'Tailwind CSS'],
        description: 'Build a high-performance productivity board with column re-ordering, subtask progress tracking, and customizable tag filters.',
        practicalOutput: 'Deployable project management application ready for real team use.',
      },
      {
        name: 'Next.js E-Commerce Platform with Server Actions',
        difficulty: 'Advanced',
        skillsUsed: ['Next.js App Router', 'Server Components', 'Server Actions', 'Stripe Checkout API'],
        toolsUsed: ['Next.js', 'PostgreSQL', 'Stripe', 'Vercel'],
        description: 'Architect an end-to-end shopping experience featuring streaming product grids, instantaneous cart updates, and secure checkout processing.',
        practicalOutput: 'Production-ready full-stack storefront deployed live on Vercel.',
      },
    ],
  },

  dbms: {
    slug: 'dbms',
    tagline: 'Master relational data modeling, complex SQL queries, transaction management, and indexing performance.',
    overviewSummary: 'Data is the core foundation of every software application. Master relational algebra, SQL optimization, ACID transaction guarantees, schema normalization, and database scaling strategies.',
    careerCompassDomainSlug: 'cs',
    areas: [
      { id: 'relational', name: 'Relational Database Engineering', icon: '🐘', description: 'Design 3NF normalized relational schemas, foreign key constraints, and multi-table relationships.', industryExamples: ['Core Banking Ledgers', 'E-Commerce Backends', 'SaaS Multi-Tenant DBs'] },
      { id: 'query-perf', name: 'Query Optimization & Indexing', icon: '⚡', description: 'Analyze EXPLAIN query plans, construct composite B-Tree indexes, and eliminate full table scans.', industryExamples: ['High-Frequency Queries', 'Search Optimization', 'Reporting Aggregations'] },
      { id: 'transactions', name: 'ACID Transactions & Concurrency', icon: '🔒', description: 'Prevent race conditions, dirty reads, and deadlocks using isolation levels and row-level locking.', industryExamples: ['Financial Payment Gateways', 'Flight Booking Systems', 'Inventory Allocation'] },
      { id: 'nosql', name: 'NoSQL & Caching Systems', icon: '⚡', description: 'Supplement relational databases with Redis in-memory caches and document stores for extreme throughput.', industryExamples: ['Session Stores', 'Leaderboards', 'Unstructured Document Stores'] },
    ],
    tools: [
      { id: 'postgresql', name: 'PostgreSQL & MySQL', category: 'platform', icon: '🐘', description: 'Industry-standard relational database engines with advanced indexing and JSON support.', relevance: 'Primary RDBMS' },
      { id: 'sql-lang', name: 'Modern ANSI SQL', category: 'core', icon: '📜', description: 'Declarative query language for joins, window functions, CTEs, and aggregations.', relevance: 'Query Language' },
      { id: 'redis', name: 'Redis', category: 'tool', icon: '🔴', description: 'High-speed in-memory data store for caching, pub/sub messaging, and fast key-value lookups.', relevance: 'Caching Layer' },
      { id: 'pgadmin', name: 'DBeaver & pgAdmin', category: 'tool', icon: '💻', description: 'Database management consoles with interactive visual query plan analyzers.', relevance: 'Workbench' },
    ],
    skills: {
      technical: ['Complex Joins (INNER, LEFT, FULL, CROSS)', 'Window Functions & Common Table Expressions (CTEs)', 'Schema Normalization (1NF, 2NF, 3NF, BCNF)', 'Index Design (B-Tree, Hash, GIN)', 'ACID Transactions & Isolation Levels', 'Stored Procedures & Triggers'],
      problemSolving: ['Slow Query Diagnosis using EXPLAIN ANALYZE', 'Deadlock Detection & Resolution', 'Data Integrity Enforcement', 'Database Migration Planning'],
      professional: ['Database Schema Documentation', 'Backup & Disaster Recovery Strategy', 'Security & Role-Based Access Control', 'Migration Script Versioning'],
    },
    jobRoles: [
      { id: 'db-dev', title: 'Database Developer / SQL Specialist', description: 'Write optimized SQL queries, construct complex views, and maintain stored procedures for enterprise software.', experienceLevel: 'Entry-Level', typicalResponsibilities: ['Write efficient analytical queries', 'Maintain data ingestion pipelines', 'Ensure schema consistency'], keySkills: ['SQL', 'PostgreSQL', 'Data Modeling', 'ETL'], industryDemand: 'Very High' },
      { id: 'dba', title: 'Database Administrator (DBA)', description: 'Ensure 24/7 high availability, replication failover, backup retention, and database security.', experienceLevel: 'Mid-Level', typicalResponsibilities: ['Manage automated backups and restore drills', 'Configure master-replica replication', 'Monitor server disk and memory telemetry'], keySkills: ['PostgreSQL', 'MySQL', 'Replication', 'Linux', 'Performance Tuning'], industryDemand: 'High' },
      { id: 'backend-data', title: 'Backend Data Engineer', description: 'Connect backend microservices to distributed database clusters, optimize ORMs, and design caching layers.', experienceLevel: 'Mid-Level', typicalResponsibilities: ['Prevent ORM N+1 query traps', 'Implement Redis caching strategies', 'Manage schema migration tools'], keySkills: ['SQL', 'Redis', 'Node/Python/Java', 'System Design'], industryDemand: 'Very High' },
    ],
    pathway: {
      courseName: 'Database Management Systems & SQL',
      skills: ['SQL Fundamentals', 'Complex Joins & CTEs', 'Schema Normalization', 'Indexing & Optimization', 'Transactions & Concurrency'],
      tools: ['PostgreSQL', 'MySQL', 'Redis', 'DBeaver', 'SQL Workbench'],
      areas: ['Relational DBs', 'Query Optimization', 'ACID Transactions', 'NoSQL Caching'],
      jobRoles: ['Database Developer', 'Database Administrator', 'Backend Data Engineer', 'Data Analyst'],
    },
    learningStages: [
      { stage: 1, name: 'Foundation', subtitle: 'Relational Model, Tables, and Basic DDL/DML', skillsCovered: ['CREATE TABLE', 'SELECT', 'WHERE', 'INSERT/UPDATE'], projectsMilestones: ['Student Academic Database Schema'], hours: 6 },
      { stage: 2, name: 'Multi-Table Queries', subtitle: 'Joins, Constraints, and Referential Integrity', skillsCovered: ['Foreign Keys', 'INNER/LEFT JOIN', 'UNION', 'Aggregations'], projectsMilestones: ['E-Commerce Relational Query Engine'], hours: 8 },
      { stage: 3, name: 'Advanced SQL', subtitle: 'Window Functions, Subqueries, and CTEs', skillsCovered: ['ROW_NUMBER()', 'RANK()', 'OVER()', 'WITH Common Table Expressions'], projectsMilestones: ['Financial Trend Analytics Report'], hours: 10 },
      { stage: 4, name: 'Schema Normalization', subtitle: 'Eliminating Redundancy with 1NF through BCNF', skillsCovered: ['Functional Dependencies', '2NF Decomposition', '3NF Normalization'], projectsMilestones: ['Healthcare EHR Normalized Database Design'], hours: 12 },
      { stage: 5, name: 'Performance & Indexing', subtitle: 'B-Trees, Query Plans, and Index Strategies', skillsCovered: ['EXPLAIN ANALYZE', 'Composite Indexes', 'Covering Indexes', 'Vacuums'], projectsMilestones: ['High-Throughput Query Optimization Lab'], hours: 14 },
      { stage: 6, name: 'Career Readiness', subtitle: 'ACID Concurrency, Locks, and Database Interviews', skillsCovered: ['Isolation Levels', 'Row Locks', 'Deadlocks', 'Sharding Basics'], projectsMilestones: ['Production Database Architecture Portfolio'], hours: 10 },
    ],
    realWorldProjects: [
      {
        name: 'High-Performance E-Commerce Schema & Query Benchmark',
        difficulty: 'Intermediate',
        skillsUsed: ['Schema Normalization', 'Composite B-Tree Indexes', 'EXPLAIN ANALYZE', 'Window Functions'],
        toolsUsed: ['PostgreSQL', 'DBeaver', 'PgBench'],
        description: 'Design an enterprise retail database handling 1,000,000 order records and optimize slow analytical queries to execute under 10 milliseconds.',
        practicalOutput: 'Benchmarked database schema with verified latency optimizations.',
      },
      {
        name: 'Distributed Bank Transaction Ledger with ACID Safety',
        difficulty: 'Advanced',
        skillsUsed: ['Serializable Isolation', 'Row Locking (SELECT FOR UPDATE)', 'Deadlock Prevention', 'Audit Logs'],
        toolsUsed: ['PostgreSQL', 'Docker', 'Python Testing Harness'],
        description: 'Implement a concurrent money transfer engine that processes simultaneous withdrawals without race conditions or balance discrepancies.',
        practicalOutput: 'Cryptographically verified double-entry transaction database.',
      },
    ],
  },

  javascript: {
    slug: 'javascript',
    tagline: 'Master modern JavaScript (ES6+), the asynchronous event loop, browser APIs, and full-stack runtime mechanics.',
    overviewSummary: 'JavaScript is the engine of the web. Master closure scopes, prototypical inheritance, asynchronous promises, event loops, DOM performance, and Node.js server architectures.',
    careerCompassDomainSlug: 'web-development',
    areas: [
      { id: 'client-apps', name: 'Interactive Web Applications', icon: '⚡', description: 'Build dynamic browser apps, manage DOM event flows, and animate responsive user workflows.', industryExamples: ['Interactive Portals', 'Rich Web UIs', 'SaaS Frontends'] },
      { id: 'node-backend', name: 'Node.js Backend Systems', icon: '🟢', description: 'Engineer non-blocking asynchronous event-driven microservices, WebSocket channels, and REST APIs.', industryExamples: ['Real-Time Chat', 'Streaming APIs', 'Microservices'] },
      { id: 'browser-apis', name: 'Browser Engineering & Workers', icon: '🌐', description: 'Leverage WebSockets, Web Workers, IndexedDB, Service Workers, and Canvas 2D graphics.', industryExamples: ['Offline-First Apps', 'Audio/Video Tools', 'In-Browser Games'] },
      { id: 'fullstack-js', name: 'Full-Stack JavaScript Services', icon: '🚀', description: 'Unify frontend and backend architectures using standard JavaScript/TypeScript ecosystems.', industryExamples: ['Full-Stack SaaS', 'E-Commerce Backends', 'API Gateways'] },
    ],
    tools: [
      { id: 'js-v8', name: 'Modern JavaScript (ES2024)', category: 'core', icon: '🟨', description: 'Async/await, destructuring, modules, closures, and generator functions.', relevance: 'Primary Language' },
      { id: 'node', name: 'Node.js & npm', category: 'platform', icon: '🟢', description: 'Asynchronous event-driven server runtime and global package manager.', relevance: 'Backend Runtime' },
      { id: 'devtools', name: 'Chrome DevTools & Profiler', category: 'tool', icon: '🔍', description: 'Call stack tracing, memory heap snapshotting, and event breakpoint debugging.', relevance: 'Debugging' },
      { id: 'vite', name: 'Vite & Webpack', category: 'tool', icon: '⚡', description: 'Modern module bundler, tree-shaking optimizer, and fast dev server.', relevance: 'Build System' },
    ],
    skills: {
      technical: ['Event Loop & Microtask Queue', 'Promises & Async/Await', 'Closures & Scope Chains', 'Prototypal Inheritance & ES Classes', 'DOM Traversal & Event Delegation', 'Fetch API & Streams'],
      problemSolving: ['Memory Leak Detection & Heap Profiling', 'Asynchronous Race Condition Prevention', 'Debounce & Throttle Timing Patterns', 'Deep Object Cloning & Immutability'],
      professional: ['ESLint & Prettier Conventions', 'Modular Code Architecture (ESM)', 'Cross-Browser Feature Detection', 'Unit Testing with Vitest/Jest'],
    },
    jobRoles: [
      { id: 'js-dev', title: 'JavaScript Developer', description: 'Build modern client applications, write clean asynchronous code, and implement engaging user interactions.', experienceLevel: 'Entry-Level', typicalResponsibilities: ['Write modular ES6+ functions', 'Connect REST APIs', 'Optimize UI rendering speed'], keySkills: ['JavaScript', 'HTML/CSS', 'Git', 'REST APIs'], industryDemand: 'Very High' },
      { id: 'frontend-eng', title: 'Frontend Software Engineer', description: 'Architect large-scale web applications, manage complex state lifecycles, and champion web standards.', experienceLevel: 'Mid-Level', typicalResponsibilities: ['Design responsive UI architectures', 'Optimize Core Web Vitals', 'Review team pull requests'], keySkills: ['JavaScript', 'TypeScript', 'React', 'Web Performance'], industryDemand: 'Very High' },
      { id: 'fullstack-dev', title: 'Full Stack JavaScript Developer', description: 'Build complete applications using Node.js backends and modern frontend frameworks.', experienceLevel: 'Mid-Level', typicalResponsibilities: ['Build Node.js REST controllers', 'Design database schemas', 'Deploy cloud serverless functions'], keySkills: ['Node.js', 'Express', 'PostgreSQL', 'React'], industryDemand: 'Very High' },
    ],
    pathway: {
      courseName: 'Modern JavaScript (ES6+)',
      skills: ['ES6+ Syntax', 'Closures & Scopes', 'Asynchronous Event Loop', 'DOM Manipulation', 'Node.js Backends'],
      tools: ['JavaScript ES2024', 'Node.js', 'Chrome DevTools', 'Vite', 'npm'],
      areas: ['Interactive Web', 'Node.js Backends', 'Browser Engineering', 'Full-Stack Services'],
      jobRoles: ['JavaScript Developer', 'Frontend Engineer', 'Full Stack Developer', 'Web Specialist'],
    },
    learningStages: [
      { stage: 1, name: 'Foundation', subtitle: 'Variables, Types, Functions, and Objects', skillsCovered: ['let/const', 'Arrow Functions', 'Destructuring', 'Spread Operator'], projectsMilestones: ['Dynamic Expense Calculator'], hours: 6 },
      { stage: 2, name: 'DOM & Events', subtitle: 'Event Delegation, Bubbling, and LocalStorage', skillsCovered: ['Event Listeners', 'DOM Mutations', 'localStorage API', 'Forms'], projectsMilestones: ['Interactive Drag-and-Drop Task Board'], hours: 8 },
      { stage: 3, name: 'Asynchronous Core', subtitle: 'Event Loop, Promises, and Fetch API', skillsCovered: ['Call Stack', 'Microtasks', 'Promises', 'async/await'], projectsMilestones: ['Live Weather & Forecast Explorer'], hours: 10 },
      { stage: 4, name: 'Advanced Paradigms', subtitle: 'Closures, Prototypes, and Functional Patterns', skillsCovered: ['Closures', 'Currying', 'Prototypes', 'Classes'], projectsMilestones: ['Custom Event-Driven Pub/Sub Library'], hours: 12 },
      { stage: 5, name: 'Node.js & Server APIs', subtitle: 'HTTP Modules, Express Basics, and File System', skillsCovered: ['Node.js Event Emitter', 'Streams', 'Express REST', 'JSON APIs'], projectsMilestones: ['Lightweight Real-Time Chat Server'], hours: 14 },
      { stage: 6, name: 'Career Readiness', subtitle: 'Memory Profiling, Bundling, and Interview Drills', skillsCovered: ['Memory Leaks', 'Vite Bundling', 'Polyfills', 'Polyfill Building'], projectsMilestones: ['Production Portfolio Web Application'], hours: 10 },
    ],
    realWorldProjects: [
      {
        name: 'Interactive Real-Time Collaborative Canvas',
        difficulty: 'Intermediate',
        skillsUsed: ['HTML5 Canvas', 'WebSockets', 'Event Delegation', 'State Serialization'],
        toolsUsed: ['JavaScript ES6+', 'HTML5 Canvas', 'Node.js'],
        description: 'Build a multi-user drawing whiteboard where multiple clients can sketch, change tools, and synchronize paths in real time.',
        practicalOutput: 'Interactive multi-client drawing room web application.',
      },
      {
        name: 'Lightweight In-Memory Event-Driven Message Broker',
        difficulty: 'Advanced',
        skillsUsed: ['Event Loop Mechanics', 'Closures', 'Set/Map Indexing', 'Async Queueing'],
        toolsUsed: ['JavaScript', 'Node.js', 'Vitest'],
        description: 'Construct a pub/sub message broker library supporting priority topics, subscriber wildcard patterns, and guaranteed event ordering.',
        practicalOutput: 'Zero-dependency event bus package with automated test suite.',
      },
    ],
  },

  'linux-security': {
    slug: 'linux-security',
    tagline: 'Master Linux systems administration, kernel architecture, Bash automation, and server hardening.',
    overviewSummary: 'Linux powers over 90% of global cloud infrastructure, supercomputers, and enterprise servers. Master command line fluency, process scheduling, systemd services, SSH tunneling, and server defense.',
    careerCompassDomainSlug: 'security',
    areas: [
      { id: 'sysadmin', name: 'Linux Systems Administration', icon: '🐧', description: 'Configure multi-user systems, disk partitions (LVM), package managers, and cron automation.', industryExamples: ['Enterprise Server Fleets', 'Cloud VM Setup', 'Data Center Nodes'] },
      { id: 'hardening', name: 'Server Hardening & Defense', icon: '🛡️', description: 'Enforce SSH key authentication, configure UFW/iptables firewalls, and audit sudo privileges.', industryExamples: ['PCI-DSS Compliance', 'Secure Bastion Hosts', 'DMZ Gateways'] },
      { id: 'bash-scripting', name: 'Bash & Shell Automation', icon: '💻', description: 'Write automated administration scripts with grep, sed, awk, cron, and pipe redirection.', industryExamples: ['Automated Server Backups', 'Log Rotators', 'Health Check Daemons'] },
      { id: 'kernel-networking', name: 'Kernel & Network Diagnostics', icon: '⚡', description: 'Debug socket connections, analyze kernel dmesg logs, and tune sysctl memory parameters.', industryExamples: ['High-Throughput Web Servers', 'Container Host Tuning', 'Network Routing Nodes'] },
    ],
    tools: [
      { id: 'bash', name: 'Bash & POSIX Shell', category: 'core', icon: '⌨️', description: 'Standard command shell with pipe pipelines, loops, conditionals, and variables.', relevance: 'Shell Language' },
      { id: 'systemd', name: 'systemd & Journalctl', category: 'tool', icon: '⚙️', description: 'Linux system and service manager managing daemon lifecycles and structured system logs.', relevance: 'Service Manager' },
      { id: 'ssh', name: 'OpenSSH & SSH Keys', category: 'tool', icon: '🔑', description: 'Encrypted remote shell protocol with public key cryptography and port forwarding.', relevance: 'Remote Access' },
      { id: 'ufw-iptables', name: 'UFW & iptables Firewalls', category: 'tool', icon: '🧱', description: 'Kernel packet filtering and network state firewall configuration.', relevance: 'Perimeter Defense' },
    ],
    skills: {
      technical: ['Linux File Hierarchy & Permissions (chmod/chown)', 'Process Control (ps, kill, top, nice)', 'Text Processing (grep, sed, awk, cut)', 'systemd Service Creation & Management', 'SSH Key Setup & Config Files', 'UFW/iptables Port Rules'],
      problemSolving: ['System Resource Exhaustion Triage (CPU, RAM, Disk I/O)', 'Permission Denied Root-Cause Analysis', 'Stale Process Cleanup & Zombie Hunting', 'Log Parsing for Anomaly Spikes'],
      professional: ['Idempotent Shell Scripting', 'Least-Privilege User Provisioning', 'Server Provisioning Runbooks', 'Security Audit Checklists'],
    },
    jobRoles: [
      { id: 'linux-admin', title: 'Linux System Administrator', description: 'Maintain physical and virtual Linux servers, manage user access, and ensure high server uptime.', experienceLevel: 'Entry-Level', typicalResponsibilities: ['Manage server packages and updates', 'Monitor system logs and alerts', 'Provision user accounts and keys'], keySkills: ['Linux', 'Bash', 'Networking', 'SSH'], industryDemand: 'Very High' },
      { id: 'sys-eng', title: 'Systems Engineer', description: 'Architect scalable server infrastructure, automate provisioning, and tune kernel performance.', experienceLevel: 'Mid-Level', typicalResponsibilities: ['Automate server configurations', 'Optimize kernel TCP parameters', 'Maintain bastion security gateways'], keySkills: ['Linux Internals', 'Bash/Python', 'systemd', 'Security Hardening'], industryDemand: 'Very High' },
    ],
    pathway: {
      courseName: 'Linux Administration & Shell Scripting',
      skills: ['CLI Navigation', 'Permissions & Users', 'Bash Scripting', 'Service Management (systemd)', 'Security Hardening'],
      tools: ['Ubuntu / Debian', 'Bash', 'systemd', 'OpenSSH', 'UFW Firewall'],
      areas: ['Systems Admin', 'Server Hardening', 'Shell Automation', 'Kernel Diagnostics'],
      jobRoles: ['Linux SysAdmin', 'Systems Engineer', 'Cloud Operations Specialist'],
    },
    learningStages: [
      { stage: 1, name: 'Foundation', subtitle: 'File Hierarchy, Navigation, and Core Commands', skillsCovered: ['ls, cd, cp, mv', 'Pipes & Redirection', 'nano/vim', 'User Permissions'], projectsMilestones: ['CLI Navigation & File Inspector'], hours: 6 },
      { stage: 2, name: 'Users & Permissions', subtitle: 'chmod, chown, sudo, and User Groups', skillsCovered: ['chmod Octal/Symbolic', 'chown', 'sudoers config', 'umask'], projectsMilestones: ['Multi-User Department Permission Setup'], hours: 8 },
      { stage: 3, name: 'Processes & Services', subtitle: 'ps, top, kill, and systemd Service Units', skillsCovered: ['Process Signals', 'systemctl', 'journalctl', 'systemd unit files'], projectsMilestones: ['Self-Healing Background Service Daemon'], hours: 10 },
      { stage: 4, name: 'Text Processing & Bash', subtitle: 'grep, awk, sed, and Automated Shell Scripts', skillsCovered: ['grep regex', 'sed stream editing', 'awk columns', 'Bash loops'], projectsMilestones: ['Automated Server Telemetry & Log Rotator'], hours: 12 },
      { stage: 5, name: 'Networking & Hardening', subtitle: 'SSH Keys, UFW Firewall, and Fail2ban', skillsCovered: ['ssh-keygen', 'SSH hardening', 'UFW port rules', 'Fail2ban jails'], projectsMilestones: ['Hardened Cloud Bastion Server Setup'], hours: 14 },
      { stage: 6, name: 'Career Readiness', subtitle: 'Troubleshooting Drills and SysAdmin Interviews', skillsCovered: ['dmesg', 'netstat/ss', 'LVM storage', 'Recovery mode'], projectsMilestones: ['Enterprise Linux Administration Capstone'], hours: 10 },
    ],
    realWorldProjects: [
      {
        name: 'Self-Healing Automated Server Health & Backup Daemon',
        difficulty: 'Intermediate',
        skillsUsed: ['Bash Scripting', 'systemd Service', 'tar/gzip Compression', 'cron Scheduling'],
        toolsUsed: ['Bash', 'systemd', 'Linux CLI'],
        description: 'Build a production monitoring service that snapshots server state, automatically cleans disk space, and emails incident reports on failure.',
        practicalOutput: 'Deployable systemd service unit with automated logging.',
      },
    ],
  },

  'git-github': {
    slug: 'git-github',
    tagline: 'Master Git distributed version control, branching workflows, GitHub collaboration, and CI/CD actions.',
    overviewSummary: 'Git is the universal language of software development collaboration. Master commits, interactive rebasing, merge conflict resolution, pull request etiquette, and automated GitHub Actions.',
    careerCompassDomainSlug: 'career',
    areas: [
      { id: 'version-control', name: 'Distributed Version Control', icon: '🐙', description: 'Track code evolution, manage commits, inspect history diffs, and maintain repository integrity.', industryExamples: ['Software Codebases', 'Infrastructure as Code', 'Documentation Wikis'] },
      { id: 'branching-models', name: 'Branching & Release Workflows', icon: '🌿', description: 'Implement Trunk-Based Development, GitFlow, and feature-branch strategies across agile teams.', industryExamples: ['Agile Sprint Delivery', 'Hotfix Cherry-Picks', 'Staging Deployments'] },
      { id: 'collaboration', name: 'Code Review & Pull Requests', icon: '👥', description: 'Conduct effective pull request reviews, resolve merge conflicts, and enforce branch protection.', industryExamples: ['Open Source Contributions', 'Enterprise PR Reviews', 'Team Governance'] },
      { id: 'github-actions', name: 'GitHub Actions Automation', icon: '⚡', description: 'Trigger automated testing, linting, Docker builds, and cloud deployments on git push events.', industryExamples: ['Automated Test Runners', 'NPM Package Releases', 'Vercel Previews'] },
    ],
    tools: [
      { id: 'git-cli', name: 'Git CLI', category: 'core', icon: '⌨️', description: 'Universal command-line tool for branching, staging, committing, and rebasing.', relevance: 'Primary Tool' },
      { id: 'github-platform', name: 'GitHub & GitLab', category: 'platform', icon: '🐙', description: 'Cloud code hosting, pull request discussions, issue tracking, and repository security.', relevance: 'Collaboration Platform' },
      { id: 'gh-actions', name: 'GitHub Actions', category: 'framework', icon: '🔄', description: 'YAML-driven workflow automation engine for CI/CD test and deployment pipelines.', relevance: 'CI/CD Engine' },
    ],
    skills: {
      technical: ['Git Staging & Commit Atomic Best Practices', 'Branch Creation, Merging & Rebase Interactive', 'Merge Conflict Resolution (3-Way Merge)', 'Git Stash, Reset, and Revert Differences', 'GitHub Actions YAML Workflows', 'Semantic Versioning & Git Tags'],
      problemSolving: ['Detached HEAD Recovery using Git Reflog', 'Bisecting Bugs with Git Bisect', 'Disentangling Messy Commit Histories', 'Cherry-Picking Critical Security Fixes'],
      professional: ['Clear Commit Message Writing (Conventional Commits)', 'Constructive Pull Request Reviews', 'Branch Protection Policy Design', 'Open Source Etiquette'],
    },
    jobRoles: [
      { id: 'swe-git', title: 'Software Engineer', description: 'Collaborate effectively in agile engineering teams, maintain pristine branch histories, and ship code via PRs.', experienceLevel: 'All Levels', typicalResponsibilities: ['Write atomic, well-documented commits', 'Resolve complex merge conflicts', 'Review peer pull requests'], keySkills: ['Git', 'GitHub', 'CI/CD', 'Code Review'], industryDemand: 'Essential' },
      { id: 'release-eng', title: 'Release & Build Engineer', description: 'Manage release tags, coordinate production deployments, and maintain automated GitHub Actions.', experienceLevel: 'Mid-Level', typicalResponsibilities: ['Enforce branch protection rules', 'Automate changelog generation', 'Maintain release pipelines'], keySkills: ['Git', 'GitHub Actions', 'Docker', 'Bash'], industryDemand: 'High' },
    ],
    pathway: {
      courseName: 'Git & GitHub Version Control Mastery',
      skills: ['Git Fundamentals', 'Branching & Merging', 'Interactive Rebase', 'GitHub Pull Requests', 'GitHub Actions CI/CD'],
      tools: ['Git CLI', 'GitHub', 'GitHub Actions', 'VS Code GitLens'],
      areas: ['Distributed Version Control', 'Branching Strategies', 'Code Review & PRs', 'CI/CD Automation'],
      jobRoles: ['Software Engineer', 'DevOps Specialist', 'Release Engineer'],
    },
    learningStages: [
      { stage: 1, name: 'Foundation', subtitle: 'Init, Add, Commit, and Status', skillsCovered: ['git init', 'git add', 'git commit', 'git log'], projectsMilestones: ['First Tracked Repository'], hours: 4 },
      { stage: 2, name: 'Branching & Remotes', subtitle: 'Branches, Remote Pushes, and Pulling', skillsCovered: ['git branch', 'git checkout/switch', 'git push', 'git pull'], projectsMilestones: ['Multi-Branch Feature Simulation'], hours: 6 },
      { stage: 3, name: 'Conflict Resolution', subtitle: 'Merging and Resolving Merge Conflicts', skillsCovered: ['Fast-Forward Merge', '3-Way Merge', 'Conflict Markers'], projectsMilestones: ['Merge Conflict Resolution Drill'], hours: 8 },
      { stage: 4, name: 'History Rewriting', subtitle: 'Rebase, Interactive Squashing, and Cherry-Pick', skillsCovered: ['git rebase -i', 'git commit --amend', 'git cherry-pick'], projectsMilestones: ['Pristine History Refactor Showcase'], hours: 10 },
      { stage: 5, name: 'GitHub & Team PRs', subtitle: 'Pull Requests, Forking, and Branch Protection', skillsCovered: ['PR Discussions', 'Code Reviews', 'Branch Rules', 'Issues'], projectsMilestones: ['Open Source Contribution Simulation'], hours: 10 },
      { stage: 6, name: 'Career Readiness', subtitle: 'GitHub Actions Automation and Reflog Recovery', skillsCovered: ['Actions Workflows', 'git reflog', 'Git Bisect', 'Tags'], projectsMilestones: ['Automated CI/CD Portfolio Workflow'], hours: 8 },
    ],
    realWorldProjects: [
      {
        name: 'Automated CI/CD Test & Deploy Pipeline with GitHub Actions',
        difficulty: 'Intermediate',
        skillsUsed: ['YAML Workflows', 'Automated Test Matrix', 'Secret Management', 'Branch Protection'],
        toolsUsed: ['GitHub Actions', 'Node.js/Python', 'Git'],
        description: 'Construct an end-to-end GitHub Actions pipeline that triggers on pull requests, tests across multiple language versions, and publishes release notes.',
        practicalOutput: 'Reusable GitHub Actions template repository.',
      },
    ],
  },

  'software-testing': {
    slug: 'software-testing',
    tagline: 'Master test-driven development, unit testing, integration verification, and end-to-end QA automation.',
    overviewSummary: 'High-quality software demands automated verification. Master Test-Driven Development (TDD), mocking, API contract testing, component testing, and automated browser testing with Playwright.',
    careerCompassDomainSlug: 'career',
    areas: [
      { id: 'unit-testing', name: 'Unit Testing & TDD', icon: '🧪', description: 'Write fast, isolated tests verifying pure functions, edge cases, and algorithmic correctness.', industryExamples: ['Core Business Logic', 'Data Transformers', 'Validation Engines'] },
      { id: 'integration-testing', name: 'Integration & API Testing', icon: '🔌', description: 'Verify service boundaries, database transactions, REST endpoints, and authentication middleware.', industryExamples: ['REST API Verification', 'Database Persistence Tests', 'Third-Party Webhooks'] },
      { id: 'e2e-testing', name: 'End-to-End Browser Automation', icon: '🎭', description: 'Simulate real user journeys across multiple pages, form inputs, and checkout funnels using Playwright.', industryExamples: ['User Registration Funnels', 'E-Commerce Checkouts', 'Cross-Browser Verification'] },
      { id: 'perf-qa', name: 'Performance & Regression QA', icon: '⚡', description: 'Measure response latency budgets, test concurrency thresholds, and prevent regressions.', industryExamples: ['Load Testing', 'Regression Test Suites', 'Release Gate Verification'] },
    ],
    tools: [
      { id: 'jest-vitest', name: 'Jest & Vitest', category: 'framework', icon: '⚡', description: 'Lightning-fast unit testing runners with built-in mocking, assertions, and coverage reporters.', relevance: 'Unit Test Runner' },
      { id: 'playwright', name: 'Playwright & Cypress', category: 'tool', icon: '🎭', description: 'Modern end-to-end browser automation engines supporting Chromium, Firefox, and WebKit.', relevance: 'E2E Automation' },
      { id: 'postman', name: 'Postman & Newman', category: 'tool', icon: '📬', description: 'API testing environment for automating REST endpoint contracts and assertion scripts.', relevance: 'API Testing' },
    ],
    skills: {
      technical: ['AAA Testing Pattern (Arrange, Act, Assert)', 'Test-Driven Development (Red-Green-Refactor)', 'Mocking, Spying & Stubs (sinon/jest.fn)', 'End-to-End Page Object Model (Playwright)', 'API Response Code & Schema Validation', 'Code Coverage Metrics (Branches, Functions)'],
      problemSolving: ['Flaky Test Root-Cause Elimination', 'Edge Case Boundary Identification', 'Mocking Asynchronous Network Timing', 'Asynchronous Race Condition Isolation'],
      professional: ['Quality Assurance Architecture', 'Continuous Integration Test Gates', 'Bug Reproduction Ticket Writing', 'Testing Pyramid Strategy'],
    },
    jobRoles: [
      { id: 'qa-eng', title: 'QA Automation Engineer', description: 'Design, code, and maintain automated test suites across API and UI layers.', experienceLevel: 'Entry-Level', typicalResponsibilities: ['Write Playwright E2E test scripts', 'Automate regression test suites', 'Report defect metrics in CI/CD'], keySkills: ['Playwright', 'Jest/Vitest', 'JavaScript/Python', 'Git'], industryDemand: 'Very High' },
      { id: 'sdet', title: 'Software Development Engineer in Test (SDET)', description: 'Build test infrastructure, performance test harnesses, and automated quality gates in CI/CD.', experienceLevel: 'Mid-Level', typicalResponsibilities: ['Architect testing frameworks', 'Implement mock servers and test databases', 'Conduct load and stress tests'], keySkills: ['Test Architecture', 'CI/CD', 'API Testing', 'Docker'], industryDemand: 'Very High' },
    ],
    pathway: {
      courseName: 'Software Testing & QA Automation',
      skills: ['Unit Testing Fundamentals', 'TDD Methodology', 'Mocking & Spies', 'API Testing', 'Playwright E2E Automation'],
      tools: ['Vitest / Jest', 'Playwright', 'Postman', 'GitHub Actions'],
      areas: ['Unit Testing', 'API Integration', 'E2E Automation', 'Regression QA'],
      jobRoles: ['QA Automation Engineer', 'SDET (Software Engineer in Test)', 'Full Stack Developer'],
    },
    learningStages: [
      { stage: 1, name: 'Foundation', subtitle: 'The Testing Pyramid and First Unit Tests', skillsCovered: ['Assertions', 'Test Runners', 'AAA Pattern', 'Boundary Testing'], projectsMilestones: ['Unit Test Suite for Business Calculator'], hours: 6 },
      { stage: 2, name: 'Test-Driven Development', subtitle: 'Red-Green-Refactor Cycle and Edge Cases', skillsCovered: ['TDD Philosophy', 'Refactoring with Tests', 'Edge Case Matrix'], projectsMilestones: ['TDD String & Regex Parsing Engine'], hours: 8 },
      { stage: 3, name: 'Mocking & Asynchronous Code', subtitle: 'Mocks, Stubs, Spies, and Async Timers', skillsCovered: ['vi.fn()', 'vi.spyOn()', 'API Mocks', 'Fake Timers'], projectsMilestones: ['Mocked Third-Party Payment Gateway Tests'], hours: 10 },
      { stage: 4, name: 'API Contract Testing', subtitle: 'REST Endpoint Verification and Schema Validation', skillsCovered: ['HTTP Status Codes', 'JSON Schema Assertions', 'Supertest'], projectsMilestones: ['Automated REST API Test Harness'], hours: 12 },
      { stage: 5, name: 'Playwright E2E Testing', subtitle: 'Browser Automation, Selectors, and Page Objects', skillsCovered: ['Playwright Locators', 'Page Object Model', 'Visual Regression', 'Traces'], projectsMilestones: ['Complete E2E E-Commerce Checkout Suite'], hours: 14 },
      { stage: 6, name: 'Career Readiness', subtitle: 'CI/CD Integration and SDET Interview Drills', skillsCovered: ['Coverage Thresholds', 'Parallel Test Execution', 'Bug Triage'], projectsMilestones: ['Production Quality Assurance Portfolio'], hours: 10 },
    ],
    realWorldProjects: [
      {
        name: 'Production-Grade Playwright E2E Automated Test Suite',
        difficulty: 'Intermediate',
        skillsUsed: ['Playwright', 'Page Object Model', 'Video & Trace Recording', 'Parallel Execution'],
        toolsUsed: ['Playwright', 'TypeScript', 'GitHub Actions'],
        description: 'Architect an automated test suite verifying multi-page user journeys including registration, shopping cart additions, and payment confirmation.',
        practicalOutput: 'Continuous integration test harness with live HTML test reports.',
      },
    ],
  },

  'system-design': {
    slug: 'system-design',
    tagline: 'Architect distributed systems, high-availability microservices, caching layers, and scalable cloud architectures.',
    overviewSummary: 'System Design separates junior programmers from senior software architects. Master load balancing, database sharding, CAP theorem trade-offs, message brokers, caching strategies, and designing for millions of users.',
    careerCompassDomainSlug: 'cs',
    areas: [
      { id: 'distributed-arch', name: 'Distributed Systems Architecture', icon: '🏛️', description: 'Design microservices, RPC interfaces, service discovery, and resilient API gateways.', industryExamples: ['Netflix Microservices', 'Uber Dispatch Engines', 'Stripe Payment Ingestion'] },
      { id: 'caching-cdn', name: 'High-Speed Caching & CDNs', icon: '⚡', description: 'Implement distributed Redis caches, Cache-Aside patterns, write-through strategies, and edge CDNs.', industryExamples: ['Global Web Content', 'Session Persistence', 'Hot Key Absorption'] },
      { id: 'data-scaling', name: 'Database Scaling & Partitioning', icon: '🗄️', description: 'Scale database throughput using master-replica read replicas, horizontal sharding, and consistent hashing.', industryExamples: ['Social Feeds', 'Multi-Region Data Stores', 'Analytics Lakes'] },
      { id: 'message-queues', name: 'Asynchronous Event Streaming', icon: '📨', description: 'Decouple services with Apache Kafka and RabbitMQ event queues for guaranteed at-least-once delivery.', industryExamples: ['Order Processing Pipelines', 'Email Notification Queues', 'IoT Telemetry'] },
    ],
    tools: [
      { id: 'redis', name: 'Redis Cache', category: 'tool', icon: '🔴', description: 'In-memory data structure store used as a distributed cache, message broker, and rate limiter.', relevance: 'Caching' },
      { id: 'kafka', name: 'Apache Kafka & RabbitMQ', category: 'platform', icon: '⚡', description: 'High-throughput distributed event streaming platform for asynchronous pub/sub messaging.', relevance: 'Event Streaming' },
      { id: 'load-balancer', name: 'Nginx & HAProxy', category: 'tool', icon: '⚖️', description: 'Reverse proxies and load balancers distributing traffic via round-robin and least-connection.', relevance: 'Traffic Distribution' },
    ],
    skills: {
      technical: ['CAP & PACELC Theorems', 'Horizontal vs Vertical Scaling', 'Consistent Hashing Algorithms', 'Database Sharding & Read Replicas', 'Cache Eviction Policies (LRU, LFU)', 'Rate Limiting Algorithms (Token Bucket, Leaky Bucket)'],
      problemSolving: ['Single Point of Failure (SPOF) Elimination', 'Back-of-the-Envelope Capacity Estimations', 'Latency vs Consistency Trade-off Decisions', 'Disaster Recovery Failover Planning'],
      professional: ['System Architecture Diagramming', 'Technical Design Document (RFC) Writing', 'Senior Engineering Interview Communication', 'SLA / SLO / Error Budget Definitions'],
    },
    jobRoles: [
      { id: 'senior-swe', title: 'Senior Software Engineer', description: 'Architect robust distributed features, evaluate architectural trade-offs, and mentor engineering teams.', experienceLevel: 'Senior', typicalResponsibilities: ['Design scalable backend services', 'Author RFC design documents', 'Lead architectural review meetings'], keySkills: ['System Design', 'Microservices', 'Distributed Databases', 'Cloud'], industryDemand: 'Very High' },
      { id: 'systems-architect', title: 'Enterprise Solutions Architect', description: 'Define company-wide technological roadmaps, data retention strategies, and cloud migration frameworks.', experienceLevel: 'Senior', typicalResponsibilities: ['Define distributed system blueprints', 'Enforce resilience and fault tolerance', 'Align technical design with business scale'], keySkills: ['High Availability', 'Kafka', 'Kubernetes', 'Scalability'], industryDemand: 'Very High' },
    ],
    pathway: {
      courseName: 'System Design & Scalable Architecture',
      skills: ['Distributed Fundamentals', 'Load Balancing & Caching', 'Database Sharding', 'Message Queues', 'CAP Theorem Trade-Offs'],
      tools: ['Redis', 'Apache Kafka', 'Nginx', 'PostgreSQL', 'Docker'],
      areas: ['Distributed Architecture', 'Caching & CDNs', 'Database Scaling', 'Event Streaming'],
      jobRoles: ['Senior Software Engineer', 'Solutions Architect', 'Backend Tech Lead'],
    },
    learningStages: [
      { stage: 1, name: 'Foundation', subtitle: 'Scaling Fundamentals and Back-of-the-Envelope Math', skillsCovered: ['Throughput vs Latency', 'QPS Calculations', 'Storage Estimates', 'Bandwidth'], projectsMilestones: ['URL Shortener Capacity Estimation'], hours: 8 },
      { stage: 2, name: 'Traffic & Caching', subtitle: 'Load Balancers, Reverse Proxies, and Distributed Caching', skillsCovered: ['Load Balancing Algorithms', 'Redis Cache-Aside', 'Eviction (LRU)'], projectsMilestones: ['Distributed Rate Limiter Implementation'], hours: 10 },
      { stage: 3, name: 'Data Partitioning', subtitle: 'Replication, Sharding, and Consistent Hashing', skillsCovered: ['Master-Slave Replication', 'Horizontal Sharding', 'Consistent Hashing Ring'], projectsMilestones: ['Consistent Hashing Virtual Node Ring'], hours: 12 },
      { stage: 4, name: 'Asynchronous Streaming', subtitle: 'Message Brokers, Pub/Sub, and Event Decoupling', skillsCovered: ['Kafka Topics & Partitions', 'Idempotency', 'Dead Letter Queues'], projectsMilestones: ['Asynchronous Video Processing Queue'], hours: 14 },
      { stage: 5, name: 'Classic System Case Studies', subtitle: 'Designing TinyURL, Twitter/X, and WhatsApp', skillsCovered: ['Feed Generation', 'Push vs Pull Models', 'WebSocket Gateways'], projectsMilestones: ['Complete End-to-End System Blueprint Document'], hours: 16 },
      { stage: 6, name: 'Career Readiness', subtitle: 'System Design Mock Interviews and Whiteboarding', skillsCovered: ['Interview Structuring', 'Clarifying Questions', 'Trade-off Articulation'], projectsMilestones: ['Senior System Design Portfolio Review'], hours: 12 },
    ],
    realWorldProjects: [
      {
        name: 'Distributed Consistent Hashing Key-Value Node Ring',
        difficulty: 'Advanced',
        skillsUsed: ['Consistent Hashing', 'Virtual Nodes', 'Replication Factor', 'Node Rebalancing'],
        toolsUsed: ['TypeScript / Python', 'Unit Test Suite'],
        description: 'Build a software-defined consistent hashing ring that maps keys across multiple server nodes with minimal re-allocation when nodes join or fail.',
        practicalOutput: 'Benchmarked consistent hashing router module.',
      },
    ],
  },

  'interview-preparation': {
    slug: 'interview-preparation',
    tagline: 'Crack FAANG and top-tier tech company coding rounds, behavioral interviews, and technical screenings.',
    overviewSummary: 'Landing a top software engineering role requires a deliberate, structured interview preparation strategy. Master live whiteboarding communication, core algorithmic patterns, behavioral STAR stories, and resume polish.',
    careerCompassDomainSlug: 'career',
    areas: [
      { id: 'coding-rounds', name: 'Live Coding & Algorithmic Rounds', icon: '🎯', description: 'Solve LeetCode-style data structure and algorithm challenges under timed whiteboard constraints.', industryExamples: ['Big Tech Screening', 'Startup Pairing Sessions', 'HackerRank Assessments'] },
      { id: 'behavioral', name: 'Behavioral & Leadership Interviews', icon: '💼', description: 'Structure memorable answers using the STAR method for conflict resolution, ownership, and failures.', industryExamples: ['Amazon Leadership Principles', 'Google Googleyness', 'Cultural Fit Rounds'] },
      { id: 'sys-design-interview', name: 'System Design Whiteboarding', icon: '🏛️', description: 'Lead architectural discussions, ask clarifying questions, identify bottlenecks, and calculate scale.', industryExamples: ['Staff Engineer Rounds', 'Backend Architect Interviews', 'Design Screenings'] },
      { id: 'resume-portfolio', name: 'Resume & Portfolio Optimization', icon: '📄', description: 'Format engineering resumes with quantifiable impact metrics (XYZ format) and build GitHub showcases.', industryExamples: ['Recruiter Screening', 'ATS Resume Parsers', 'Portfolio Reviews'] },
    ],
    tools: [
      { id: 'workbench', name: 'Timed Algorithmic Workbench', category: 'tool', icon: '⚡', description: 'Interactive coding environment with timed test execution and edge case evaluation.', relevance: 'Interview Practice' },
      { id: 'github-portfolio', name: 'GitHub Showcase Profile', category: 'platform', icon: '🐙', description: 'Clean portfolio repositories with verified READMEs, automated tests, and live demo links.', relevance: 'Portfolio' },
    ],
    skills: {
      technical: ['Pattern Recognition (Sliding Window, Two Pointers, BFS/DFS)', 'Dry-Run Tracing & Edge Case Verification', 'Time & Space Complexity Verbal Articulation', 'STAR Behavioral Framework (Situation, Task, Action, Result)', 'Back-of-the-Envelope Capacity Estimation'],
      problemSolving: ['Graceful Recovery When Stuck on Coding Problems', 'Thinking Out Loud Under Time Pressure', 'Evaluating Algorithmic Trade-Offs (Time vs Memory)', 'Deconstructing Vague Interview Prompts'],
      professional: ['Confident Technical Communication', 'Thoughtful Reverse-Interviewing Questions', 'Salary Negotiation Strategies', 'ATS-Optimized Engineering Resume Writing'],
    },
    jobRoles: [
      { id: 'swe-faang', title: 'Software Engineer (FAANG / Big Tech)', description: 'Pass technical screenings, live whiteboarding sessions, and behavioral loops at leading tech firms.', experienceLevel: 'All Levels', typicalResponsibilities: ['Demonstrate algorithmic problem-solving', 'Communicate trade-offs clearly', 'Exhibit strong team ownership'], keySkills: ['DSA', 'System Design', 'Communication', 'STAR Stories'], industryDemand: 'Very High' },
      { id: 'tech-lead', title: 'Engineering Team Lead', description: 'Guide engineering strategy, conduct rigorous hiring loops, and drive architectural consistency.', experienceLevel: 'Senior', typicalResponsibilities: ['Conduct candidate coding interviews', 'Evaluate cultural and technical fit', 'Negotiate team scope and roadmaps'], keySkills: ['System Design', 'Leadership', 'Mentorship', 'Architecture'], industryDemand: 'Very High' },
    ],
    pathway: {
      courseName: 'Technical Interview & Career Preparation',
      skills: ['Algorithmic Patterns', 'Live Whiteboarding Communication', 'Behavioral STAR Method', 'System Design Screenings', 'Offer Negotiation'],
      tools: ['Monaco Workbench', 'GitHub Portfolio', 'STAR Story Matrix'],
      areas: ['Coding Rounds', 'Behavioral Interviews', 'System Design Screenings', 'Resume & Portfolio'],
      jobRoles: ['Software Engineer (Big Tech)', 'Full Stack Developer', 'Tech Lead'],
    },
    learningStages: [
      { stage: 1, name: 'Foundation', subtitle: 'Resume Polish and the XYZ Impact Formula', skillsCovered: ['ATS Optimization', 'Action Verbs', 'Quantifiable Metrics', 'GitHub Pinning'], projectsMilestones: ['Refactored Professional Engineering Resume'], hours: 6 },
      { stage: 2, name: 'Top Coding Patterns', subtitle: 'Two Pointers, Sliding Window, and Fast/Slow Pointers', skillsCovered: ['Window Optimization', 'Cycle Detection', 'Frequency Hash Maps'], projectsMilestones: ['Pattern Drills Completion Log'], hours: 10 },
      { stage: 3, name: 'Trees, Graphs & DP', subtitle: 'Traversals, Shortest Paths, and Memoization', skillsCovered: ['BFS vs DFS', 'Memoized Recursion', 'Bottom-Up DP'], projectsMilestones: ['Non-Linear Data Structure Mastery Portfolio'], hours: 12 },
      { stage: 4, name: 'Behavioral Mastery', subtitle: 'STAR Method and Leadership Principle Stories', skillsCovered: ['Situation-Task-Action-Result', 'Failure Stories', 'Conflict Resolution'], projectsMilestones: ['Curated 10-Story STAR Behavioral Matrix'], hours: 8 },
      { stage: 5, name: 'Mock Technical Screenings', subtitle: 'Timed Coding Rounds and Verbalizing Thought Process', skillsCovered: ['Clarifying Questions', 'Edge Case Auditing', 'Complexity Walkthrough'], projectsMilestones: ['Mock Interview Recording & Self-Critique'], hours: 12 },
      { stage: 6, name: 'Career Readiness', subtitle: 'Reverse Interviewing, Negotiations, and Offer Selection', skillsCovered: ['Questions for Interviewers', 'Compensation Negotiation', 'Equity Basics'], projectsMilestones: ['Career Roadmap & Interview War Chest'], hours: 8 },
    ],
    realWorldProjects: [
      {
        name: 'Technical Interview Mastery War Chest & STAR Matrix',
        difficulty: 'Capstone',
        skillsUsed: ['Algorithmic Solution Portfolio', 'STAR Story Articulation', 'Resume Optimization', 'Negotiation Scripts'],
        toolsUsed: ['GitHub', 'Markdown', 'Monaco IDE'],
        description: 'Construct a comprehensive personal career repository compiling 50+ annotated algorithmic pattern solutions and 10 detailed STAR stories.',
        practicalOutput: 'Ready-to-interview personal engineering dossier.',
      },
    ],
  },
};

export interface MegaMenuSubcategory {
  name: string;
  slug: string;
  badge?: string;
  description: string;
}

export interface MegaMenuCategory {
  id: string;
  name: string;
  icon: string;
  subcategories: MegaMenuSubcategory[];
}

export const MEGA_MENU_CATEGORIES: MegaMenuCategory[] = [
  {
    id: 'it',
    name: 'Information Technology',
    icon: '💻',
    subcategories: [
      { name: 'Generative AI', slug: 'genai-llm-agents', badge: 'Trending', description: 'Autonomous agents, RAG pipelines, foundation models, and prompt engineering.' },
      { name: 'Deep Learning', slug: 'genai-llm-agents', description: 'Neural network architectures, PyTorch tensor computation, and computer vision.' },
      { name: 'Natural Language Processing', slug: 'genai-llm-agents', description: 'Transformers, embeddings, semantic search, and LLM text generation.' },
      { name: 'Computer Vision', slug: 'genai-llm-agents', description: 'Visual feature extraction, object detection, segmentation, and diffusion models.' },
      { name: 'Cyber Security', slug: 'web-security', badge: 'Hot', description: 'Ethical hacking, network auditing, OWASP Top 10 vulnerabilities, and system defense.' },
      { name: 'Cloud & DevOps', slug: 'cloud-devops', description: 'AWS infrastructure, Docker containers, Kubernetes clusters, and CI/CD pipelines.' },
      { name: 'Web Development', slug: 'react', description: 'Modern React, Next.js full-stack applications, and accessible UI engineering.' },
      { name: 'Python Programming', slug: 'python', description: 'Core Python, scripting automation, data manipulation, and asynchronous APIs.' },
      { name: 'Enterprise Java', slug: 'java', description: 'Enterprise backend architecture, Spring Boot microservices, and multithreading.' },
    ],
  },
  {
    id: 'engineering',
    name: 'Engineering',
    icon: '⚙️',
    subcategories: [
      { name: 'System Design & Architecture', slug: 'system-design', badge: 'Crucial', description: 'Distributed systems, microservices decoupling, caching, and horizontal scaling.' },
      { name: 'Linux Systems & Shell', slug: 'linux-security', description: 'Linux kernel internals, shell scripting, process management, and SSH administration.' },
      { name: 'Git & DevOps Workflows', slug: 'git-github', description: 'Version control strategies, CI/CD automated test workflows, and team collaboration.' },
      { name: 'Software Testing & QA', slug: 'software-testing', description: 'Automated test suites, unit testing, end-to-end testing, and quality engineering.' },
    ],
  },
  {
    id: 'business',
    name: 'Business & Management',
    icon: '📈',
    subcategories: [
      { name: 'Technical Interview Prep', slug: 'interview-preparation', badge: 'Popular', description: 'FAANG whiteboard coding, behavioral responses, and system design interviews.' },
      { name: 'Engineering Leadership', slug: 'system-design', description: 'Architecture trade-offs, code reviews, technical roadmapping, and agile delivery.' },
    ],
  },
  {
    id: 'prof_dev',
    name: 'Professional Development',
    icon: '🚀',
    subcategories: [
      { name: 'Data Structures & Algorithms', slug: 'dsa', badge: 'Core', description: 'Big-O complexity, binary search trees, graph algorithms, and dynamic programming.' },
      { name: 'Database Management (SQL)', slug: 'dbms', description: 'Relational data modeling, ACID transactions, complex joins, and query optimization.' },
      { name: 'Modern JavaScript', slug: 'javascript', description: 'Asynchronous event loops, DOM APIs, modern ES6+ paradigms, and browser runtimes.' },
    ],
  },
];

// Fallback metadata generator for any active course not explicitly defined above
export function getCourseCareerMetadata(slug: string): CourseCareerMetadata {
  if (COURSE_CAREER_REGISTRY[slug]) {
    return COURSE_CAREER_REGISTRY[slug];
  }

  // Graceful dynamic fallback ensuring 100% stability across all 15 active courses
  const capitalizedTitle = slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return {
    slug,
    tagline: `Master production-grade ${capitalizedTitle} concepts, industry best practices, and career-defining skills.`,
    overviewSummary: `${capitalizedTitle} is a foundational pillar of modern software engineering, powering real-world production systems and empowering developers worldwide.`,
    careerCompassDomainSlug: slug,
    areas: [
      {
        id: 'software-engineering',
        name: 'Production Software Engineering',
        icon: '💻',
        description: `Apply ${capitalizedTitle} to build scalable, reliable software services and enterprise applications.`,
        industryExamples: ['Enterprise Software', 'High-Scale Systems', 'Cloud Solutions'],
      },
      {
        id: 'architecture',
        name: 'System Architecture & Design',
        icon: '🏛️',
        description: 'Structure clean, decoupled, and maintainable application architectures with industry design patterns.',
        industryExamples: ['Microservice Architecture', 'Modular Libraries', 'Clean Codebases'],
      },
      {
        id: 'automation',
        name: 'Automation & Tooling',
        icon: '⚙️',
        description: 'Automate developer workflows, optimize test verification, and enhance deployment pipelines.',
        industryExamples: ['CI/CD Pipelines', 'Internal Developer Tools', 'Automated Verification'],
      },
    ],
    tools: [
      { id: 'core-lang', name: capitalizedTitle, category: 'core', icon: '⚡', description: `Core ${capitalizedTitle} language specifications, runtimes, and standard libraries.`, relevance: 'Primary Stack' },
      { id: 'git', name: 'Git & GitHub', category: 'tool', icon: '🐙', description: 'Version control, branch management, and collaborative pull request workflows.', relevance: 'Collaboration' },
      { id: 'ide', name: 'Modern Developer IDE', category: 'tool', icon: '💻', description: 'Interactive debugging, type verification, and automated code refactoring.', relevance: 'Development' },
      { id: 'cli', name: 'Command Line & Terminal', category: 'core', icon: '⌨️', description: 'Shell execution, process management, and scripting automation.', relevance: 'Operating System' },
    ],
    skills: {
      technical: [`Core ${capitalizedTitle} Syntax & Semantics`, 'Data Manipulation & Control Flow', 'Modular Code Architecture', 'Defensive Programming & Error Handling', 'Unit Testing & Verification'],
      problemSolving: ['Algorithmic Problem Decomposition', 'Edge Case Analysis', 'Performance Bottleneck Identification', 'Clean Refactoring'],
      professional: ['Git Branching & Pull Requests', 'Documentation & Clean Code', 'Code Review Participation', 'Agile Engineering Collaboration'],
    },
    jobRoles: [
      {
        id: 'software-dev',
        title: `${capitalizedTitle} Developer`,
        description: `Build and maintain applications, services, and software features using ${capitalizedTitle}.`,
        experienceLevel: 'Entry-Level',
        typicalResponsibilities: ['Write clean, tested production code', 'Participate in peer code reviews', 'Implement user-facing and backend features'],
        keySkills: [capitalizedTitle, 'Git', 'Problem Solving', 'Data Structures'],
        industryDemand: 'High',
      },
      {
        id: 'software-eng',
        title: 'Full Stack Software Engineer',
        description: 'Develop comprehensive end-to-end applications integrating frontend and backend capabilities.',
        experienceLevel: 'Mid-Level',
        typicalResponsibilities: ['Architect application modules', 'Optimize runtime performance', 'Mentor junior developers'],
        keySkills: [capitalizedTitle, 'System Design', 'Databases', 'Cloud Basics'],
        industryDemand: 'Very High',
      },
    ],
    pathway: {
      courseName: capitalizedTitle,
      skills: ['Fundamentals', 'Core Concepts', 'Intermediate Patterns', 'Project Building', 'Production Readiness'],
      tools: [capitalizedTitle, 'Git & GitHub', 'Developer IDE', 'Terminal CLI'],
      areas: ['Software Engineering', 'System Architecture', 'Automation & Tooling'],
      jobRoles: [`${capitalizedTitle} Developer`, 'Software Engineer', 'Technical Specialist'],
    },
    learningStages: [
      { stage: 1, name: 'Foundation', subtitle: 'Syntax, Basics & Environment Setup', skillsCovered: ['Syntax', 'Variables', 'Control Flow'], projectsMilestones: ['Interactive Starter Project'], hours: 6 },
      { stage: 2, name: 'Core Concepts', subtitle: 'Structures, Patterns & Best Practices', skillsCovered: ['Data Structures', 'Functions', 'Modular Code'], projectsMilestones: ['Application Logic Engine'], hours: 8 },
      { stage: 3, name: 'Intermediate Mastery', subtitle: 'Error Handling, File I/O & APIs', skillsCovered: ['Exceptions', 'Data Persistence', 'API Calls'], projectsMilestones: ['Comprehensive Utility Project'], hours: 10 },
      { stage: 4, name: 'Real Projects', subtitle: 'End-to-End Production Applications', skillsCovered: ['Architecture', 'Testing', 'Optimization'], projectsMilestones: ['Real-World Portfolio Project'], hours: 12 },
      { stage: 5, name: 'Advanced Engineering', subtitle: 'Performance, Scaling & Security', skillsCovered: ['Concurrency', 'Security', 'Profiling'], projectsMilestones: ['High-Performance Capstone'], hours: 14 },
      { stage: 6, name: 'Career Readiness', subtitle: 'Technical Interviews & Portfolio Polish', skillsCovered: ['Interview Coding', 'Code Review', 'Clean Architecture'], projectsMilestones: ['Career Portfolio Launch'], hours: 8 },
    ],
    realWorldProjects: [
      {
        name: `Production ${capitalizedTitle} Application`,
        difficulty: 'Intermediate',
        skillsUsed: ['Modular Architecture', 'Error Handling', 'Unit Testing'],
        toolsUsed: [capitalizedTitle, 'Git & GitHub', 'Developer IDE'],
        description: `Build a complete, real-world application showcasing core and intermediate ${capitalizedTitle} capabilities.`,
        practicalOutput: 'Deployable portfolio artifact with comprehensive test suite.',
      },
      {
        name: `High-Performance ${capitalizedTitle} Service`,
        difficulty: 'Advanced',
        skillsUsed: ['Performance Optimization', 'Clean Architecture', 'API Integration'],
        toolsUsed: [capitalizedTitle, 'Testing Suite', 'Deployment Engine'],
        description: `Architect a scalable, production-grade service applying design patterns and performance profiling.`,
        practicalOutput: 'Benchmarked production-ready engineering showcase.',
      },
    ],
  };
}

export function getAllMegaMenuData() {
  return MEGA_MENU_CATEGORIES.map((category) => ({
    ...category,
    subcategories: category.subcategories.map((sub) => ({
      ...sub,
      careerMeta: getCourseCareerMetadata(sub.slug),
    })),
  }));
}
