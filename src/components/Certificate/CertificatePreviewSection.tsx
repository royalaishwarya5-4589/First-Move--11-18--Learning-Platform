'use client';

import React, { useState } from 'react';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { CertificatePreviewModal } from './CertificatePreviewModal';

export interface CertificatePreviewSectionProps {
  courseName: string;
  courseSlug: string;
  level?: string;
  skills?: string[];
  certificateTitle?: string;
}

export function CertificatePreviewSection({
  courseName,
  courseSlug,
  level,
  skills,
  certificateTitle = 'Certificate of Completion',
}: CertificatePreviewSectionProps) {
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  return (
    <>
      <Card
        style={{
          padding: '1.75rem 2rem',
          marginBottom: '2.5rem',
          border: '1px solid var(--border-color)',
          backgroundColor: 'var(--bg-surface)',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.5rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flex: 1, minWidth: '280px' }}>
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '12px',
                backgroundColor: 'rgba(201, 162, 39, 0.1)',
                border: '1px solid rgba(201, 162, 39, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem',
                flexShrink: 0,
              }}
            >
              🎓
            </div>

            <div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-main)', margin: '0 0 0.25rem 0' }}>
                {certificateTitle}
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', margin: 0, lineHeight: 1.5 }}>
                Complete this learning path to earn your First Move(11~18) certificate.
              </p>
            </div>
          </div>

          <Button
            variant="outline"
            size="md"
            onClick={() => setShowPreviewModal(true)}
            style={{ fontWeight: 700, padding: '0.65rem 1.4rem' }}
          >
            📜 Preview Certificate
          </Button>
        </div>
      </Card>

      {showPreviewModal && (
        <CertificatePreviewModal
          courseName={courseName}
          courseSlug={courseSlug}
          level={level}
          skills={skills}
          certificateTitle={certificateTitle}
          onClose={() => setShowPreviewModal(false)}
        />
      )}
    </>
  );
}
