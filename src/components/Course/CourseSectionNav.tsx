'use client';

import React, { useEffect, useRef } from 'react';

export interface NavSectionItem {
  id: string;
  label: string;
  shortLabel?: string;
}

export const COURSE_SECTIONS: NavSectionItem[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'skills', label: 'Skills' },
  { id: 'tools', label: 'Tools' },
  { id: 'areas', label: 'Areas' },
  { id: 'jobs', label: 'Careers' },
  { id: 'projects', label: 'Projects' },
  { id: 'roadmap', label: 'Roadmap' },
  { id: 'curriculum', label: 'Curriculum' },
];

interface CourseSectionNavProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  isSticky: boolean;
}

export function CourseSectionNav({
  activeSection,
  onNavigate,
  isSticky,
}: CourseSectionNavProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const activeTabRef = useRef<HTMLButtonElement | null>(null);

  // Automatically scroll the active tab into view on mobile / narrow viewports
  useEffect(() => {
    if (activeTabRef.current && scrollContainerRef.current) {
      activeTabRef.current.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    }
  }, [activeSection]);

  return (
    <nav
      aria-label="Course Section Navigation"
      style={{
        position: 'sticky',
        top: '4.5rem', // Header height is 4.5rem (72px)
        zIndex: 35,
        backgroundColor: isSticky
          ? 'color-mix(in srgb, var(--bg-surface, #FFFFFF) 92%, transparent)'
          : 'color-mix(in srgb, var(--bg-surface, #FFFFFF) 70%, transparent)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderTop: isSticky ? 'none' : '1px solid var(--border-color, #EDE7D5)',
        borderBottom: '1px solid var(--border-color, #EDE7D5)',
        boxShadow: isSticky
          ? '0 4px 16px -2px rgba(28, 28, 28, 0.06), 0 2px 6px -1px rgba(201, 162, 39, 0.06)'
          : 'none',
        transition: 'background-color 200ms ease, box-shadow 200ms ease, border-color 200ms ease',
        width: '100%',
      }}
    >
      <div
        className="site-container"
        style={{
          paddingTop: '0.45rem',
          paddingBottom: '0.45rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.75rem',
        }}
      >
        <div
          ref={scrollContainerRef}
          className="course-nav-scroll-container"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            width: '100%',
            overflowX: 'auto',
            padding: '0.15rem 0.1rem',
          }}
        >
          {COURSE_SECTIONS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                ref={isActive ? activeTabRef : null}
                type="button"
                onClick={() => onNavigate(item.id)}
                aria-current={isActive ? 'true' : undefined}
                aria-label={`Jump to ${item.label} section`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0.45rem 1rem',
                  fontSize: '0.875rem',
                  fontWeight: isActive ? 750 : 600,
                  color: isActive
                    ? 'var(--accent-gold-deep, #9F7A16)'
                    : 'var(--text-muted, #6B6B6B)',
                  backgroundColor: isActive
                    ? 'rgba(201, 162, 39, 0.12)'
                    : 'transparent',
                  border: isActive
                    ? '1px solid var(--accent-gold, #C9A227)'
                    : '1px solid transparent',
                  borderRadius: 'var(--radius-full, 9999px)',
                  boxShadow: isActive
                    ? '0 1px 4px rgba(201, 162, 39, 0.2)'
                    : 'none',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                  minHeight: '40px',
                  transition:
                    'color 180ms ease, background-color 180ms ease, border-color 180ms ease, box-shadow 180ms ease, transform 180ms ease',
                  outline: 'none',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.outline = '2px solid var(--accent-gold, #C9A227)';
                  e.currentTarget.style.outlineOffset = '2px';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.outline = 'none';
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = 'var(--text-main, #1C1C1C)';
                    e.currentTarget.style.backgroundColor = 'rgba(201, 162, 39, 0.06)';
                    e.currentTarget.style.borderColor = 'rgba(201, 162, 39, 0.25)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = 'var(--text-muted, #6B6B6B)';
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.borderColor = 'transparent';
                  }
                }}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
