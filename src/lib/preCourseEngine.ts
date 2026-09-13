import { CAREER_COMPASS_QUESTIONS, DOMAINS, getDomainInfo } from '@/content/pre-course-data';
import { getPathBySlug } from '@/content';
import { Path, Module } from '@/types/content';

export interface DomainMatch {
  domainSlug: string;
  title: string;
  icon: string;
  matchPercentage: number;
  description: string;
  whyMatches: string;
  recommendedStartingPath: string;
}

export interface CareerCompassResult {
  assessmentType: 'career_compass';
  domainMatches: Record<string, number>;
  topRecommendations: DomainMatch[];
  allRecommendations: DomainMatch[];
  primaryDomain: DomainMatch;
  completedAt: string;
}

export interface RecommendedModuleItem {
  module: Module;
  status: 'Strong / Completed' | 'Recommended Starting Point' | 'Recommended' | 'Upcoming / Advanced';
  isStartingPoint: boolean;
  customNote?: string;
}

export interface PersonalizedLearningPath {
  domainSlug: string;
  domainTitle: string;
  domainIcon: string;
  matchPercentage: number;
  course: Path | null;
  startingModuleIndex: number;
  startingModuleTitle: string;
  recommendedModules: RecommendedModuleItem[];
  rationaleMessage: string;
  topDomainRecommendations: DomainMatch[];
}

/**
 * Career Compass Discovery Engine
 * Evaluates student answers across interests, problem solving, creativity, curiosity,
 * basic knowledge, and working style to compute domain compatibility scores.
 */
export function calculateCareerCompassResult(
  answers: Record<string, number>
): CareerCompassResult {
  const domainRawScores: Record<string, number> = {};
  const domainMaxPossible: Record<string, number> = {};

  // Initialize scores for all 10 domains
  DOMAINS.forEach((d) => {
    domainRawScores[d.slug] = 0;
    domainMaxPossible[d.slug] = 0;
  });

  // Accumulate weights based on chosen options
  CAREER_COMPASS_QUESTIONS.forEach((q) => {
    const selectedOptionIdx = answers[q.id];

    // Calculate max possible points for each domain across options
    DOMAINS.forEach((d) => {
      let maxOptionWeight = 0;
      q.optionWeights.forEach((wMap) => {
        if (wMap[d.slug] && wMap[d.slug] > maxOptionWeight) {
          maxOptionWeight = wMap[d.slug];
        }
      });
      domainMaxPossible[d.slug] += maxOptionWeight;
    });

    // Add selected option weights
    if (selectedOptionIdx !== undefined && q.optionWeights[selectedOptionIdx]) {
      const selectedWeights = q.optionWeights[selectedOptionIdx];
      Object.entries(selectedWeights).forEach(([slug, weight]) => {
        if (domainRawScores[slug] !== undefined) {
          domainRawScores[slug] += weight;
        }
      });
    }
  });

  // Calculate normalized compatibility percentages
  const domainPercentages: Record<string, number> = {};
  DOMAINS.forEach((d) => {
    const max = domainMaxPossible[d.slug] || 1;
    const raw = domainRawScores[d.slug] || 0;
    
    // Normalize to 40% - 95% range for encouraging, realistic display
    const rawRatio = raw / max;
    const percentage = Math.min(96, Math.max(38, Math.round(40 + rawRatio * 55)));
    domainPercentages[d.slug] = percentage;
  });

  // Generate "Why this matches you" explanations based on domain
  const getWhyMatchesExplanation = (slug: string, pct: number): string => {
    switch (slug) {
      case 'web-development':
        return `Your answers show a strong passion for visible results, interactive user experiences, and creative problem solving. Web Development gives you the tools to build digital products used by people worldwide.`;
      case 'python':
        return `You enjoy clean logic, task automation, and versatile problem solving. Python is ideal for turning your ideas into working code quickly, whether for automation, data analysis, or general programming.`;
      case 'java':
        return `You favor structured object-oriented thinking, reliable architecture, and enterprise-grade systems. Java provides a robust foundation for building scalable, high-performance backends.`;
      case 'dsa':
        return `You possess strong analytical curiosity and enjoy solving algorithmic puzzles. Data Structures & Algorithms will sharpen your technical problem-solving speed and core computer science fundamentals.`;
      case 'ai-ml':
        return `You are fascinated by pattern recognition, intelligent systems, and cutting-edge technology. AI & Machine Learning lets you create smart models that learn from data and automate complex tasks.`;
      case 'cybersecurity':
        return `You have a defensive mindset and enjoy investigating systems to protect them from threats. Cybersecurity lets you safeguard applications, user privacy, and critical digital infrastructure.`;
      case 'cloud-computing':
        return `You enjoy understanding how large-scale server networks and infrastructure operate. Cloud Computing & DevOps empowers you to deploy and scale applications across global cloud environments.`;
      case 'database':
        return `You like organizing data logically and designing clean backend systems. Database & Backend Development lets you model complex data relationships and power data-driven applications.`;
      case 'app-dev':
        return `You love touch-friendly interfaces and mobile experiences. App Development lets you create software that runs natively on smartphones and tablets.`;
      case 'ui-ux':
        return `You have an eye for visual design, user empathy, and aesthetic interfaces. UI/UX Design empowers you to craft intuitive wireframes and user-centered digital designs.`;
      default:
        return `Your profile shows a ${pct}% match based on your interests and preferences.`;
    }
  };

  const getRecommendedStartingPath = (slug: string): string => {
    switch (slug) {
      case 'web-development':
        return 'HTML5 → CSS3 → JavaScript ES6+ → React';
      case 'python':
        return 'Python Fundamentals → Control Flow → Data Logic → APIs';
      case 'java':
        return 'Java Syntax → OOP Principles → Collections → Enterprise Services';
      case 'dsa':
        return 'Complexity Analysis → Stacks & Queues → Binary Trees → Graph Algorithms';
      case 'ai-ml':
        return 'Python for Data → ML Model Basics → Neural Networks → LLMs & Agents';
      case 'cybersecurity':
        return 'Web Fundamentals → OWASP Top 10 → Encryption → Ethical Hacking';
      case 'cloud-computing':
        return 'Linux Operations → Docker Containers → Cloud Services → CI/CD Pipelines';
      case 'database':
        return 'SQL Querying → Relational Schemas → Database Indexing → REST APIs';
      case 'app-dev':
        return 'Mobile UI Layouts → State Management → API Integration → Device Build';
      case 'ui-ux':
        return 'User Research → Wireframing → Visual Systems → Interactive Prototypes';
      default:
        return 'Core Fundamentals → Basic Practice → Real-world Project';
    }
  };

  const allRecommendations: DomainMatch[] = DOMAINS.map((d) => {
    const matchP = domainPercentages[d.slug] || 50;
    return {
      domainSlug: d.slug,
      title: d.title,
      icon: d.icon,
      matchPercentage: matchP,
      description: d.description,
      whyMatches: getWhyMatchesExplanation(d.slug, matchP),
      recommendedStartingPath: getRecommendedStartingPath(d.slug),
    };
  });

  // Sort domains by match percentage descending
  allRecommendations.sort((a, b) => b.matchPercentage - a.matchPercentage);

  const topRecommendations = allRecommendations.slice(0, 3);
  const primaryDomain = topRecommendations[0];

  return {
    assessmentType: 'career_compass',
    domainMatches: domainPercentages,
    topRecommendations,
    allRecommendations,
    primaryDomain,
    completedAt: new Date().toISOString(),
  };
}

