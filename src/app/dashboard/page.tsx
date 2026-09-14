import React from 'react';
import { getUserDashboardData } from '@/app/actions/progress';
import { redirect } from 'next/navigation';
import { DashboardOverview } from '@/components/Dashboard/DashboardOverview';
import { LearningPathCard } from '@/components/Dashboard/LearningPathCard';
import { MasteryOverview } from '@/components/Dashboard/MasteryOverview';
import { PathProgressCard } from '@/components/Dashboard/PathProgressCard';
import { ProjectsProgressOverview } from '@/components/Dashboard/ProjectsProgressOverview';
import { RecentActivityList } from '@/components/Dashboard/RecentActivityList';
import { AchievementsList } from '@/components/Dashboard/AchievementsList';
import { SubmissionsList } from '@/components/Dashboard/SubmissionsList';
import { AssessmentOverview } from '@/components/Dashboard/AssessmentOverview';
import { CertificateWall } from '@/components/Certificate/CertificateWall';

export const metadata = {
  title: 'Learner Dashboard | First Move (11–18)',
  description: 'Track your overall technology learning progress, mastery, projects, streak, and achievements.',
};

export default async function DashboardPage() {
  const stats = await getUserDashboardData();

  if (!stats) {
    redirect('/login');
  }

  return (
    <div className="site-container-wide">
      {/* 1. Welcome Header & Key Metrics Overview */}
      <div style={{ marginBottom: '2.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.4rem' }}>
          <span style={{ fontSize: '1.25rem' }}>👋</span>
          <span style={{ fontSize: '0.875rem', fontWeight: 800, color: 'var(--accent-gold-deep)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Personal Learner Hub
          </span>
        </div>
        <h1 style={{ fontSize: 'clamp(1.85rem, 3vw + 0.5rem, 2.6rem)', fontWeight: 900, color: 'var(--text-main)', marginBottom: '0.45rem', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
          Welcome back to First Move (11–18)
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: 'clamp(1rem, 0.4vw + 0.9rem, 1.15rem)', margin: 0, maxWidth: '850px', lineHeight: 1.65 }}>
          Track your Career Compass discovery, progress through structured level milestones, and build production-grade projects.
        </p>
      </div>

      {/* KPI Stats Overview */}
      <div style={{ marginBottom: '2.25rem' }}>
        <DashboardOverview stats={stats} />
      </div>

      {/* 2. Career Compass Summary Card (Top Priority Feature) */}
      <div style={{ marginBottom: '2.25rem' }}>
        <LearningPathCard />
      </div>

      {/* 3. Current Learning Progress & Mastery */}
      <div style={{ marginBottom: '2.25rem' }}>
        {stats.pathProgress.map((prog) => (
          <PathProgressCard key={prog.pathSlug} pathProgress={prog} />
        ))}
        <MasteryOverview stats={stats} />
      </div>

      {/* 4. Credentials & Portfolio Projects */}
      <div style={{ marginBottom: '2.25rem' }}>
        <CertificateWall certificates={stats.userCertificates || []} />
        <AssessmentOverview
          attempts={stats.recentAssessmentAttempts || []}
          eligibilityMap={stats.certificationEligibilityMap || {}}
        />
        <ProjectsProgressOverview projectProgressMap={stats.projectProgressMap || {}} />
      </div>

      {/* 5. Milestones, Activity & Submissions Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.75rem',
        }}
      >
        <div>
          <AchievementsList achievements={stats.achievements || []} />
          <RecentActivityList activity={stats.recentActivity || []} />
        </div>
        <div>
          <SubmissionsList submissions={stats.recentSubmissions} />
        </div>
      </div>
    </div>
  );
}
