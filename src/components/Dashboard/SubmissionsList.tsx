'use client';

import React, { useState } from 'react';
import { ExerciseSubmission } from '@/types/user';
import { Card } from '@/components/Card';
import { Badge } from '@/components/Badge';
import { EmptyState } from '@/components/EmptyState';

interface SubmissionsListProps {
  submissions: ExerciseSubmission[];
}

function formatDateDDMMYYYY(dateString?: string | null): string {
  if (!dateString) return 'Just now';
  const d = new Date(dateString);
  if (isNaN(d.getTime())) return 'Just now';

  const day = String(d.getUTCDate()).padStart(2, '0');
  const month = String(d.getUTCMonth() + 1).padStart(2, '0');
  const year = d.getUTCFullYear();

  return `${day}/${month}/${year}`;
}

export function SubmissionsList({ submissions }: SubmissionsListProps) {
  const [selectedCode, setSelectedCode] = useState<string | null>(null);

  if (!submissions || submissions.length === 0) {
    return (
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.85rem' }}>
          Recent Exercise Submissions
        </h3>
        <EmptyState
          icon="💻"
          title="No Code Submissions Yet"
          description="Open an active course workbench, solve practical exercises, and validate test assertions to review history here."
          actionLabel="Go to Python Workbench →"
          actionHref="/paths/python"
        />
      </div>
    );
  }

  return (
    <Card hoverable={false}>
      <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '1rem' }}>
        Recent Exercise Submissions
      </h3>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
              <th style={{ padding: '0.6rem 0.75rem', fontWeight: 600 }}>Lesson / Exercise</th>
              <th style={{ padding: '0.6rem 0.75rem', fontWeight: 600 }}>Status</th>
              <th style={{ padding: '0.6rem 0.75rem', fontWeight: 600 }}>Execution Time</th>
              <th style={{ padding: '0.6rem 0.75rem', fontWeight: 600 }}>Submitted At</th>
              <th style={{ padding: '0.6rem 0.75rem', fontWeight: 600, textAlign: 'right' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((sub, idx) => (
              <tr key={sub.id || idx} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '0.75rem', fontWeight: 600, color: 'var(--text-main)' }}>
                  {sub.lesson_slug}
                </td>
                <td style={{ padding: '0.75rem' }}>
                  {sub.passed ? (
                    <Badge variant="active" size="sm">Passed</Badge>
                  ) : (
                    <Badge variant="warning" size="sm">Failed</Badge>
                  )}
                </td>
                <td style={{ padding: '0.75rem', color: 'var(--text-muted)' }}>
                  {sub.execution_time_ms ? `${sub.execution_time_ms} ms` : 'N/A'}
                </td>
                <td style={{ padding: '0.75rem', color: 'var(--text-muted)' }}>
                  {formatDateDDMMYYYY(sub.created_at)}
                </td>
                <td style={{ padding: '0.75rem', textAlign: 'right' }}>
                  <button
                    onClick={() => setSelectedCode(sub.submitted_code)}
                    style={{
                      backgroundColor: 'var(--bg-app)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-main)',
                      padding: '0.3rem 0.6rem',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.8rem',
                      cursor: 'pointer',
                    }}
                  >
                    View Code
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Code Modal */}
      {selectedCode && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '1rem',
          }}
        >
          <div
            style={{
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-lg)',
              maxWidth: '600px',
              width: '100%',
              padding: '1.5rem',
              boxShadow: 'var(--shadow-lg)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)' }}>
                Submitted Code Solution
              </h4>
              <button
                onClick={() => setSelectedCode(null)}
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: 'var(--text-muted)',
                  fontSize: '1.2rem',
                  cursor: 'pointer',
                }}
              >
                ✕
              </button>
            </div>

            <pre
              style={{
                backgroundColor: 'var(--bg-app)',
                padding: '1rem',
                borderRadius: 'var(--radius-md)',
                overflowX: 'auto',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                color: 'var(--text-main)',
                border: '1px solid var(--border-color)',
                maxHeight: '300px',
              }}
            >
              <code>{selectedCode}</code>
            </pre>
          </div>
        </div>
      )}
    </Card>
  );
}
