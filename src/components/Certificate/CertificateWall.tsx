'use client';

import React, { useState } from 'react';
import { Card } from '@/components/Card';
import { Badge } from '@/components/Badge';
import { Button } from '@/components/Button';
import { Certificate } from '@/types/user';
import { CertificateModal } from './CertificateModal';

interface CertificateWallProps {
  certificates: Certificate[];
}

export function CertificateWall({ certificates }: CertificateWallProps) {
  const [activeCert, setActiveCert] = useState<Certificate | null>(null);

  if (!certificates || certificates.length === 0) {
    return null;
  }

  return (
    <div style={{ marginBottom: '2.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)' }}>
          🎓 Certificate Wall ({certificates.length})
        </h2>
        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Verified First Move(11~18) Certifications
        </span>
      </div>

      <div className="card-grid">
        {certificates.map((cert) => (
          <Card key={cert.id} style={{ border: '2px solid #10b981', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <Badge variant="success">VERIFIED</Badge>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {new Date(cert.issued_at).toLocaleDateString()}
                </span>
              </div>

              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '0.4rem', color: 'var(--text-main)' }}>
                {cert.course_title}
              </h3>

              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'monospace', marginBottom: '1rem' }}>
                ID: {cert.certificate_id}
              </div>
            </div>

            <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '0.5rem' }}>
              <Button onClick={() => setActiveCert(cert)} variant="primary" size="sm" style={{ flex: 1 }}>
                View 📜
              </Button>
              <Button href={`/verify/${cert.certificate_id}`} variant="outline" size="sm" target="_blank" style={{ flex: 1 }}>
                Verify ↗
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {activeCert && (
        <CertificateModal certificate={activeCert} onClose={() => setActiveCert(null)} />
      )}
    </div>
  );
}
