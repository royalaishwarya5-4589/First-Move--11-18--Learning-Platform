import React from 'react';

interface SkeletonBoxProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  style?: React.CSSProperties;
  className?: string;
}

export function SkeletonBox({
  width = '100%',
  height = '1rem',
  borderRadius = 'var(--radius-sm)',
  style,
  className = '',
}: SkeletonBoxProps) {
  return (
    <div
      className={`skeleton-shimmer ${className}`.trim()}
      style={{
        width,
        height,
        borderRadius,
        ...style,
      }}
      aria-hidden="true"
    />
  );
}

export function CardSkeleton({
  height = '180px',
  style,
}: {
  height?: string | number;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={{
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.75rem',
        boxShadow: 'var(--shadow-sm)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        height,
        ...style,
      }}
      aria-label="Loading content..."
      role="status"
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <SkeletonBox width="35%" height="1.4rem" />
        <SkeletonBox width="60px" height="1.4rem" borderRadius="999px" />
      </div>
      <SkeletonBox width="85%" height="1rem" />
      <SkeletonBox width="60%" height="1rem" />
      <div style={{ marginTop: 'auto', display: 'flex', gap: '0.75rem' }}>
        <SkeletonBox width="110px" height="38px" borderRadius="var(--radius-md)" />
      </div>
    </div>
  );
}

export function StatCardSkeleton() {
  return (
    <div
      style={{
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.5rem',
        boxShadow: 'var(--shadow-sm)',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
      }}
      aria-label="Loading metric..."
      role="status"
    >
      <SkeletonBox width="48px" height="48px" borderRadius="12px" />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <SkeletonBox width="45%" height="0.85rem" />
        <SkeletonBox width="70%" height="1.5rem" />
      </div>
    </div>
  );
}

export function CourseCardSkeleton() {
  return (
    <div
      style={{
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.75rem',
        boxShadow: 'var(--shadow-sm)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        minHeight: '280px',
      }}
      aria-label="Loading course..."
      role="status"
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <SkeletonBox width="42px" height="42px" borderRadius="10px" />
        <SkeletonBox width="70px" height="24px" borderRadius="999px" />
      </div>
      <SkeletonBox width="65%" height="1.5rem" />
      <SkeletonBox width="90%" height="0.9rem" />
      <SkeletonBox width="80%" height="0.9rem" />
      <div style={{ marginTop: 'auto' }}>
        <SkeletonBox width="100%" height="42px" borderRadius="var(--radius-md)" />
      </div>
    </div>
  );
}

export function CompassResultSkeleton() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        maxWidth: '860px',
        margin: '0 auto',
        padding: '2rem 1rem',
      }}
      aria-label="Analyzing career preferences..."
      role="status"
    >
      <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
        <SkeletonBox width="160px" height="28px" borderRadius="999px" />
        <SkeletonBox width="380px" height="2.5rem" />
        <SkeletonBox width="520px" height="1.1rem" />
      </div>

      <div
        style={{
          backgroundColor: 'var(--bg-surface)',
          border: '1.5px solid var(--border-color)',
          borderRadius: 'var(--radius-xl)',
          padding: '2.5rem',
          boxShadow: 'var(--shadow-md)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <SkeletonBox width="40%" height="2rem" />
          <SkeletonBox width="90px" height="42px" borderRadius="999px" />
        </div>
        <SkeletonBox width="95%" height="1.1rem" />
        <SkeletonBox width="80%" height="1.1rem" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
          <SkeletonBox height="38px" borderRadius="8px" />
          <SkeletonBox height="38px" borderRadius="8px" />
          <SkeletonBox height="38px" borderRadius="8px" />
          <SkeletonBox height="38px" borderRadius="8px" />
        </div>
      </div>
    </div>
  );
}

