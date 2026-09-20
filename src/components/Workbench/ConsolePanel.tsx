'use client';

import React, { useState } from 'react';
import { LogEntry, ValidationResult } from '@/types/runner';
import { Badge } from '@/components/Badge';

interface ConsolePanelProps {
  logs: LogEntry[];
  validationResult: ValidationResult | null;
  onClearLogs: () => void;
  isRunning: boolean;
}

export function ConsolePanel({ logs, validationResult, onClearLogs, isRunning }: ConsolePanelProps) {
  const [activeTab, setActiveTab] = useState<'logs' | 'tests'>('logs');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const prevLogsLength = React.useRef(logs.length);

  React.useEffect(() => {
    if (logs.length > prevLogsLength.current || isRunning) {
      setIsCollapsed(false);
    }
    prevLogsLength.current = logs.length;
  }, [logs.length, isRunning]);

  const getLogColor = (type: LogEntry['type']) => {
    switch (type) {
      case 'stdout':
        return 'var(--text-main)';
      case 'stderr':
        return '#f59e0b';
      case 'system':
        return '#C9A227';
      case 'error':
        return '#ef4444';
      case 'success':
        return '#10b981';
      default:
        return 'var(--text-main)';
    }
  };

  if (isCollapsed) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0.4rem 1rem',
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-md)',
          fontSize: '0.85rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            onClick={() => setIsCollapsed(false)}
            style={{
              border: 'none',
              backgroundColor: 'transparent',
              color: 'var(--text-main)',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
            }}
          >
            Terminal Output ▾ ({logs.length} logs)
          </button>
          {validationResult && (
            <Badge variant={validationResult.success ? 'success' : 'warning'} size="sm">
              Tests: {validationResult.totalPassed}/{validationResult.totalCases}
            </Badge>
          )}
        </div>
        <button
          onClick={() => setIsCollapsed(false)}
          style={{
            padding: '0.2rem 0.5rem',
            fontSize: '0.75rem',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: 'var(--bg-app)',
            color: 'var(--accent-primary)',
            cursor: 'pointer',
            fontWeight: 600,
          }}
        >
          Expand Output ▴
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        minHeight: 0,
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
      }}
    >
      {/* Console Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0.5rem 1rem',
          backgroundColor: 'var(--bg-app)',
          borderBottom: '1px solid var(--border-color)',
          flex: '0 0 auto',
        }}
      >
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <button
            onClick={() => setIsCollapsed(true)}
            title="Collapse Terminal"
            style={{
              border: 'none',
              backgroundColor: 'transparent',
              color: 'var(--text-muted)',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
              marginRight: '0.25rem',
            }}
          >
            Output ▾
          </button>
          <button
            onClick={() => setActiveTab('logs')}
            style={{
              padding: '0.3rem 0.75rem',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              backgroundColor: activeTab === 'logs' ? 'var(--bg-surface)' : 'transparent',
              color: activeTab === 'logs' ? 'var(--accent-primary)' : 'var(--text-muted)',
              fontWeight: activeTab === 'logs' ? 600 : 400,
              fontSize: '0.85rem',
              cursor: 'pointer',
            }}
          >
            Terminal Logs ({logs.length})
          </button>
          {validationResult && (
            <button
              onClick={() => setActiveTab('tests')}
              style={{
                padding: '0.3rem 0.75rem',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                backgroundColor: activeTab === 'tests' ? 'var(--bg-surface)' : 'transparent',
                color: activeTab === 'tests' ? 'var(--accent-primary)' : 'var(--text-muted)',
                fontWeight: activeTab === 'tests' ? 600 : 400,
                fontSize: '0.85rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
              }}
            >
              Test Results
              <Badge variant={validationResult.success ? 'success' : 'warning'} size="sm">
                {validationResult.totalPassed}/{validationResult.totalCases}
              </Badge>
            </button>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {isRunning && (
            <span style={{ fontSize: '0.8rem', color: 'var(--accent-primary)', fontWeight: 600 }}>
              ⏳ Running...
            </span>
          )}
          <button
            onClick={onClearLogs}
            style={{
              padding: '0.2rem 0.5rem',
              fontSize: '0.75rem',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'transparent',
              color: 'var(--text-muted)',
              cursor: 'pointer',
            }}
          >
            Clear Output
          </button>
        </div>
      </div>

      {/* Console Body */}
      <div
        style={{
          flex: 1,
          minHeight: 0,
          padding: '0.75rem 1rem',
          overflowY: 'auto',
          fontFamily: "'Fira Code', 'Cascadia Code', Consolas, monospace",
          fontSize: '0.85rem',
          lineHeight: 1.5,
        }}
      >
        {activeTab === 'logs' ? (
          logs.length === 0 ? (
            <div style={{ color: 'var(--text-muted)', fontStyle: 'italic', padding: '1rem 0' }}>
              Press &quot;Run Code&quot; or &quot;Submit & Validate&quot; to execute code.
            </div>
          ) : (
            logs.map((log) => (
              <div key={log.id} style={{ color: getLogColor(log.type), whiteSpace: 'pre-wrap', marginBottom: '0.25rem' }}>
                <span style={{ color: 'var(--text-muted)', opacity: 0.6, marginRight: '0.5rem', userSelect: 'none' }}>
                  [{new Date(log.timestamp).toLocaleTimeString()}]
                </span>
                {log.text}
              </div>
            ))
          )
        ) : (
          <div>
            {!validationResult ? (
              <div style={{ color: 'var(--text-muted)' }}>No validation runs yet.</div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontWeight: 600, color: validationResult.success ? '#10b981' : '#ef4444' }}>
                    {validationResult.success
                      ? `🎉 All ${validationResult.totalCases} test cases passed!`
                      : `⚠️ ${validationResult.totalPassed} of ${validationResult.totalCases} test cases passed.`}
                  </div>
                  {validationResult.executionTimeMs !== undefined && (
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      ⏱️ {validationResult.executionTimeMs} ms
                    </span>
                  )}
                </div>

                {!validationResult.success && (
                  <div style={{ fontSize: '0.8rem', color: 'var(--accent-warning, #f59e0b)', fontStyle: 'italic', padding: '0.4rem 0.6rem', backgroundColor: 'rgba(245, 158, 11, 0.1)', borderRadius: 'var(--radius-sm)' }}>
                    💡 Tip: Check your variable names, return types, and code logic against expected test outputs below.
                  </div>
                )}

                {validationResult.error && (
                  <div
                    style={{
                      padding: '0.75rem',
                      backgroundColor: 'rgba(239, 68, 68, 0.1)',
                      borderLeft: '3px solid #ef4444',
                      borderRadius: 'var(--radius-sm)',
                      color: '#ef4444',
                      whiteSpace: 'pre-wrap',
                    }}
                  >
                    {validationResult.error}
                  </div>
                )}

                {validationResult.results.map((res, i) => (
                  <div
                    key={res.id || i}
                    style={{
                      padding: '0.75rem',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: res.passed ? 'rgba(16, 185, 129, 0.05)' : 'rgba(239, 68, 68, 0.05)',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                      <span style={{ fontWeight: 600 }}>
                        {res.passed ? '✅' : '❌'} Test {i + 1}: {res.description}
                      </span>
                      <Badge variant={res.passed ? 'success' : 'warning'} size="sm">
                        {res.passed ? 'Passed' : 'Failed'}
                      </Badge>
                    </div>

                    {!res.isHidden && (
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                        {res.expectedOutput !== undefined && (
                          <div style={{ marginTop: '0.2rem' }}>
                            <strong style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Expected:</strong>
                            <pre style={{ margin: '0.25rem 0', padding: '0.35rem 0.6rem', backgroundColor: 'var(--bg-app)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', overflowX: 'auto', whiteSpace: 'pre-wrap', fontFamily: "'Fira Code', monospace" }}>
                              {res.expectedOutput}
                            </pre>
                          </div>
                        )}
                        {res.actualOutput !== undefined && (
                          <div style={{ marginTop: '0.2rem' }}>
                            <strong style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Actual:</strong>
                            <pre style={{ margin: '0.25rem 0', padding: '0.35rem 0.6rem', backgroundColor: 'var(--bg-app)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', overflowX: 'auto', whiteSpace: 'pre-wrap', fontFamily: "'Fira Code', monospace" }}>
                              {res.actualOutput}
                            </pre>
                          </div>
                        )}
                        {res.error && (
                          <div style={{ marginTop: '0.2rem', color: '#ef4444' }}>
                            <strong style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Error:</strong>
                            <pre style={{ margin: '0.25rem 0', padding: '0.35rem 0.6rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: 'var(--radius-sm)', overflowX: 'auto', whiteSpace: 'pre-wrap', color: '#ef4444', fontFamily: "'Fira Code', monospace" }}>
                              {res.error}
                            </pre>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
