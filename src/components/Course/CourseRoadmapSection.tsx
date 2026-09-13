'use client';

import React from 'react';
import { CourseLearningStage } from '@/content/course-career-data';

interface CourseRoadmapSectionProps {
  stages: CourseLearningStage[];
  completedLessonsCount: number;
  totalLessons: number;
}

export function CourseRoadmapSection({
  stages,
  completedLessonsCount,
  totalLessons,
}: CourseRoadmapSectionProps) {
  const overallProgress = totalLessons > 0 ? Math.round((completedLessonsCount / totalLessons) * 100) : 0;

  return (
    <section id="roadmap" className="course-anchor-target" style={{ marginBottom: '3.5rem', scrollMarginTop: '144px' }}>
      <div style={{ marginBottom: '1.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
            <span style={{ fontSize: '1rem' }}>🗺️</span>
            <span
              style={{
                fontSize: '0.8rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--accent-gold-deep, #9F7A16)',
              }}
            >
              Structured Progression
            </span>
          </div>
          <h2 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-main, #1C1C1C)', marginBottom: '0.5rem' }}>
            Visual Learning Roadmap
          </h2>
          <p style={{ color: 'var(--text-muted, #6B6B6B)', fontSize: '1.05rem', maxWidth: '650px', lineHeight: 1.6 }}>
            A carefully sequenced 6-stage engineering curriculum designed to build your knowledge incrementally from core fundamentals to interview-ready production mastery.
          </p>
        </div>

        {/* Course Completion Progress Summary */}
        <div
          style={{
            backgroundColor: 'var(--bg-surface, #FFFFFF)',
            border: '1px solid var(--border-color, #EDE7D5)',
            borderRadius: 'var(--radius-md, 12px)',
            padding: '1rem 1.25rem',
            minWidth: '220px',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: 700 }}>
            <span style={{ color: 'var(--text-muted)' }}>Roadmap Progress</span>
            <span style={{ color: 'var(--accent-gold-deep, #9F7A16)' }}>{overallProgress}%</span>
          </div>
          <div
            style={{
              height: '8px',
              backgroundColor: 'var(--bg-muted, #F5F3EB)',
              borderRadius: '4px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${overallProgress}%`,
                height: '100%',
                background: 'linear-gradient(90deg, var(--accent-gold, #C9A227) 0%, var(--accent-gold-deep, #9F7A16) 100%)',
                transition: 'width 400ms ease',
              }}
            />
          </div>
        </div>
      </div>

      {/* Stage Flow Timeline */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.25rem',
          position: 'relative',
        }}
      >
        {stages.map((stage) => {
          // Approximate stage completion based on overall progress
          const stageThreshold = (stage.stage / stages.length) * 100;
          const isStageUnlocked = overallProgress >= (stage.stage - 1) * (100 / stages.length);
          const isStageFinished = overallProgress >= stageThreshold;

          return (
            <div
              key={stage.stage}
              className="roadmap-stage-card"
              style={{
                backgroundColor: 'var(--bg-surface, #FFFFFF)',
                border: isStageFinished
                  ? '2px solid #10B981'
                  : isStageUnlocked
                  ? '2px solid var(--accent-gold, #C9A227)'
                  : '1px solid var(--border-color, #EDE7D5)',
                borderRadius: 'var(--radius-lg, 18px)',
                padding: '1.5rem',
                boxShadow: 'var(--shadow-sm, 0 1px 3px rgba(28, 28, 28, 0.04))',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 240ms ease',
                position: 'relative',
              }}
            >
              <div>
                {/* Header: Stage Badge + Hours */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      color: isStageFinished
                        ? '#10B981'
                        : isStageUnlocked
                        ? 'var(--accent-gold-deep, #9F7A16)'
                        : 'var(--text-muted)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}
                  >
                    Stage {stage.stage}
                  </span>

                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                    ⏱️ ~{stage.hours} hrs
                  </span>
                </div>

                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main, #1C1C1C)', marginBottom: '0.35rem' }}>
                  {stage.name}
                </h3>

                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted, #6B6B6B)', lineHeight: 1.45, marginBottom: '1.25rem' }}>
                  {stage.subtitle}
                </p>

                {/* Skills Learned */}
                <div style={{ marginBottom: '1rem' }}>
                  <span style={{ fontSize: '0.725rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '0.35rem' }}>
                    Core Topics &amp; Competencies:
                  </span>
                  <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                    {stage.skillsCovered.map((sk) => (
                      <span
                        key={sk}
                        style={{
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          padding: '0.2rem 0.55rem',
                          borderRadius: '6px',
                          backgroundColor: 'var(--bg-app, #FAF9F5)',
                          border: '1px solid var(--border-color, #EDE7D5)',
                          color: 'var(--text-main)',
                        }}
                      >
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Milestone Box */}
              <div
                style={{
                  padding: '0.65rem 0.85rem',
                  borderRadius: '8px',
                  backgroundColor: 'var(--bg-app, #FAF9F5)',
                  border: '1px solid var(--border-color, #EDE7D5)',
                  fontSize: '0.785rem',
                  color: 'var(--text-main)',
                }}
              >
                <span style={{ fontWeight: 700, color: 'var(--accent-gold-deep, #9F7A16)' }}>Milestone:</span>{' '}
                {stage.projectsMilestones.join(', ')}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
