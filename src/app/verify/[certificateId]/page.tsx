import React from 'react';
import { verifyCertificatePublic } from '@/app/actions/certificates';
import { Card } from '@/components/Card';
import { Badge } from '@/components/Badge';
import { Button } from '@/components/Button';

interface VerifyPageProps {
  params: Promise<{
    certificateId: string;
  }>;
}

export async function generateMetadata({ params }: VerifyPageProps) {
  const { certificateId } = await params;
  const cert = await verifyCertificatePublic(certificateId);

  if (!cert) {
    return { title: 'Certificate Not Found | First Move (11–18) Verification' };
  }

  return {
    title: `Verify ${cert.certificate_id} — ${cert.learner_name} | First Move (11–18)`,
    description: `Official First Move (11–18) Certificate of Completion verification record for ${cert.learner_name} in ${cert.course_title}.`,
  };
}

export default async function VerifyCertificatePage({ params }: VerifyPageProps) {
  const { certificateId } = await params;
  const cert = await verifyCertificatePublic(certificateId);

  if (!cert) {
    return (
      <div className="site-container" style={{ padding: '4rem 1.5rem', maxWidth: '700px', textAlign: 'center' }}>
        <Card style={{ padding: '3rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚠️</div>
          <div style={{ marginBottom: '1rem' }}>
            <Badge variant="warning">
              NOT FOUND
            </Badge>
          </div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '0.75rem', color: 'var(--text-main)' }}>
            Certificate Not Found
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginBottom: '2rem', lineHeight: 1.6 }}>
            No valid First Move (11–18) certificate record exists for ID or verification hash <code style={{ backgroundColor: 'var(--bg-app)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>{certificateId}</code>.
          </p>
          <Button href="/paths" variant="primary">
            Explore Course Catalog →
          </Button>
        </Card>
      </div>
    );
  }

  const isRevoked = cert.certificate_status === 'revoked';

  return (
    <div className="site-container" style={{ padding: '3rem 1.5rem 5rem 1.5rem', maxWidth: '800px' }}>
      <Card
        style={{
          padding: '2.5rem',
          border: isRevoked ? '2px solid #ef4444' : '2px solid #10b981',
          backgroundColor: isRevoked ? '#ef44440a' : '#10b9810a',
          textAlign: 'center',
          marginBottom: '2rem',
        }}
      >
        <div style={{ fontSize: '3.5rem', marginBottom: '0.5rem' }}>
          {isRevoked ? '🚫' : '🎓'}
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <Badge variant={isRevoked ? 'warning' : 'success'}>
            {isRevoked ? 'CERTIFICATE REVOKED' : '✓ VERIFIED OFFICIAL CERTIFICATE'}
          </Badge>
        </div>

        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
          {cert.course_title}
        </h1>

        <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>
          Issued to <strong style={{ color: 'var(--text-main)', fontWeight: 800 }}>{cert.learner_name}</strong>
        </p>

        {isRevoked && cert.revocation_reason && (
          <div style={{ backgroundColor: '#ef44441f', color: '#ef4444', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '2rem', fontSize: '0.9rem', fontWeight: 600 }}>
            Revocation Reason: {cert.revocation_reason}
          </div>
        )}

        {/* Certificate Metadata Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem',
            padding: '1.5rem',
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            textAlign: 'left',
            marginBottom: '2rem',
          }}
        >
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, display: 'block' }}>CERTIFICATE ID</span>
            <span style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)' }}>{cert.certificate_id}</span>
          </div>

          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, display: 'block' }}>ISSUE DATE</span>
            <span style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)' }}>{new Date(cert.issued_at).toLocaleDateString()}</span>
          </div>

          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, display: 'block' }}>FINAL ASSESSMENT SCORE</span>
            <span style={{ fontSize: '1.05rem', fontWeight: 800, color: '#10b981' }}>{cert.final_score}%</span>
          </div>

          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, display: 'block' }}>ISSUING AUTHORITY</span>
            <span style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)' }}>First Move (11–18) Certification Authority</span>
          </div>
        </div>

        {/* Verification Fingerprint */}
        <div style={{ backgroundColor: 'var(--bg-app)', padding: '1rem', borderRadius: 'var(--radius-md)', fontSize: '0.8rem', color: 'var(--text-muted)', wordBreak: 'break-all', textAlign: 'center' }}>
          <strong>Cryptographic Verification Hash:</strong><br />
          <code>{cert.verification_hash}</code>
        </div>
      </Card>

      <div style={{ textAlign: 'center' }}>
        <Button href={`/paths/${cert.path_slug}`} variant="outline">
          Explore Course Syllabus →
        </Button>
      </div>
    </div>
  );
}
