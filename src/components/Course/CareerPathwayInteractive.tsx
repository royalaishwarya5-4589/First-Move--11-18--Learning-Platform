'use client';

import React, { useState } from 'react';
import { CareerPathwayStep } from '@/content/course-career-data';

interface CareerPathwayInteractiveProps {
  pathway: CareerPathwayStep;
}

export function CareerPathwayInteractive({ pathway }: CareerPathwayInteractiveProps) {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const steps = [
    {
      index: 0,
      badge: 'Step 1: Course',
      title: pathway.courseName,
      description: 'Foundational curriculum & interactive coding challenges',
      icon: '📚',
      subtext: 'Teaches core engineering paradigms',
      items: [pathway.courseName],
    },
    {
      index: 1,
      badge: 'Step 2: Skills Built',
      title: 'Engineering Skills',
      description: 'Applied technical competencies & problem solving',
      icon: '💡',
      subtext: 'Used across production toolchains',
      items: pathway.skills,
    },
    {
      index: 2,
      badge: 'Step 3: Tools Used',
      title: 'Tools & Technologies',
      description: 'Industry-standard frameworks, IDEs & runtimes',
      icon: '🛠️',
      subtext: 'Applied across real-world domains',
      items: pathway.tools,
    },
    {
      index: 3,
      badge: 'Step 4: Application',
      title: 'Where It\'s Used',
      description: 'Mission-critical enterprise & cloud infrastructures',
      icon: '🏢',
      subtext: 'Prepares you for real-world positions',
      items: pathway.areas,
    },
    {
      index: 4,
      badge: 'Step 5: Careers',
      title: 'Career Opportunities',
      description: 'High-demand software engineering job titles',
      icon: '💼',
      subtext: 'Unlocks tangible career advancement',
      items: pathway.jobRoles,
    },
  ];

  return (
    <section id="career-pathway" className="course-anchor-target" style={{ marginBottom: '3.5rem', scrollMarginTop: '144px' }}>
      <div style={{ marginBottom: '1.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
          <span style={{ fontSize: '1rem' }}>🧭</span>
          <span
            style={{
              fontSize: '0.8rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'var(--accent-gold-deep, #9F7A16)',
            }}
          >
            Signature Career Journey
          </span>
        </div>
        <h2 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-main, #1C1C1C)', marginBottom: '0.5rem' }}>
          The Course-to-Career Connection
        </h2>
        <p style={{ color: 'var(--text-muted, #6B6B6B)', fontSize: '1.05rem', maxWidth: '750px', lineHeight: 1.6 }}>
          Experience how every lesson, coding exercise, and tool in this course connects directly to high-impact engineering job roles. Hover or tap any stage to inspect connections.
        </p>
      </div>

      {/* Pathway Interactive Flow Container */}
      <div
        style={{
          backgroundColor: 'var(--bg-surface, #FFFFFF)',
          border: '1.5px solid var(--border-color, #EDE7D5)',
          borderRadius: 'var(--radius-xl, 24px)',
          padding: '2rem 1.5rem',
          boxShadow: 'var(--shadow-sm, 0 1px 3px rgba(28, 28, 28, 0.04))',
          position: 'relative',
        }}
      >
        {/* Desktop Step Flow Indicator */}
        <div
          className="pathway-desktop-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1rem',
            position: 'relative',
          }}
        >
          {steps.map((step) => {
            const isSelected = activeStep === step.index;

            return (
              <div
                key={step.index}
                className="pathway-step-card"
                onClick={() => setActiveStep(activeStep === step.index ? null : step.index)}
                onMouseEnter={() => setActiveStep(step.index)}
                onMouseLeave={() => setActiveStep(null)}
                style={{
                  backgroundColor: isSelected ? 'rgba(201, 162, 39, 0.06)' : 'var(--bg-app, #FAF9F5)',
                  border: isSelected ? '2px solid var(--accent-gold, #C9A227)' : '1px solid var(--border-color, #EDE7D5)',
                  borderRadius: 'var(--radius-md, 14px)',
                  padding: '1.25rem 1rem',
                  cursor: 'pointer',
                  transition: 'all 220ms cubic-bezier(0.16, 1, 0.3, 1)',
                  transform: isSelected ? 'translateY(-4px)' : 'none',
                  boxShadow: isSelected
                    ? '0 12px 24px -4px rgba(201, 162, 39, 0.25)'
                    : 'var(--shadow-sm, 0 1px 3px rgba(28, 28, 28, 0.04))',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                }}
              >
                {/* Step Badge */}
                <span
                  style={{
                    fontSize: '0.725rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    color: isSelected ? 'var(--accent-gold-deep, #9F7A16)' : 'var(--text-muted)',
                    marginBottom: '0.5rem',
                    display: 'block',
                  }}
                >
                  {step.badge}
                </span>

                {/* Icon + Title */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.6rem' }}>
                  <span style={{ fontSize: '1.4rem' }}>{step.icon}</span>
                  <h3 style={{ fontSize: '0.975rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
                    {step.title}
                  </h3>
                </div>

                <p style={{ fontSize: '0.785rem', color: 'var(--text-muted)', lineHeight: 1.45, marginBottom: '0.85rem' }}>
                  {step.description}
                </p>

                {/* Items Pill Stack */}
                <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  {step.items.slice(0, 3).map((it) => (
                    <span
                      key={it}
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        padding: '0.25rem 0.5rem',
                        borderRadius: '6px',
                        backgroundColor: '#FFFFFF',
                        border: isSelected
                          ? '1px solid var(--accent-gold, #C9A227)'
                          : '1px solid var(--border-color, #EDE7D5)',
                        color: 'var(--text-main)',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {it}
                    </span>
                  ))}
                  {step.items.length > 3 && (
                    <span style={{ fontSize: '0.7rem', color: 'var(--accent-gold-deep, #9F7A16)', fontWeight: 700, paddingLeft: '0.25rem' }}>
                      +{step.items.length - 3} more...
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Dynamic Detail Callout when step is selected */}
        <div
          style={{
            marginTop: '1.5rem',
            padding: '1rem 1.25rem',
            borderRadius: 'var(--radius-md, 12px)',
            backgroundColor: 'var(--bg-app, #FAF9F5)',
            border: '1px solid var(--border-color, #EDE7D5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '1.5rem' }}>
              {activeStep !== null ? steps[activeStep].icon : '✨'}
            </span>
            <div>
              <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-main)' }}>
                {activeStep !== null
                  ? `${steps[activeStep].title}: ${steps[activeStep].subtext}`
                  : 'Click or hover across any step above to inspect the course-to-career journey.'}
              </div>
              <div style={{ fontSize: '0.785rem', color: 'var(--text-muted)' }}>
                Connecting foundational instruction ➔ technical competencies ➔ production tools ➔ industry jobs.
              </div>
            </div>
          </div>

          <a
            href="#jobs"
            style={{
              fontSize: '0.85rem',
              fontWeight: 700,
              color: 'var(--accent-gold-deep, #9F7A16)',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.25rem',
            }}
          >
            Explore All Job Roles ↓
          </a>
        </div>
      </div>
    </section>
  );
}
