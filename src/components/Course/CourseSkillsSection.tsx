'use client';

import React from 'react';
import { SkillCategoryGroup } from '@/content/course-career-data';

interface CourseSkillsSectionProps {
  skills: SkillCategoryGroup;
}

export function CourseSkillsSection({ skills }: CourseSkillsSectionProps) {
  const skillCategories = [
    {
      title: 'Technical Skills',
      icon: '⚙️',
      description: 'Foundational syntax, runtime mechanisms, and domain architectures.',
      items: skills.technical,
      accent: 'var(--accent-primary, #C9A227)',
    },
    {
      title: 'Problem Solving & Optimization',
      icon: '🧠',
      description: 'Algorithmic reasoning, performance profiling, and defensive error mitigation.',
      items: skills.problemSolving,
      accent: 'var(--accent-gold-deep, #9F7A16)',
    },
    {
      title: 'Professional & Collaborative Engineering',
      icon: '🤝',
      description: 'Version control workflows, code review literacy, and industry documentation.',
      items: skills.professional,
      accent: '#2563EB',
    },
  ];

  return (
    <section id="skills" className="course-anchor-target" style={{ marginBottom: '3.5rem', scrollMarginTop: '144px' }}>
      <div style={{ marginBottom: '1.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
          <span style={{ fontSize: '1rem' }}>💡</span>
          <span
            style={{
              fontSize: '0.8rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'var(--accent-gold-deep, #9F7A16)',
            }}
          >
            Competency Blueprint
          </span>
        </div>
        <h2 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-main, #1C1C1C)', marginBottom: '0.5rem' }}>
          Skills You&apos;ll Build
        </h2>
        <p style={{ color: 'var(--text-muted, #6B6B6B)', fontSize: '1.05rem', maxWidth: '750px', lineHeight: 1.6 }}>
          Develop a complete tripartite engineering profile combining deep technical execution, rigorous analytical problem solving, and professional industry collaboration.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
        }}
      >
        {skillCategories.map((category) => (
          <div
            key={category.title}
            className="skill-category-card"
            style={{
              backgroundColor: 'var(--bg-surface, #FFFFFF)',
              border: '1px solid var(--border-color, #EDE7D5)',
              borderRadius: 'var(--radius-lg, 18px)',
              padding: '1.75rem',
              boxShadow: 'var(--shadow-sm, 0 1px 3px rgba(28, 28, 28, 0.04))',
              display: 'flex',
              flexDirection: 'column',
              transition: 'all 240ms cubic-bezier(0.16, 1, 0.3, 1)',
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.6rem' }}>
              <span style={{ fontSize: '1.6rem' }}>{category.icon}</span>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-main, #1C1C1C)' }}>
                  {category.title}
                </h3>
              </div>
            </div>

            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted, #6B6B6B)', marginBottom: '1.25rem', lineHeight: 1.5 }}>
              {category.description}
            </p>

            {/* Skill Chips List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: 'auto' }}>
              {category.items.map((item) => (
                <div
                  key={item}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.5rem 0.75rem',
                    borderRadius: '8px',
                    backgroundColor: 'var(--bg-app, #FAF9F5)',
                    border: '1px solid var(--border-color, #EDE7D5)',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: 'var(--text-main, #1C1C1C)',
                  }}
                >
                  <span style={{ color: 'var(--accent-gold-deep, #9F7A16)', fontWeight: 800 }}>✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
