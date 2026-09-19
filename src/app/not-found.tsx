import React from 'react';
import Link from 'next/link';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Not Found | First Move (11~18)',
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="site-container" style={{ padding: '5rem 1.5rem', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
      <Card hoverable={false} style={{ padding: '3rem 2rem' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍 404</div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.75rem' }}>
          Page Not Found
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '2rem' }}>
          The learning resource, lesson, or path you are looking for does not exist or has been moved.
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/paths" style={{ textDecoration: 'none' }}>
            <Button variant="primary" size="md">
              Browse Learning Paths →
            </Button>
          </Link>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <Button variant="outline" size="md">
              Return Home
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
