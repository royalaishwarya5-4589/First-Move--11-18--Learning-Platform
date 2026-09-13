'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { Card } from '@/components/Card';
import { Badge } from '@/components/Badge';
import { Button } from '@/components/Button';
import { Path, Module, Lesson } from '@/types/content';
import { LessonProgress } from '@/types/user';
import { useAuth } from '@/components/Auth/AuthProvider';
import { calculatePathProgress } from '@/lib/progressUtils';
import { fetchPathProgress } from '@/app/actions/progress';
import { CertificationRequirements } from '@/components/Certificate/CertificationRequirements';
import { CertificatePreviewSection } from '@/components/Certificate/CertificatePreviewSection';
import { isEligibleForCertification } from '@/lib/assessmentEngine';
import { getCourseImages } from '@/content/course-images';
import { getCourseCareerMetadata } from '@/content/course-career-data';
import { CourseHero } from '@/components/Course/CourseHero';
import { CourseSectionNav } from '@/components/Course/CourseSectionNav';
import { CourseCareerCompassWidget } from '@/components/Course/CourseCareerCompassWidget';
import { CourseAreasSection } from '@/components/Course/CourseAreasSection';
import { CourseToolsSection } from '@/components/Course/CourseToolsSection';
import { CourseSkillsSection } from '@/components/Course/CourseSkillsSection';
import { CareerPathwayInteractive } from '@/components/Course/CareerPathwayInteractive';
import { CourseJobRolesSection } from '@/components/Course/CourseJobRolesSection';
import { CourseProjectsSection } from '@/components/Course/CourseProjectsSection';
import { CourseRoadmapSection } from '@/components/Course/CourseRoadmapSection';
import { Breadcrumb } from '@/components/Breadcrumb';

interface CoursePathClientProps {
  path: Path;
}

const LOCAL_STORAGE_KEY = 'learntech_guest_progress';

