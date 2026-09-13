'use client';

import React from 'react';
import { Achievement } from '@/types/user';
import { Card } from '@/components/Card';
import { Badge } from '@/components/Badge';

interface AchievementsListProps {
  achievements: Achievement[];
}

export function AchievementsList({ achievements }: AchievementsListProps) {
  const unlockedCount = achievements.filter((a) => a.isUnlocked).length;

  return (
    <Card hoverable={false} style={{ padding: '1.5rem', marginBottom: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div>
          <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--accent-warning, #f59e0b)', fontWeight: 700 }}>
            Badges & Milestones
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>
            Achievements ({unlockedCount} / {achievements.length} Unlocked)
          </h3>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1rem' }}>
        {achievements.map((ach) => (
          <div
            key={ach.id}
            style={{
              backgroundColor: ach.isUnlocked ? 'rgba(201, 162, 39, 0.08)' : 'var(--bg-app)',
              border: ach.isUnlocked ? '1px solid var(--accent-primary)' : '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              padding: '1rem',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.75rem',
              opacity: ach.isUnlocked ? 1 : 0.6,
            }}
          >
            <span style={{ fontSize: '2rem', lineHeight: 1 }}>{ach.icon}</span>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)' }}>
                  {ach.title}
                </h4>
                <Badge variant={ach.isUnlocked ? 'success' : 'roadmap'} size="sm">
                  {ach.isUnlocked ? 'Unlocked' : 'Locked'}
                </Badge>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                {ach.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
