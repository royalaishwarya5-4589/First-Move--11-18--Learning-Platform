'use client';

import React, { useState } from 'react';
import { CourseJobRole } from '@/content/course-career-data';
import { Badge } from '@/components/Badge';
import { Button } from '@/components/Button';

interface CourseJobRolesSectionProps {
  jobRoles: CourseJobRole[];
  courseTitle: string;
}

export function CourseJobRolesSection({ jobRoles, courseTitle }: CourseJobRolesSectionProps) {
  const [selectedRole, setSelectedRole] = useState<CourseJobRole | null>(null);

  const getDemandColor = (demand: CourseJobRole['industryDemand']) => {
    switch (demand) {
      case 'Very High':
        return '#10B981';
      case 'High':
        return 'var(--accent-gold-deep, #9F7A16)';
      case 'Growing':
        return '#3B82F6';
      default:
        return 'var(--text-main, #1C1C1C)';
    }
  };

  return (
    <section id="jobs" className="course-anchor-target" style={{ marginBottom: '3.5rem', scrollMarginTop: '144px' }}>
      <div style={{ marginBottom: '1.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
          <span style={{ fontSize: '1rem' }}>💼</span>
          <span
            style={{
              fontSize: '0.8rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'var(--accent-gold-deep, #9F7A16)',
            }}
          >
            Career Opportunities
          </span>
        </div>
        <h2 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-main, #1C1C1C)', marginBottom: '0.5rem' }}>
          Industry Roles You Can Prepare For
        </h2>
        <p style={{ color: 'var(--text-muted, #6B6B6B)', fontSize: '1.05rem', maxWidth: '750px', lineHeight: 1.6 }}>
          Explore the real-world software engineering positions directly powered by {courseTitle} expertise. Review day-to-day responsibilities and core hiring prerequisites.
        </p>
      </div>

      {/* Roles Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
        }}
      >
        {jobRoles.map((role) => (
          <div
            key={role.id}
            className="job-role-card"
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
              overflow: 'hidden',
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
            {/* Top Accent Stripe */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '3px',
                background: 'linear-gradient(90deg, var(--accent-gold, #C9A227) 0%, var(--accent-gold-deep, #9F7A16) 100%)',
              }}
            />

            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
                <Badge variant={role.experienceLevel === 'Entry-Level' ? 'active' : 'level'}>
                  {role.experienceLevel}
                </Badge>

                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: getDemandColor(role.industryDemand),
                    backgroundColor: 'var(--bg-app, #FAF9F5)',
                    padding: '0.2rem 0.6rem',
                    borderRadius: '6px',
                    border: '1px solid var(--border-color, #EDE7D5)',
                  }}
                >
                  ● {role.industryDemand} Demand
                </span>
              </div>

              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main, #1C1C1C)', marginBottom: '0.65rem' }}>
                {role.title}
              </h3>

              <p style={{ fontSize: '0.925rem', color: 'var(--text-muted, #6B6B6B)', lineHeight: 1.55, marginBottom: '1.25rem' }}>
                {role.description}
              </p>

              {/* Required Skills Chips */}
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '0.725rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                  Target Hiring Skills:
                </div>
                <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                  {role.keySkills.map((sk) => (
                    <span
                      key={sk}
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
                      {sk}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedRole(role)}
              style={{
                width: '100%',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.35rem',
              }}
            >
              <span>Explore Role Overview</span>
              <span>→</span>
            </Button>
          </div>
        ))}
      </div>

      {/* Interactive Role Details Modal */}
      {selectedRole && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="role-modal-title"
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 14, 11, 0.65)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
            zIndex: 1100,
            animation: 'fadeIn 180ms ease-out',
          }}
          onClick={() => setSelectedRole(null)}
        >
          <div
            style={{
              backgroundColor: 'var(--bg-surface, #FFFFFF)',
              border: '2px solid var(--accent-gold, #C9A227)',
              borderRadius: 'var(--radius-xl, 24px)',
              padding: '2.25rem',
              maxWidth: '560px',
              width: '100%',
              boxShadow: '0 25px 50px -12px rgba(28, 28, 28, 0.25)',
              position: 'relative',
              animation: 'fadeInUp 220ms ease-out',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedRole(null)}
              aria-label="Close details"
              style={{
                position: 'absolute',
                top: '1.25rem',
                right: '1.25rem',
                background: 'none',
                border: 'none',
                fontSize: '1.5rem',
                cursor: 'pointer',
                color: 'var(--text-muted)',
                lineHeight: 1,
              }}
            >
              ✕
            </button>

            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.6rem' }}>
              <Badge variant="active">{selectedRole.experienceLevel}</Badge>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: getDemandColor(selectedRole.industryDemand) }}>
                ● {selectedRole.industryDemand} Hiring Demand
              </span>
            </div>

            <h3 id="role-modal-title" style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.75rem' }}>
              {selectedRole.title}
            </h3>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              {selectedRole.description}
            </p>

            {/* Typical Responsibilities */}
            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--accent-gold-deep, #9F7A16)', marginBottom: '0.6rem' }}>
                Day-to-Day Responsibilities:
              </h4>
              <ul style={{ margin: 0, paddingLeft: '1.2rem', color: 'var(--text-main)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                {selectedRole.typicalResponsibilities.map((resp) => (
                  <li key={resp} style={{ marginBottom: '0.4rem' }}>
                    {resp}
                  </li>
                ))}
              </ul>
            </div>

            {/* Required Skills */}
            <div style={{ marginBottom: '1.75rem' }}>
              <h4 style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--accent-gold-deep, #9F7A16)', marginBottom: '0.6rem' }}>
                Core Technology Stack:
              </h4>
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                {selectedRole.keySkills.map((sk) => (
                  <span
                    key={sk}
                    style={{
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      padding: '0.25rem 0.65rem',
                      borderRadius: '8px',
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

            <Button
              variant="primary"
              size="md"
              onClick={() => setSelectedRole(null)}
              style={{ width: '100%', fontWeight: 700 }}
            >
              Close &amp; Continue Course
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}
