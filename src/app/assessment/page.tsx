'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { Badge } from '@/components/Badge';

export default function CareerCompassLandingPage() {
  const router = useRouter();

  useEffect(() => {
    document.title = 'Career Compass Discovery | First Move (11–18)';
  }, []);

  const handleStartDiscovery = () => {
    router.push('/assessment/quiz');
  };

  const pillars = [
    {
      icon: '💡',
      title: 'Interests',
      description: 'What types of technology activities attract and excite you most?',
      gradient: 'linear-gradient(135deg, rgba(201, 162, 39, 0.12), rgba(232, 212, 138, 0.05))',
    },
    {
      icon: '🧠',
      title: 'Problem Solving',
      description: 'How do you approach logical, analytical, and technical challenges?',
      gradient: 'linear-gradient(135deg, rgba(201, 162, 39, 0.12), rgba(232, 212, 138, 0.05))',
    },
    {
      icon: '🎨',
      title: 'Creativity',
      description: 'Do you prefer designing visual experiences or architecting logic behind the scenes?',
      gradient: 'linear-gradient(135deg, rgba(201, 162, 39, 0.12), rgba(232, 212, 138, 0.05))',
    },
    {
      icon: '🔎',
      title: 'Curiosity',
      description: 'What kinds of real-world technology problems and questions fascinate you?',
      gradient: 'linear-gradient(135deg, rgba(201, 162, 39, 0.12), rgba(232, 212, 138, 0.05))',
    },
    {
      icon: '📚',
      title: 'Basic Knowledge',
      description: 'What fundamental concepts and tools are you already familiar with?',
      gradient: 'linear-gradient(135deg, rgba(201, 162, 39, 0.12), rgba(232, 212, 138, 0.05))',
    },
    {
      icon: '⚙️',
      title: 'Working Style',
      description: 'What type of daily technical workflow and team environment do you prefer?',
      gradient: 'linear-gradient(135deg, rgba(201, 162, 39, 0.12), rgba(232, 212, 138, 0.05))',
    },
  ];

  return (
    <div className="site-container" style={{ maxWidth: '1180px' }}>
      {/* Header Banner */}
      <div style={{ textAlign: 'center', maxWidth: '920px', margin: '0 auto clamp(2rem, 4vw, 3.5rem) auto' }}>
        <div style={{ marginBottom: '1.25rem' }}>
          <Badge variant="gold" size="md">
            <span>🧭</span> First Move (11–18) Career Compass
          </Badge>
        </div>

        <h1
          style={{
            fontSize: 'clamp(2rem, 3.5vw + 0.5rem, 3rem)',
            fontWeight: 900,
            color: 'var(--text-main)',
            marginBottom: '1.15rem',
            lineHeight: 1.2,
            letterSpacing: '-0.025em',
          }}
        >
          Discover Your Best Tech Domain
        </h1>

        <p
          style={{
            fontSize: 'clamp(1.05rem, 0.4vw + 0.95rem, 1.2rem)',
            color: 'var(--text-muted)',
            lineHeight: 1.7,
            maxWidth: '780px',
            margin: '0 auto 2.25rem auto',
          }}
        >
          Not sure whether Python, Java, Web Development, AI, Cybersecurity, or another technology is right for you? Take this short discovery test and we&apos;ll help you find the areas that match your interests and strengths.
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-main)', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', padding: '0.4rem 0.95rem', borderRadius: 'var(--radius-full)' }}>
            <span>⏱️</span> Takes ~3–5 Minutes
          </div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-main)', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', padding: '0.4rem 0.95rem', borderRadius: 'var(--radius-full)' }}>
            <span>🧠</span> 12 Guided Scenarios
          </div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-main)', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', padding: '0.4rem 0.95rem', borderRadius: 'var(--radius-full)' }}>
            <span>🌐</span> 10 Tech Domains Evaluated
          </div>
        </div>

        <Button
          variant="primary"
          onClick={handleStartDiscovery}
          size="lg"
          style={{
            fontSize: '1.1rem',
            padding: '0.95rem 2.75rem',
            fontWeight: 800,
            boxShadow: '0 6px 20px -2px rgba(201, 162, 39, 0.35)',
          }}
        >
          Start Career Compass Discovery →
        </Button>
      </div>

      {/* 3-Step Guided Journey Preview */}
      <div style={{ marginBottom: '3.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <span style={{ fontSize: '0.875rem', fontWeight: 800, color: 'var(--accent-gold-deep)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            How it works
          </span>
          <h2 style={{ fontSize: 'clamp(1.35rem, 2vw + 0.4rem, 1.75rem)', fontWeight: 850, color: 'var(--text-main)', marginTop: '0.25rem' }}>
            3 Steps to Your Tech Direction
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(240px, 20vw, 320px), 1fr))', gap: '1.25rem' }}>
          <Card hoverable={false} style={{ padding: '1.65rem', borderTop: '3px solid var(--accent-gold)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.6rem' }}>
              <span style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'linear-gradient(135deg, #C9A227, #9F7A16)', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', fontWeight: 850 }}>1</span>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>Answer Scenarios</h3>
            </div>
            <p style={{ fontSize: '0.925rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
              Respond to 12 intuitive scenarios exploring your curiosity, problem-solving habits, and preferred workflows.
            </p>
          </Card>

          <Card hoverable={false} style={{ padding: '1.65rem', borderTop: '3px solid var(--accent-gold)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.6rem' }}>
              <span style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'linear-gradient(135deg, #C9A227, #9F7A16)', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', fontWeight: 850 }}>2</span>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>Profile Synthesis</h3>
            </div>
            <p style={{ fontSize: '0.925rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
              Our engine analyzes your answers across 10 technology disciplines and identifies your unique engineering archetype.
            </p>
          </Card>

          <Card hoverable={false} style={{ padding: '1.65rem', borderTop: '3px solid var(--accent-gold)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.6rem' }}>
              <span style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'linear-gradient(135deg, #C9A227, #9F7A16)', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', fontWeight: 850 }}>3</span>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>Action Pathway</h3>
            </div>
            <p style={{ fontSize: '0.925rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
              Receive your #1 career match, skill gaps to bridge, and an exact course sequence to start learning immediately.
            </p>
          </Card>
        </div>
      </div>

      {/* What this test looks at */}
      <div style={{ marginBottom: '3.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 850, color: 'var(--text-main)', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
            What this discovery test evaluates
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Our Career Compass analyzes 6 key dimensions to find your ideal technology direction.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.25rem',
          }}
        >
          {pillars.map((pillar, idx) => (
            <Card
              key={idx}
              hoverable
              style={{
                padding: '1.65rem',
                display: 'flex',
                gap: '1.1rem',
                alignItems: 'flex-start',
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-lg)',
              }}
            >
              <div
                style={{
                  fontSize: '1.65rem',
                  width: '3.25rem',
                  height: '3.25rem',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: pillar.gradient,
                  border: '1px solid rgba(201, 162, 39, 0.2)',
                  flexShrink: 0,
                }}
              >
                {pillar.icon}
              </div>
              <div>
                <h3
                  style={{
                    fontSize: '1.1rem',
                    fontWeight: 800,
                    color: 'var(--text-main)',
                    marginBottom: '0.35rem',
                  }}
                >
                  {pillar.title}
                </h3>
                <p
                  style={{
                    fontSize: '0.875rem',
                    color: 'var(--text-muted)',
                    lineHeight: 1.55,
                    margin: 0,
                  }}
                >
                  {pillar.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Bottom Callout Card */}
      <Card
        hoverable={false}
        style={{
          padding: '2.5rem 2rem',
          textAlign: 'center',
          background: 'linear-gradient(135deg, rgba(201, 162, 39, 0.06) 0%, var(--bg-surface) 100%)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--shadow-md)',
        }}
      >
        <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🧭</div>
        <h2 style={{ fontSize: '1.45rem', fontWeight: 850, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
          Ready to find your tech direction?
        </h2>
        <p
          style={{
            color: 'var(--text-muted)',
            fontSize: '0.975rem',
            maxWidth: '580px',
            margin: '0 auto 1.75rem auto',
            lineHeight: 1.6,
          }}
        >
          Takes less than 5 minutes. No prior coding experience required. You will receive personalized domain compatibility recommendations instantly.
        </p>
        <Button
          variant="primary"
          onClick={handleStartDiscovery}
          size="lg"
          style={{
            padding: '0.85rem 2.25rem',
            fontSize: '1rem',
            fontWeight: 800,
          }}
        >
          Start Career Compass Discovery →
        </Button>
      </Card>
    </div>
  );
}
