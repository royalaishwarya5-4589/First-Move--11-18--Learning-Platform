import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'active' | 'roadmap' | 'level' | 'success' | 'warning' | 'gold';
  size?: 'sm' | 'md';
  className?: string;
  style?: React.CSSProperties;
}

export function Badge({ children, variant = 'active', size = 'md', className = '', style = {} }: BadgeProps) {
  let bg = 'var(--badge-active-bg)';
  let color = 'var(--badge-active-text)';
  let border = '1px solid var(--border-color)';

  if (variant === 'roadmap' || variant === 'level') {
    bg = 'var(--bg-muted)';
    color = 'var(--text-muted)';
    border = '1px solid var(--border-color)';
  } else if (variant === 'success') {
    bg = 'rgba(46, 125, 50, 0.08)';
    color = '#2E7D32';
    border = '1px solid rgba(46, 125, 50, 0.22)';
  } else if (variant === 'warning') {
    bg = 'rgba(153, 107, 46, 0.1)';
    color = 'var(--accent-warning)';
    border = '1px solid rgba(153, 107, 46, 0.25)';
  } else if (variant === 'gold') {
    bg = 'var(--accent-beige-light)';
    color = 'var(--text-main)';
    border = '1px solid var(--border-hover)';
  }

  const padding = size === 'sm' ? '0.25rem 0.65rem' : '0.35rem 0.9rem';
  const fontSize = size === 'sm' ? '0.8rem' : '0.875rem';

  return (
    <span
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding,
        fontSize,
        fontWeight: 700,
        borderRadius: 'var(--radius-full)',
        backgroundColor: bg,
        color: color,
        border,
        lineHeight: 1,
        whiteSpace: 'nowrap',
        letterSpacing: '0.02em',
        ...style,
      }}
    >
      {children}
    </span>
  );
}