export function CoursePathClient({ path }: CoursePathClientProps) {
  const { user } = useAuth();
  const [progressMap, setProgressMap] = useState<Record<string, LessonProgress>>({});
  const [, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('overview');
  const [isSticky, setIsSticky] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const isManualScrollRef = useRef(false);
  const manualScrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadPathProgress() {
      setIsLoading(true);
      let newMap: Record<string, LessonProgress> = {};

      if (user) {
        newMap = await fetchPathProgress(path.slug);
      } else {
        try {
          const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
          if (raw) {
            const parsed = JSON.parse(raw) as Record<string, LessonProgress>;
            Object.values(parsed).forEach((rec) => {
              if (rec.path_slug === path.slug) {
                newMap[rec.lesson_slug] = rec;
              }
            });
          }
        } catch {
          // Ignore
        }
      }

      if (isMounted) {
        setProgressMap(newMap);
        setIsLoading(false);
      }
    }

    loadPathProgress();

    return () => {
      isMounted = false;
    };
  }, [user, path]);

  // Sentinel observer for detecting sticky state below persistent header
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Persistent header is 4.5rem (72px)
        setIsSticky(!entry.isIntersecting && entry.boundingClientRect.top <= 72);
      },
      { rootMargin: '-72px 0px 0px 0px', threshold: [0, 1] }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  // Active section detection via IntersectionObserver and scroll position
  useEffect(() => {
    const handleScrollEdges = () => {
      if (isManualScrollRef.current) return;
      if (window.scrollY < 120) {
        setActiveSection('overview');
        return;
      }
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60) {
        setActiveSection('curriculum');
        return;
      }
    };

    window.addEventListener('scroll', handleScrollEdges, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        if (isManualScrollRef.current) return;

        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          // Sort by proximity to the top offset (144px)
          visibleEntries.sort(
            (a, b) =>
              Math.abs(a.boundingClientRect.top - 144) - Math.abs(b.boundingClientRect.top - 144)
          );
          const rawId = visibleEntries[0].target.id;
          if (rawId) {
            const mappedId = rawId === 'career-pathway' ? 'jobs' : rawId;
            setActiveSection(mappedId);
          }
        }
      },
      {
        rootMargin: '-140px 0px -45% 0px',
        threshold: [0, 0.15, 0.4],
      }
    );

    const sectionIds = [
      'overview',
      'skills',
      'tools',
      'areas',
      'career-pathway',
      'jobs',
      'projects',
      'roadmap',
      'curriculum',
    ];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScrollEdges);
      observer.disconnect();
    };
  }, []);

  // Handle URL hash on initial load and back/forward navigation
  useEffect(() => {
    const handleHashSync = () => {
      if (typeof window !== 'undefined' && window.location.hash) {
        const hash = window.location.hash.replace('#', '');
        const valid = [
          'overview',
          'skills',
          'tools',
          'areas',
          'career-pathway',
          'jobs',
          'projects',
          'roadmap',
          'curriculum',
        ];
        if (valid.includes(hash)) {
          const mapped = hash === 'career-pathway' ? 'jobs' : hash;
          setActiveSection(mapped);
          setTimeout(() => {
            const target = document.getElementById(hash);
            if (target) {
              const offset = 144;
              const pos = target.getBoundingClientRect().top + window.scrollY - offset;
              window.scrollTo({ top: Math.max(0, pos), behavior: 'smooth' });
            }
          }, 150);
        }
      }
    };

    handleHashSync();
    window.addEventListener('popstate', handleHashSync);
    return () => window.removeEventListener('popstate', handleHashSync);
  }, []);

  const handleNavigate = useCallback((sectionId: string) => {
    setActiveSection(sectionId);
    isManualScrollRef.current = true;
    if (manualScrollTimeoutRef.current) {
      clearTimeout(manualScrollTimeoutRef.current);
    }

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (sectionId === 'overview') {
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      });
    } else {
      const targetEl = document.getElementById(sectionId);
      if (targetEl) {
        const totalOffset = 144; // 72px header + 56px nav + 16px buffer
        const targetTop = targetEl.getBoundingClientRect().top + window.scrollY - totalOffset;
        window.scrollTo({
          top: Math.max(0, targetTop),
          behavior: prefersReducedMotion ? 'auto' : 'smooth',
        });
      }
    }

    if (typeof window !== 'undefined' && window.history.pushState) {
      window.history.pushState(null, '', `#${sectionId}`);
    }

    manualScrollTimeoutRef.current = setTimeout(() => {
      isManualScrollRef.current = false;
    }, 750);
  }, []);

  const pathStats = calculatePathProgress(path, progressMap);
  const eligibility = isEligibleForCertification(path, progressMap);

  const totalExercises = path.modules.reduce(
    (acc, m) => acc + m.lessons.filter((l) => Boolean(l.exercise)).length,
    0
  );
  const totalProjects = path.projects ? path.projects.length : 0;
  const finalAssessment = path.assessments && path.assessments.length > 0 ? path.assessments[0] : null;

  // Group modules by Level
  const level1Modules = path.modules.filter(
    (m) => m.level === 'foundations' || m.level === 'absolute_beginner' || m.level === 'beginner' || m.orderIndex === 1
  );
  const level2Modules = path.modules.filter(
    (m) => (m.level === 'intermediate' || m.orderIndex === 2) && !level1Modules.includes(m)
  );
  const level3Modules = path.modules.filter(
    (m) => !level1Modules.includes(m) && !level2Modules.includes(m)
  );

  const images = getCourseImages(path.slug);
  const careerMeta = getCourseCareerMetadata(path.slug);

  return (
    <div className="course-detail-wrapper" style={{ width: '100%' }}>
      {/* 1. Course Hero Section */}
      <div className="site-container-wide" style={{ paddingTop: '2.5rem', paddingBottom: '0.75rem' }}>
        <Breadcrumb
          items={[
            { label: 'Home', href: '/', icon: '🏠' },
            { label: 'Courses', href: '/paths', icon: '📚' },
            { label: path.title, icon: path.icon },
          ]}
        />
        <CourseHero
          path={path}
          images={images}
          completedLessonsCount={pathStats.completedLessons}
          totalExercises={totalExercises}
          totalProjects={totalProjects}
        />
      </div>

      {/* Sentinel for detecting when navigation docks beneath the header */}
      <div ref={sentinelRef} style={{ height: '1px', marginTop: '-1px', pointerEvents: 'none' }} />

      {/* Sticky Section Navigation */}
      <CourseSectionNav
        activeSection={activeSection}
        onNavigate={handleNavigate}
        isSticky={isSticky}
      />

      {/* Main Course Content Sections */}
      <div className="site-container-wide" style={{ paddingTop: '2.5rem', paddingBottom: '5rem' }}>
        {/* 2. Personalized Career Compass Integration Widget */}
        <CourseCareerCompassWidget careerMeta={careerMeta} />

        {/* 3. Skills You'll Build (Categorized: Technical, Problem Solving, Professional) */}
        <CourseSkillsSection skills={careerMeta.skills} />

        {/* 4. Tools & Technologies You'll Work With */}
        <CourseToolsSection tools={careerMeta.tools} />

        {/* 5. Where You'll Use This (Industry Application Areas) */}
        <CourseAreasSection areas={careerMeta.areas} courseTitle={path.title} />

        {/* 6. Signature Course-to-Career Connection Flow (Course -> Skills -> Tools -> Areas -> Roles) */}
        <CareerPathwayInteractive pathway={careerMeta.pathway} />

        {/* 7. Career Opportunities (Job Roles with Deep-Dive Explore Drawer) */}
        <CourseJobRolesSection jobRoles={careerMeta.jobRoles} courseTitle={path.title} />

        {/* 8. Real Projects You Can Build */}
        <CourseProjectsSection projects={careerMeta.realWorldProjects} courseTitle={path.title} />

        {/* 9. Visual Learning Roadmap (6-Stage Progression) */}
        <CourseRoadmapSection
          stages={careerMeta.learningStages}
          completedLessonsCount={pathStats.completedLessons}
          totalLessons={path.totalLessons}
        />

        {/* 10. Certificate Preview Section */}
        <CertificatePreviewSection
          courseName={path.title}
          courseSlug={path.slug}
          level="Level 1–3 | Professional Learning Path"
          skills={path.certificationRequirement?.skillsCovered}
        />

        {/* 11. Certification Requirements Widget */}
        <CertificationRequirements path={path} eligibility={eligibility} />

        {/* 12. Complete Learning Journey Visual Curriculum (Level 1 -> Level 2 -> Level 3) */}
        <div
          id="curriculum"
          className="course-anchor-target"
          style={{ marginTop: '3.5rem', marginBottom: '4rem', scrollMarginTop: '144px' }}
        >
        <div style={{ marginBottom: '2rem' }}>
          <span className="section-tag">Structured Learning Journey</span>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, marginTop: '0.3rem', color: 'var(--text-main)' }}>
            Course Curriculum & Level Progression
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>
            Guided 3-tier progression taking learners from fundamental concepts to core practical engineering and production mastery.
          </p>
        </div>

        {/* Level 1 — Foundations */}
        {level1Modules.length > 0 && (
          <div style={{ marginBottom: '2.5rem' }}>
            <div
              style={{
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                borderLeft: '4px solid #3b82f6',
                padding: '1rem 1.5rem',
                borderRadius: 'var(--radius-md) var(--radius-md) 0 0',
                marginBottom: '1rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '1.25rem' }}>🌱</span>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
                  LEVEL 1 — FOUNDATIONS
                </h3>
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginTop: '0.25rem', margin: 0 }}>
                Learn absolute fundamentals, core syntax, environment setup, and fundamental logic blocks.
              </p>
            </div>

            <RenderModuleList modules={level1Modules} path={path} progressMap={progressMap} />
          </div>
        )}

        {/* Level 2 — Core Practice */}
        {level2Modules.length > 0 && (
          <div style={{ marginBottom: '2.5rem' }}>
            <div
              style={{
                backgroundColor: 'rgba(245, 158, 11, 0.1)',
                borderLeft: '4px solid #f59e0b',
                padding: '1rem 1.5rem',
                borderRadius: 'var(--radius-md) var(--radius-md) 0 0',
                marginBottom: '1rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '1.25rem' }}>🛠️</span>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
                  LEVEL 2 — CORE PRACTICE
                </h3>
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginTop: '0.25rem', margin: 0 }}>
                Solve realistic problems, master data structures, error handling, design patterns, and mini-projects.
              </p>
            </div>

            <RenderModuleList modules={level2Modules} path={path} progressMap={progressMap} />
          </div>
        )}

        {/* Level 3 — Advanced & Professional */}
        {level3Modules.length > 0 && (
          <div style={{ marginBottom: '2.5rem' }}>
            <div
              style={{
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                borderLeft: '4px solid #10b981',
                padding: '1rem 1.5rem',
                borderRadius: 'var(--radius-md) var(--radius-md) 0 0',
                marginBottom: '1rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '1.25rem' }}>🚀</span>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
                  LEVEL 3 — ADVANCED & PRODUCTION MASTERY
                </h3>
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginTop: '0.25rem', margin: 0 }}>
                Apply knowledge to real software architecture, security, optimization, scale, and portfolio capstones.
              </p>
            </div>

            <RenderModuleList modules={level3Modules} path={path} progressMap={progressMap} />
          </div>
        )}
      </div>

      {/* 7. Portfolio Projects Section */}
      {path.projects && path.projects.length > 0 && (
        <div style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--text-main)' }}>
            🏆 Hands-On Portfolio Projects
          </h2>
          <div className="card-grid">
            {path.projects.map((project) => (
              <Card key={project.id} style={{ backgroundColor: 'var(--bg-surface)' }}>
                <div style={{ marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Badge variant="success">
                    {project.difficulty.toUpperCase()} PROJECT
                  </Badge>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>⏱️ ~{project.estimatedHours}h</span>
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.4rem', color: 'var(--text-main)' }}>
                  {project.title}
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1.25rem', lineHeight: 1.5 }}>
                  {project.subtitle}
                </p>
                <Button href={`/paths/${path.slug}/projects/${project.slug}`} variant="outline" size="sm" style={{ width: '100%', fontWeight: 700 }}>
                  Open Project Blueprint & Starter Code →
                </Button>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* 8. Final Assessment Banner */}
      {finalAssessment && (
        <div
          style={{
            backgroundColor: 'var(--bg-surface)',
            border: '2px solid var(--accent-primary)',
            borderRadius: 'var(--radius-lg)',
            padding: '2rem',
            marginBottom: '3rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1.5rem',
          }}
        >
          <div>
            <div style={{ marginBottom: '0.5rem' }}>
              <Badge variant="active">FINAL CERTIFICATION EVALUATION</Badge>
            </div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)', margin: '0.2rem 0' }}>
              {finalAssessment.title}
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', margin: 0, maxWidth: '600px' }}>
              {finalAssessment.description} (Passing Threshold: {finalAssessment.passingScorePercent}%)
            </p>
          </div>

          <Button href={`/paths/${path.slug}/assessments/${finalAssessment.slug}`} variant="primary" size="md" style={{ fontWeight: 800 }}>
            Take Final Assessment →
          </Button>
        </div>
      )}
      </div>
    </div>
  );
}

function RenderModuleList({
  modules,
  path,
  progressMap,
}: {
  modules: Module[];
  path: Path;
  progressMap: Record<string, LessonProgress>;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {modules.map((moduleItem: Module, modIdx: number) => (
        <div
          key={moduleItem.id}
          style={{
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.75rem',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Badge variant="level">Module {modIdx + 1}</Badge>
              <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
                {moduleItem.title}
              </h4>
            </div>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>
              {moduleItem.lessons.length} Lessons
            </span>
          </div>

          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginBottom: '1.25rem', lineHeight: 1.5 }}>
            {moduleItem.description}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {moduleItem.lessons.map((lessonItem: Lesson, lesIdx: number) => {
              const rec = progressMap[lessonItem.slug];
              const isCompleted = rec?.status === 'completed';

              return (
                <div
                  key={lessonItem.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: 'var(--bg-app)',
                    border: isCompleted ? '1px solid #10b981' : '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    padding: '0.9rem 1.25rem',
                    flexWrap: 'wrap',
                    gap: '0.75rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1, minWidth: '250px' }}>
                    <span
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        backgroundColor: isCompleted ? '#10b981' : 'var(--bg-surface)',
                        color: isCompleted ? '#ffffff' : 'var(--text-muted)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        border: isCompleted ? 'none' : '1px solid var(--border-color)',
                      }}
                    >
                      {isCompleted ? '✓' : lesIdx + 1}
                    </span>

                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <Link
                          href={`/paths/${path.slug}/lessons/${lessonItem.slug}`}
                          style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)', textDecoration: 'none' }}
                        >
                          {lessonItem.title}
                        </Link>
                        {isCompleted && (
                          <span style={{ fontSize: '0.75rem', backgroundColor: '#10b9811f', color: '#10b981', padding: '0.15rem 0.5rem', borderRadius: '4px', fontWeight: 700 }}>
                            Completed
                          </span>
                        )}
                        {lessonItem.exercise && (
                          <span style={{ fontSize: '0.75rem', backgroundColor: 'var(--bg-surface)', color: 'var(--accent-primary)', border: '1px solid var(--border-color)', padding: '0.15rem 0.5rem', borderRadius: '4px', fontWeight: 600 }}>
                            ⚡ Coding Exercise
                          </span>
                        )}
                      </div>
                      <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                        {lessonItem.description} ({lessonItem.estimatedMinutes} mins)
                      </span>
                    </div>
                  </div>

                  <Button href={`/paths/${path.slug}/lessons/${lessonItem.slug}`} variant={isCompleted ? 'outline' : 'primary'} size="sm">
                    {isCompleted ? 'Review' : 'Start Lesson'} →
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

