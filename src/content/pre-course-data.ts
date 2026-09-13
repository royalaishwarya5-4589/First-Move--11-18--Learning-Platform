export interface DomainInfo {
  slug: string;
  title: string;
  description: string;
  icon: string;
  mappedCourseSlug: string;
  bgGradient: string;
  popularTopics: string[];
}

export type QuestionCategory =
  | 'interest'
  | 'preference'
  | 'problem_solving'
  | 'creativity'
  | 'curiosity'
  | 'basic_knowledge'
  | 'working_style';

export interface CareerCompassQuestion {
  id: string;
  question: string;
  category: QuestionCategory;
  categoryLabel: string;
  categoryIcon: string;
  options: [string, string, string, string];
  // Weightings assigned to each option for domain scoring
  optionWeights: [
    Record<string, number>,
    Record<string, number>,
    Record<string, number>,
    Record<string, number>
  ];
  explanation?: string;
}

export const DOMAINS: DomainInfo[] = [
  {
    slug: 'web-development',
    title: 'Web Development',
    description: 'Master modern web development using HTML, CSS, JavaScript, and React to craft dynamic websites.',
    icon: '🌐',
    mappedCourseSlug: 'html-css',
    bgGradient: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(37, 99, 235, 0.05))',
    popularTopics: ['HTML5 & Semantic Structure', 'CSS Flexbox & Grid', 'JavaScript ES6+', 'React & Component Architecture'],
  },
  {
    slug: 'python',
    title: 'Python Programming',
    description: 'Learn modern Python programming from basic data logic to automation, scripting, and data processing.',
    icon: '🐍',
    mappedCourseSlug: 'python',
    bgGradient: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(5, 150, 105, 0.05))',
    popularTopics: ['Data Structures & Logic', 'Scripting & Automation', 'Object-Oriented Python', 'API Integration'],
  },
  {
    slug: 'java',
    title: 'Java Programming',
    description: 'Build enterprise backend services, object-oriented systems, and scalable applications with Java.',
    icon: '☕',
    mappedCourseSlug: 'java',
    bgGradient: 'linear-gradient(135deg, rgba(234, 88, 12, 0.15), rgba(194, 65, 12, 0.05))',
    popularTopics: ['Object-Oriented Design', 'Java Collections', 'JVM Architecture', 'Enterprise Backend Services'],
  },
  {
    slug: 'dsa',
    title: 'Data Structures & Algorithms',
    description: 'Master computer science fundamentals, algorithmic efficiency, time complexity, and problem solving.',
    icon: '⚡',
    mappedCourseSlug: 'dsa',
    bgGradient: 'linear-gradient(135deg, rgba(168, 85, 247, 0.15), rgba(147, 51, 234, 0.05))',
    popularTopics: ['Big-O Analysis', 'Arrays, Stacks & Queues', 'Binary Trees & Graphs', 'Sorting & Optimization'],
  },
  {
    slug: 'ai-ml',
    title: 'Artificial Intelligence & ML',
    description: 'Explore machine learning models, neural networks, natural language processing, and Generative AI.',
    icon: '🤖',
    mappedCourseSlug: 'genai-llm-agents',
    bgGradient: 'linear-gradient(135deg, rgba(236, 72, 153, 0.15), rgba(219, 39, 119, 0.05))',
    popularTopics: ['Machine Learning Basics', 'Large Language Models (LLMs)', 'RAG & Vector Search', 'AI Agent Architectures'],
  },
  {
    slug: 'cybersecurity',
    title: 'Cybersecurity',
    description: 'Understand application security, ethical defense, network protection, and vulnerability prevention.',
    icon: '🛡️',
    mappedCourseSlug: 'web-security',
    bgGradient: 'linear-gradient(135deg, rgba(239, 68, 68, 0.15), rgba(220, 38, 38, 0.05))',
    popularTopics: ['Web Security & OWASP Top 10', 'Authentication & Encryption', 'Network Security', 'Ethical Hacking Basics'],
  },
  {
    slug: 'cloud-computing',
    title: 'Cloud Computing & DevOps',
    description: 'Deploy resilient cloud infrastructure using Docker containerization, AWS services, and CI/CD pipelines.',
    icon: '☁️',
    mappedCourseSlug: 'cloud-devops',
    bgGradient: 'linear-gradient(135deg, rgba(14, 165, 233, 0.15), rgba(2, 132, 199, 0.05))',
    popularTopics: ['Docker & Containers', 'Cloud Infrastructure (AWS/GCP)', 'CI/CD Automation', 'Server Operations'],
  },
  {
    slug: 'database',
    title: 'Database & Backend',
    description: 'Design relational database schemas, write SQL queries, index data, and build REST APIs.',
    icon: '🗄️',
    mappedCourseSlug: 'dbms',
    bgGradient: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(217, 119, 6, 0.05))',
    popularTopics: ['Relational Schema Design', 'SQL Queries & Joins', 'Database Indexing & Performance', 'REST API Connections'],
  },
  {
    slug: 'app-dev',
    title: 'Mobile App Development',
    description: 'Build native and cross-platform mobile software applications for iOS and Android with clean UI components.',
    icon: '📱',
    mappedCourseSlug: 'react',
    bgGradient: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(79, 70, 229, 0.05))',
    popularTopics: ['Mobile Layouts & Touch UI', 'State Management', 'Cross-Platform Apps', 'Device API Integrations'],
  },
  {
    slug: 'ui-ux',
    title: 'UI/UX Design',
    description: 'Design user-centric interfaces, interactive wireframes, visual design systems, and web layouts.',
    icon: '🎨',
    mappedCourseSlug: 'html-css',
    bgGradient: 'linear-gradient(135deg, rgba(20, 184, 166, 0.15), rgba(13, 148, 136, 0.05))',
    popularTopics: ['User Interface Design', 'Wireframing & Prototyping', 'Color & Typography Systems', 'User Experience Research'],
  },
];

