'use client';

import React from 'react';
import { getPathBySlug } from '@/content';
import { Path } from '@/types/content';
import { computeDynamicTimeframe } from '@/lib/timeframeUtils';

export interface CertificateDocumentProps {
  isSample?: boolean;
  learnerName?: string;
  institutionName?: string;
  studentId?: string;
  courseTitle?: string;
  courseSlug?: string;
  duration?: string;
  issuedAt?: string;
  startDate?: string;
  endDate?: string;
  completionDate?: string;
  level?: string;
  learningHours?: number;
  skills?: string[];
  certificateTitle?: string;
  grade?: string;
  score?: number;
  certificateId?: string;
  verificationHash?: string;
  verificationUrl?: string;
  qrDataUrl?: string;
}

export function CertificateDocument({
  isSample = true,
  learnerName = 'Student Name',
  institutionName = 'Institution Name',
  studentId,
  courseTitle = 'Course Title',
  courseSlug,
  duration,
  issuedAt,
  startDate,
  endDate,
  certificateTitle = 'CERTIFICATE OF VIRTUAL INTERNSHIP',
  grade = 'A',
  certificateId,
  verificationHash,
  qrDataUrl,
}: CertificateDocumentProps) {
  const formattedSlug = (courseSlug || 'PYTHON').toUpperCase().replace(/[^A-Z0-9]/g, '');
  const sampleCertId = certificateId || (isSample ? `SAMPLE-LT-${formattedSlug}-0001` : `LT-${formattedSlug}-46FF82B5`);
  const effectiveStudentId = studentId || (isSample ? 'STU-FIRSTMOVE-SAMPLE' : 'STU-FIRSTMOVE-001');

  // Dynamic path lookup for fallback calculation
  const pathObj = courseSlug ? getPathBySlug(courseSlug) : undefined;
  const path = pathObj && 'modules' in pathObj ? (pathObj as Path) : undefined;

  const fallbackTimeframe = computeDynamicTimeframe(null, new Date(), path?.estimatedHours || 60);

  const effectiveDuration = duration || fallbackTimeframe.duration;
  const effectiveStartDate = startDate || fallbackTimeframe.startDate;
  const effectiveEndDate = endDate || fallbackTimeframe.endDate;

  const datePeriod = (effectiveStartDate && effectiveEndDate)
    ? (effectiveStartDate === effectiveEndDate ? effectiveStartDate : `${effectiveStartDate} – ${effectiveEndDate}`)
    : (issuedAt || fallbackTimeframe.periodText);

  return (
    <div
      id="certificate-print-area"
      style={{
        position: 'relative',
        backgroundColor: '#ffffff',
        color: '#0f172a',
        padding: '0',
        borderRadius: '12px',
        border: '10px solid #0f172a',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        fontFamily: "'Georgia', 'Times New Roman', serif",
        maxWidth: '750px',
        width: '100%',
        margin: '0 auto',
        boxSizing: 'border-box',
        overflow: 'hidden',
        WebkitPrintColorAdjust: 'exact',
        printColorAdjust: 'exact',
      }}
    >
      {/* Inner Decorative Gold Accent Border */}
      <div
        style={{
          border: '2px solid #f59e0b',
          margin: '4px',
          borderRadius: '8px',
          position: 'relative',
          backgroundColor: '#ffffff',
          overflow: 'hidden',
        }}
      >
        {/* Layered Top Ribbon / Banner SVG Header */}
        <div style={{ position: 'relative', width: '100%', backgroundColor: '#ffffff' }}>
          <svg
            viewBox="0 0 740 85"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: '100%', height: 'auto', display: 'block' }}
          >
            {/* Layer 1: Dark Navy Top Wave */}
            <path
              d="M0 0H740V44C740 44 560 76 370 76C180 76 0 44 0 44V0Z"
              fill="#0f172a"
            />
            {/* Layer 2: Royal Blue Accent Curve */}
            <path
              d="M0 44C0 44 180 77 370 77C560 77 740 44 740 44V52C740 52 560 82 370 82C180 82 0 52 0 52V44Z"
              fill="#1e3a8a"
            />
            {/* Layer 3: Gold Accent Line */}
            <path
              d="M0 52C0 52 180 82 370 82C560 82 740 52 740 52V57C740 57 560 85 370 85C180 85 0 57 0 57V52Z"
              fill="#f59e0b"
            />
            {/* Layer 4: Light Bottom Trim */}
            <path
              d="M0 57C0 57 180 85 370 85C560 85 740 57 740 57V60H0V57Z"
              fill="#e2e8f0"
              opacity="0.5"
            />
          </svg>

          {/* Central Circular Medal / Seal Overlapping Header Ribbon */}
          <div
            style={{
              position: 'absolute',
              top: '12px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 10,
              textAlign: 'center',
            }}
          >
            <svg width="86" height="86" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Ribbon Tails */}
              <path d="M36 74L48 95L60 74" fill="#0f172a" stroke="#f59e0b" strokeWidth="2" />
              <path d="M32 77L22 96L36 90" fill="#1e3a8a" />
              <path d="M68 77L78 96L64 90" fill="#1e3a8a" />

              {/* Medal Outer Circle with Gold Border */}
              <circle cx="50" cy="42" r="40" fill="#0f172a" stroke="#f59e0b" strokeWidth="3" />
              <circle cx="50" cy="42" r="34" stroke="#ffffff" strokeWidth="1" strokeDasharray="3 3" fill="none" />

              {/* Curved Medal Text Arc */}
              <path id="seal-text-path-lt-center" d="M 17,42 A 33,33 0 1,1 83,42" fill="none" />
              <text fontSize="7" fontWeight="bold" fill="#ffffff" letterSpacing="0.8" textAnchor="middle">
                <textPath href="#seal-text-path-lt-center" startOffset="50%">
                  FIRST MOVE (11–18) ACADEMY
                </textPath>
              </text>

              {/* Medal Center Core */}
              <text x="50" y="40" fontSize="9.5" fontWeight="bold" fill="#f59e0b" textAnchor="middle" fontFamily="-apple-system, sans-serif">
                ★ 2026 ★
              </text>
              <text x="50" y="52" fontSize="5.5" fontWeight="bold" fill="#ffffff" letterSpacing="0.6" textAnchor="middle" fontFamily="-apple-system, sans-serif">
                VIRTUAL INTERNSHIP
              </text>
            </svg>
          </div>
        </div>

        {/* Certificate Main Content Body */}
        <div style={{ padding: '1rem 2rem 0.5rem 2rem' }}>
          {/* Top Institutional Branding Section */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.25rem',
              paddingBottom: '0.75rem',
              borderBottom: '1px solid #e2e8f0',
              flexWrap: 'wrap',
              gap: '0.75rem',
            }}
          >
            {/* Left: First Move (11–18) Emblem & Institution Name */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <svg width="42" height="42" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="5" y="5" width="90" height="90" rx="12" fill="#0f172a" />
                <rect x="12" y="12" width="76" height="76" rx="8" stroke="#f59e0b" strokeWidth="2.5" fill="none" />
                <path d="M50 22L75 36V64L50 78L25 64V36L50 22Z" stroke="#f59e0b" strokeWidth="2" fill="#1e3a8a" />
                <text x="50" y="57" fontSize="20" fontWeight="900" fill="#ffffff" textAnchor="middle" fontFamily="sans-serif">
                  FM
                </text>
              </svg>
              <div style={{ textAlign: 'left' }}>
                <div
                  style={{
                    fontSize: '1.2rem',
                    fontWeight: 900,
                    color: '#0f172a',
                    letterSpacing: '2.5px',
                    lineHeight: 1.1,
                    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                  }}
                >
                  FIRST MOVE (11~18) ACADEMY
                </div>
                <div
                  style={{
                    fontSize: '0.58rem',
                    fontWeight: 800,
                    color: '#b45309',
                    letterSpacing: '1.2px',
                    marginTop: '2px',
                    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                    textTransform: 'uppercase',
                  }}
                >
                  FIRST MOVE (11~18) INSTITUTE OF TECHNOLOGY
                </div>
              </div>
            </div>

            {/* Right: Supporting First Move (11–18) Feature Badges & Credentials Arrangement */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              {/* Badge 1: Verified Credential */}
              <div style={{ textAlign: 'center', padding: '0.2rem 0.4rem', border: '1px solid #cbd5e1', borderRadius: '4px', backgroundColor: '#f8fafc' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1e3a8a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ margin: '0 auto' }}>
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                <div style={{ fontSize: '0.45rem', fontWeight: 800, color: '#0f172a', textTransform: 'uppercase', marginTop: '1px', fontFamily: 'sans-serif' }}>
                  VERIFIED CREDENTIAL
                </div>
              </div>

              {/* Badge 2: CS & Engineering Standards */}
              <div style={{ textAlign: 'center', padding: '0.2rem 0.4rem', border: '1px solid #cbd5e1', borderRadius: '4px', backgroundColor: '#f8fafc' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#b45309" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ margin: '0 auto' }}>
                  <circle cx="12" cy="12" r="10" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                <div style={{ fontSize: '0.45rem', fontWeight: 800, color: '#0f172a', textTransform: 'uppercase', marginTop: '1px', fontFamily: 'sans-serif' }}>
                  CS&E STANDARDS
                </div>
              </div>

              {/* ID Record summary */}
              <div
                style={{
                  textAlign: 'right',
                  borderLeft: '1px solid #cbd5e1',
                  paddingLeft: '0.6rem',
                  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                }}
              >
                <div style={{ fontSize: '0.58rem', fontWeight: 800, color: '#475569', letterSpacing: '1px', textTransform: 'uppercase' }}>
                  CREDENTIAL RECORD
                </div>
                <div style={{ fontSize: '0.68rem', fontWeight: 800, color: '#0f172a', fontFamily: 'monospace', marginTop: '1px' }}>
                  {sampleCertId}
                </div>
              </div>
            </div>
          </div>

          {/* Sample Certificate Warning Banner (If Preview Mode) */}
          {isSample && (
            <div style={{ textAlign: 'center', marginBottom: '0.85rem' }}>
              <span
                style={{
                  backgroundColor: '#dc2626',
                  color: '#ffffff',
                  fontSize: '0.68rem',
                  fontWeight: 900,
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  padding: '0.3rem 1.25rem',
                  borderRadius: '4px',
                  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                  boxShadow: '0 2px 4px rgba(220, 38, 38, 0.25)',
                  display: 'inline-block',
                }}
              >
                ⚠️ SAMPLE CERTIFICATE — NOT YET EARNED
              </span>
            </div>
          )}

          {/* Certificate Title */}
          <div style={{ textAlign: 'center', margin: '0.5rem 0 0.75rem 0' }}>
            <h1
              style={{
                fontSize: '2.0rem',
                fontWeight: 900,
                color: '#0f172a',
                margin: '0 0 0.3rem 0',
                lineHeight: 1.15,
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                fontFamily: "'Georgia', 'Times New Roman', serif",
              }}
            >
              {certificateTitle}
            </h1>
            <div
              style={{
                fontSize: '1.05rem',
                color: '#475569',
                fontStyle: 'italic',
                letterSpacing: '0.5px',
                fontFamily: "'Georgia', 'Times New Roman', serif",
              }}
            >
              This is to certify that
            </div>
          </div>

          {/* Learner Name Section */}
          <div style={{ textAlign: 'center', margin: '0.85rem 0' }}>
            <div
              style={{
                display: 'inline-block',
                padding: '0.4rem 2rem',
                backgroundColor: 'rgba(15, 23, 42, 0.03)',
                border: '1px solid rgba(245, 158, 11, 0.4)',
                borderRadius: '6px',
                boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.03)',
              }}
            >
              <h2
                style={{
                  fontSize: '2.0rem',
                  fontWeight: 900,
                  color: '#0f172a',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  margin: 0,
                  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                }}
              >
                {learnerName}
              </h2>
            </div>

            <div
              style={{
                fontSize: '1.1rem',
                fontWeight: 700,
                color: '#1e293b',
                marginTop: '0.5rem',
                fontFamily: "'Georgia', 'Times New Roman', serif",
              }}
            >
              {institutionName}
            </div>
          </div>

          {/* Course & Internship Details */}
          <div style={{ textAlign: 'center', margin: '0.85rem 0' }}>
            <p style={{ fontSize: '1.0rem', color: '#334155', margin: '0 0 0.3rem 0', fontFamily: "'Georgia', serif" }}>
              has successfully completed the required
            </p>

            <div
              style={{
                fontSize: '1.1rem',
                fontWeight: 800,
                color: '#b45309',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                margin: '0.2rem 0',
                fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
              }}
            >
              {effectiveDuration}
            </div>

            <h3
              style={{
                fontSize: '1.45rem',
                fontWeight: 900,
                color: '#0f172a',
                letterSpacing: '0.5px',
                margin: '0.3rem 0',
                lineHeight: 1.25,
                textTransform: 'uppercase',
                fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
              }}
            >
              {courseTitle}
            </h3>

            <div
              style={{
                fontSize: '1.0rem',
                fontWeight: 600,
                color: '#1e293b',
                margin: '0.35rem 0 0.6rem 0',
                fontFamily: "'Georgia', serif",
              }}
            >
              During {datePeriod}
            </div>

            <p
              style={{
                fontSize: '0.9rem',
                color: '#475569',
                maxWidth: '560px',
                margin: '0 auto',
                lineHeight: 1.45,
                fontStyle: 'italic',
                fontFamily: "'Georgia', serif",
              }}
            >
              May this internship learning propel you toward a bright, innovative, and successful career.
            </p>
          </div>

          {/* Centered First Move (11–18) Academy Sub-Branding Pill */}
          <div style={{ textAlign: 'center', margin: '0.85rem 0 1rem 0' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: '#0f172a',
                color: '#ffffff',
                padding: '0.3rem 0.9rem',
                borderRadius: '6px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="40" height="40" rx="6" fill="#1e3a8a" />
                <path d="M10 18L20 12L30 18L20 24L10 18Z" fill="#ffffff" />
                <path d="M14 21V27C14 27 17 29 20 29C23 29 26 27 26 27V21" stroke="#f59e0b" strokeWidth="2" fill="none" />
              </svg>
              <span
                style={{
                  fontSize: '0.8rem',
                  fontWeight: 900,
                  color: '#ffffff',
                  letterSpacing: '1.5px',
                  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                  textTransform: 'uppercase',
                }}
              >
                FIRST MOVE (11~18) ACADEMY
              </span>
            </div>
          </div>

          {/* Lower Section Grid: Signature (Left), QR Verification (Center), Grade Badge (Right) */}
          <div
            style={{
              borderTop: '1px solid #cbd5e1',
              paddingTop: '0.85rem',
              marginTop: '0.85rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              flexWrap: 'wrap',
              gap: '1rem',
            }}
          >
            {/* Column 1 (Left): First Move (11–18) Signature */}
            <div style={{ textAlign: 'left', minWidth: '190px' }}>
              <div
                style={{
                  fontFamily: "'Alex Brush', 'Caveat', 'Dancing Script', 'Brush Script MT', cursive",
                  fontSize: '1.85rem',
                  fontWeight: 600,
                  color: '#0f172a',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  transform: 'rotate(-2deg)',
                  letterSpacing: '0.5px',
                  userSelect: 'none',
                }}
              >
                Aishwarya
              </div>
              <div style={{ borderTop: '1.5px solid #0f172a', paddingTop: '0.3rem', marginTop: '0.1rem', width: '190px' }}>
                <div
                  style={{
                    fontSize: '0.85rem',
                    fontWeight: 800,
                    color: '#0f172a',
                    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                  }}
                >
                  Aishwarya
                </div>
                <div style={{ fontSize: '0.7rem', fontWeight: 600, color: '#475569', fontFamily: 'sans-serif' }}>
                  First Move (11~18) Academic Director
                </div>
              </div>
            </div>

            {/* Column 2 (Center): QR Code Verification Block */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '0.65rem', fontWeight: 800, color: '#0f172a', letterSpacing: '1px', marginBottom: '0.25rem', fontFamily: 'sans-serif' }}>
                SCAN TO VERIFY
              </div>

              <div
                style={{
                  backgroundColor: '#ffffff',
                  padding: '0.25rem',
                  border: '1px solid #cbd5e1',
                  borderRadius: '4px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                }}
              >
                {qrDataUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={qrDataUrl} alt="Certificate Verification QR Code" width="56" height="56" style={{ display: 'block' }} />
                ) : (
                  <svg width="56" height="56" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="72" height="72" fill="#f8fafc" rx="4" />
                    <rect x="6" y="6" width="24" height="24" fill="#0f172a" rx="2" />
                    <rect x="10" y="10" width="16" height="16" fill="#ffffff" />
                    <rect x="14" y="14" width="8" height="8" fill="#0f172a" />
                    <rect x="42" y="6" width="24" height="24" fill="#0f172a" rx="2" />
                    <rect x="46" y="10" width="16" height="16" fill="#ffffff" />
                    <rect x="50" y="14" width="8" height="8" fill="#0f172a" />
                    <rect x="6" y="42" width="24" height="24" fill="#0f172a" rx="2" />
                    <rect x="10" y="46" width="16" height="16" fill="#ffffff" />
                    <rect x="14" y="50" width="8" height="8" fill="#0f172a" />
                    <rect x="34" y="34" width="8" height="8" fill="#0f172a" />
                    <rect x="46" y="42" width="8" height="8" fill="#0f172a" />
                  </svg>
                )}
              </div>

              <div style={{ fontSize: '0.6rem', color: isSample ? '#dc2626' : '#059669', fontWeight: 800, fontFamily: 'sans-serif', marginTop: '3px' }}>
                {isSample ? 'Sample — Verification Unavailable' : 'Certificate Verified'}
              </div>

              <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#0f172a', marginTop: '2px', fontFamily: 'sans-serif' }}>
                Certificate ID: <span style={{ fontFamily: 'monospace' }}>{sampleCertId}</span>
              </div>
              <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#0f172a', marginTop: '1px', fontFamily: 'sans-serif' }}>
                Student ID: <span style={{ fontFamily: 'monospace' }}>{effectiveStudentId}</span>
              </div>
            </div>

            {/* Column 3 (Right): Circular First Move (11–18) Internship Grade Badge */}
            <div style={{ textAlign: 'right', minWidth: '100px' }}>
              <svg width="84" height="84" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="45" cy="45" r="42" fill="#0f172a" stroke="#f59e0b" strokeWidth="2" />
                <circle cx="45" cy="45" r="36" stroke="#ffffff" strokeWidth="1" strokeDasharray="3 3" fill="none" />
                <path id="grade-text-path-lt-clean" d="M 16,45 A 29,29 0 1,1 74,45" fill="none" />
                <text fontSize="6.2" fontWeight="bold" fill="#ffffff" letterSpacing="0.8" textAnchor="middle">
                  <textPath href="#grade-text-path-lt-clean" startOffset="50%">
                    INTERNSHIP GRADE
                  </textPath>
                </text>
                <text x="45" y="52" fontSize="22" fontWeight="900" fill="#ffffff" textAnchor="middle" fontFamily="sans-serif">
                  {grade}
                </text>
                <text x="28" y="66" fontSize="7" fill="#f59e0b">★</text>
                <text x="45" y="68" fontSize="7" fill="#f59e0b" textAnchor="middle">★</text>
                <text x="62" y="66" fontSize="7" fill="#f59e0b">★</text>
              </svg>
            </div>
          </div>
        </div>

        {/* Bottom Sweeping Navy & Gold Footer Wave Graphic */}
        <div style={{ position: 'relative', width: '100%', lineHeight: 0, marginTop: '0.5rem' }}>
          <svg
            viewBox="0 0 740 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: '100%', height: 'auto', display: 'block' }}
          >
            <path d="M740 32V10C740 10 550 32 370 32H740Z" fill="#f59e0b" />
            <path d="M740 32V16C740 16 520 32 320 32H740Z" fill="#0f172a" />
          </svg>
        </div>

        {/* Bottom Footer Grading Legend Bar */}
        <div
          style={{
            backgroundColor: '#0f172a',
            color: '#ffffff',
            padding: '0.45rem 0.75rem',
            fontSize: '0.6rem',
            fontWeight: 700,
            textAlign: 'center',
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            letterSpacing: '0.3px',
            borderTop: '2px solid #f59e0b',
          }}
        >
          O (Outstanding): 90–100 | E (Excellent): 80–89 | A (Very Good): 70–79 | B (Good): 60–69 | C (Fair): 50–59 | D (Average): 40–49 | P (Pass): 30–39 | F (Fail): Below 30
        </div>
      </div>
    </div>
  );
}
