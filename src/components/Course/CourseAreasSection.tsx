'use client';

import React from 'react';
import { CourseArea } from '@/content/course-career-data';

interface CourseAreasSectionProps {
  areas: CourseArea[];
  courseTitle: string;
}

export function CourseAreasSection({ areas, courseTitle }: CourseAreasSectionProps) {
  return (
    <section id="areas" className="course-anchor-target" style={{ marginBottom: '3.5rem', scrollMarginTop: '144px' }}>
      <div style={{ marginBottom: '1.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
          <span style={{ fontSize: '1rem' }}>🏢</span>
          <span
            style={{
              fontSize: '0.8rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'var(--accent-gold-deep, #9F7A16)',
            }}
          >
            Real-World Impact
          </span>
        </div>
        <h2 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-main, #1C1C1C)', marginBottom: '0.5rem' }}>
          Where You&apos;ll Use This
        </h2>
        <p style={{ color: 'var(--text-muted, #6B6B6B)', fontSize: '1.05rem', maxWidth: '750px', lineHeight: 1.6 }}>
          The engineering skills developed in {courseTitle} power critical digital infrastructure across diverse high-impact sectors worldwide.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.25rem',
        }}
      >
        {areas.map((area) => (
          <div
            key={area.id}
            className="area-card"
            style={{
              backgroundColor: 'var(--bg-surface, #FFFFFF)',
              border: '1px solid var(--border-color, #EDE7D5)',
              borderRadius: 'var(--radius-lg, 16px)',
              padding: '1.5rem',
              boxShadow: 'var(--shadow-sm, 0 1px 3px rgba(28, 28, 28, 0.04))',
              transition: 'all 240ms cubic-bezier(0.16, 1, 0.3, 1)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--accent-gold, #C9A227)';
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 10px 24px -4px rgba(201, 162, 39, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-color, #EDE7D5)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'var(--shadow-sm, 0 1px 3px rgba(28, 28, 28, 0.04))';
            }}
          >
            <div>
              {/* Icon Pill */}
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  backgroundColor: 'var(--bg-app, #FAF9F5)',
                  border: '1px solid var(--border-color, #EDE7D5)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  marginBottom: '1rem',
                }}
              >
                {area.icon}
              </div>

              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-main, #1C1C1C)', marginBottom: '0.5rem' }}>
                {area.name}
              </h3>

              <p style={{ fontSize: '0.925rem', color: 'var(--text-muted, #6B6B6B)', lineHeight: 1.55, marginBottom: '1.25rem' }}>
                {area.description}
              </p>
            </div>

            {/* Industry Applications Tag Pills */}
            <div>
              <div style={{ fontSize: '0.725rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                Representative Systems:
              </div>
              <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                {area.industryExamples.map((ex) => (
                  <span
                    key={ex}
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      padding: '0.2rem 0.55rem',
                      borderRadius: '6px',
                      backgroundColor: 'var(--bg-app, #FAF9F5)',
                      border: '1px solid var(--border-color, #EDE7D5)',
                      color: 'var(--text-main, #1C1C1C)',
                    }}
                  >
                    {ex}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
