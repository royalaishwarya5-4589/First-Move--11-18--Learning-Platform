'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface CourseImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  aspectRatio?: string;
  priority?: boolean;
  sizes?: string;
  accentColor?: string;
  fallbackIcon?: string;
}

export function CourseImage({
  src,
  alt,
  className = '',
  style = {},
  aspectRatio = '16/9',
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  accentColor = '#C9A227',
  fallbackIcon = '🎓',
}: CourseImageProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  if (hasError || !src) {
    return (
      <div
        className={`course-image-fallback ${className}`}
        style={{
          width: '100%',
          aspectRatio,
          backgroundColor: '#FAF9F5',
          background: `linear-gradient(135deg, #FAF9F5 0%, #F5F3EB 50%, #EDE7D5 100%)`,
          border: '1px solid var(--border-color, #EDE7D5)',
          borderRadius: 'var(--radius-md, 12px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          ...style,
        }}
        role="img"
        aria-label={alt}
      >
        {/* Subtle geometric Gold/accent pattern */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `radial-gradient(circle at 20% 30%, ${accentColor}25 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(159, 122, 22, 0.1) 0%, transparent 60%)`,
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            backgroundColor: '#FFFFFF',
            border: `2px solid ${accentColor}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: `0 4px 16px ${accentColor}30`,
            marginBottom: '0.75rem',
            zIndex: 1,
          }}
        >
          <span style={{ fontSize: '1.75rem' }}>{fallbackIcon}</span>
        </div>
        <span
          style={{
            fontSize: '0.875rem',
            fontWeight: 700,
            color: 'var(--text-main, #1C1C1C)',
            letterSpacing: '0.03em',
            textTransform: 'uppercase',
            zIndex: 1,
            textAlign: 'center',
            padding: '0 1rem',
          }}
        >
          {alt}
        </span>
      </div>
    );
  }

  return (
    <div
      className={`course-image-container ${className}`}
      style={{
        width: '100%',
        aspectRatio,
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 'var(--radius-md, 12px)',
        backgroundColor: '#FAF9F5',
        border: '1px solid var(--border-color, #EDE7D5)',
        ...style,
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        style={{
          objectFit: 'cover',
          transition: 'opacity 300ms ease, transform 400ms cubic-bezier(0.16, 1, 0.3, 1)',
          opacity: isLoading ? 0.3 : 1,
        }}
        onLoad={() => setIsLoading(false)}
        onError={() => setHasError(true)}
      />

      {/* Subtle Gold + Dark gradient overlay for text legibility and premium polish */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(28, 28, 28, 0.05) 0%, rgba(28, 28, 28, 0.2) 60%, rgba(28, 28, 28, 0.5) 100%)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}
