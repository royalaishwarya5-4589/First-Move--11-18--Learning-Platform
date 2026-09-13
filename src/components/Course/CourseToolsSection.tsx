'use client';

import React from 'react';
import { CourseTool } from '@/content/course-career-data';
import { Badge } from '@/components/Badge';

interface CourseToolsSectionProps {
  tools: CourseTool[];
}

export function CourseToolsSection({ tools }: CourseToolsSectionProps) {
  const getCategoryBadgeVariant = (cat: CourseTool['category']) => {
    switch (cat) {
      case 'core':
        return 'active';
      case 'framework':
        return 'success';
      case 'platform':
        return 'level';
      default:
        return 'roadmap';
    }
  };

  return (
    <section id="tools" className="course-anchor-target" style={{ marginBottom: '3.5rem', scrollMarginTop: '144px' }}>
      <div style={{ marginBottom: '1.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
          <span style={{ fontSize: '1rem' }}>🛠️</span>
          <span
            style={{
              fontSize: '0.8rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'var(--accent-gold-deep, #9F7A16)',
            }}
          >
            Engineering Toolchain
          </span>
        </div>
        <h2 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-main, #1C1C1C)', marginBottom: '0.5rem' }}>
          Tools &amp; Technologies You&apos;ll Work With
        </h2>
        <p style={{ color: 'var(--text-muted, #6B6B6B)', fontSize: '1.05rem', maxWidth: '750px', lineHeight: 1.6 }}>
          Master the exact production technologies, runtimes, development frameworks, and deployment platforms demanded by modern engineering teams.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.25rem',
        }}
      >
        {tools.map((tool) => (
          <div
            key={tool.id}
            className="tool-card"
            style={{
              backgroundColor: 'var(--bg-surface, #FFFFFF)',
              border: '1px solid var(--border-color, #EDE7D5)',
              borderRadius: 'var(--radius-lg, 16px)',
              padding: '1.5rem',
              boxShadow: 'var(--shadow-sm, 0 1px 3px rgba(28, 28, 28, 0.04))',
              transition: 'all 240ms cubic-bezier(0.16, 1, 0.3, 1)',
              position: 'relative',
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
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '10px',
                  backgroundColor: 'var(--bg-app, #FAF9F5)',
                  border: '1px solid var(--border-color, #EDE7D5)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.4rem',
                }}
              >
                {tool.icon}
              </div>
              <Badge variant={getCategoryBadgeVariant(tool.category)}>
                {tool.category.toUpperCase()}
              </Badge>
            </div>

            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-main, #1C1C1C)', marginBottom: '0.25rem' }}>
              {tool.name}
            </h3>

            <div
              style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                color: 'var(--accent-gold-deep, #9F7A16)',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                marginBottom: '0.65rem',
              }}
            >
              {tool.relevance}
            </div>

            <p style={{ fontSize: '0.885rem', color: 'var(--text-muted, #6B6B6B)', lineHeight: 1.5, margin: 0 }}>
              {tool.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
