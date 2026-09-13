import React from 'react';
import Link from 'next/link';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  target?: string;
  rel?: string;
  isLoading?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  children: React.ReactNode;
}

export function Button({
  href,
  variant = 'primary',
  size = 'md',
  target,
  rel,
  isLoading = false,
  disabled = false,
  iconLeft,
  iconRight,
  children,
  className = '',
  style,
  ...props
}: ButtonProps) {
  let bg = 'var(--accent-primary)';
  let color = 'var(--text-inverse)';
  let border = '1px solid var(--accent-primary)';
  let boxShadow = '0 2px 8px -1px rgba(24, 26, 29, 0.12)';

  if (variant === 'secondary') {
    bg = 'var(--bg-surface)';
    color = 'var(--text-main)';
    border = '1px solid var(--border-color)';
    boxShadow = 'var(--shadow-sm)';
  } else if (variant === 'outline') {
    bg = 'transparent';
    color = 'var(--text-main)';
    border = '1.5px solid var(--border-color)';
    boxShadow = 'none';
  }

  let padding = '0.65rem 1.35rem';
  let fontSize = '0.925rem';
  let minHeight = '42px';

  if (size === 'sm') {
    padding = '0.4rem 0.9rem';
    fontSize = '0.825rem';
    minHeight = '34px';
  } else if (size === 'lg') {
    padding = '0.85rem 1.85rem';
    fontSize = '1.05rem';
    minHeight = '50px';
  }

  const isDisabled = disabled || isLoading;
  const combinedClassName = `btn-interactive ${className}`.trim();

  const baseStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    padding,
    fontSize,
    minHeight,
    fontWeight: 750,
    borderRadius: 'var(--radius-md)',
    background: bg,
    color,
    border,
    boxShadow,
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    opacity: isDisabled ? 0.65 : 1,
    pointerEvents: isDisabled ? 'none' : 'auto',
    textDecoration: 'none',
    transition: 'transform var(--transition-fast), box-shadow var(--transition-fast), background-color var(--transition-fast), border-color var(--transition-fast), opacity var(--transition-fast)',
    userSelect: 'none',
    ...style,
  };

  const content = (
    <>
      {isLoading ? (
        <span
          style={{
            display: 'inline-block',
            width: size === 'sm' ? '14px' : '18px',
            height: size === 'sm' ? '14px' : '18px',
            border: `2px solid ${variant === 'primary' ? 'rgba(247,245,240,0.35)' : 'rgba(24,26,29,0.2)'}`,
            borderTopColor: variant === 'primary' ? 'var(--text-inverse)' : 'var(--text-main)',
            borderRadius: '50%',
            animation: 'btnSpin 0.75s linear infinite',
          }}
        />
      ) : (
        iconLeft
      )}
      <span>{children}</span>
      {!isLoading && iconRight}
    </>
  );

  if (href && !isDisabled) {
    return (
      <Link href={href} target={target} rel={rel} style={baseStyle} className={combinedClassName}>
        {content}
      </Link>
    );
  }

  return (
    <button
      style={baseStyle}
      className={combinedClassName}
      disabled={isDisabled}
      aria-busy={isLoading ? 'true' : undefined}
      {...props}
    >
      {content}
    </button>
  );
}
