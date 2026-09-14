'use client';

import React, { useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from './ThemeToggle';
import { Badge } from './Badge';
import { UserMenu } from './Auth/UserMenu';
import { MegaMenu } from './Navigation/MegaMenu';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = React.useState(false);
  const pathname = usePathname();

  // Close menus on route change without triggering cascading effect render
  const [prevPathname, setPrevPathname] = React.useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMobileMenuOpen(false);
    setMegaMenuOpen(false);
  }

  // Handle escape key to close menus
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      if (mobileMenuOpen) setMobileMenuOpen(false);
      if (megaMenuOpen) setMegaMenuOpen(false);
    }
  }, [mobileMenuOpen, megaMenuOpen]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const isPathsActive = pathname?.startsWith('/paths');
  const isCompassActive = pathname?.startsWith('/assessment') || pathname?.startsWith('/learning-path');
  const isDashboardActive = pathname === '/dashboard';
  const isProgressActive = pathname === '/progress';

  const navLinkStyle = (isActive: boolean): React.CSSProperties => ({
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.4rem',
    fontSize: '0.975rem',
    fontWeight: isActive ? 750 : 600,
    color: isActive ? 'var(--text-main)' : 'var(--text-muted)',
    backgroundColor: isActive ? 'var(--bg-muted)' : 'transparent',
    border: isActive ? '1px solid var(--border-color)' : '1px solid transparent',
    padding: '0.5rem 0.95rem',
    minHeight: '38px',
    borderRadius: 'var(--radius-md)',
    textDecoration: 'none',
    transition: 'background-color var(--transition-fast), border-color var(--transition-fast), color var(--transition-fast), transform var(--transition-fast)',
  });

  const mobileNavLinkStyle = (isActive: boolean): React.CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    fontSize: '1.05rem',
    fontWeight: isActive ? 750 : 600,
    color: isActive ? 'var(--text-main)' : 'var(--text-muted)',
    backgroundColor: isActive ? 'var(--bg-muted)' : 'transparent',
    border: isActive ? '1px solid var(--border-color)' : '1px solid transparent',
    padding: '0.85rem 1.15rem',
    minHeight: '48px',
    borderRadius: 'var(--radius-md)',
    textDecoration: 'none',
    transition: 'all var(--transition-fast)',
  });

  return (
    <header
      style={{
        backgroundColor: 'color-mix(in srgb, var(--bg-surface) 94%, transparent)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border-color)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        transition: 'background-color var(--transition-smooth), border-color var(--transition-smooth)',
      }}
    >
      <div className="header-container">
        <Link
          href="/"
          className="btn-interactive"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem',
            textDecoration: 'none',
            color: 'var(--text-main)',
            fontWeight: 850,
            fontSize: '1.25rem',
            letterSpacing: '-0.02em',
          }}
        >
          <span
            style={{
              background: 'var(--accent-primary)',
              color: 'var(--text-inverse)',
              padding: '0.25rem 0.65rem',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.925rem',
              fontWeight: 850,
              boxShadow: '0 2px 8px rgba(24, 26, 29, 0.16)',
            }}
          >
            FM
          </span>
          <span>First Move (11–18)</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }} aria-label="Main Navigation">
          <div style={{ position: 'relative' }}>
            <button
              type="button"
              onClick={() => setMegaMenuOpen((prev) => !prev)}
              aria-expanded={megaMenuOpen}
              aria-haspopup="true"
              aria-controls="desktop-mega-menu"
              style={{
                ...navLinkStyle(Boolean(isPathsActive) || megaMenuOpen),
                cursor: 'pointer',
                background: (Boolean(isPathsActive) || megaMenuOpen) ? 'var(--bg-muted)' : 'transparent',
              }}
            >
              <span>Courses</span>
              <span
                style={{
                  fontSize: '0.7rem',
                  display: 'inline-block',
                  transition: 'transform var(--transition-fast)',
                  transform: megaMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                }}
                aria-hidden="true"
              >
                ▼
              </span>
            </button>
          </div>
          <Link href="/assessment" style={navLinkStyle(Boolean(isCompassActive))}>
            <span>🧭</span> Career Compass
          </Link>
          <Link href="/dashboard" style={navLinkStyle(Boolean(isDashboardActive))}>
            Dashboard
          </Link>
          <Link href="/progress" style={navLinkStyle(Boolean(isProgressActive))}>
            Progress
          </Link>

          <div style={{ width: '1px', height: '1.5rem', backgroundColor: 'var(--border-color)', margin: '0 0.5rem' }} />

          <ThemeToggle />
          <UserMenu />
        </nav>

        {/* Mobile Hamburger Toggle */}
        <div style={{ display: 'none' }} className="mobile-toggle">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-menu"
            className="btn-interactive"
            style={{
              background: 'transparent',
              border: '1px solid var(--border-color)',
              color: 'var(--text-main)',
              padding: '0.5rem 0.75rem',
              minHeight: '44px',
              minWidth: '44px',
              borderRadius: 'var(--radius-md)',
              fontSize: '1.25rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Desktop MegaMenu Container */}
      <MegaMenu
        isOpen={megaMenuOpen}
        onClose={() => setMegaMenuOpen(false)}
        activeMenuType="courses"
      />

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <nav
          id="mobile-nav-menu"
          aria-label="Mobile Navigation"
          style={{
            backgroundColor: 'var(--bg-surface)',
            borderBottom: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-md)',
            padding: '1.25rem 1.5rem 1.5rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.6rem',
            animation: 'pageFadeIn 180ms ease-out forwards',
          }}
        >
          <Link
            href="/paths"
            onClick={() => setMobileMenuOpen(false)}
            style={mobileNavLinkStyle(Boolean(isPathsActive))}
          >
            📚 Explore Courses
          </Link>
          <Link
            href="/assessment"
            onClick={() => setMobileMenuOpen(false)}
            style={mobileNavLinkStyle(Boolean(isCompassActive))}
          >
            🧭 Career Compass Discovery
          </Link>
          <Link
            href="/dashboard"
            onClick={() => setMobileMenuOpen(false)}
            style={mobileNavLinkStyle(Boolean(isDashboardActive))}
          >
            📊 Learner Dashboard
          </Link>
          <Link
            href="/progress"
            onClick={() => setMobileMenuOpen(false)}
            style={mobileNavLinkStyle(Boolean(isProgressActive))}
          >
            📈 Detailed Progress
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1rem', marginTop: '0.5rem', borderTop: '1px solid var(--border-color)' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Appearance & Account</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <ThemeToggle />
              <UserMenu />
            </div>
          </div>
        </nav>
      )}

      <style jsx>{`
        @media (max-width: 768px) {
          :global(.desktop-nav) {
            display: none !important;
          }
          :global(.mobile-toggle) {
            display: block !important;
          }
        }
      `}</style>
    </header>
  );
}
