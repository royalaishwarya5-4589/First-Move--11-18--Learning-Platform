'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchLatestPreCourseAssessmentAction } from '@/app/actions/preCourse';
import { PersonalizedLearningPath } from '@/lib/preCourseEngine';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { Badge } from '@/components/Badge';
import { CompassResultSkeleton } from '@/components/Skeleton';
import { EmptyState } from '@/components/EmptyState';

export default function LearningPathPage() {
  const [loading, setLoading] = useState<boolean>(true);
  const [learningPath, setLearningPath] = useState<PersonalizedLearningPath | null>(null);

  useEffect(() => {
    document.title = 'Personalized Learning Track | First Move (11–18)';
    async function loadPath() {
      setLoading(true);

      const serverRes = await fetchLatestPreCourseAssessmentAction();
      if (serverRes.learningPath) {
        setLearningPath(serverRes.learningPath);
        setLoading(false);
        return;
      }

      // Local storage fallback
      try {
        const storedPath = localStorage.getItem('learntech_latest_learning_path');
        if (storedPath) {
          setLearningPath(JSON.parse(storedPath));
        }
      } catch (err) {
        console.warn('LocalStorage path parse failed', err);
      }

      setLoading(false);
    }

    loadPath();
  }, []);

  if (loading) {
    return (
      <div className="site-container" style={{ maxWidth: '1180px' }}>
        <CompassResultSkeleton />
      </div>
    );
  }

  if (!learningPath || !learningPath.course) {
    return (
      <div className="site-container" style={{ maxWidth: '780px', margin: '0 auto' }}>
        <EmptyState
          icon="🧭"
          title="No Learning Path Active"
          description="Take our 5-minute Career Compass discovery test to discover your optimal technology domain and unlock a custom learning journey."
          actionLabel="Start Career Compass Discovery →"
          actionHref="/assessment"
        />
      </div>
    );
  }

  const course = learningPath.course;

  return (
    <div className="site-container" style={{ maxWidth: '1180px' }}>
      {/* Header Banner */}
      <div style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '1.85rem' }}>{learningPath.domainIcon || '🧭'}</span>
          <Badge variant="gold" size="md">
            {learningPath.domainTitle} Path
          </Badge>
          <span style={{ fontSize: '0.925rem', color: 'var(--text-muted)' }}>
            Career Compass Match: <strong style={{ color: 'var(--accent-gold-deep)' }}>{learningPath.matchPercentage}%</strong>
          </span>
        </div>

        <h1 style={{ fontSize: 'clamp(1.9rem, 3.2vw + 0.5rem, 2.65rem)', fontWeight: 900, color: 'var(--text-main)', marginBottom: '0.75rem', lineHeight: 1.2, letterSpacing: '-0.02em' }}>
          Your Recommended Learning Path
        </h1>
        <p style={{ fontSize: 'clamp(1rem, 0.4vw + 0.9rem, 1.15rem)', color: 'var(--text-muted)', lineHeight: 1.65 }}>
          Personalized starting path for <strong>{learningPath.domainTitle}</strong> based on your Career Compass preferences.
        </p>
      </div>

      {/* Rationale Card */}
      <Card
        hoverable={false}
        style={{
          padding: '1.85rem',
          marginBottom: '2.5rem',
          backgroundColor: '#FFFFFF',
          borderLeft: '5px solid var(--accent-gold)',
          borderTop: '1px solid var(--border-color)',
          borderRight: '1px solid var(--border-color)',
          borderBottom: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <div style={{ display: 'flex', gap: '1.1rem', alignItems: 'flex-start' }}>
          <div style={{ fontSize: '1.85rem', flexShrink: 0 }}>🎯</div>
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 850, color: 'var(--text-main)', marginBottom: '0.4rem' }}>
              Why this path is recommended for you:
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.65, margin: 0 }}>
              &ldquo;{learningPath.rationaleMessage}&rdquo;
            </p>
          </div>
        </div>
      </Card>

      {/* Primary Course Card */}
      <Card hoverable={false} style={{ padding: '2.25rem', marginBottom: '2.5rem', borderRadius: 'var(--radius-xl)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.25rem', marginBottom: '1.75rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '2.25rem' }}>{course.icon || '📚'}</span>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--text-main)', margin: 0 }}>
                {course.title}
              </h2>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.975rem', maxWidth: '660px', lineHeight: 1.6, margin: 0 }}>
              {course.description}
            </p>
          </div>

          <Link href={`/paths/${course.slug}`}>
            <Button variant="primary" style={{ padding: '0.85rem 1.85rem', fontWeight: 800, fontSize: '0.975rem' }}>
              Start Recommended Course →
            </Button>
          </Link>
        </div>

        <div style={{ display: 'flex', gap: '2rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem', flexWrap: 'wrap' }}>
          <div>
            <span style={{ fontSize: '0.775rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 750, letterSpacing: '0.04em' }}>
              Estimated Duration
            </span>
            <div style={{ fontSize: '1.1rem', fontWeight: 850, color: 'var(--text-main)', marginTop: '0.2rem' }}>
              ~{course.estimatedHours || 12} Hours
            </div>
          </div>
          <div>
            <span style={{ fontSize: '0.775rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 750, letterSpacing: '0.04em' }}>
              Total Content
            </span>
            <div style={{ fontSize: '1.1rem', fontWeight: 850, color: 'var(--text-main)', marginTop: '0.2rem' }}>
              {course.modules.length} Modules • {course.totalLessons || course.modules.reduce((acc, m) => acc + m.lessons.length, 0)} Lessons
            </div>
          </div>
          <div>
            <span style={{ fontSize: '0.775rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 750, letterSpacing: '0.04em' }}>
              Recommended Start
            </span>
            <div style={{ fontSize: '1.1rem', fontWeight: 850, color: 'var(--accent-gold-deep)', marginTop: '0.2rem' }}>
              {learningPath.startingModuleTitle}
            </div>
          </div>
        </div>
      </Card>

      {/* Structured Course Sequence */}
      <h3 style={{ fontSize: '1.35rem', fontWeight: 850, color: 'var(--text-main)', marginBottom: '1.25rem', letterSpacing: '-0.015em' }}>
        Structured Course Sequence
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '3.5rem' }}>
        {learningPath.recommendedModules.map((item, idx) => {
          const mod = item.module;
          const isStartPoint = item.isStartingPoint;

          return (
            <Card
              key={mod.id || mod.slug}
              hoverable={false}
              style={{
                padding: '1.65rem',
                border: isStartPoint ? '1.5px solid var(--accent-gold)' : '1px solid var(--border-color)',
                backgroundColor: isStartPoint ? 'rgba(201, 162, 39, 0.04)' : '#FFFFFF',
                borderRadius: 'var(--radius-lg)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span
                    style={{
                      width: '2.1rem',
                      height: '2.1rem',
                      borderRadius: '50%',
                      backgroundColor: isStartPoint ? 'var(--accent-gold)' : 'var(--bg-muted)',
                      color: isStartPoint ? '#FFFFFF' : 'var(--text-main)',
                      fontWeight: 850,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.9rem',
                    }}
                  >
                    {idx + 1}
                  </span>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
                    {mod.title}
                  </h4>
                </div>

                <Badge variant={isStartPoint ? 'gold' : 'level'} size="sm">
                  {item.status}
                </Badge>
              </div>

              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.75rem', paddingLeft: '2.85rem', lineHeight: 1.55, margin: 0 }}>
                {mod.description}
              </p>

              {item.customNote && (
                <div
                  style={{
                    marginLeft: '2.85rem',
                    marginTop: '0.75rem',
                    fontSize: '0.825rem',
                    fontWeight: 750,
                    color: 'var(--accent-gold-deep)',
                    backgroundColor: 'rgba(201, 162, 39, 0.09)',
                    padding: '0.4rem 0.85rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid rgba(201, 162, 39, 0.25)',
                    display: 'inline-block',
                  }}
                >
                  🚀 {item.customNote}
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {/* Navigation Footer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderTop: '1px solid var(--border-color)', paddingTop: '2rem' }}>
        <Link href={`/paths/${course.slug}`}>
          <Button variant="primary" style={{ padding: '0.85rem 1.85rem', fontWeight: 800 }}>
            Start Learning {course.title} →
          </Button>
        </Link>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <Link href="/assessment/result">
            <Button variant="secondary">Explore Other Domains 🌐</Button>
          </Link>
          <Link href="/assessment">
            <Button variant="secondary">Retake Career Compass 🔄</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
