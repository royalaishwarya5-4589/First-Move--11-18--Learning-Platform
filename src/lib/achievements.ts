import { Achievement, LessonProgress, ProjectProgress } from '@/types/user';
import { Path } from '@/types/content';

export const ALL_ACHIEVEMENTS: Omit<Achievement, 'isUnlocked' | 'unlockedAt'>[] = [
  {
    id: 'first-lesson',
    title: 'First Step',
    description: 'Completed your first interactive lesson on First Move (11–18).',
    icon: '🚀',
    category: 'lesson',
  },
  {
    id: 'first-exercise',
    title: 'Code Solver',
    description: 'Passed your first Python coding exercise.',
    icon: '⚡',
    category: 'exercise',
  },
  {
    id: 'first-quiz',
    title: 'Knowledge Check',
    description: 'Passed your first lesson knowledge quiz.',
    icon: '❓',
    category: 'exercise',
  },
  {
    id: 'first-project',
    title: 'Portfolio Builder',
    description: 'Completed your first Python portfolio project.',
    icon: '🛠️',
    category: 'project',
  },
  {
    id: 'streak-3',
    title: 'Consistent Learner',
    description: 'Maintained a 3-day active learning streak.',
    icon: '🔥',
    category: 'streak',
  },
  {
    id: 'streak-7',
    title: 'Unstoppable Developer',
    description: 'Maintained a 7-day active learning streak.',
    icon: '🏆',
    category: 'streak',
  },
  {
    id: 'py-fundamentals-complete',
    title: 'Python Fundamentals Master',
    description: 'Completed all lessons in Level 1: Python Fundamentals.',
    icon: '🐍',
    category: 'mastery',
  },
  {
    id: 'py-path-complete',
    title: 'Python Mastery Graduate',
    description: 'Completed all lessons and projects in Python Programming Mastery.',
    icon: '🎓',
    category: 'mastery',
  },
];

export function evaluateAchievements(
  path: Path,
  lessonProgressList: LessonProgress[] | Record<string, LessonProgress>,
  projectProgressList: ProjectProgress[] | Record<string, ProjectProgress>,
  streakCount: number,
  unlockedMap: Record<string, string> = {} // maps achievement_id to unlocked_at timestamp
): Achievement[] {
  const lessonMap: Record<string, LessonProgress> = Array.isArray(lessonProgressList)
    ? lessonProgressList.reduce((acc, item) => {
        acc[item.lesson_slug] = item;
        return acc;
      }, {} as Record<string, LessonProgress>)
    : lessonProgressList;

  const projectMap: Record<string, ProjectProgress> = Array.isArray(projectProgressList)
    ? projectProgressList.reduce((acc, item) => {
        acc[item.project_slug] = item;
        return acc;
      }, {} as Record<string, ProjectProgress>)
    : projectProgressList;

  const completedLessons = Object.values(lessonMap).filter((l) => l.status === 'completed');
  const solvedExercises = Object.values(lessonMap).filter((l) => l.exercise_completed);
  const passedQuizzes = Object.values(lessonMap).filter((l) => l.quiz_completed);
  const completedProjects = Object.values(projectMap).filter((p) => p.status === 'completed');

  // Check Level 1 / Fundamentals completion
  const level1Module = path.modules.find(
    (m) => m.slug === 'fundamentals' || m.orderIndex === 1 || m.level === 'foundations'
  );
  const isLevel1Complete = level1Module
    ? level1Module.lessons.every((les) => lessonMap[les.slug]?.status === 'completed')
    : false;

  // Check overall Python path completion
  const totalPathLessons = path.modules.flatMap((m) => m.lessons).length;
  const isPathComplete = completedLessons.length >= totalPathLessons && totalPathLessons > 0;

  return ALL_ACHIEVEMENTS.map((ach) => {
    let unlocked = !!unlockedMap[ach.id];
    let timestamp = unlockedMap[ach.id] || null;

    if (!unlocked) {
      switch (ach.id) {
        case 'first-lesson':
          unlocked = completedLessons.length > 0;
          break;
        case 'first-exercise':
          unlocked = solvedExercises.length > 0;
          break;
        case 'first-quiz':
          unlocked = passedQuizzes.length > 0;
          break;
        case 'first-project':
          unlocked = completedProjects.length > 0;
          break;
        case 'streak-3':
          unlocked = streakCount >= 3;
          break;
        case 'streak-7':
          unlocked = streakCount >= 7;
          break;
        case 'py-fundamentals-complete':
          unlocked = isLevel1Complete;
          break;
        case 'py-path-complete':
          unlocked = isPathComplete;
          break;
      }
      if (unlocked && !timestamp) {
        timestamp = new Date().toISOString();
      }
    }

    return {
      ...ach,
      isUnlocked: unlocked,
      unlockedAt: timestamp,
    };
  });
}