/**
 * Connects the student's selected domain (or top recommendation)
 * to actual active LearnTech course content.
 */
export function getPersonalizedLearningPath(
  result: CareerCompassResult,
  selectedDomainSlug?: string
): PersonalizedLearningPath {
  const targetDomainSlug = selectedDomainSlug || result.primaryDomain?.domainSlug || 'web-development';
  const domainInfo = getDomainInfo(targetDomainSlug) || DOMAINS[0];
  const courseSlug = domainInfo.mappedCourseSlug;
  const rawCourseObj = getPathBySlug(courseSlug);

  const courseObj = (rawCourseObj && 'modules' in rawCourseObj) ? (rawCourseObj as Path) : null;
  const matchPercentage = result.domainMatches[targetDomainSlug] || 75;

  const startingModuleIndex = 0;
  const startingModuleTitle = courseObj?.modules[0]?.title || 'Module 1: Foundations';

  const rationaleMessage = `Based on your Career Compass results, ${domainInfo.title} has a ${matchPercentage}% match with your interests and preferences. We recommend starting with the core fundamentals to build a strong, confident base.`;

  const recommendedModules: RecommendedModuleItem[] = [];

  if (courseObj && courseObj.modules) {
    courseObj.modules.forEach((mod, idx) => {
      let status: RecommendedModuleItem['status'] = 'Recommended';
      let isStartingPoint = false;

      if (idx === 0) {
        status = 'Recommended Starting Point';
        isStartingPoint = true;
      } else {
        status = 'Upcoming / Advanced';
      }

      recommendedModules.push({
        module: mod,
        status,
        isStartingPoint,
        customNote: isStartingPoint
          ? `Recommended beginner starting point to master fundamentals.`
          : undefined,
      });
    });
  }

  return {
    domainSlug: targetDomainSlug,
    domainTitle: domainInfo.title,
    domainIcon: domainInfo.icon,
    matchPercentage,
    course: courseObj,
    startingModuleIndex,
    startingModuleTitle,
    recommendedModules,
    rationaleMessage,
    topDomainRecommendations: result.topRecommendations,
  };
}