export const CAREER_COMPASS_QUESTIONS: CareerCompassQuestion[] = [
  // 1. Interest
  {
    id: 'cc-q1',
    category: 'interest',
    categoryLabel: 'Interests',
    categoryIcon: '💡',
    question: 'When you imagine working with technology, what type of project sounds most exciting to build?',
    options: [
      'An interactive website or web application used by millions of users',
      'An intelligent AI assistant that answers questions and recognizes images',
      'A secure system that protects user data from cyber attacks and hackers',
      'A smartphone application that people use every day on iOS or Android'
    ],
    optionWeights: [
      { 'web-development': 10, 'ui-ux': 6, 'javascript': 4 },
      { 'ai-ml': 10, 'python': 8, 'dsa': 4 },
      { 'cybersecurity': 10, 'cloud-computing': 5, 'java': 3 },
      { 'app-dev': 10, 'ui-ux': 5, 'web-development': 4 }
    ]
  },
  // 2. Interest
  {
    id: 'cc-q2',
    category: 'interest',
    categoryLabel: 'Interests',
    categoryIcon: '💡',
    question: 'Which of the following technology topics would you enjoy reading about or researching?',
    options: [
      'How search engines and large data centers process massive amounts of information',
      'How user interfaces are designed to be intuitive and visually stunning',
      'How cloud servers automatically handle surges in internet traffic',
      'How automated scripts can scrape data and clean up spreadsheet records'
    ],
    optionWeights: [
      { 'database': 8, 'dsa': 10, 'java': 5 },
      { 'ui-ux': 10, 'web-development': 7 },
      { 'cloud-computing': 10, 'cybersecurity': 5, 'database': 4 },
      { 'python': 10, 'ai-ml': 5, 'database': 3 }
    ]
  },
  // 3. Problem Solving
  {
    id: 'cc-q3',
    category: 'problem_solving',
    categoryLabel: 'Problem Solving',
    categoryIcon: '🧠',
    question: 'How do you prefer to approach a complex logical problem or puzzle?',
    options: [
      'Break it down into mathematical steps and find the most efficient shortcut',
      'Look for repeating patterns in data to predict future outcomes',
      'Experiment visually by creating a physical or digital prototype first',
      'Test for weak spots and edge cases to make sure nothing breaks'
    ],
    optionWeights: [
      { 'dsa': 10, 'java': 6, 'python': 4 },
      { 'ai-ml': 10, 'python': 8, 'database': 4 },
      { 'ui-ux': 9, 'web-development': 7, 'app-dev': 6 },
      { 'cybersecurity': 10, 'cloud-computing': 6, 'java': 4 }
    ]
  },
  // 4. Problem Solving
  {
    id: 'cc-q4',
    category: 'problem_solving',
    categoryLabel: 'Problem Solving',
    categoryIcon: '🧠',
    question: 'If a computer program is running too slowly, what sounds most satisfying to fix?',
    options: [
      'Optimizing the algorithm and memory structures so it executes faster',
      'Optimizing database queries so records load in milliseconds',
      'Upgrading server configurations and deploying extra cloud resources',
      'Refactoring code into clean, modular object-oriented classes'
    ],
    optionWeights: [
      { 'dsa': 10, 'python': 5, 'java': 5 },
      { 'database': 10, 'java': 6, 'web-development': 4 },
      { 'cloud-computing': 10, 'cybersecurity': 4 },
      { 'java': 10, 'python': 5, 'dsa': 4 }
    ]
  },
  // 5. Creativity
  {
    id: 'cc-q5',
    category: 'creativity',
    categoryLabel: 'Creativity',
    categoryIcon: '🎨',
    question: 'You are asked to redesign a product. Which creative task would you choose?',
    options: [
      'Designing screen layouts, colors, fonts, and user navigation paths',
      'Creating interactive animations and smooth button feedback for web pages',
      'Designing how different microservices communicate securely behind the scenes',
      'Designing a smart prompt system that helps an AI write creative stories'
    ],
    optionWeights: [
      { 'ui-ux': 10, 'web-development': 5, 'app-dev': 5 },
      { 'web-development': 10, 'ui-ux': 7, 'app-dev': 5 },
      { 'java': 8, 'cloud-computing': 8, 'database': 6 },
      { 'ai-ml': 10, 'python': 7 }
    ]
  },
  // 6. Creativity
  {
    id: 'cc-q6',
    category: 'creativity',
    categoryLabel: 'Creativity',
    categoryIcon: '🎨',
    question: 'How do you feel about visual feedback when you write code or build something?',
    options: [
      'I love seeing instant visual changes on screen as soon as I save my code',
      'I prefer working on logic, calculations, and data processing behind the scenes',
      'I enjoy building mobile layouts that look great on smartphones and tablets',
      'I enjoy setting up infrastructure pipelines that deploy code automatically'
    ],
    optionWeights: [
      { 'web-development': 10, 'ui-ux': 8 },
      { 'python': 8, 'java': 8, 'dsa': 8, 'database': 6 },
      { 'app-dev': 10, 'ui-ux': 6, 'web-development': 5 },
      { 'cloud-computing': 10, 'cybersecurity': 6 }
    ]
  },
  // 7. Curiosity
  {
    id: 'cc-q7',
    category: 'curiosity',
    categoryLabel: 'Curiosity',
    categoryIcon: '🔎',
    question: 'What question about technology makes you most curious?',
    options: [
      'How do computers learn to recognize human language, voices, and faces?',
      'How do hackers bypass security passwords and how can we stop them?',
      'How does a browser render complex 3D graphics and responsive pages?',
      'How do online stores like Amazon store millions of products and orders?'
    ],
    optionWeights: [
      { 'ai-ml': 10, 'python': 7, 'dsa': 4 },
      { 'cybersecurity': 10, 'cloud-computing': 5 },
      { 'web-development': 10, 'ui-ux': 6 },
      { 'database': 10, 'java': 6 }
    ]
  },
  // 8. Curiosity
  {
    id: 'cc-q8',
    category: 'curiosity',
    categoryLabel: 'Curiosity',
    categoryIcon: '🔎',
    question: 'If you had a free weekend to learn a new tool, which one would you pick?',
    options: [
      'Figma or Canva to design app mockups and visual UI wireframes',
      'Jupyter Notebooks to analyze real-world datasets with Python',
      'Docker to bundle applications into portable containers',
      'Wireshark or Metasploit to inspect encrypted network packets'
    ],
    optionWeights: [
      { 'ui-ux': 10, 'web-development': 5, 'app-dev': 4 },
      { 'python': 10, 'ai-ml': 8, 'database': 4 },
      { 'cloud-computing': 10, 'java': 4 },
      { 'cybersecurity': 10, 'cloud-computing': 4 }
    ]
  },
  // 9. Basic Knowledge
  {
    id: 'cc-q9',
    category: 'basic_knowledge',
    categoryLabel: 'Basic Knowledge',
    categoryIcon: '📚',
    question: 'Which technology is fundamental for structuring the content of a web page?',
    options: [
      'HTML (HyperText Markup Language)',
      'SQL (Structured Query Language)',
      'Python',
      'Docker'
    ],
    optionWeights: [
      { 'web-development': 10, 'ui-ux': 6 },
      { 'database': 8 },
      { 'python': 4 },
      { 'cloud-computing': 4 }
    ],
    explanation: 'HTML provides the semantic structure for web pages.'
  },
  // 10. Basic Knowledge
  {
    id: 'cc-q10',
    category: 'basic_knowledge',
    categoryLabel: 'Basic Knowledge',
    categoryIcon: '📚',
    question: 'Which programming language is widely recognized as the primary language for Data Science and Artificial Intelligence?',
    options: [
      'Python',
      'CSS',
      'HTML',
      'SQL'
    ],
    optionWeights: [
      { 'python': 10, 'ai-ml': 10 },
      { 'web-development': 2 },
      { 'web-development': 2 },
      { 'database': 4 }
    ],
    explanation: 'Python is the industry standard for AI, machine learning, and data analytics.'
  },
  // 11. Basic Knowledge
  {
    id: 'cc-q11',
    category: 'basic_knowledge',
    categoryLabel: 'Basic Knowledge',
    categoryIcon: '📚',
    question: 'What is the primary role of SQL in software development?',
    options: [
      'Querying, storing, and managing data in relational databases',
      'Styling web page colors and layout fonts',
      'Building mobile app touch interfaces',
      'Encrypting wireless Wi-Fi routers'
    ],
    optionWeights: [
      { 'database': 10, 'java': 4, 'python': 4 },
      { 'web-development': 3, 'ui-ux': 3 },
      { 'app-dev': 3 },
      { 'cybersecurity': 3 }
    ],
    explanation: 'SQL (Structured Query Language) is used to communicate with databases.'
  },
  // 12. Working Style
  {
    id: 'cc-q12',
    category: 'working_style',
    categoryLabel: 'Working Style',
    categoryIcon: '⚙️',
    question: 'What type of daily technical work environment appeals to you most?',
    options: [
      'Collaborating with designers to build friendly user experiences',
      'Writing core business logic, algorithms, and data processing rules',
      'Managing cloud servers, deployments, and automated CI/CD builds',
      'Auditing software systems to discover and patch security vulnerabilities'
    ],
    optionWeights: [
      { 'ui-ux': 9, 'web-development': 8, 'app-dev': 7 },
      { 'java': 8, 'python': 8, 'dsa': 7, 'database': 6 },
      { 'cloud-computing': 10, 'cybersecurity': 5 },
      { 'cybersecurity': 10, 'cloud-computing': 5 }
    ]
  },
  // 13. Working Style
  {
    id: 'cc-q13',
    category: 'working_style',
    categoryLabel: 'Working Style',
    categoryIcon: '⚙️',
    question: 'How do you feel when working on code or tech tasks?',
    options: [
      'I like seeing quick results and tweaking elements visually',
      'I like solving step-by-step mathematical logic and puzzle problems',
      'I like organizing structures, schemas, and clean architecture rules',
      'I like exploring how complex networks connect across the internet'
    ],
    optionWeights: [
      { 'web-development': 9, 'ui-ux': 9, 'app-dev': 6 },
      { 'dsa': 10, 'python': 7, 'ai-ml': 6 },
      { 'java': 8, 'database': 8, 'cloud-computing': 5 },
      { 'cloud-computing': 8, 'cybersecurity': 8 }
    ]
  },
  // 14. Interest
  {
    id: 'cc-q14',
    category: 'interest',
    categoryLabel: 'Interests',
    categoryIcon: '💡',
    question: 'Which of these modern tech trends sounds most fascinating to you?',
    options: [
      'Generative AI, Large Language Models, and Autonomous AI Agents',
      'Modern web apps using React, Next.js, and interactive animations',
      'Ethical hacking, penetration testing, and Zero-Trust security',
      'Cloud-native microservices running on Kubernetes and Docker'
    ],
    optionWeights: [
      { 'ai-ml': 10, 'python': 8 },
      { 'web-development': 10, 'app-dev': 6, 'ui-ux': 5 },
      { 'cybersecurity': 10, 'cloud-computing': 4 },
      { 'cloud-computing': 10, 'java': 4, 'database': 4 }
    ]
  },
  // 15. Problem Solving
  {
    id: 'cc-q15',
    category: 'problem_solving',
    categoryLabel: 'Problem Solving',
    categoryIcon: '🧠',
    question: 'Imagine a website crashes during a big sale. What part of the fix would you want to lead?',
    options: [
      'Scaling up cloud server instances to handle thousands of requests',
      'Debugging the database to fix slow locking transaction queries',
      'Identifying if a malicious Denial-of-Service (DoS) attack caused the crash',
      'Redesigning the frontend so users see a helpful error state gracefully'
    ],
    optionWeights: [
      { 'cloud-computing': 10, 'java': 4 },
      { 'database': 10, 'java': 5 },
      { 'cybersecurity': 10, 'cloud-computing': 4 },
      { 'web-development': 8, 'ui-ux': 7 }
    ]
  },
  // 16. Basic Knowledge
  {
    id: 'cc-q16',
    category: 'basic_knowledge',
    categoryLabel: 'Basic Knowledge',
    categoryIcon: '📚',
    question: 'What is the purpose of CSS in web development?',
    options: [
      'To style the layout, colors, typography, and visual presentation of HTML elements',
      'To store user passwords securely in a relational database',
      'To compile C++ code into machine bytecode',
      'To manage cloud server domain names'
    ],
    optionWeights: [
      { 'web-development': 10, 'ui-ux': 8 },
      { 'database': 2 },
      { 'dsa': 2 },
      { 'cloud-computing': 2 }
    ],
    explanation: 'CSS (Cascading Style Sheets) formats the visual styling of web pages.'
  },
  // 17. Creativity
  {
    id: 'cc-q17',
    category: 'creativity',
    categoryLabel: 'Creativity',
    categoryIcon: '🎨',
    question: 'What kind of creative output gives you the greatest sense of achievement?',
    options: [
      'A beautifully designed digital interface that users compliment',
      'A smart Python script that automates hours of tedious work in seconds',
      'A well-architected Java application with clean reusable code classes',
      'A trained Machine Learning model that predicts outcomes accurately'
    ],
    optionWeights: [
      { 'ui-ux': 10, 'web-development': 7, 'app-dev': 6 },
      { 'python': 10, 'database': 4 },
      { 'java': 10, 'dsa': 5 },
      { 'ai-ml': 10, 'python': 6 }
    ]
  },
  // 18. Curiosity
  {
    id: 'cc-q18',
    category: 'curiosity',
    categoryLabel: 'Curiosity',
    categoryIcon: '🔎',
    question: 'Which of these real-world tech capabilities would you love to understand from scratch?',
    options: [
      'How Netflix streams video smoothly across different screen sizes and networks',
      'How ChatGPT generates human-like text and reasoning steps',
      'How bank mobile apps securely verify user fingerprint and password tokens',
      'How navigation apps like Google Maps calculate the fastest route around traffic'
    ],
    optionWeights: [
      { 'web-development': 7, 'cloud-computing': 9, 'app-dev': 6 },
      { 'ai-ml': 10, 'python': 7 },
      { 'cybersecurity': 10, 'app-dev': 5, 'java': 4 },
      { 'dsa': 10, 'python': 5, 'java': 4 }
    ]
  },
  // 19. Working Style
  {
    id: 'cc-q19',
    category: 'working_style',
    categoryLabel: 'Working Style',
    categoryIcon: '⚙️',
    question: 'When starting a new project, what is your first natural instinct?',
    options: [
      'Draw wireframe sketches of how the user screens will look',
      'Write down the data attributes and relationships needed in the database',
      'Map out the core algorithms, inputs, and outputs step-by-step',
      'Define the security requirements and authentication rules'
    ],
    optionWeights: [
      { 'ui-ux': 10, 'web-development': 6, 'app-dev': 6 },
      { 'database': 10, 'java': 5, 'python': 4 },
      { 'dsa': 10, 'python': 6, 'java': 5 },
      { 'cybersecurity': 10, 'cloud-computing': 5 }
    ]
  },
  // 20. Interest
  {
    id: 'cc-q20',
    category: 'interest',
    categoryLabel: 'Interests',
    categoryIcon: '💡',
    question: 'Which type of user feedback would make you feel most satisfied?',
    options: [
      '"This website is so fast, beautiful, and easy to use on my phone!"',
      '"This app solved a complex data problem for our business instantly!"',
      '"I feel 100% confident that my personal data is safe on this platform!"',
      '"The recommendations provided by this system were amazingly accurate!"'
    ],
    optionWeights: [
      { 'web-development': 9, 'ui-ux': 9, 'app-dev': 8 },
      { 'python': 8, 'java': 8, 'database': 7 },
      { 'cybersecurity': 10, 'cloud-computing': 5 },
      { 'ai-ml': 10, 'python': 6 }
    ]
  }
];

export function getDomainInfo(slug: string): DomainInfo | undefined {
  return DOMAINS.find((d) => d.slug === slug);
}
