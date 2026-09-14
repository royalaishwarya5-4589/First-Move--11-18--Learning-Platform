'use client';

import React from 'react';
import { CourseImage } from './CourseImage';
import { Badge } from '@/components/Badge';
import { Button } from '@/components/Button';
import { Path } from '@/types/content';
import { CourseImageSet } from '@/content/course-images';

interface CourseHeroProps {
  path: Path;
  images: CourseImageSet;
  completedLessonsCount: number;
  totalExercises: number;
  totalProjects: number;
}

export function CourseHero({
  path,
  images,
  completedLessonsCount,
  totalExercises,
  totalProjects,
}: CourseHeroProps) {
  const isStarted = completedLessonsCount > 0;
  const isComplete = completedLessonsCount >= path.totalLessons && path.totalLessons > 0;

  const difficultyLabel = path.difficulty
    ? `${path.difficulty.charAt(0).toUpperCase() + path.difficulty.slice(1)}`
    : 'Beginner → Intermediate';

  const scrollToCurriculum = () => {
    const el = document.getElementById('curriculum');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToPathway = () => {
    const el = document.getElementById('career-pathway');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="overview"
      className="course-hero-section course-anchor-target"
      style={{
        backgroundColor: 'var(--bg-surface, #FFFFFF)',
        border: '1px solid var(--border-color, #EDE7D5)',
        borderRadius: 'var(--radius-xl, 24px)',
        padding: '2.5rem',
        marginBottom: '1.5rem',
        boxShadow: 'var(--shadow-md, 0 4px 16px -2px rgba(28, 28, 28, 0.06))',
        position: 'relative',
        overflow: 'hidden',
        scrollMarginTop: '144px',
      }}
    >
      {/* Top Background Gold Glow */}
      <div
        style={{
          position: 'absolute',
          top: '-80px',
          right: '-80px',
          width: '320px',
          height: '320px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(201, 162, 39, 0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2.5rem',
          alignItems: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Left Column: Course Details & CTAs */}
        <div>
          {/* Badges Bar */}
          <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center', flexWrap: 'wrap', marginBottom: '1rem' }}>
            <Badge variant="active">{path.categoryLabel}</Badge>
            <Badge variant="level">⭐ {difficultyLabel}</Badge>
            {path.certificationRequirement?.certificationStatus === 'ready' && (
              <Badge variant="success">🎓 Industry Certificate Ready</Badge>
            )}
          </div>

          {/* Course Title */}
          <h1
            style={{
              fontSize: 'clamp(2rem, 3.8vw, 2.75rem)',
              fontWeight: 800,
              color: 'var(--text-main, #1C1C1C)',
              lineHeight: 1.15,
              marginBottom: '1rem',
              letterSpacing: '-0.02em',
            }}
          >
            {path.title}
          </h1>

          {/* Subtitle / Value Proposition */}
          <p
            style={{
              color: 'var(--text-muted, #6B6B6B)',
              fontSize: '1.125rem',
              lineHeight: 1.65,
              marginBottom: '1.75rem',
              maxWidth: '580px',
            }}
          >
            {path.subtitle || path.description}
          </p>

          {/* Key Metrics Banner */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '0.75rem',
              backgroundColor: 'var(--bg-app, #FAF9F5)',
              border: '1px solid var(--border-color, #EDE7D5)',
              borderRadius: 'var(--radius-md, 12px)',
              padding: '1rem',
              marginBottom: '2rem',
              textAlign: 'center',
            }}
          >
            <div>
              <div style={{ fontSize: '0.725rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Modules
              </div>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)' }}>
                {path.modules.length}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.725rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Lessons
              </div>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)' }}>
                {path.totalLessons}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.725rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Duration
              </div>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--accent-gold-deep, #9F7A16)' }}>
                ~{path.estimatedHours}h
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.725rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Practice
              </div>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)' }}>
                {totalExercises + totalProjects} items
              </div>
            </div>
          </div>

          {/* CTA Actions */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <Button
              variant="primary"
              size="lg"
              onClick={scrollToCurriculum}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.85rem 1.85rem',
                fontSize: '1rem',
                fontWeight: 700,
                boxShadow: '0 6px 20px rgba(201, 162, 39, 0.35)',
              }}
            >
              {isComplete ? 'Review Completed Course ✨' : isStarted ? 'Continue Learning →' : 'Start Learning Course 🚀'}
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={scrollToPathway}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.85rem 1.4rem',
                fontSize: '0.95rem',
              }}
            >
              🧭 View Career Pathway
            </Button>
          </div>
        </div>

        {/* Right Column: Real Course Subject Visual */}
        <div style={{ position: 'relative' }}>
          <div
            style={{
              position: 'relative',
              borderRadius: 'var(--radius-lg, 18px)',
              overflow: 'hidden',
              boxShadow: '0 16px 36px -4px rgba(28, 28, 28, 0.12), 0 6px 16px -2px rgba(201, 162, 39, 0.15)',
              border: '2px solid var(--accent-gold, #C9A227)',
            }}
          >
            <CourseImage
              src={images.courseImage}
              alt={images.altText}
              aspectRatio="16/10"
              priority={true}
              accentColor={images.accentColor}
              fallbackIcon={path.icon}
            />

            {/* In-Image Floating Badge */}
            <div
              style={{
                position: 'absolute',
                bottom: '16px',
                left: '16px',
                right: '16px',
                backgroundColor: 'rgba(255, 255, 255, 0.94)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(201, 162, 39, 0.35)',
                borderRadius: 'var(--radius-md, 12px)',
                padding: '0.75rem 1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '1.25rem' }}>{path.icon}</span>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)' }}>
                    {path.title}
                  </div>
                  <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>
                    Interactive Workbenches • Real Code Verification
                  </div>
                </div>
              </div>
              <span
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: 'var(--accent-gold-deep, #9F7A16)',
                  backgroundColor: 'rgba(201, 162, 39, 0.12)',
                  padding: '0.25rem 0.65rem',
                  borderRadius: '12px',
                }}
              >
                First Move (11–18) Certified
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
