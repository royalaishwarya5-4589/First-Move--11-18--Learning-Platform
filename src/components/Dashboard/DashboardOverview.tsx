'use client';

import React from 'react';
import Link from 'next/link';
import { DashboardStats } from '@/types/user';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';

interface DashboardOverviewProps {
  stats: DashboardStats;
}

export function DashboardOverview({ stats }: DashboardOverviewProps) {
  return (
    <div style={{ marginBottom: '2.5rem' }}>
      {/* Welcome Banner */}
      <Card
        hoverable={false}
        style={{
          padding: '1.75rem 2rem',
          marginBottom: '1.75rem',
          backgroundColor: '#FFFFFF',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h2 style={{ fontSize: '1.45rem', fontWeight: 850, color: 'var(--text-main)', marginBottom: '0.35rem', letterSpacing: '-0.015em' }}>
              Welcome back to First Move (11~18)!
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', margin: 0 }}>
              Overall Mastery: <strong style={{ color: 'var(--accent-gold-deep)' }}>{stats.mastery.overallPercentage}%</strong> • Streak: <strong style={{ color: 'var(--accent-gold-deep)' }}>🔥 {stats.currentStreakDays} day{stats.currentStreakDays === 1 ? '' : 's'}</strong>
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <Link href="/progress">
              <Button variant="primary" style={{ fontSize: '0.925rem' }}>
                View Detailed Analytics Report →
              </Button>
            </Link>
          </div>
        </div>
      </Card>

      {/* Overview Stat Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '1.15rem',
        }}
      >
        <Card hoverable style={{ padding: '1.5rem', borderRadius: 'var(--radius-lg)' }}>
          <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginBottom: '0.35rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Lessons Completed
          </div>
          <div style={{ fontSize: '2.25rem', fontWeight: 900, color: 'var(--accent-gold-deep)', lineHeight: 1.1 }}>
            {stats.totalLessonsCompleted}
          </div>
        </Card>

        <Card hoverable style={{ padding: '1.5rem', borderRadius: 'var(--radius-lg)' }}>
          <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginBottom: '0.35rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Exercises Solved
          </div>
          <div style={{ fontSize: '2.25rem', fontWeight: 900, color: 'var(--accent-gold)', lineHeight: 1.1 }}>
            {stats.totalExercisesSolved}
          </div>
        </Card>

        <Card hoverable style={{ padding: '1.5rem', borderRadius: 'var(--radius-lg)' }}>
          <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginBottom: '0.35rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Quiz Accuracy
          </div>
          <div style={{ fontSize: '2.25rem', fontWeight: 900, color: 'var(--accent-gold-deep)', lineHeight: 1.1 }}>
            {stats.quizAccuracyPercentage}%
          </div>
        </Card>

        <Card hoverable style={{ padding: '1.5rem', borderRadius: 'var(--radius-lg)' }}>
          <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginBottom: '0.35rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Projects Completed
          </div>
          <div style={{ fontSize: '2.25rem', fontWeight: 900, color: 'var(--accent-gold)', lineHeight: 1.1 }}>
            {stats.totalProjectsCompleted || 0}
          </div>
        </Card>

        <Card hoverable style={{ padding: '1.5rem', borderRadius: 'var(--radius-lg)' }}>
          <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginBottom: '0.35rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Daily Streak
          </div>
          <div style={{ fontSize: '2.25rem', fontWeight: 900, color: 'var(--accent-gold-deep)', display: 'flex', alignItems: 'center', gap: '0.3rem', lineHeight: 1.1 }}>
            🔥 {stats.currentStreakDays}
          </div>
        </Card>
      </div>
    </div>
  );
}
