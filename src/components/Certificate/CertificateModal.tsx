'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { Certificate } from '@/types/user';
import { generateCertificateQrDataUrl } from '@/lib/certificateQr';
import { getCertificateVerifyUrl } from '@/lib/urlUtils';
import { computeDynamicTimeframe } from '@/lib/timeframeUtils';

import { CertificateDocument } from './CertificateDocument';
import { getPathBySlug } from '@/content';
import { Path } from '@/types/content';

interface CertificateModalProps {
  certificate: Certificate;
  onClose: () => void;
}

function getGradeFromScore(score: number): string {
  if (score >= 90) return 'O';
  if (score >= 80) return 'E';
  if (score >= 70) return 'A';
  if (score >= 60) return 'B';
  if (score >= 50) return 'C';
  if (score >= 40) return 'D';
  if (score >= 30) return 'P';
  return 'F';
}

export function CertificateModal({ certificate, onClose }: CertificateModalProps) {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const verifyUrl = getCertificateVerifyUrl(certificate.certificate_id);
  const pdfDownloadUrl = `/api/certificates/${certificate.certificate_id}/pdf`;

  const pathObj = getPathBySlug(certificate.path_slug);
  const path = pathObj && 'modules' in pathObj ? (pathObj as Path) : undefined;

  const skills = path?.certificationRequirement?.skillsCovered || [
    'Core Software Engineering',
    'Production System Architecture',
    'Applied Engineering Labs',
    'Technical Competency Examination'
  ];

  const level = path?.difficulty
    ? `${path.difficulty.charAt(0).toUpperCase() + path.difficulty.slice(1)} / Production Mastery`
    : 'Professional / Production Mastery';

  const learningHours = path?.estimatedHours || 120;

  // Compute dynamic timeframe from certificate metadata or issued_at timestamp
  const defaultTimeframe = computeDynamicTimeframe(null, certificate.issued_at, learningHours);

  const duration = (certificate.metadata?.duration as string) || defaultTimeframe.duration;
  const startDate = (certificate.metadata?.startDate as string) || defaultTimeframe.startDate;
  const endDate = (certificate.metadata?.endDate as string) || defaultTimeframe.endDate;

  const institutionName = (certificate.metadata?.institutionName as string) || 'Institution Name';
  const studentId = (certificate.metadata?.studentId as string) || `STU-${certificate.user_id ? certificate.user_id.slice(0, 8).toUpperCase() : 'FIRSTMOVE'}`;
  const grade = getGradeFromScore(certificate.final_score ?? 85);

  useEffect(() => {
    let isMounted = true;
    generateCertificateQrDataUrl(certificate.certificate_id)
      .then((url) => {
        if (isMounted) setQrDataUrl(url);
      })
      .catch((err) => {
        console.error('[Certificate QR Error]', err);
      });
    return () => {
      isMounted = false;
    };
  }, [certificate.certificate_id]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.85)',
        backdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '1.5rem',
        overflowY: 'auto',
      }}
      className="certificate-modal-overlay"
    >
      <Card
        style={{
          maxWidth: '920px',
          width: '100%',
          padding: '2rem',
          backgroundColor: '#ffffff',
          color: '#0f172a',
          borderRadius: '16px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          position: 'relative',
        }}
        className="certificate-modal-content"
      >
        <div style={{ overflowX: 'auto', width: '100%', WebkitOverflowScrolling: 'touch', paddingBottom: '0.5rem' }}>
          <CertificateDocument
            isSample={false}
            learnerName={certificate.learner_name || 'Student Name'}
            institutionName={institutionName}
            studentId={studentId}
            certificateId={certificate.certificate_id}
            duration={duration}
            startDate={startDate}
            endDate={endDate}
            issuedAt={new Date(certificate.issued_at).toLocaleDateString(undefined, {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
            courseTitle={certificate.course_title}
            courseSlug={certificate.path_slug}
            grade={grade}
            level={level}
            learningHours={learningHours}
            skills={skills}
            verificationHash={certificate.verification_hash}
            verificationUrl={verifyUrl}
            qrDataUrl={qrDataUrl}
          />
        </div>

        {/* Modal Action Controls */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1.5rem', flexWrap: 'wrap' }} className="certificate-modal-footer">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button href={verifyUrl} variant="outline" target="_blank">
            Verify Online ↗
          </Button>
          <Button variant="outline" onClick={handlePrint}>
            🖨️ Print
          </Button>
          <Button href={pdfDownloadUrl} variant="primary" target="_blank">
            📄 Download Official PDF
          </Button>
        </div>
      </Card>
    </div>
  );
}
