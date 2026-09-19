'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signUpWithEmail } from '@/app/actions/auth';
import { Button } from '@/components/Button';
import { useAuth } from '@/components/Auth/AuthProvider';

export default function SignupPage() {
  const router = useRouter();
  const { user, isLoading: isAuthLoading } = useAuth();

  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    document.title = 'Create Account | First Move (11~18)';
    if (!isAuthLoading && user) {
      router.replace('/dashboard');
    }
  }, [user, isAuthLoading, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      const result = await signUpWithEmail(formData);

      if (result?.error) {
        setError(result.error);
      } else if (result?.message) {
        setSuccessMessage(result.message);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during account creation.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 200px)',
        padding: '2rem 1rem',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '400px',
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          padding: '2rem',
          boxShadow: 'var(--shadow-md)',
        }}
      >
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
          Create Account
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
          Join First Move (11~18) to track your progress and sync achievements.
        </p>

        {error && (
          <div
            style={{
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid var(--accent-danger, #ef4444)',
              color: 'var(--accent-danger, #ef4444)',
              padding: '0.75rem',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.85rem',
              marginBottom: '1rem',
            }}
          >
            {error}
          </div>
        )}

        {successMessage && (
          <div
            style={{
              backgroundColor: 'rgba(34, 197, 94, 0.1)',
              border: '1px solid var(--accent-success, #22c55e)',
              color: 'var(--accent-success, #22c55e)',
              padding: '0.75rem',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.85rem',
              marginBottom: '1rem',
            }}
          >
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label
              htmlFor="displayName"
              style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.35rem' }}
            >
              Display Name
            </label>
            <input
              id="displayName"
              name="displayName"
              type="text"
              placeholder="e.g. Alex"
              style={{
                width: '100%',
                padding: '0.6rem 0.75rem',
                backgroundColor: 'var(--bg-app)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                color: 'var(--text-main)',
                fontSize: '0.95rem',
                outline: 'none',
              }}
            />
          </div>

          <div>
            <label
              htmlFor="email"
              style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.35rem' }}
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              style={{
                width: '100%',
                padding: '0.6rem 0.75rem',
                backgroundColor: 'var(--bg-app)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                color: 'var(--text-main)',
                fontSize: '0.95rem',
                outline: 'none',
              }}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.35rem' }}
            >
              Password (min. 6 chars)
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              placeholder="••••••••"
              style={{
                width: '100%',
                padding: '0.6rem 0.75rem',
                backgroundColor: 'var(--bg-app)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                color: 'var(--text-main)',
                fontSize: '0.95rem',
                outline: 'none',
              }}
            />
          </div>

          <Button variant="primary" size="md" type="submit" isLoading={isSubmitting} style={{ marginTop: '0.5rem', width: '100%' }}>
            Create Account
          </Button>
        </form>

        <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Already have an account?{' '}
          <Link href="/login" style={{ color: 'var(--accent-primary)', fontWeight: 600, textDecoration: 'none' }}>
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
