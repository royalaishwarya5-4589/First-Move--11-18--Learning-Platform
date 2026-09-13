'use client';

import React, { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { fetchLatestPreCourseAssessmentAction, selectCareerCompassDomainAction } from '@/app/actions/preCourse';
import { CareerCompassResult } from '@/lib/preCourseEngine';
import { Button } from '@/components/Button';
import { Badge } from '@/components/Badge';
import { CompassResultSkeleton } from '@/components/Skeleton';

interface TechProfile {
  title: string;
  tagline: string;
  explanation: string;
  icon: string;
  traits: string[];
}

function getTechProfile(primarySlug: string): TechProfile {
  switch (primarySlug) {
    case 'dsa':
    case 'java':
      return {
        title: 'THE PROBLEM SOLVER',
        tagline: '🧠 Logical • Analytical • Structured • Builder',
        explanation:
          'You enjoy understanding how things work beneath the surface, dissecting complex logic, and architecting resilient, high-performance systems.',
        icon: '🧠',
        traits: ['Algorithmic Thinking', 'Architectural Design', 'Deep Problem Solving', 'Reliability Focus'],
      };
    case 'web-development':
    case 'ui-ux':
      return {
        title: 'THE DIGITAL CREATOR',
        tagline: '🎨 Creative • Visual • User-Focused • Interactive',
        explanation:
          'You love creating visible, interactive things and crafting seamless digital experiences that make technology intuitive, modern, and engaging.',
        icon: '🎨',
        traits: ['Visual Empathy', 'Interactive Design', 'Rapid Prototyping', 'Creative Problem Solving'],
      };
    case 'ai-ml':
    case 'python':
      return {
        title: 'THE INNOVATION SEEKER',
        tagline: '🚀 Curious • Intelligent • Automated • Exploratory',
        explanation:
          'You are captivated by patterns, intelligent systems, and automation. You love experimenting with new tools and training data to uncover meaningful insights.',
        icon: '🚀',
        traits: ['Pattern Recognition', 'Data Curiosity', 'Automation Instinct', 'Predictive Modeling'],
      };
    case 'cybersecurity':
    case 'cloud-computing':
      return {
        title: 'THE TECH EXPLORER',
        tagline: '🛡️ Resilient • Systems-Oriented • Investigative • Strategic',
        explanation:
          'You possess an investigative mindset and enjoy mastering complex server networks, ethical defense, and the global cloud infrastructure that powers the web.',
        icon: '🛡️',
        traits: ['Systems Architecture', 'Defensive Mindset', 'Network Curiosity', 'Infrastructure Scaling'],
      };
    case 'database':
      return {
        title: 'THE SYSTEM ARCHITECT',
        tagline: '🗄️ Structured • Data-Driven • Methodical • Analytical',
        explanation:
          'You thrive on turning disorganized information into structured relational models, building lightning-fast queries and dependable backends.',
        icon: '🗄️',
        traits: ['Relational Modeling', 'Query Optimization', 'Data Integrity', 'Backend Foundations'],
      };
    case 'app-dev':
    default:
      return {
        title: 'THE PRODUCT BUILDER',
        tagline: '📱 Tactile • Practical • Modern • Mobile-First',
        explanation:
          'You enjoy building software tools that people touch every day, translating user needs into responsive, elegant mobile and web products.',
        icon: '📱',
        traits: ['Product Instinct', 'Multi-Platform Vision', 'User Ergonomics', 'Hands-On Execution'],
      };
  }
}

function getDomainBulletPoints(slug: string): string[] {
  switch (slug) {
    case 'dsa':
      return [
        'Logical problem solving & algorithm design',
        'Pattern recognition in complex puzzles',
        'Structured computational thinking',
        'Optimization for speed & memory efficiency',
      ];
    case 'web-development':
      return [
        'Building visible, interactive user experiences',
        'Immediate visual feedback while coding',
        'Combining creative design with functional code',
        'Creating accessible products for millions on the web',
      ];
    case 'python':
      return [
        'Clean, readable syntax & expressive logic',
        'Rapid scripting & practical task automation',
        'Versatile pathways into data science & web backends',
        'Fast turnaround from initial idea to working prototype',
      ];
    case 'java':
      return [
        'Strong object-oriented architecture principles',
        'Building enterprise-grade, dependable backend services',
        'Deep understanding of compiled JVM execution & memory',
        'Scalable foundation for large software engineering teams',
      ];
    case 'ai-ml':
      return [
        'Fascination with neural networks & intelligent systems',
        'Analyzing data to predict patterns and outcomes',
        'Working with Generative AI, LLMs, and autonomous agents',
        'Solving problems that cannot be solved by rigid rules alone',
      ];
    case 'cybersecurity':
      return [
        'Defensive mindset and safeguarding user confidentiality',
        'Investigating vulnerabilities and stopping exploits',
        'Understanding encryption protocols and secure architectures',
        'Protecting critical digital infrastructure from attacks',
      ];
    case 'cloud-computing':
      return [
        'Deploying resilient containerized software with Docker',
        'Automating continuous integration & delivery pipelines',
        'Scaling applications across global cloud regions',
        'Architecting high-availability distributed systems',
      ];
    case 'database':
      return [
        'Designing relational database schemas & normalization',
        'Writing high-performance SQL queries and indexes',
        'Managing persistent data transactions with ACID guarantees',
        'Connecting robust data layers to frontend APIs',
      ];
    case 'app-dev':
      return [
        'Designing touch-friendly mobile layouts for iOS & Android',
        'State management and fluid interactive transitions',
        'Building cross-platform apps with native performance',
        'Connecting mobile hardware features (camera, location, storage)',
      ];
    case 'ui-ux':
      return [
        'User empathy and designing human-centered interfaces',
        'Creating visual hierarchy, typography & color palettes',
        'Interactive wireframing and clickable prototypes',
        'Conducting usability research to eliminate user friction',
      ];
    default:
      return [
        'Strong alignment with your problem-solving style',
        'Natural affinity for structured technology learning',
        'Proven interest in this domain\'s core workflows',
        'Excellent foundation for beginner-to-advanced progression',
      ];
  }
}

function CircularProgressRing({
  percentage,
  size = 72,
  strokeWidth = 6,
  color = '#C9A227',
}: {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div
      style={{
        position: 'relative',
        width: size,
        height: size,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#EDE7D5"
          strokeWidth={strokeWidth}
          opacity={0.6}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 1s cubic-bezier(0.16, 1, 0.3, 1)' }}
        />
      </svg>
      <div style={{ position: 'absolute', textAlign: 'center', display: 'flex', alignItems: 'baseline', justifyContent: 'center' }}>
        <span style={{ fontSize: `${size * 0.28}px`, fontWeight: 900, color: 'var(--text-main)', lineHeight: 1 }}>
          {percentage}
        </span>
        <span style={{ fontSize: `${size * 0.16}px`, fontWeight: 750, color: 'var(--accent-gold-deep)' }}>
          %
        </span>
      </div>
    </div>
  );
}

function ResultContent() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [result, setResult] = useState<CareerCompassResult | null>(null);
  const [selectedDomainSlug, setSelectedDomainSlug] = useState<string | null>(null);
  const [selectingDomain, setSelectingDomain] = useState<boolean>(false);

  useEffect(() => {
    async function loadResults() {
      setLoading(true);

      const serverRes = await fetchLatestPreCourseAssessmentAction();
      if (serverRes.result) {
        setResult(serverRes.result);
        setSelectedDomainSlug(serverRes.selectedDomain || serverRes.result.primaryDomain.domainSlug);
        setLoading(false);
        return;
      }

      // Local storage fallback
      try {
        const storedResult = localStorage.getItem('learntech_latest_career_compass_result');
        if (storedResult) {
          const parsed: CareerCompassResult = JSON.parse(storedResult);
          setResult(parsed);
          setSelectedDomainSlug(parsed.primaryDomain.domainSlug);
        }
      } catch (err) {
        console.warn('Failed to parse local storage results', err);
      }

      setLoading(false);
    }

    loadResults();
  }, []);

  const handleChooseDomain = async (slug: string) => {
    setSelectingDomain(true);
    setSelectedDomainSlug(slug);

    try {
      await selectCareerCompassDomainAction(slug);
    } catch (err) {
      console.warn('Server action domain save error', err);
    }

    try {
      localStorage.setItem('learntech_selected_domain', slug);
    } catch {
      // ignore
    }

    setSelectingDomain(false);
    router.push('/learning-path');
  };

  const scrollToDomainSelection = () => {
    const el = document.getElementById('all-domains-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (loading) {
    return <CompassResultSkeleton />;
  }

  if (!result) {
    return (
      <div className="site-container" style={{ padding: '5rem 1rem', textAlign: 'center', maxWidth: '600px' }}>
        <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>🧭</div>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--text-main)', marginBottom: '0.75rem' }}>
          No Career Compass Found
        </h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: 1.6, fontSize: '1rem' }}>
          You haven&apos;t taken the Career Compass discovery test yet. Take a quick 5-minute test to uncover which technology areas match your natural strengths.
        </p>
        <Link href="/assessment">
          <Button variant="primary" style={{ padding: '0.85rem 2rem', fontWeight: 800, fontSize: '1rem' }}>
            Start Career Compass Test →
          </Button>
        </Link>
      </div>
    );
  }

  const primary = result.primaryDomain;
  const top3 = result.topRecommendations || result.allRecommendations.slice(0, 3);
  const allDomains = result.allRecommendations;
  const profile = getTechProfile(primary.domainSlug);
  const bestMatchBullets = getDomainBulletPoints(primary.domainSlug);

  return (
    <div className="site-container compass-page-container">
      {/* ========================================================================= */}
      {/* 1. HERO SECTION & TECH PROFILE                                           */}
      {/* ========================================================================= */}
      {/* 1. HERO ARCHETYPE BANNER (STAGE 1 REVEAL)                                */}
      {/* ========================================================================= */}
      <section className="hero-section reveal-stage-1">
        <div style={{ marginBottom: '1.25rem' }}>
          <Badge variant="gold" size="md">
            ✨ Personalized for You
          </Badge>
        </div>

        <h1 className="hero-title">
          <span className="compass-icon">🧭</span> Your First Move(11~18) Career Compass
        </h1>

        <p className="hero-subtitle">
          Your answers reveal the technology areas that may fit your interests, thinking style, and learning preferences.
        </p>

        {/* Dynamic Tech Profile Archetype Card */}
        <div className="tech-profile-card">
          <div className="profile-header">
            <span className="profile-label">YOUR TECH PROFILE</span>
            <h2 className="profile-title">&ldquo;{profile.title}&rdquo;</h2>
            <div className="profile-tagline">{profile.tagline}</div>
          </div>

          <p className="profile-explanation">&ldquo;{profile.explanation}&rdquo;</p>

          <div className="traits-grid">
            {profile.traits.map((trait, i) => (
              <div key={i} className="trait-pill">
                <span className="trait-dot" />
                <span>{trait}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. TOP RECOMMENDATION (STAGE 2 REVEAL)                                    */}
      {/* ========================================================================= */}
      <section className="section-container reveal-stage-2">
        <div className="best-match-featured-card">
          <div className="best-match-glow-fx" />

          <div className="best-match-content">
            <div className="best-match-top-row">
              <div>
                <div className="best-match-badge">
                  <span>🥇</span> #1 TOP CAREER RECOMMENDATION
                </div>
                <div className="best-match-headline">
                  You are a strong match for this career.
                </div>
                <h2 className="best-match-title">
                  <span className="domain-icon-large">{primary.icon}</span> {primary.title}
                </h2>
              </div>

              <div className="best-match-score-badge">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <CircularProgressRing
                    percentage={primary.matchPercentage}
                    size={62}
                    strokeWidth={6}
                    color="#C9A227"
                  />
                  <div>
                    <span className="match-number">{primary.matchPercentage}%</span>
                    <span className="match-label">Match</span>
                  </div>
                </div>
              </div>
            </div>

            <p className="best-match-desc">{primary.description}</p>

            <div className="why-matches-box">
              <div className="why-matches-heading">Key Strengths & Why This Matches You:</div>
              <div className="bullets-grid">
                {bestMatchBullets.map((bullet, idx) => (
                  <div key={idx} className="bullet-item">
                    <span className="bullet-check">✓</span>
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="best-match-footer">
              <div className="path-preview-box">
                <span className="path-preview-label">Recommended Starting Path:</span>
                <div className="path-preview-steps">{primary.recommendedStartingPath}</div>
              </div>

              <button
                className="explore-featured-btn"
                onClick={() => handleChooseDomain(primary.domainSlug)}
                disabled={selectingDomain}
              >
                <span>Explore {primary.title}</span>
                <span className="arrow-icon">→</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. TOP 3 DOMAINS (STAGE 3 REVEAL)                                         */}
      {/* ========================================================================= */}
      <section className="section-container reveal-stage-3">
        <div className="section-header">
          <h2 className="section-title">Your Strongest Domain Matches</h2>
          <p className="section-subtitle">
            These top areas scored highest across your curiosity, problem solving, and technology preferences.
          </p>
        </div>

        <div className="top3-grid">
          {top3.map((rec, idx) => {
            const rankEmoji = idx === 0 ? '🥇' : idx === 1 ? '🥈' : '🥉';
            const rankLabel = idx === 0 ? '#1 Top Match' : idx === 1 ? '#2 Strong Fit' : '#3 High Potential';
            const isFirst = idx === 0;

            return (
              <div
                key={rec.domainSlug}
                className={`top3-card ${isFirst ? 'top3-card-active' : ''}`}
                onClick={() => handleChooseDomain(rec.domainSlug)}
              >
                <div className="top3-header">
                  <div className="top3-rank-pill">
                    <span>{rankEmoji}</span> {rankLabel}
                  </div>
                  <CircularProgressRing
                    percentage={rec.matchPercentage}
                    size={68}
                    strokeWidth={6}
                    color="#C9A227"
                  />
                </div>

                <div className="top3-identity">
                  <div className="top3-icon">{rec.icon}</div>
                  <h3 className="top3-name">{rec.title}</h3>
                </div>

                <p className="top3-description">{rec.description}</p>

                <div className="top3-footer">
                  <span className="top3-path-text">{rec.recommendedStartingPath}</span>
                  <button
                    className="top3-action-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleChooseDomain(rec.domainSlug);
                    }}
                    disabled={selectingDomain}
                  >
                    Explore →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. DOMAIN COMPARISON (HOW YOUR INTERESTS ALIGN)                           */}
      {/* ========================================================================= */}
      <section className="section-container">
        <div className="section-header">
          <h2 className="section-title">How Your Interests Align</h2>
          <p className="section-subtitle">
            A clean visual comparison of compatibility across all 10 evaluated technology domains.
          </p>
        </div>

        <div className="comparison-container">
          {allDomains.map((dm, idx) => {
            const isSelected = selectedDomainSlug === dm.domainSlug;
            return (
              <div
                key={dm.domainSlug}
                className={`comparison-row ${isSelected ? 'comparison-row-active' : ''}`}
                onClick={() => handleChooseDomain(dm.domainSlug)}
              >
                <div className="comparison-domain-identity">
                  <span className="comparison-rank">#{idx + 1}</span>
                  <span className="comparison-icon">{dm.icon}</span>
                  <span className="comparison-title">{dm.title}</span>
                  {idx === 0 && <span className="comparison-lead-pill">Top Match</span>}
                </div>

                <div className="comparison-bar-track">
                  <div
                    className="comparison-bar-fill animate-fill-bar"
                    style={{
                      width: `${dm.matchPercentage}%`,
                    }}
                  />
                </div>

                <div className="comparison-score-wrap">
                  <span className="comparison-pct">{dm.matchPercentage}%</span>
                  <button
                    className="comparison-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleChooseDomain(dm.domainSlug);
                    }}
                    disabled={selectingDomain}
                  >
                    Explore →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. "WHY THESE DOMAINS?" (INSIGHTS SUMMARY)                                */}
      {/* ========================================================================= */}
      <section className="section-container">
        <div className="insights-card">
          <div className="insights-header">
            <span className="insights-icon">💡</span>
            <div>
              <h3 className="insights-title">What We Learned About You</h3>
              <p className="insights-subtitle">Key trends observed across your discovery answers</p>
            </div>
          </div>

          <div className="insights-grid">
            <div className="insight-item">
              <div className="insight-glyph">🧠</div>
              <div>
                <h4 className="insight-point-title">Enjoy Logical Challenges</h4>
                <p className="insight-point-desc">
                  You gravitate toward problem-solving scenarios that test analytical intuition and structured reasoning.
                </p>
              </div>
            </div>

            <div className="insight-item">
              <div className="insight-glyph">🔍</div>
              <div>
                <h4 className="insight-point-title">Like Understanding How Things Work</h4>
                <p className="insight-point-desc">
                  You are motivated by discovering mechanisms under the hood rather than just accepting surface outputs.
                </p>
              </div>
            </div>

            <div className="insight-item">
              <div className="insight-glyph">⚙️</div>
              <div>
                <h4 className="insight-point-title">Prefer Building Practical Solutions</h4>
                <p className="insight-point-desc">
                  You want what you study to translate directly into tangible, functional digital applications and tools.
                </p>
              </div>
            </div>

            <div className="insight-item">
              <div className="insight-glyph">🚀</div>
              <div>
                <h4 className="insight-point-title">Curious About Modern Technology</h4>
                <p className="insight-point-desc">
                  You demonstrate an innate enthusiasm for exploring new software paradigms and digital innovation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. IMPORTANT DISCLAIMER (WARM & NON-LIMITING)                             */}
      {/* ========================================================================= */}
      <section className="section-container">
        <div className="disclaimer-card">
          <div className="disclaimer-bulb">💡</div>
          <div className="disclaimer-text-wrap">
            <h3 className="disclaimer-title">Remember: Recommendation, Not Limitation</h3>
            <p className="disclaimer-body">
              Your Career Compass result is a guided starting point. You can explore <strong>ANY</strong> technology domain you are interested in.
              Your curiosity, enthusiasm, and learning consistency matter far more than any single percentage.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. CHOOSE YOUR PATH (STRONG CTA DOCK)                                      */}
      {/* ========================================================================= */}
      <section className="section-container">
        <div className="cta-dock-card">
          <h2 className="cta-dock-title">Where do you want to go next?</h2>
          <p className="cta-dock-subtitle">
            Your recommendations are a launchpad. Choose the path that excites you the most.
          </p>

          <div className="cta-dock-buttons">
            <button
              className="cta-primary-btn"
              onClick={() => handleChooseDomain(primary.domainSlug)}
              disabled={selectingDomain}
            >
              <span>Explore My #1 Match ({primary.title})</span>
              <span>→</span>
            </button>

            <button className="cta-secondary-btn" onClick={scrollToDomainSelection}>
              <span>Choose Another Domain</span>
              <span>▾</span>
            </button>

            <Link href="/assessment" className="cta-ghost-btn">
              <span>Retake Career Compass</span>
              <span>🔄</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. COMPLETE DOMAIN SELECTION GRID (ALL 10 DOMAINS)                        */}
      {/* ========================================================================= */}
      <section id="all-domains-section" className="section-container" style={{ scrollMarginTop: '5rem' }}>
        <div className="section-header">
          <div style={{ marginBottom: '0.75rem' }}>
            <Badge variant="gold" size="sm">
              🌐 All 10 Domains
            </Badge>
          </div>
          <h2 className="section-title">Explore Any Domain You Like</h2>
          <p className="section-subtitle">
            You are completely free to choose any technology path below. Click any card to load its personalized learning path.
          </p>
        </div>

        <div className="all-domains-grid">
          {allDomains.map((domain) => {
            const isSelected = selectedDomainSlug === domain.domainSlug;
            const isTopMatch = domain.domainSlug === primary.domainSlug;

            return (
              <div
                key={domain.domainSlug}
                className={`domain-card ${isSelected ? 'domain-card-selected' : ''}`}
                onClick={() => handleChooseDomain(domain.domainSlug)}
              >
                <div className="domain-card-top">
                  <div className="domain-card-icon-wrap">{domain.icon}</div>
                  <div className="domain-card-match-badge">
                    {domain.matchPercentage}% Match
                  </div>
                </div>

                <div className="domain-card-body">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.25rem' }}>
                    <h3 className="domain-card-name">{domain.title}</h3>
                    {isTopMatch && <span style={{ fontSize: '0.9rem' }}>🥇</span>}
                  </div>
                  <p className="domain-card-desc">{domain.description}</p>
                </div>

                <div className="domain-card-footer">
                  <button
                    className={`domain-select-btn ${isSelected ? 'domain-select-btn-active' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleChooseDomain(domain.domainSlug);
                    }}
                    disabled={selectingDomain}
                  >
                    {isSelected ? 'Current Selected Path ✓' : 'Select & Start Path →'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Bottom Dashboard Backlink */}
      <div style={{ textAlign: 'center', marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
        <Link href="/dashboard" style={{ fontSize: '0.95rem', color: 'var(--accent-gold-deep)', fontWeight: 700, textDecoration: 'none' }}>
          ← Back to Learner Dashboard
        </Link>
      </div>

      {/* ========================================================================= */}
      {/* PREMIUM GOLD + WHITE SCOPED STYLES                                        */}
      {/* ========================================================================= */}
      <style jsx>{`
        .compass-page-container {
          padding-top: 2.5rem;
          padding-bottom: 6rem;
          max-width: 980px;
          animation: pageFadeIn 300ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes pageFadeIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .section-container {
          margin-bottom: 3.5rem;
        }

        .section-header {
          text-align: center;
          margin-bottom: 1.75rem;
        }

        .section-title {
          font-size: 1.65rem;
          font-weight: 850;
          color: var(--text-main);
          margin-bottom: 0.4rem;
          letter-spacing: -0.02em;
        }

        .section-subtitle {
          color: var(--text-muted);
          font-size: 0.95rem;
          max-width: 620px;
          margin: 0 auto;
          line-height: 1.55;
        }

        /* Hero */
        .hero-section {
          text-align: center;
          margin-bottom: 3.5rem;
        }

        .hero-title {
          font-size: 2.5rem;
          font-weight: 900;
          color: var(--text-main);
          line-height: 1.2;
          margin-bottom: 0.85rem;
          letter-spacing: -0.025em;
        }

        .compass-icon {
          display: inline-block;
          margin-right: 0.3rem;
        }

        .hero-subtitle {
          font-size: 1.1rem;
          color: var(--text-muted);
          max-width: 720px;
          margin: 0 auto 2.5rem auto;
          line-height: 1.65;
        }

        /* Tech Profile Card */
        .tech-profile-card {
          background: #FFFFFF;
          border: 1px solid var(--border-color);
          border-radius: 22px;
          padding: 2.5rem 2.25rem;
          box-shadow: 0 12px 32px -4px rgba(28, 28, 28, 0.06), 0 4px 16px -2px rgba(201, 162, 39, 0.05);
          position: relative;
          overflow: hidden;
        }

        .tech-profile-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #C9A227 0%, #E8D48A 50%, #9F7A16 100%);
        }

        .profile-label {
          font-size: 0.775rem;
          font-weight: 850;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--accent-gold-deep);
          display: block;
          margin-bottom: 0.35rem;
        }

        .profile-title {
          font-size: 2rem;
          font-weight: 900;
          color: var(--text-main);
          letter-spacing: -0.02em;
          margin-bottom: 0.5rem;
        }

        .profile-tagline {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--text-muted);
          margin-bottom: 1.25rem;
        }

        .profile-explanation {
          font-size: 1.05rem;
          color: var(--text-main);
          line-height: 1.65;
          max-width: 780px;
          margin: 0 auto 1.75rem auto;
        }

        .traits-grid {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 0.75rem;
        }

        .trait-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background-color: #FAF9F5;
          border: 1px solid var(--border-color);
          padding: 0.4rem 0.95rem;
          border-radius: var(--radius-full);
          font-size: 0.85rem;
          font-weight: 750;
          color: var(--text-main);
        }

        .trait-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background-color: var(--accent-gold);
        }

        /* Best Match Featured Card */
        .best-match-featured-card {
          position: relative;
          background: #FFFFFF;
          border: 1.5px solid rgba(201, 162, 39, 0.45);
          border-radius: 22px;
          padding: 2.25rem;
          box-shadow: 0 16px 36px -8px rgba(201, 162, 39, 0.16), 0 4px 12px rgba(28, 28, 28, 0.03);
          overflow: hidden;
        }

        .best-match-glow-fx {
          position: absolute;
          top: -90px;
          right: -90px;
          width: 260px;
          height: 260px;
          background: radial-gradient(circle, rgba(201, 162, 39, 0.12) 0%, transparent 70%);
          pointer-events: none;
        }

        .best-match-content {
          position: relative;
          z-index: 2;
        }

        .best-match-top-row {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1.25rem;
          margin-bottom: 1rem;
        }

        .best-match-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          background: linear-gradient(135deg, #C9A227 0%, #B88F1F 100%);
          color: #ffffff;
          padding: 0.25rem 0.75rem;
          border-radius: var(--radius-sm);
          font-size: 0.775rem;
          font-weight: 850;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          margin-bottom: 0.4rem;
          box-shadow: 0 2px 8px rgba(201, 162, 39, 0.25);
        }

        .best-match-headline {
          font-size: 1.05rem;
          font-weight: 800;
          color: var(--accent-gold-deep);
          margin-bottom: 0.4rem;
          letter-spacing: -0.01em;
        }

        .best-match-title {
          font-size: 1.85rem;
          font-weight: 900;
          color: var(--text-main);
          display: flex;
          align-items: center;
          gap: 0.65rem;
          margin: 0;
        }

        .domain-icon-large {
          font-size: 2.25rem;
        }

        .best-match-score-badge {
          display: flex;
          align-items: center;
          background: rgba(201, 162, 39, 0.08);
          border: 1px solid rgba(201, 162, 39, 0.3);
          padding: 0.6rem 1.25rem;
          border-radius: var(--radius-md);
        }

        .match-number {
          font-size: 2.25rem;
          font-weight: 950;
          color: var(--accent-gold-deep);
          line-height: 1;
        }

        .match-label {
          font-size: 0.75rem;
          font-weight: 800;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .best-match-desc {
          font-size: 1rem;
          color: var(--text-muted);
          line-height: 1.6;
          margin-bottom: 1.5rem;
          max-width: 800px;
        }

        .why-matches-box {
          background: rgba(201, 162, 39, 0.05);
          border: 1px solid rgba(201, 162, 39, 0.18);
          border-radius: var(--radius-md);
          padding: 1.25rem 1.5rem;
          margin-bottom: 1.75rem;
        }

        .why-matches-heading {
          font-size: 0.85rem;
          font-weight: 850;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--accent-gold-deep);
          margin-bottom: 0.75rem;
        }

        .bullets-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 0.65rem 1.5rem;
        }

        .bullet-item {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 0.925rem;
          color: var(--text-main);
          font-weight: 600;
        }

        .bullet-check {
          color: var(--accent-gold);
          font-weight: 900;
          font-size: 1rem;
        }

        .best-match-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1.25rem;
          border-top: 1px solid var(--border-color);
          padding-top: 1.25rem;
        }

        .path-preview-label {
          font-size: 0.775rem;
          font-weight: 750;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.04em;
          display: block;
          margin-bottom: 0.25rem;
        }

        .path-preview-steps {
          font-size: 0.95rem;
          font-weight: 800;
          color: var(--text-main);
        }

        .explore-featured-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          background: linear-gradient(135deg, #C9A227 0%, #B88F1F 100%);
          color: #ffffff;
          border: 1px solid rgba(201, 162, 39, 0.5);
          padding: 0.85rem 1.85rem;
          border-radius: var(--radius-md);
          font-size: 1rem;
          font-weight: 800;
          cursor: pointer;
          box-shadow: 0 4px 16px -2px rgba(201, 162, 39, 0.35);
          transition: transform var(--transition-fast), box-shadow var(--transition-fast);
        }

        .explore-featured-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px -2px rgba(201, 162, 39, 0.45);
        }

        .arrow-icon {
          transition: transform var(--transition-fast);
        }

        .explore-featured-btn:hover .arrow-icon {
          transform: translateX(4px);
        }

        /* Top 3 Cards Grid */
        .top3-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.25rem;
        }

        .top3-card {
          background: #FFFFFF;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          padding: 1.65rem;
          display: flex;
          flex-direction: column;
          justifyContent: space-between;
          cursor: pointer;
          box-shadow: var(--shadow-sm);
          transition: transform var(--transition-smooth), border-color var(--transition-smooth), box-shadow var(--transition-smooth);
        }

        .top3-card:hover {
          transform: translateY(-2px);
          border-color: var(--accent-gold-light);
          box-shadow: var(--shadow-md);
        }

        .top3-card-active {
          border-color: rgba(201, 162, 39, 0.45);
          background: linear-gradient(180deg, rgba(201, 162, 39, 0.04) 0%, #FFFFFF 100%);
        }

        .top3-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.25rem;
        }

        .top3-rank-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.8rem;
          font-weight: 800;
          background: #FAF9F5;
          border: 1px solid var(--border-color);
          padding: 0.3rem 0.65rem;
          border-radius: var(--radius-sm);
          color: var(--text-main);
        }

        .top3-identity {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.65rem;
        }

        .top3-icon {
          font-size: 2rem;
          width: 3.25rem;
          height: 3.25rem;
          border-radius: var(--radius-md);
          background: #FAF9F5;
          border: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .top3-name {
          font-size: 1.2rem;
          font-weight: 850;
          color: var(--text-main);
          line-height: 1.3;
        }

        .top3-description {
          font-size: 0.875rem;
          color: var(--text-muted);
          line-height: 1.55;
          margin-bottom: 1.25rem;
        }

        .top3-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.75rem;
          border-top: 1px solid var(--border-color);
          padding-top: 1rem;
        }

        .top3-path-text {
          font-size: 0.775rem;
          color: var(--text-muted);
          font-weight: 700;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          max-width: 170px;
        }

        .top3-action-btn {
          background: #FFFFFF;
          border: 1px solid var(--border-color);
          color: var(--accent-gold-deep);
          padding: 0.4rem 0.85rem;
          border-radius: var(--radius-sm);
          font-size: 0.85rem;
          font-weight: 800;
          cursor: pointer;
          transition: all var(--transition-fast);
          flex-shrink: 0;
        }

        .top3-action-btn:hover {
          background: var(--accent-gold);
          color: #ffffff;
          border-color: var(--accent-gold);
        }

        /* Comparison Rows */
        .comparison-container {
          background: #FFFFFF;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-xl);
          padding: 0.85rem;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          box-shadow: var(--shadow-sm);
        }

        .comparison-row {
          display: grid;
          grid-template-columns: 260px 1fr 130px;
          align-items: center;
          gap: 1.25rem;
          padding: 0.75rem 1rem;
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: background var(--transition-fast);
        }

        .comparison-row:hover {
          background-color: #FAF9F5;
        }

        .comparison-row-active {
          background-color: rgba(201, 162, 39, 0.08);
        }

        .comparison-domain-identity {
          display: flex;
          align-items: center;
          gap: 0.65rem;
        }

        .comparison-rank {
          font-size: 0.8rem;
          font-weight: 800;
          color: var(--text-muted);
          width: 26px;
          flex-shrink: 0;
        }

        .comparison-icon {
          font-size: 1.35rem;
          flex-shrink: 0;
        }

        .comparison-title {
          font-size: 0.95rem;
          font-weight: 800;
          color: var(--text-main);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .comparison-lead-pill {
          font-size: 0.7rem;
          font-weight: 850;
          background: var(--accent-gold);
          color: #ffffff;
          padding: 0.15rem 0.5rem;
          border-radius: var(--radius-sm);
          text-transform: uppercase;
        }

        .comparison-bar-track {
          width: 100%;
          height: 8px;
          background-color: var(--border-color);
          border-radius: var(--radius-full);
          overflow: hidden;
        }

        .comparison-bar-fill {
          height: 100%;
          border-radius: var(--radius-full);
          background: linear-gradient(90deg, #C9A227 0%, #E8D48A 100%);
          transition: width 800ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        .comparison-score-wrap {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 0.85rem;
        }

        .comparison-pct {
          font-size: 0.95rem;
          font-weight: 850;
          color: var(--text-main);
          min-width: 38px;
          text-align: right;
        }

        .comparison-btn {
          background: transparent;
          border: 1px solid var(--border-color);
          color: var(--accent-gold-deep);
          font-size: 0.775rem;
          font-weight: 750;
          padding: 0.25rem 0.65rem;
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .comparison-row:hover .comparison-btn {
          border-color: var(--accent-gold);
          background: var(--accent-gold);
          color: #ffffff;
        }

        /* Insights */
        .insights-card {
          background: #FFFFFF;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-xl);
          padding: 2.25rem;
          box-shadow: var(--shadow-sm);
        }

        .insights-header {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          margin-bottom: 1.75rem;
        }

        .insights-icon {
          font-size: 2rem;
        }

        .insights-title {
          font-size: 1.35rem;
          font-weight: 850;
          color: var(--text-main);
          margin-bottom: 0.2rem;
        }

        .insights-subtitle {
          font-size: 0.9rem;
          color: var(--text-muted);
        }

        .insights-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.25rem;
        }

        .insight-item {
          display: flex;
          gap: 0.85rem;
          background: #FAF9F5;
          border: 1px solid var(--border-color);
          padding: 1.25rem;
          border-radius: var(--radius-md);
        }

        .insight-glyph {
          font-size: 1.5rem;
          flex-shrink: 0;
        }

        .insight-point-title {
          font-size: 0.95rem;
          font-weight: 800;
          color: var(--text-main);
          margin-bottom: 0.25rem;
        }

        .insight-point-desc {
          font-size: 0.85rem;
          color: var(--text-muted);
          line-height: 1.5;
          margin: 0;
        }

        /* Disclaimer */
        .disclaimer-card {
          display: flex;
          gap: 1.1rem;
          align-items: flex-start;
          background: rgba(201, 162, 39, 0.05);
          border: 1px solid rgba(201, 162, 39, 0.25);
          border-left: 5px solid var(--accent-gold);
          border-radius: var(--radius-lg);
          padding: 1.65rem 1.85rem;
        }

        .disclaimer-bulb {
          font-size: 1.85rem;
          flex-shrink: 0;
        }

        .disclaimer-title {
          font-size: 1.05rem;
          font-weight: 850;
          color: var(--text-main);
          margin-bottom: 0.35rem;
        }

        .disclaimer-body {
          font-size: 0.925rem;
          color: var(--text-muted);
          line-height: 1.6;
          margin: 0;
        }

        /* CTA Dock */
        .cta-dock-card {
          background: #FFFFFF;
          border: 1px solid var(--border-color);
          border-radius: 22px;
          padding: 2.75rem 2rem;
          text-align: center;
          box-shadow: var(--shadow-md);
        }

        .cta-dock-title {
          font-size: 1.75rem;
          font-weight: 900;
          color: var(--text-main);
          margin-bottom: 0.4rem;
        }

        .cta-dock-subtitle {
          font-size: 0.975rem;
          color: var(--text-muted);
          margin-bottom: 1.75rem;
        }

        .cta-dock-buttons {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.85rem;
        }

        .cta-primary-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: linear-gradient(135deg, #C9A227 0%, #B88F1F 100%);
          color: #ffffff;
          border: 1px solid rgba(201, 162, 39, 0.5);
          padding: 0.85rem 1.85rem;
          border-radius: var(--radius-md);
          font-size: 0.975rem;
          font-weight: 800;
          cursor: pointer;
          box-shadow: 0 4px 16px -2px rgba(201, 162, 39, 0.35);
          transition: transform var(--transition-fast);
        }

        .cta-primary-btn:hover {
          transform: translateY(-2px);
        }

        .cta-secondary-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: #FFFFFF;
          border: 1px solid var(--border-color);
          color: var(--accent-gold-deep);
          padding: 0.85rem 1.5rem;
          border-radius: var(--radius-md);
          font-size: 0.95rem;
          font-weight: 800;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .cta-secondary-btn:hover {
          border-color: var(--accent-gold);
          background: rgba(201, 162, 39, 0.06);
        }

        .cta-ghost-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: transparent;
          border: 1px solid var(--border-color);
          color: var(--text-muted);
          padding: 0.85rem 1.35rem;
          border-radius: var(--radius-md);
          font-size: 0.925rem;
          font-weight: 750;
          cursor: pointer;
          text-decoration: none;
          transition: all var(--transition-fast);
        }

        .cta-ghost-btn:hover {
          color: var(--text-main);
          border-color: var(--accent-gold);
        }

        /* All Domains Grid */
        .all-domains-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.25rem;
        }

        .domain-card {
          background: #FFFFFF;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          padding: 1.65rem;
          display: flex;
          flex-direction: column;
          justifyContent: space-between;
          cursor: pointer;
          box-shadow: var(--shadow-sm);
          transition: transform var(--transition-smooth), border-color var(--transition-smooth), box-shadow var(--transition-smooth);
        }

        .domain-card:hover {
          transform: translateY(-2px);
          border-color: var(--accent-gold-light);
          box-shadow: var(--shadow-md);
        }

        .domain-card-selected {
          border-color: var(--accent-gold);
          background: rgba(201, 162, 39, 0.05);
        }

        .domain-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.85rem;
        }

        .domain-card-icon-wrap {
          font-size: 1.85rem;
          width: 3.25rem;
          height: 3.25rem;
          border-radius: var(--radius-md);
          background: #FAF9F5;
          border: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .domain-card-match-badge {
          font-size: 0.8rem;
          font-weight: 800;
          background: rgba(201, 162, 39, 0.1);
          color: var(--accent-gold-deep);
          padding: 0.25rem 0.65rem;
          border-radius: var(--radius-full);
          border: 1px solid rgba(201, 162, 39, 0.25);
        }

        .domain-card-name {
          font-size: 1.1rem;
          font-weight: 850;
          color: var(--text-main);
          margin: 0;
        }

        .domain-card-desc {
          font-size: 0.85rem;
          color: var(--text-muted);
          line-height: 1.5;
          margin: 0;
        }

        .domain-card-footer {
          margin-top: 1.25rem;
          border-top: 1px solid var(--border-color);
          padding-top: 0.85rem;
        }

        .domain-select-btn {
          width: 100%;
          background: #FAF9F5;
          border: 1px solid var(--border-color);
          color: var(--accent-gold-deep);
          padding: 0.6rem 1rem;
          border-radius: var(--radius-sm);
          font-size: 0.85rem;
          font-weight: 800;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .domain-card:hover .domain-select-btn {
          background: var(--accent-gold);
          color: #ffffff;
          border-color: var(--accent-gold);
        }

        .domain-select-btn-active {
          background: var(--accent-gold) !important;
          color: #ffffff !important;
          border-color: var(--accent-gold) !important;
        }

        /* Mobile Responsive Adjustments */
        @media (max-width: 768px) {
          .hero-title {
            font-size: 2rem;
          }

          .profile-title {
            font-size: 1.6rem;
          }

          .best-match-featured-card {
            padding: 1.5rem;
          }

          .best-match-title {
            font-size: 1.45rem;
          }

          .comparison-row {
            grid-template-columns: 1fr;
            gap: 0.65rem;
          }

          .comparison-score-wrap {
            justify-content: space-between;
          }

          .cta-dock-buttons {
            flex-direction: column;
            width: 100%;
          }

          .cta-primary-btn,
          .cta-secondary-btn,
          .cta-ghost-btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}

export default function CareerCompassResultPage() {
  return (
    <Suspense fallback={<CompassResultSkeleton />}>
      <ResultContent />
    </Suspense>
  );
}
