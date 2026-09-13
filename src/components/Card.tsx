import React from 'react';

interface CardProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  hoverable?: boolean;
  interactive?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  role?: string;
  tabIndex?: number;
  id?: string;
}

export function Card({
  children,
  style,
  className = '',
  hoverable,
  interactive,
  onClick,
  role,
  tabIndex,
  id,
}: CardProps) {
  // A card is interactive if explicitly set, or if an onClick handler is provided,
  // or if hoverable was explicitly passed as true. Default to false for calm informational cards.
  const isInteractive = interactive ?? (hoverable !== undefined ? hoverable : Boolean(onClick));
  const combinedClassName = `${isInteractive ? 'card-interactive' : ''} ${className}`.trim();

  return (
    <div
      id={id}
      onClick={onClick}
      role={role || (onClick ? 'button' : undefined)}
      tabIndex={tabIndex ?? (onClick ? 0 : undefined)}
      className={combinedClassName || undefined}
      style={{
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.75rem',
        boxShadow: 'var(--shadow-sm)',
        transition: 'transform var(--transition-smooth), box-shadow var(--transition-smooth), border-color var(--transition-smooth)',
        cursor: isInteractive ? 'pointer' : 'default',
        ...style,
      }}
    >
      {children}
    </div>
  );
}
