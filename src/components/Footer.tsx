import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export function Footer() {
  return (
    <footer
      style={{
        backgroundColor: 'var(--bg-surface)',
        borderTop: '1px solid var(--border-color)',
        padding: '3rem 0 2rem 0',
        marginTop: '4rem',
        transition: 'background-color var(--transition-smooth), border-color var(--transition-smooth)'
      }}
    >
      <div className="site-container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '2rem',
            marginBottom: '2.5rem'
          }}
        >
          <div>
            <div style={{ marginBottom: '0.85rem' }}>
              <Link href="/" style={{ display: 'inline-block', textDecoration: 'none', lineHeight: 0 }}>
                <Image
                  src="/images/firstmove-logo.png"
                  alt="First Move (11~18) - Code, Learn, Build"
                  width={140}
                  height={93}
                  style={{
                    height: '48px',
                    width: 'auto',
                    maxHeight: '52px',
                    objectFit: 'contain',
                    borderRadius: '8px',
                    background: '#FFFFFF',
                    padding: '3px 6px',
                    display: 'block',
                  }}
                />
              </Link>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.5 }}>
              Structured, level-based technology learning paths from foundational exploration to industry mastery.
            </p>
          </div>

          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.75rem' }}>
              Learning Domains
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.875rem' }}>
              <li>
                <Link href="/paths/python" style={{ color: 'var(--text-muted)', transition: 'color var(--transition-fast)' }}>
                  Python Programming (Active)
                </Link>
              </li>
              <li>
                <Link href="/paths" style={{ color: 'var(--text-muted)', transition: 'color var(--transition-fast)' }}>
                  Computer Science Core
                </Link>
              </li>
              <li>
                <Link href="/paths" style={{ color: 'var(--text-muted)', transition: 'color var(--transition-fast)' }}>
                  Web Development
                </Link>
              </li>
              <li>
                <Link href="/paths" style={{ color: 'var(--text-muted)', transition: 'color var(--transition-fast)' }}>
                  AI & Machine Learning
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.75rem' }}>
              Platform Architecture
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              <li>Level-Based Progression</li>
              <li>Decoupled Content Schema</li>
              <li>Modular Code Execution Engine</li>
              <li>Curated Official Resources</li>
            </ul>
          </div>
        </div>

        <div
          style={{
            borderTop: '1px solid var(--border-color)',
            paddingTop: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            fontSize: '0.85rem',
            color: 'var(--text-muted)'
          }}
        >
          <p>© {new Date().getFullYear()} First Move (11–18) Educational Platform. Built with Next.js App Router.</p>
          <p>Readability & Accessibility First</p>
        </div>
      </div>
    </footer>
  );
}