export function QuizCardSkeleton() {
  return (
    <div
      className="site-container"
      style={{ padding: '3rem 1.5rem 5rem 1.5rem', maxWidth: '780px', margin: '0 auto' }}
      aria-label="Loading quiz question..."
      role="status"
    >
      {/* Top Progress Bar Placeholder */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <SkeletonBox width="140px" height="1.25rem" />
        <SkeletonBox width="80px" height="1.25rem" />
      </div>
      <SkeletonBox width="100%" height="8px" borderRadius="999px" style={{ marginBottom: '2.5rem' }} />

      {/* Main Question Card */}
      <div
        style={{
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-xl)',
          padding: '2.5rem',
          boxShadow: 'var(--shadow-md)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.75rem',
        }}
      >
        <div style={{ display: 'flex', gap: '0.65rem' }}>
          <SkeletonBox width="90px" height="24px" borderRadius="999px" />
          <SkeletonBox width="120px" height="24px" borderRadius="999px" />
        </div>
        <SkeletonBox width="85%" height="2rem" />
        <SkeletonBox width="60%" height="1.1rem" />

        {/* Choice Options Skeletons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1.25rem 1.5rem',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-surface-hover)',
              }}
            >
              <SkeletonBox width="28px" height="28px" borderRadius="999px" />
              <SkeletonBox width="70%" height="1.1rem" />
            </div>
          ))}
        </div>

        {/* Bottom Nav Controls */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem' }}>
          <SkeletonBox width="110px" height="42px" borderRadius="var(--radius-md)" />
          <SkeletonBox width="130px" height="42px" borderRadius="var(--radius-md)" />
        </div>
      </div>
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="site-container" style={{ padding: '2.5rem 1.5rem 5rem 1.5rem' }} aria-label="Loading dashboard..." role="status">
      {/* Header */}
      <div style={{ marginBottom: '2.25rem' }}>
        <SkeletonBox width="160px" height="1.25rem" style={{ marginBottom: '0.65rem' }} />
        <SkeletonBox width="340px" height="2.25rem" style={{ marginBottom: '0.65rem' }} />
        <SkeletonBox width="520px" height="1.1rem" />
      </div>

      {/* KPI Stats Overview */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.25rem',
          marginBottom: '2.25rem',
        }}
      >
        {[1, 2, 3, 4].map((i) => (
          <StatCardSkeleton key={i} />
        ))}
      </div>

      {/* Learning Path Card Placeholder */}
      <div style={{ marginBottom: '2.25rem' }}>
        <CardSkeleton height="180px" />
      </div>

      {/* Course Progress Card Placeholder */}
      <div style={{ marginBottom: '2.25rem' }}>
        <CardSkeleton height="220px" />
      </div>

      {/* Grid Overview */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.75rem',
        }}
      >
        <CardSkeleton height="260px" />
        <CardSkeleton height="260px" />
      </div>
    </div>
  );
}

export function LearningPathSkeleton() {
  return (
    <div className="site-container" style={{ padding: '2.5rem 1.5rem 5rem 1.5rem' }} aria-label="Loading learning path..." role="status">
      <div style={{ marginBottom: '2.5rem' }}>
        <SkeletonBox width="180px" height="1.25rem" style={{ marginBottom: '0.65rem' }} />
        <SkeletonBox width="420px" height="2.25rem" style={{ marginBottom: '0.65rem' }} />
        <SkeletonBox width="580px" height="1.1rem" />
      </div>

      {/* Hero Track Card */}
      <div style={{ marginBottom: '2.5rem' }}>
        <CardSkeleton height="220px" />
      </div>

      {/* Recommended Courses Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {[1, 2, 3].map((i) => (
          <CourseCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

export function CourseCatalogSkeleton() {
  return (
    <div className="site-container" style={{ padding: '2.5rem 1.5rem 5rem 1.5rem' }} aria-label="Loading catalog..." role="status">
      {/* Header */}
      <div style={{ marginBottom: '2.5rem' }}>
        <SkeletonBox width="160px" height="1.25rem" style={{ marginBottom: '0.5rem' }} />
        <SkeletonBox width="380px" height="2.25rem" style={{ marginBottom: '0.75rem' }} />
        <SkeletonBox width="600px" height="1.1rem" />
      </div>

      {/* Search & Filter Bar */}
      <div
        style={{
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.5rem',
          marginBottom: '3rem',
          display: 'flex',
          gap: '1rem',
          flexWrap: 'wrap',
        }}
      >
        <SkeletonBox width="300px" height="42px" borderRadius="var(--radius-md)" />
        <SkeletonBox width="140px" height="42px" borderRadius="var(--radius-md)" />
        <SkeletonBox width="140px" height="42px" borderRadius="var(--radius-md)" />
      </div>

      {/* Course Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <CourseCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

export function CourseDetailsSkeleton() {
  return (
    <div className="site-container" style={{ padding: '2.5rem 1.5rem 5rem 1.5rem' }} aria-label="Loading course details..." role="status">
      {/* Top Banner */}
      <div style={{ marginBottom: '2.5rem' }}>
        <SkeletonBox width="140px" height="1.25rem" style={{ marginBottom: '0.75rem' }} />
        <SkeletonBox width="460px" height="2.5rem" style={{ marginBottom: '0.75rem' }} />
        <SkeletonBox width="650px" height="1.1rem" style={{ marginBottom: '1.5rem' }} />
        <div style={{ display: 'flex', gap: '1rem' }}>
          <SkeletonBox width="150px" height="46px" borderRadius="var(--radius-md)" />
          <SkeletonBox width="150px" height="46px" borderRadius="var(--radius-md)" />
        </div>
      </div>

      {/* Stats Bar */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '1.25rem',
          marginBottom: '2.5rem',
        }}
      >
        {[1, 2, 3, 4].map((i) => (
          <StatCardSkeleton key={i} />
        ))}
      </div>

      {/* Modules List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {[1, 2, 3].map((i) => (
          <CardSkeleton key={i} height="160px" />
        ))}
      </div>
    </div>
  );
}
