'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from './AuthProvider';

export function UserMenu() {
  const { user, isLoading, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  if (isLoading) {
    return (
      <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
        Loading...
      </div>
    );
  }

  if (!user) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
        <Link
          href="/login"
          style={{
            color: 'var(--text-main, #1E293B)',
            fontWeight: 600,
            fontSize: '0.92rem',
            textDecoration: 'none',
            padding: '0.4rem 0.5rem',
            transition: 'color 150ms ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#2563EB';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'var(--text-main, #1E293B)';
          }}
        >
          Log In
        </Link>
        <Link
          href="/signup"
          style={{
            backgroundColor: '#1E40AF',
            color: '#FFFFFF',
            padding: '0.48rem 1.15rem',
            borderRadius: '8px',
            fontWeight: 700,
            fontSize: '0.9rem',
            textDecoration: 'none',
            boxShadow: '0 2px 6px rgba(30, 64, 175, 0.3)',
            transition: 'background-color 150ms ease, transform 150ms ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#1D4ED8';
            e.currentTarget.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#1E40AF';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          Enroll now
        </Link>
      </div>
    );
  }

  const displayName = user.user_metadata?.display_name || user.email?.split('@')[0] || 'Learner';

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          backgroundColor: 'var(--bg-elevated)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-md)',
          padding: '0.35rem 0.75rem',
          color: 'var(--text-main)',
          fontWeight: 600,
          fontSize: '0.875rem',
          cursor: 'pointer',
        }}
      >
        <span
          style={{
            width: '1.75rem',
            height: '1.75rem',
            borderRadius: '50%',
            backgroundColor: 'var(--accent-primary)',
            color: '#FFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.8rem',
            fontWeight: 700,
          }}
        >
          {displayName.charAt(0).toUpperCase()}
        </span>
        <span>{displayName}</span>
        <span style={{ fontSize: '0.7rem' }}>▼</span>
      </button>

      {isOpen && (
        <div
          style={{
            position: 'absolute',
            right: 0,
            top: 'calc(100% + 0.5rem)',
            width: '200px',
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-md)',
            padding: '0.5rem',
            zIndex: 100,
            display: 'flex',
            flexDirection: 'column',
            gap: '0.25rem',
          }}
        >
          <div
            style={{
              padding: '0.5rem 0.75rem',
              borderBottom: '1px solid var(--border-color)',
              marginBottom: '0.25rem',
            }}
          >
            <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)' }}>
              {displayName}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {user.email}
            </div>
          </div>

          <Link
            href="/dashboard"
            onClick={() => setIsOpen(false)}
            style={{
              padding: '0.4rem 0.75rem',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--text-main)',
              fontSize: '0.875rem',
              fontWeight: 500,
              textDecoration: 'none',
              display: 'block',
            }}
          >
            📊 Learner Dashboard
          </Link>

          <Link
            href="/paths/python"
            onClick={() => setIsOpen(false)}
            style={{
              padding: '0.4rem 0.75rem',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--text-main)',
              fontSize: '0.875rem',
              fontWeight: 500,
              textDecoration: 'none',
              display: 'block',
            }}
          >
            🐍 Python Path
          </Link>

          <button
            onClick={async () => {
              setIsOpen(false);
              await signOut();
              router.push('/');
              router.refresh();
            }}
            style={{
              padding: '0.4rem 0.75rem',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--accent-danger, #ef4444)',
              fontSize: '0.875rem',
              fontWeight: 500,
              textAlign: 'left',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              width: '100%',
              marginTop: '0.25rem',
              borderTop: '1px solid var(--border-color)',
            }}
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
