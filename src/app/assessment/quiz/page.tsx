'use client';

import React, { useState, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { CAREER_COMPASS_QUESTIONS } from '@/content/pre-course-data';
import { submitPreCourseAssessmentAction } from '@/app/actions/preCourse';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { Badge } from '@/components/Badge';
import { QuizCardSkeleton } from '@/components/Skeleton';

function QuizContent() {
  const router = useRouter();
  const questions = CAREER_COMPASS_QUESTIONS;

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showExitModal, setShowExitModal] = useState<boolean>(false);
  const [animState, setAnimState] = useState<'idle' | 'out' | 'in'>('idle');

  if (!questions || questions.length === 0) {
    return <QuizCardSkeleton />;
  }

  const currentQ = questions[currentIndex];
  const totalQuestions = questions.length;
  const progressPercent = Math.round(((currentIndex + 1) / totalQuestions) * 100);
  const selectedOption = answers[currentQ.id];

  const handleSelectOption = (optionIndex: number) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optionIndex,
    }));
  };

  const goToQuestion = (targetIndex: number) => {
    if (targetIndex === currentIndex || targetIndex < 0 || targetIndex >= totalQuestions) return;
    setAnimState('out');
    setTimeout(() => {
      setCurrentIndex(targetIndex);
      setAnimState('in');
      setTimeout(() => {
        setAnimState('idle');
      }, 140);
    }, 100);
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      goToQuestion(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      goToQuestion(currentIndex - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await submitPreCourseAssessmentAction(answers);

      if (!res.success || !res.result) {
        setErrorMessage(res.error || 'Failed to calculate results. Please try again.');
        setIsSubmitting(false);
        return;
      }

      // Store in localStorage as fallback
      try {
        localStorage.setItem('learntech_latest_career_compass_result', JSON.stringify(res.result));
        if (res.learningPath) {
          localStorage.setItem('learntech_latest_learning_path', JSON.stringify(res.learningPath));
        }
      } catch (err) {
        console.warn('LocalStorage save error', err);
      }

      router.push('/assessment/result');
    } catch (err) {
      console.error('Career Compass submission error', err);
      setErrorMessage('An unexpected error occurred while saving your results.');
      setIsSubmitting(false);
    }
  };

  if (isSubmitting) {
    return (
      <div className="site-container" style={{ padding: '6rem 1.5rem', maxWidth: '620px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{ fontSize: '3.5rem', marginBottom: '1.25rem', animation: 'robotFloat 2.5s infinite ease-in-out' }}>
          🧭
        </div>
        <Badge variant="gold" size="md" style={{ marginBottom: '1rem' }}>
          Personalized Career Synthesis
        </Badge>
        <h2 style={{ fontSize: '1.85rem', fontWeight: 900, color: 'var(--text-main)', marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>
          Analyzing Your Tech Profile...
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '2.5rem' }}>
          Synthesizing your cognitive and domain answers across 10 technology disciplines to build your optimal career recommendation.
        </p>

        <div style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-xl)', padding: '1.75rem', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '1rem', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.925rem', color: 'var(--text-main)' }}>
            <span style={{ color: '#10b981', fontWeight: 800 }}>✓</span> Evaluating cognitive problem-solving orientation
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.925rem', color: 'var(--text-main)' }}>
            <span style={{ color: '#10b981', fontWeight: 800 }}>✓</span> Calculating domain compatibility across 10 disciplines
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.925rem', color: 'var(--accent-gold-deep)', fontWeight: 750 }}>
            <span>⏳</span> Formulating tailored skill gaps & learning roadmap...
          </div>
        </div>
      </div>
    );
  }

  const remainingQuestions = totalQuestions - (currentIndex + 1);
  const estRemainingMinutes = Math.max(1, Math.ceil(remainingQuestions * 0.35));

  return (
    <div className="site-container" style={{ paddingTop: '2.5rem', paddingBottom: '5rem', maxWidth: '820px' }}>
      {/* Header Info */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1.5rem',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div
            style={{
              fontSize: '1.65rem',
              width: '3.2rem',
              height: '3.2rem',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-surface-alt)',
              border: '1px solid var(--border-color)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            🧭
          </div>
          <div>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 850, color: 'var(--text-main)', margin: 0 }}>
              Career Compass Discovery
            </h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <span>Question {currentIndex + 1} of {totalQuestions}</span>
              <span>•</span>
              <span style={{ color: 'var(--text-main)', fontWeight: 700 }}>⏱️ ~{estRemainingMinutes} min left</span>
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowExitModal(true)}
          style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-color)',
            color: 'var(--text-muted)',
            padding: '0.45rem 0.9rem',
            borderRadius: 'var(--radius-md)',
            fontSize: '0.85rem',
            cursor: 'pointer',
            fontWeight: 600,
            transition: 'all var(--transition-fast)',
          }}
        >
          Exit ✕
        </button>
      </div>

      {/* Beige & Dark Grey Progress Bar */}
      <div
        style={{
          width: '100%',
          height: '8px',
          backgroundColor: 'var(--border-color)',
          borderRadius: 'var(--radius-full)',
          overflow: 'hidden',
          marginBottom: '1.75rem',
        }}
      >
        <div
          style={{
            width: `${progressPercent}%`,
            height: '100%',
            background: 'linear-gradient(90deg, var(--accent-primary) 0%, var(--accent-beige-deep) 100%)',
            borderRadius: 'var(--radius-full)',
            transition: 'width 250ms ease-out',
          }}
        />
      </div>

      {/* Encouragement Note */}
      <div
        style={{
          backgroundColor: 'var(--bg-surface-alt)',
          border: '1px solid var(--border-color)',
          borderLeft: '4px solid var(--accent-primary)',
          padding: '0.9rem 1.25rem',
          borderRadius: 'var(--radius-md)',
          marginBottom: '1.75rem',
          fontSize: '0.875rem',
          color: 'var(--text-main)',
        }}
      >
        💡 <strong>Remember:</strong> This isn&apos;t a pass/fail exam. It helps First Move(11~18) understand your interests and preferences to recommend the tech domains that match you best.
      </div>

      {/* Question Card with Subtle Swapping Animation */}
      <Card
        key={currentQ.id}
        className={
          animState === 'out'
            ? 'question-animating-out'
            : animState === 'in'
            ? 'question-animating-in'
            : ''
        }
        style={{
          padding: '2.5rem 2.25rem',
          marginBottom: '1.75rem',
          backgroundColor: 'var(--bg-surface)',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--border-color)',
          boxShadow: 'var(--shadow-md)',
          transition: 'border-color var(--transition-fast)',
        }}
      >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', gap: '0.5rem', flexWrap: 'wrap' }}>
            <Badge variant="gold" size="sm">
              {currentQ.categoryIcon} {currentQ.categoryLabel}
            </Badge>
            <span style={{ fontSize: '0.825rem', color: 'var(--text-muted)', fontWeight: 700 }}>
              Dimension {currentIndex + 1} of {totalQuestions}
            </span>
          </div>

          <h3
            style={{
              fontSize: '1.3rem',
              fontWeight: 850,
              color: 'var(--text-main)',
              marginBottom: '1.85rem',
              lineHeight: 1.5,
              letterSpacing: '-0.015em',
            }}
          >
            {currentQ.question}
          </h3>

          {/* Options List with Micro-Interactions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
            {currentQ.options.map((optionText, optIdx) => {
              const isSelected = selectedOption === optIdx;
              const optionLetters = ['A', 'B', 'C', 'D'];
              return (
                <button
                  key={optIdx}
                  onClick={() => handleSelectOption(optIdx)}
                  className="btn-interactive"
                  style={{
                    textAlign: 'left',
                    padding: '1.15rem 1.4rem',
                    borderRadius: 'var(--radius-lg)',
                    border: isSelected ? '2px solid var(--accent-gold)' : '1px solid var(--border-color)',
                    backgroundColor: isSelected ? 'rgba(201, 162, 39, 0.08)' : 'var(--bg-surface)',
                    color: 'var(--text-main)',
                    fontWeight: isSelected ? 800 : 550,
                    fontSize: '0.95rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    boxShadow: isSelected ? '0 4px 14px -2px rgba(201, 162, 39, 0.22)' : 'var(--shadow-sm)',
                    transform: isSelected ? 'translateY(-1px)' : 'none',
                    transition: 'border-color var(--transition-fast), background-color var(--transition-fast), box-shadow var(--transition-fast), transform var(--transition-fast)',
                  }}
                >
                  <span
                    style={{
                      width: '2.2rem',
                      height: '2.2rem',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: isSelected ? 'linear-gradient(135deg, #C9A227 0%, #9F7A16 100%)' : 'var(--bg-muted)',
                      color: isSelected ? '#FFFFFF' : 'var(--text-muted)',
                      fontWeight: 850,
                      fontSize: '0.875rem',
                      flexShrink: 0,
                      boxShadow: isSelected ? '0 2px 6px rgba(201, 162, 39, 0.3)' : 'none',
                      transition: 'background var(--transition-fast), color var(--transition-fast)',
                    }}
                  >
                    {optionLetters[optIdx]}
                  </span>
                  <span style={{ flex: 1, lineHeight: 1.5 }}>{optionText}</span>

                  {/* Selected Indicator Pill */}
                  <span
                    style={{
                      width: '22px',
                      height: '22px',
                      borderRadius: '50%',
                      border: isSelected ? '2px solid var(--accent-gold)' : '2px solid var(--border-color)',
                      backgroundColor: isSelected ? 'var(--accent-gold)' : 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#FFFFFF',
                      fontSize: '0.75rem',
                      fontWeight: 900,
                      flexShrink: 0,
                      transition: 'all var(--transition-fast)',
                    }}
                  >
                    {isSelected ? '✓' : ''}
                  </span>
                </button>
              );
            })}
          </div>
        </Card>

      {errorMessage && (
        <div
          style={{
            backgroundColor: 'rgba(239, 68, 68, 0.08)',
            border: '1px solid rgba(239, 68, 68, 0.25)',
            color: '#dc2626',
            padding: '1rem',
            borderRadius: 'var(--radius-md)',
            marginBottom: '1.5rem',
            fontSize: '0.9rem',
          }}
        >
          {errorMessage}
        </div>
      )}

      {/* Footer Controls */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
        <Button
          variant="secondary"
          onClick={handlePrev}
          disabled={currentIndex === 0 || isSubmitting}
          style={{ fontSize: '0.9rem' }}
        >
          ← Previous
        </Button>

        {currentIndex === totalQuestions - 1 ? (
          <Button
            variant="primary"
            onClick={handleSubmit}
            isLoading={isSubmitting}
            disabled={selectedOption === undefined}
            style={{ fontSize: '0.95rem', padding: '0.75rem 1.85rem', fontWeight: 800 }}
          >
            Complete & View Career Compass 🎉
          </Button>
        ) : (
          <Button
            variant="primary"
            onClick={handleNext}
            disabled={isSubmitting || selectedOption === undefined}
            style={{ fontSize: '0.9rem' }}
          >
            Next Question →
          </Button>
        )}
      </div>

      {/* Exit Modal */}
      {showExitModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(28, 28, 28, 0.5)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
            padding: '1rem',
          }}
        >
          <Card style={{ maxWidth: '440px', width: '100%', padding: '2rem', textAlign: 'center', borderRadius: 'var(--radius-xl)' }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 850, color: 'var(--text-main)', marginBottom: '0.75rem' }}>
              Exit Career Compass Test?
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', marginBottom: '1.75rem', lineHeight: 1.55 }}>
              Are you sure you want to exit? You can return anytime to discover your top technology domain recommendations.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
              <Button variant="secondary" onClick={() => setShowExitModal(false)}>
                Continue Test
              </Button>
              <Button variant="primary" onClick={() => router.push('/dashboard')}>
                Exit to Dashboard
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

export default function CareerCompassQuizPage() {
  return (
    <Suspense fallback={<QuizCardSkeleton />}>
      <QuizContent />
    </Suspense>
  );
}
