'use client';

import React, { useState } from 'react';
import { Path, Module, Lesson } from '@/types/content';
import { usePythonRunner } from '@/hooks/usePythonRunner';
import { useProgress } from '@/hooks/useProgress';
import { LessonNavigation } from './LessonNavigation';
import { LessonContentPanel } from './LessonContentPanel';
import { CodeEditor } from '@/components/Editor/CodeEditor';
import { ConsolePanel } from './ConsolePanel';
import { Button } from '@/components/Button';
import { ProgressSyncIndicator } from './ProgressSyncIndicator';
import { ValidationResult } from '@/types/runner';

interface LessonWorkbenchProps {
  path: Path;
  module: Module;
  lesson: Lesson;
  prevLesson?: Lesson;
  nextLesson?: Lesson;
  lessonIndex: number;
  totalLessons: number;
}

import { LessonProgressBar } from './LessonProgressBar';
import { isLessonFullyCompleted } from '@/lib/progressUtils';
import Link from 'next/link';
import { useAITutorBridge } from '@/components/AITutor/useAITutorBridge';

export function LessonWorkbench({
  path,
  module,
  lesson,
  prevLesson,
  nextLesson,
  lessonIndex,
  totalLessons,
}: LessonWorkbenchProps) {
  const { isReady, isRunning, logs, clearLogs, runCode, validateExercise } = usePythonRunner();
  const { progress, isSyncing, syncSource, saveProgressState, submitExercise } = useProgress(path.slug, lesson.slug);

  // Tab & UI States
  const [activeTab, setActiveTab] = useState<'concepts' | 'examples' | 'engineering' | 'quiz' | 'exercise'>('concepts');
  const [quizScore, setQuizScore] = useState<{ total: number; correct: number; passed: boolean } | null>(null);

  // Editor & Validation States
  const [userCode, setUserCode] = useState<string | null>(null);
  const code = userCode ?? progress.last_code_submitted ?? lesson.exercise?.initialCode ?? 'print("Hello, Python!")\n';
  const setCode = (val: string) => setUserCode(val);
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);

  // Sync state with AI Tutor Context
  useAITutorBridge({
    pathSlug: path.slug,
    lessonSlug: lesson.slug,
    code,
    logs: logs.map((l) => l.text).join('\n'),
    title: `${path.title} • ${lesson.title}`,
  });

  const exercisePassed = progress.exercise_completed || false;
  const conceptsCompleted = progress.concepts_completed || false;

  const isFullyCompleted = isLessonFullyCompleted(lesson, progress);

  const handleRunCode = async () => {
    clearLogs();
    await runCode(code);
  };

  const handleValidateExercise = async () => {
    if (!lesson.exercise) {
      await handleRunCode();
      return;
    }
    clearLogs();
    const result = await validateExercise(code, lesson.exercise);
    setValidationResult(result);

    await submitExercise(
      lesson.exercise.id,
      code,
      result.success,
      result.results,
      result.executionTimeMs
    );
  };

  const handleQuizSubmitted = (score: { total: number; correct: number; passed: boolean }) => {
    setQuizScore(score);
    saveProgressState({
      quiz_completed: true,
      quiz_score: score.correct,
      quiz_total: score.total,
    });
  };

  const handleToggleConceptsCompleted = () => {
    saveProgressState({
      concepts_completed: !conceptsCompleted,
    });
  };

  const handleResetCode = () => {
    if (lesson.exercise?.initialCode) {
      setCode(lesson.exercise.initialCode);
    } else {
      setCode('print("Hello, Python!")\n');
    }
  };

  return (
    <div className="lesson-workbench" style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 64px)', minHeight: 0, overflow: 'hidden' }}>
      {/* Top Lesson Navigation */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'var(--bg-surface)', borderBottom: '1px solid var(--border-color)', paddingRight: '1rem' }}>
        <div style={{ flex: 1 }}>
          <LessonNavigation
            path={path}
            module={module}
            lesson={lesson}
            prevLesson={prevLesson}
            nextLesson={nextLesson}
            lessonIndex={lessonIndex}
            totalLessons={totalLessons}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <ProgressSyncIndicator isSyncing={isSyncing} syncSource={syncSource} />
        </div>
      </div>

      {/* Lesson Progress Step Indicator Bar */}
      <LessonProgressBar
        lesson={lesson}
        progress={progress}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Phase 4 Completion Banner with Smooth Slide-down Transition */}
      {isFullyCompleted && (
        <div
          className="animate-slide-down"
          style={{
            backgroundColor: 'rgba(16, 185, 129, 0.15)',
            borderBottom: '1px solid #10b981',
            color: '#10b981',
            padding: '0.75rem 1.25rem',
            fontSize: '0.875rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flex: '0 0 auto',
            gap: '1rem',
            boxShadow: '0 2px 10px rgba(16, 185, 129, 0.1)',
          }}
        >
          <div>
            <strong>🎉 Lesson Complete — {lesson.title}</strong>
            <span style={{ fontSize: '0.8rem', opacity: 0.9, marginLeft: '0.5rem' }}>
              You completed all required activities.
            </span>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <Link
              href={`/paths/${path.slug}`}
              className="btn-interactive"
              style={{ color: 'var(--text-main)', fontSize: '0.825rem', textDecoration: 'underline' }}
            >
              Back to {path.title}
            </Link>
            {nextLesson && (
              <Link
                href={`/paths/${path.slug}/lessons/${nextLesson.slug}`}
                className="btn-interactive"
                style={{
                  backgroundColor: '#10b981',
                  color: '#ffffff',
                  padding: '0.45rem 0.95rem',
                  borderRadius: 'var(--radius-md)',
                  textDecoration: 'none',
                  fontWeight: 750,
                  fontSize: '0.85rem',
                  boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                }}
              >
                <span>Continue to Next Lesson</span>
                <span>→</span>
              </Link>
            )}
          </div>
        </div>
      )}

      {/* Main Single-Focus Content Body */}
      {activeTab !== 'exercise' ? (
        <div
          style={{
            flex: '1 1 auto',
            minHeight: 0,
            overflowY: 'auto',
            padding: '1.25rem 1rem',
            backgroundColor: 'var(--bg-app)',
          }}
        >
          <div style={{ maxWidth: '960px', margin: '0 auto' }}>
            <LessonContentPanel
              lesson={lesson}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              conceptsCompleted={conceptsCompleted}
              onToggleConceptsCompleted={handleToggleConceptsCompleted}
              quizScore={quizScore}
              onQuizSubmitted={handleQuizSubmitted}
              exercisePassed={exercisePassed}
            />

            {/* Quick Practice Banner at bottom of reading sections */}
            {lesson.exercise && (
              <div
                style={{
                  marginTop: '1.5rem',
                  padding: '1rem 1.25rem',
                  backgroundColor: 'var(--bg-surface)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1rem',
                  flexWrap: 'wrap',
                }}
              >
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-main)' }}>
                    💻 Ready to test your knowledge with code?
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    Solve the hands-on coding exercise in the interactive code editor.
                  </div>
                </div>
                <Button variant="primary" size="sm" onClick={() => setActiveTab('exercise')}>
                  Open Practice Workbench ⚡
                </Button>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* PRACTICE EXERCISE WORKBENCH VIEW */
        <div
          className="workbench-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(300px, 38%) minmax(360px, 62%)',
            flex: '1 1 auto',
            minHeight: 0,
            gap: '0.75rem',
            padding: '0.75rem',
            overflow: 'hidden',
            backgroundColor: 'var(--bg-app)',
          }}
        >
          {/* Left Column: Exercise Instructions */}
          <div style={{ height: '100%', minHeight: 0, overflow: 'hidden' }}>
            <LessonContentPanel
              lesson={lesson}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              conceptsCompleted={conceptsCompleted}
              onToggleConceptsCompleted={handleToggleConceptsCompleted}
              quizScore={quizScore}
              onQuizSubmitted={handleQuizSubmitted}
              exercisePassed={exercisePassed}
            />
          </div>

          {/* Right Column: Code Editor & Collapsible Terminal */}
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0, gap: '0.75rem' }}>
            {/* Action Toolbar */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.5rem 0.75rem',
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                flex: '0 0 auto',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)' }}>
                  {path.slug === 'python'
                    ? 'Python 3 (Pyodide Wasm Engine)'
                    : path.slug === 'javascript'
                    ? 'JavaScript ES6+ (Web Engine)'
                    : path.slug === 'html-css'
                    ? 'HTML5 & CSS3 Engine'
                    : path.slug === 'dbms'
                    ? 'SQL Relational DB Engine'
                    : `${path.title} Engine`}
                </span>
                {!isReady && (
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    (Loading Runtime...)
                  </span>
                )}
              </div>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Button variant="outline" size="sm" onClick={handleResetCode} disabled={isRunning}>
                  Reset
                </Button>
                <Button variant="outline" size="sm" onClick={handleRunCode} disabled={!isReady || isRunning}>
                  {isRunning ? 'Running...' : '▶ Run Code'}
                </Button>
                {lesson.exercise && (
                  <Button variant="primary" size="sm" onClick={handleValidateExercise} disabled={!isReady || isRunning}>
                    {isRunning ? 'Validating...' : '⚡ Submit & Validate'}
                  </Button>
                )}
              </div>
            </div>

            {/* Monaco Editor Container */}
            <div style={{ flex: '1 1 0%', minHeight: '200px', overflow: 'hidden', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
              <CodeEditor
                value={code}
                onChange={setCode}
                language={
                  lesson.exercise?.language ||
                  (path.slug === 'python'
                    ? 'python'
                    : path.slug === 'javascript' || path.slug === 'react'
                    ? 'javascript'
                    : path.slug === 'html-css'
                    ? 'html'
                    : path.slug === 'dbms'
                    ? 'sql'
                    : path.slug === 'java'
                    ? 'java'
                    : 'python')
                }
              />
            </div>

            {/* Collapsible Console Output Panel */}
            <div style={{ flex: '0 0 auto', maxHeight: '45vh', overflow: 'hidden' }}>
              <ConsolePanel
                logs={logs}
                validationResult={validationResult}
                onClearLogs={clearLogs}
                isRunning={isRunning}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
