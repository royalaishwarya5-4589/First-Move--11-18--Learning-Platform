export interface CourseImageSet {
  courseImage: string;
  thumbnailImage: string;
  bannerImage: string;
  altText: string;
  accentColor: string;
}

/**
 * Centralized Course Image Registry
 * Every course in First Move (11~18) has its own UNIQUE, subject-authentic, high-resolution photography.
 * No two courses share the same image.
 */
export const COURSE_IMAGES: Record<string, CourseImageSet> = {
  // 1. Python
  python: {
    courseImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    thumbnailImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1600&q=80',
    altText: 'Python Programming and Data Logic Visualization',
    accentColor: '#10B981',
  },

  // 2. Java
  java: {
    courseImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80',
    thumbnailImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1600&q=80',
    altText: 'Java Enterprise Application Development Workspace',
    accentColor: '#EA580C',
  },

  // 3. JavaScript
  javascript: {
    courseImage: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?auto=format&fit=crop&w=1200&q=80',
    thumbnailImage: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?auto=format&fit=crop&w=600&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?auto=format&fit=crop&w=1600&q=80',
    altText: 'Modern JavaScript Engine and Asynchronous Code',
    accentColor: '#EAB308',
  },

  // 4. C Programming & Systems
  c: {
    courseImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    thumbnailImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80',
    altText: 'C Systems Programming Microchip and Memory Hardware',
    accentColor: '#64748B',
  },

  // 5. C++ Modern Software Engineering
  cpp: {
    courseImage: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=1200&q=80',
    thumbnailImage: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=600&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=1600&q=80',
    altText: 'C++ Modern High Performance Software Development',
    accentColor: '#0284C7',
  },

  // 6. TypeScript for Scale
  typescript: {
    courseImage: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80',
    thumbnailImage: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=600&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1600&q=80',
    altText: 'TypeScript Static Typing and Clean Code Syntax',
    accentColor: '#3178C6',
  },

  // 7. Go Cloud Systems
  go: {
    courseImage: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=1200&q=80',
    thumbnailImage: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=600&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=1600&q=80',
    altText: 'Go Programming Concurrency and Cloud Microservices',
    accentColor: '#00ADD8',
  },

  // 8. Rust Systems Programming
  rust: {
    courseImage: 'https://images.unsplash.com/photo-1537884944318-390069bb8665?auto=format&fit=crop&w=1200&q=80',
    thumbnailImage: 'https://images.unsplash.com/photo-1537884944318-390069bb8665?auto=format&fit=crop&w=600&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1537884944318-390069bb8665?auto=format&fit=crop&w=1600&q=80',
    altText: 'Rust Memory Safety and Systems Programming Matrix',
    accentColor: '#DEA584',
  },

  // 9. Web Development (HTML & CSS)
  'html-css': {
    courseImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
    thumbnailImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1600&q=80',
    altText: 'Web Development Responsive User Interface Design',
    accentColor: '#3B82F6',
  },

  // 10. React & Next.js
  react: {
    courseImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1200&q=80',
    thumbnailImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=600&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1600&q=80',
    altText: 'React and Next.js Modern Component Architecture',
    accentColor: '#06B6D4',
  },

  // 11. SQL & DBMS
  dbms: {
    courseImage: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=1200&q=80',
    thumbnailImage: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=600&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=1600&q=80',
    altText: 'Relational Database Management and SQL Analytics',
    accentColor: '#F59E0B',
  },

  // 12. Data Structures & Algorithms
  dsa: {
    courseImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    thumbnailImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1600&q=80',
    altText: 'Data Structures, Algorithms and Problem Solving Code',
    accentColor: '#A855F7',
  },

  // 13. Generative AI & Autonomous Agents
  'genai-llm-agents': {
    courseImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80',
    thumbnailImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=600&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1600&q=80',
    altText: 'Generative AI, Neural Models, and Autonomous Agents',
    accentColor: '#EC4899',
  },

  // 14. Web Security & OWASP Defense
  'web-security': {
    courseImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80',
    thumbnailImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1600&q=80',
    altText: 'Cybersecurity Operations, Defensive Security and Encryption',
    accentColor: '#EF4444',
  },

  // 15. Linux Systems & Security
  'linux-security': {
    courseImage: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&w=1200&q=80',
    thumbnailImage: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&w=600&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&w=1600&q=80',
    altText: 'Linux Command Line, Shell Scripting and Server Hardening',
    accentColor: '#10B981',
  },

  // 16. Git & GitHub
  'git-github': {
    courseImage: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=1200&q=80',
    thumbnailImage: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=600&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=1600&q=80',
    altText: 'Git Version Control Branching and GitHub Collaboration',
    accentColor: '#F97316',
  },

  // 17. Cloud Computing & DevOps
  'cloud-devops': {
    courseImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    thumbnailImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80',
    altText: 'Cloud Infrastructure, Docker Containers and DevOps Pipelines',
    accentColor: '#0EA5E9',
  },

  // 18. Software Testing & QA Automation
  'software-testing': {
    courseImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
    thumbnailImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80',
    altText: 'Software Quality Assurance, Automated Unit Testing and CI/CD',
    accentColor: '#14B8A6',
  },

  // 19. Distributed System Design
  'system-design': {
    courseImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
    thumbnailImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1600&q=80',
    altText: 'Distributed Systems Architecture and High-Availability Topology',
    accentColor: '#6366F1',
  },

  // 20. Operating Systems Internals
  'operating-systems': {
    courseImage: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=1200&q=80',
    thumbnailImage: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=600&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=1600&q=80',
    altText: 'Operating Systems CPU Scheduling Virtual Memory and Kernel Architecture',
    accentColor: '#8B5CF6',
  },

  // 21. Computer Networks & HTTP
  'computer-networks': {
    courseImage: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80',
    thumbnailImage: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1600&q=80',
    altText: 'Computer Networks Packet Routing Fiber Optics and HTTP Protocols',
    accentColor: '#06B6D4',
  },

  // 22. Technical Interview Preparation
  'interview-preparation': {
    courseImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
    thumbnailImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80',
    altText: 'Technical Interview Mastery and Live Coding Whiteboard',
    accentColor: '#C9A227',
  },
};

/**
 * Distinct abstract fallback image that is NOT assigned to any course.
 */
const DEFAULT_FALLBACK_IMAGE: CourseImageSet = {
  courseImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
  thumbnailImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80',
  bannerImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80',
  altText: 'First Move (11~18) Professional Technology Course',
  accentColor: '#C9A227',
};

/**
 * Returns the unique image set for the specified course slug.
 * Guarantees every course has a distinct, non-overlapping photo.
 */
export function getCourseImages(slug: string): CourseImageSet {
  return COURSE_IMAGES[slug] || DEFAULT_FALLBACK_IMAGE;
}
