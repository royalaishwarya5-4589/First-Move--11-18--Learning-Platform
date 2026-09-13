'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchLatestPreCourseAssessmentAction } from '@/app/actions/preCourse';
import { PersonalizedLearningPath } from '@/lib/preCourseEngine';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { Badge } from '@/components/Badge';
import { CardSkeleton } from '@/components/Skeleton';

export function LearningPathCard() {
  const [loading, setLoading] = useState(true);
  const [learningPath, setLearningPath] = useState<PersonalizedLearningPath | null>(null);

  useEffect(() => {
    async function loadData() {
      const serverRes = await fetchLatestPreCourseAssessmentAction();
      if (serverRes.learningPath) {
        setLearningPath(serverRes.learningPath);
        setLoading(false);
        return;
      }

      // LocalStorage fallback
      try {
        const stored = localStorage.getItem('learntech_latest_learning_path');
        if (stored) {
          setLearningPath(JSON.parse(stored));
        }
      } catch (err) {
        console.warn('LocalStorage path fallback err', err);
      }

      setLoading(false);
    }

    loadData();
  }, []);

  if (loading) {
    return (
      <div style={{ marginBottom: '2.5rem' }}>
        <CardSkeleton height="150px" />
      </div>
    );
  }

  if (!learningPath || !learningPath.course) {
    return (
      <Card
        hoverable={false}
        style={{
          padding: '2rem',
          marginBottom: '2.5rem',
          backgroundColor: '#FFFFFF',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--shadow-md)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.25rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.4rem' }}>
              <span style={{ fontSize: '1.5rem' }}>🧭</span>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 850, color: 'var(--text-main)', margin: 0 }}>
                Discover Your Best Tech Domain
              </h3>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '620px', lineHeight: 1.6, margin: 0 }}>
              Take our 5-minute Career Compass discovery test to evaluate your interests, preferences, and strengths to find the technology domain that suits you best.
            </p>
          </div>
          <Link href="/assessment">
            <Button variant="primary" style={{ fontSize: '0.95rem', fontWeight: 800, padding: '0.75rem 1.65rem' }}>
              Start Career Compass →
            </Button>
          </Link>
        </div>
      </Card>
    );
  }

  const course = learningPath.course;

  return (
    <Card
      hoverable={false}
      style={{
        padding: '2rem 2.25rem',
        marginBottom: '2.5rem',
        backgroundColor: '#FFFFFF',
        borderLeft: '5px solid var(--accent-gold)',
        borderTop: '1px solid var(--border-color)',
        borderRight: '1px solid var(--border-color)',
        borderBottom: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-xl)',
        boxShadow: 'var(--shadow-md)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.25rem', marginBottom: '1.25rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '1.35rem' }}>🧭</span>
            <Badge variant="gold" size="sm">
              Your Career Compass
            </Badge>
            <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              Active Path: <strong style={{ color: 'var(--text-main)' }}>{learningPath.domainTitle}</strong> ({learningPath.matchPercentage}% Match)
            </span>
          </div>

          <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--text-main)', marginBottom: '0.4rem', letterSpacing: '-0.015em' }}>
            {learningPath.domainIcon} {learningPath.domainTitle} Path
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '660px', lineHeight: 1.6, margin: 0 }}>
            Current recommended starting point: <strong style={{ color: 'var(--accent-gold-deep)' }}>{learningPath.startingModuleTitle}</strong> in {course.title}.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <Link href={`/paths/${course.slug}`}>
            <Button variant="primary" style={{ fontSize: '0.925rem', fontWeight: 800 }}>
              Continue Learning →
            </Button>
          </Link>
          <Link href="/assessment/result">
            <Button variant="secondary" style={{ fontSize: '0.925rem' }}>
              Explore Other Domains 🌐
            </Button>
          </Link>
          <Link href="/assessment">
            <Button variant="secondary" style={{ fontSize: '0.925rem' }}>
              Retake Career Compass 🔄
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}
