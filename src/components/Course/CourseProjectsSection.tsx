'use client';

import React from 'react';
import { CourseProjectSummary } from '@/content/course-career-data';
import { Badge } from '@/components/Badge';
import { Button } from '@/components/Button';

interface CourseProjectsSectionProps {
  projects: CourseProjectSummary[];
  courseTitle: string;
}

export function CourseProjectsSection({ projects, courseTitle }: CourseProjectsSectionProps) {
  const getDifficultyBadge = (diff: CourseProjectSummary['difficulty']) => {
    switch (diff) {
      case 'Beginner':
        return 'active';
      case 'Intermediate':
        return 'level';
      case 'Advanced':
        return 'success';
      default:
        return 'roadmap';
    }
  };

  const scrollToCurriculum = () => {
    const el = document.getElementById('curriculum');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="projects" className="course-anchor-target" style={{ marginBottom: '3.5rem', scrollMarginTop: '144px' }}>
      <div style={{ marginBottom: '1.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
          <span style={{ fontSize: '1rem' }}>🚀</span>
          <span
            style={{
              fontSize: '0.8rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'var(--accent-gold-deep, #9F7A16)',
            }}
          >
            Portfolio Portfolio Showcase
          </span>
        </div>
        <h2 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-main, #1C1C1C)', marginBottom: '0.5rem' }}>
          Real Projects You Can Build
        </h2>
        <p style={{ color: 'var(--text-muted, #6B6B6B)', fontSize: '1.05rem', maxWidth: '750px', lineHeight: 1.6 }}>
          Prove your mastery through production-ready software artifacts. Every project in {courseTitle} is designed to solve real-world problems and stand out on your engineering resume.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.5rem',
        }}
      >
        {projects.map((proj) => (
          <div
            key={proj.name}
            className="project-card"
            style={{
              backgroundColor: 'var(--bg-surface, #FFFFFF)',
              border: '1px solid var(--border-color, #EDE7D5)',
              borderRadius: 'var(--radius-lg, 18px)',
              padding: '1.75rem',
              boxShadow: 'var(--shadow-sm, 0 1px 3px rgba(28, 28, 28, 0.04))',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'all 240ms cubic-bezier(0.16, 1, 0.3, 1)',
              position: 'relative',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--accent-gold, #C9A227)';
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 12px 28px -4px rgba(201, 162, 39, 0.16)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-color, #EDE7D5)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'var(--shadow-sm, 0 1px 3px rgba(28, 28, 28, 0.04))';
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
                <Badge variant={getDifficultyBadge(proj.difficulty)}>
                  {proj.difficulty}
                </Badge>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-gold-deep, #9F7A16)' }}>
                  Portfolio Grade
                </span>
              </div>

              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main, #1C1C1C)', marginBottom: '0.65rem', lineHeight: 1.3 }}>
                {proj.name}
              </h3>

              <p style={{ fontSize: '0.925rem', color: 'var(--text-muted, #6B6B6B)', lineHeight: 1.55, marginBottom: '1.25rem' }}>
                {proj.description}
              </p>

              {/* Skills & Tools Badges */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.5rem' }}>
                <div>
                  <span style={{ fontSize: '0.725rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '0.3rem' }}>
                    Skills Demonstrated:
                  </span>
                  <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                    {proj.skillsUsed.map((sk) => (
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

                <div>
                  <span style={{ fontSize: '0.725rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '0.3rem' }}>
                    Tools Utilized:
                  </span>
                  <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                    {proj.toolsUsed.map((tl) => (
                      <span
                        key={tl}
                        style={{
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          padding: '0.2rem 0.55rem',
                          borderRadius: '6px',
                          backgroundColor: 'rgba(201, 162, 39, 0.08)',
                          border: '1px solid rgba(201, 162, 39, 0.25)',
                          color: 'var(--accent-gold-deep, #9F7A16)',
                        }}
                      >
                        {tl}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div>
              {/* Output Result Callout */}
              <div
                style={{
                  padding: '0.75rem 1rem',
                  borderRadius: '10px',
                  backgroundColor: 'var(--bg-app, #FAF9F5)',
                  border: '1px solid var(--border-color, #EDE7D5)',
                  fontSize: '0.825rem',
                  color: 'var(--text-main)',
                  marginBottom: '1.25rem',
                  lineHeight: 1.45,
                }}
              >
                <strong style={{ color: 'var(--accent-gold-deep, #9F7A16)' }}>Deliverable:</strong> {proj.practicalOutput}
              </div>

              <Button
                variant="primary"
                size="sm"
                onClick={scrollToCurriculum}
                style={{
                  width: '100%',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.35rem',
                }}
              >
                <span>Build This Project</span>
                <span>→</span>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
