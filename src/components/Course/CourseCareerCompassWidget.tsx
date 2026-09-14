'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Badge } from '@/components/Badge';
import { Button } from '@/components/Button';
import { fetchLatestPreCourseAssessmentAction } from '@/app/actions/preCourse';
import { CareerCompassResult } from '@/lib/preCourseEngine';
import { CourseCareerMetadata } from '@/content/course-career-data';

interface CourseCareerCompassWidgetProps {
  careerMeta: CourseCareerMetadata;
}

export function CourseCareerCompassWidget({ careerMeta }: CourseCareerCompassWidgetProps) {
  const [compassResult, setCompassResult] = useState<CareerCompassResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function checkCompass() {
      try {
        const res = await fetchLatestPreCourseAssessmentAction();
        if (isMounted && res.result) {
          setCompassResult(res.result);
        }
      } catch {
        // Fallback gracefully
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    checkCompass();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div
        style={{
          padding: '1.25rem',
          backgroundColor: 'var(--bg-surface, #FFFFFF)',
          border: '1px solid var(--border-color, #EDE7D5)',
          borderRadius: 'var(--radius-lg, 18px)',
          marginBottom: '2.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
        }}
      >
        <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--bg-muted, #F5F3EB)' }} />
        <div style={{ flex: 1 }}>
          <div style={{ height: '14px', width: '40%', backgroundColor: 'var(--bg-muted, #F5F3EB)', borderRadius: '4px', marginBottom: '0.4rem' }} />
          <div style={{ height: '10px', width: '70%', backgroundColor: 'var(--bg-muted, #F5F3EB)', borderRadius: '4px' }} />
        </div>
      </div>
    );
  }

  // 1. User has completed Career Compass
  if (compassResult) {
    // Find domain match percentage from compass result
    const targetDomainSlug = careerMeta.careerCompassDomainSlug;
    const directScore = compassResult.domainMatches ? compassResult.domainMatches[targetDomainSlug] : undefined;
    const recObj = compassResult.allRecommendations?.find((r) => r.domainSlug === targetDomainSlug);

    // Calculate match % (if direct match found, use it; otherwise calculate relative alignment)
    const matchPercentage = typeof directScore === 'number'
      ? directScore
      : recObj?.matchPercentage || Math.max(55, Math.min(85, compassResult.primaryDomain.matchPercentage - 15));

    const isStrongMatch = matchPercentage >= 75 || compassResult.primaryDomain.domainSlug === targetDomainSlug;

    return (
      <div
        className="career-compass-recommendation-card"
        style={{
          backgroundColor: isStrongMatch ? 'rgba(201, 162, 39, 0.04)' : 'var(--bg-surface, #FFFFFF)',
          border: isStrongMatch ? '2px solid var(--accent-gold, #C9A227)' : '1px solid var(--border-color, #EDE7D5)',
          borderRadius: 'var(--radius-lg, 18px)',
          padding: '1.75rem 2rem',
          marginBottom: '2.5rem',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: isStrongMatch
            ? '0 10px 24px -4px rgba(201, 162, 39, 0.18)'
            : 'var(--shadow-sm, 0 1px 3px rgba(28, 28, 28, 0.04))',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1.5rem', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 360px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.6rem' }}>
              <span style={{ fontSize: '1.4rem' }}>🧭</span>
              <span
                style={{
                  fontSize: '0.825rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  color: 'var(--accent-gold-deep, #9F7A16)',
                }}
              >
                First Move (11–18) Career Compass Intelligence
              </span>
              <Badge variant={isStrongMatch ? 'active' : 'roadmap'}>
                {isStrongMatch ? '⭐ Recommended For You' : 'Supporting Foundation Course'}
              </Badge>
            </div>

            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main, #1C1C1C)', marginBottom: '0.5rem', lineHeight: 1.3 }}>
              {isStrongMatch
                ? `Strong alignment with your ${compassResult.primaryDomain.title} Career Path`
                : `Develops complementary skills for your ${compassResult.primaryDomain.title} Path`}
            </h2>

            <p style={{ color: 'var(--text-muted, #6B6B6B)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              {isStrongMatch
                ? `Based on your Career Compass results, this course has a ${matchPercentage}% alignment with your strengths, cognitive profile, and preferred engineering focus.`
                : `This course develops foundational engineering competencies that support your primary target of ${compassResult.primaryDomain.title}.`}
            </p>

            {/* Key Relevant Skills for this Pathway */}
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <span style={{ fontSize: '0.785rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                Target Skills:
              </span>
              {careerMeta.skills.technical.slice(0, 4).map((skill) => (
                <span
                  key={skill}
                  style={{
                    fontSize: '0.785rem',
                    fontWeight: 600,
                    padding: '0.2rem 0.6rem',
                    borderRadius: '6px',
                    backgroundColor: 'var(--bg-app, #FAF9F5)',
                    border: '1px solid var(--border-color, #EDE7D5)',
                    color: 'var(--text-main)',
                  }}
                >
                  ✓ {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Right Column: Score Gauge & Actions */}
          <div
            style={{
              minWidth: '220px',
              backgroundColor: 'var(--bg-surface, #FFFFFF)',
              border: '1px solid var(--border-color, #EDE7D5)',
              borderRadius: 'var(--radius-md, 12px)',
              padding: '1.25rem',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              boxShadow: '0 4px 12px rgba(28, 28, 28, 0.04)',
            }}
          >
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Your Career Match
            </span>
            <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--accent-gold-deep, #9F7A16)', margin: '0.2rem 0' }}>
              {matchPercentage}%
            </div>

            {/* Custom Gold Progress Bar */}
            <div
              style={{
                width: '100%',
                height: '8px',
                borderRadius: '4px',
                backgroundColor: 'var(--bg-muted, #F5F3EB)',
                overflow: 'hidden',
                marginBottom: '1rem',
              }}
            >
              <div
                style={{
                  width: `${matchPercentage}%`,
                  height: '100%',
                  borderRadius: '4px',
                  background: 'linear-gradient(90deg, var(--accent-gold, #C9A227) 0%, var(--accent-gold-deep, #9F7A16) 100%)',
                  transition: 'width 600ms cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              />
            </div>

            <Link href="/learning-path" style={{ textDecoration: 'none', width: '100%' }}>
              <Button variant="secondary" size="sm" style={{ width: '100%', fontSize: '0.85rem' }}>
                View Personalized Path →
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 2. User has NOT taken Career Compass yet -> Invite them to test
  return (
    <div
      style={{
        backgroundColor: 'var(--bg-surface, #FFFFFF)',
        border: '1px dashed var(--accent-gold, #C9A227)',
        borderRadius: 'var(--radius-lg, 18px)',
        padding: '1.75rem 2rem',
        marginBottom: '2.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1.5rem',
        flexWrap: 'wrap',
        boxShadow: 'var(--shadow-sm, 0 1px 3px rgba(28, 28, 28, 0.04))',
      }}
    >
      <div style={{ flex: '1 1 400px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
          <span style={{ fontSize: '1.3rem' }}>🧭</span>
          <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--accent-gold-deep, #9F7A16)', textTransform: 'uppercase' }}>
            Discover Your Career Match
          </span>
        </div>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main, #1C1C1C)', marginBottom: '0.35rem' }}>
          Unsure how this course fits your natural career strengths?
        </h2>
        <p style={{ color: 'var(--text-muted, #6B6B6B)', fontSize: '0.925rem', lineHeight: 1.5, margin: 0 }}>
          Take our 5-minute adaptive Career Compass discovery to uncover your optimal technology domain and verify your alignment score with this course.
        </p>
      </div>

      <Link href="/assessment" style={{ textDecoration: 'none' }}>
        <Button variant="primary" size="md" style={{ fontWeight: 700, whiteSpace: 'nowrap' }}>
          Discover My Career Match 🎯
        </Button>
      </Link>
    </div>
  );
}
