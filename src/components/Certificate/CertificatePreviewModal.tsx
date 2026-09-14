'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/Button';
import { CertificateDocument } from './CertificateDocument';
import { useAuth } from '@/components/Auth/AuthProvider';
import { createClient } from '@/lib/supabase/client';
import { computeDynamicTimeframe } from '@/lib/timeframeUtils';

import { getPathBySlug } from '@/content';
import { Path } from '@/types/content';

export interface CertificatePreviewModalProps {
  courseName: string;
  courseSlug: string;
  level?: string;
  skills?: string[];
  certificateTitle?: string;
  onClose: () => void;
}

export function CertificatePreviewModal({
  courseName,
  courseSlug,
  level: propsLevel,
  skills: propsSkills,
  certificateTitle = 'CERTIFICATE OF VIRTUAL INTERNSHIP',
  onClose,
}: CertificatePreviewModalProps) {
  const { user } = useAuth();

  const [learnerName, setLearnerName] = useState<string>(() =>
    user?.user_metadata?.display_name ||
    user?.user_metadata?.full_name ||
    user?.email?.split('@')[0] ||
    'Student Name'
  );
  const [institutionName, setInstitutionName] = useState<string>(() =>
    user?.user_metadata?.institution_name ||
    user?.user_metadata?.college ||
    'Institution Name'
  );
  const [studentId, setStudentId] = useState<string>(() =>
    user?.user_metadata?.student_id ||
    (user ? `STU-${user.id.slice(0, 8).toUpperCase()}` : 'STU-FIRSTMOVE-SAMPLE')
  );
  const [dynamicTimeframe, setDynamicTimeframe] = useState(() =>
    computeDynamicTimeframe(null, new Date(), getPathBySlug(courseSlug)?.estimatedHours)
  );

  const pathObj = getPathBySlug(courseSlug);
  const path = pathObj && 'modules' in pathObj ? (pathObj as Path) : undefined;

  const displayLevel =
    propsLevel ||
    (path?.difficulty
      ? `${path.difficulty.charAt(0).toUpperCase() + path.difficulty.slice(1)} / Production Mastery`
      : 'Professional / Production Mastery');

  const displaySkills =
    propsSkills && propsSkills.length > 0
      ? propsSkills
      : path?.certificationRequirement?.skillsCovered || [
          'Core Software Engineering',
          'Production System Architecture',
          'Applied Engineering Labs',
          'Technical Competency Examination',
        ];

  const learningHours = path?.estimatedHours || 120;
  const formattedSlug = (courseSlug || 'PYTHON').toUpperCase().replace(/[^A-Z0-9]/g, '');
  const previewCertId = `SAMPLE-LT-${formattedSlug}-0001`;

  useEffect(() => {
    let isMounted = true;

    if (user) {
      const userId = user.id;

      async function loadUserData() {
        try {
          const supabase = createClient();

          // Fetch profile details
          const { data: profile } = await supabase
            .from('profiles')
            .select('display_name, institution_name, student_id')
            .eq('id', userId)
            .maybeSingle();

          if (isMounted && profile) {
            if (profile.display_name) setLearnerName(profile.display_name);
            if (profile.institution_name) setInstitutionName(profile.institution_name);
            if (profile.student_id) setStudentId(profile.student_id);
          }

          // Fetch student's progress for this specific course to calculate actual elapsed completion duration
          const { data: progress } = await supabase
            .from('user_progress')
            .select('last_accessed_at, completed_at')
            .eq('user_id', userId)
            .eq('path_slug', courseSlug)
            .order('last_accessed_at', { ascending: true });

          if (isMounted) {
            let firstActivityDate: string | null = null;
            if (progress && progress.length > 0) {
              const dates = progress
                .map((p) => p.last_accessed_at || p.completed_at)
                .filter(Boolean)
                .sort();
              if (dates.length > 0) {
                firstActivityDate = dates[0];
              }
            }

            const timeframe = computeDynamicTimeframe(firstActivityDate, new Date(), learningHours);
            setDynamicTimeframe(timeframe);
          }
        } catch {
          // Fallback to computed estimated timeframe
        }
      }

      loadUserData();
    }

    return () => {
      isMounted = false;
    };
  }, [user, courseSlug, learningHours]);

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
        zIndex: 9999,
        padding: '1.5rem',
        overflowY: 'auto',
      }}
      className="certificate-modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        style={{
          maxWidth: '920px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          padding: '2rem',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6)',
          position: 'relative',
        }}
        className="certificate-modal-content"
      >
        {/* Top Controls Banner */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.5rem',
            paddingBottom: '1rem',
            borderBottom: '1px solid #e2e8f0',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
          className="certificate-modal-header"
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '1.25rem' }}>🎓</span>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                Certificate Preview
              </h3>
              <span
                style={{
                  fontSize: '0.7rem',
                  fontWeight: 800,
                  backgroundColor: '#ef4444',
                  color: '#ffffff',
                  padding: '0.2rem 0.6rem',
                  borderRadius: '10px',
                  letterSpacing: '0.5px',
                }}
              >
                NOT YET EARNED
              </span>
            </div>
            <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '0.2rem 0 0 0' }}>
              Sample view for <strong>{courseName}</strong>. Earn this official credential upon course completion.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <Button variant="outline" size="sm" onClick={handlePrint}>
              🖨️ Print Preview
            </Button>
            <Button variant="primary" size="sm" onClick={onClose}>
              ✕ Close
            </Button>
          </div>
        </div>

        {/* Certificate Rendered Document with Dynamic Timeframe & Student Info */}
        <div style={{ overflowX: 'auto', width: '100%', WebkitOverflowScrolling: 'touch', paddingBottom: '0.5rem' }}>
          <CertificateDocument
            isSample={true}
            learnerName={learnerName}
            institutionName={institutionName}
            certificateId={previewCertId}
            studentId={studentId}
            duration={dynamicTimeframe.duration}
            startDate={dynamicTimeframe.startDate}
            endDate={dynamicTimeframe.endDate}
            courseTitle={courseName}
            courseSlug={courseSlug}
            level={displayLevel}
            learningHours={learningHours}
            skills={displaySkills}
            certificateTitle={certificateTitle || 'CERTIFICATE OF VIRTUAL INTERNSHIP'}
            grade="A"
          />
        </div>

        {/* Bottom Actions */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '1.5rem',
            paddingTop: '1rem',
            borderTop: '1px solid #e2e8f0',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
          className="certificate-modal-footer"
        >
          <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
            💡 Complete all course lessons, portfolio projects, and final exam to claim your verified certificate.
          </div>
          <Button variant="outline" size="sm" onClick={onClose}>
            Close Preview
          </Button>
        </div>
      </div>
    </div>
  );
}
