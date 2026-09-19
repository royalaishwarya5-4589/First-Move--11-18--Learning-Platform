import { NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import QRCode from 'qrcode';
import { getCertificateVerifyUrl } from '@/lib/urlUtils';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ certificateId: string }> }
) {
  const { certificateId } = await context.params;

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // 1. Fetch certificate from database
  const { data: cert, error } = await supabase
    .from('certificates')
    .select('*')
    .eq('certificate_id', certificateId)
    .maybeSingle();

  if (error || !cert) {
    return new Response(JSON.stringify({ error: 'Certificate not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // 2. Ownership verification: user must be authenticated and own the certificate
  if (!user || user.id !== cert.user_id) {
    return new Response(
      JSON.stringify({ error: 'Forbidden: You are not authorized to download this private certificate PDF.' }),
      {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  // 3. Generate QR Code PNG Buffer for PDF embedding
  const verifyUrl = getCertificateVerifyUrl(cert.certificate_id);
  const qrBuffer = await QRCode.toBuffer(verifyUrl, {
    type: 'png',
    errorCorrectionLevel: 'M',
    margin: 1,
    width: 200,
    color: {
      dark: '#0f172a',
      light: '#ffffff',
    },
  });

  // 4. Build PDF using pdf-lib
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([842, 595]); // A4 Landscape (points: 842 x 595)
  const { width, height } = page.getSize();

  // Embed standard fonts
  const fontHelvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontHelveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontHelveticaOblique = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);
  const qrImage = await pdfDoc.embedPng(qrBuffer);

  const isRevoked = cert.certificate_status === 'revoked';

  // Background canvas
  page.drawRectangle({
    x: 0,
    y: 0,
    width,
    height,
    color: rgb(0.98, 0.98, 0.99),
  });

  // Outer Border Frame
  page.drawRectangle({
    x: 20,
    y: 20,
    width: width - 40,
    height: height - 40,
    borderColor: isRevoked ? rgb(0.93, 0.27, 0.27) : rgb(0.12, 0.16, 0.23),
    borderWidth: 6,
  });

  // Inner Decorative Frame Line
  page.drawRectangle({
    x: 32,
    y: 32,
    width: width - 64,
    height: height - 64,
    borderColor: isRevoked ? rgb(0.93, 0.27, 0.27) : rgb(0.15, 0.39, 0.92),
    borderWidth: 1.5,
  });

  // REVOKED BANNER (If applicable)
  if (isRevoked) {
    page.drawRectangle({
      x: 34,
      y: height - 80,
      width: width - 68,
      height: 35,
      color: rgb(0.93, 0.27, 0.27),
    });

    const revokedText = '⚠️ CERTIFICATE REVOKED - OFFICIAL RECORD INVALID';
    const textWidth = fontHelveticaBold.widthOfTextAtSize(revokedText, 14);
    page.drawText(revokedText, {
      x: (width - textWidth) / 2,
      y: height - 63,
      size: 14,
      font: fontHelveticaBold,
      color: rgb(1, 1, 1),
    });
  }

  // Header Branding
  const brandText = 'FIRST MOVE (11~18)';
  page.drawText(brandText, {
    x: 50,
    y: height - (isRevoked ? 110 : 70),
    size: 22,
    font: fontHelveticaBold,
    color: rgb(0.15, 0.39, 0.92),
  });

  const headerTag = 'OFFICIAL CERTIFICATE OF COMPLETION';
  const tagWidth = fontHelveticaBold.widthOfTextAtSize(headerTag, 10);
  page.drawText(headerTag, {
    x: width - 50 - tagWidth,
    y: height - (isRevoked ? 110 : 70),
    size: 10,
    font: fontHelveticaBold,
    color: rgb(0.39, 0.45, 0.55),
  });

  // Main Title
  const titleText = 'CERTIFICATE OF COMPLETION';
  const titleWidth = fontHelveticaBold.widthOfTextAtSize(titleText, 28);
  page.drawText(titleText, {
    x: (width - titleWidth) / 2,
    y: height - (isRevoked ? 170 : 135),
    size: 28,
    font: fontHelveticaBold,
    color: rgb(0.06, 0.09, 0.16),
  });

  // Subtitle
  const subText = 'This document certifies that';
  const subWidth = fontHelveticaOblique.widthOfTextAtSize(subText, 14);
  page.drawText(subText, {
    x: (width - subWidth) / 2,
    y: height - (isRevoked ? 200 : 165),
    size: 14,
    font: fontHelveticaOblique,
    color: rgb(0.39, 0.45, 0.55),
  });

  // Learner Name
  const learnerName = cert.learner_name || 'First Move (11–18) Graduate';
  const nameWidth = fontHelveticaBold.widthOfTextAtSize(learnerName, 32);
  page.drawText(learnerName, {
    x: (width - nameWidth) / 2,
    y: height - (isRevoked ? 250 : 215),
    size: 32,
    font: fontHelveticaBold,
    color: rgb(0.12, 0.16, 0.23),
  });

  // Underline for Learner Name
  page.drawLine({
    start: { x: (width - Math.max(nameWidth, 300)) / 2, y: height - (isRevoked ? 258 : 223) },
    end: { x: (width + Math.max(nameWidth, 300)) / 2, y: height - (isRevoked ? 258 : 223) },
    thickness: 1.5,
    color: rgb(0.89, 0.91, 0.94),
  });

  // Completion statement
  const stmtText = 'has successfully completed all required curriculum modules, portfolio capstones, and final examinations for';
  const stmtWidth = fontHelvetica.widthOfTextAtSize(stmtText, 12);
  page.drawText(stmtText, {
    x: (width - stmtWidth) / 2,
    y: height - (isRevoked ? 290 : 255),
    size: 12,
    font: fontHelvetica,
    color: rgb(0.28, 0.33, 0.41),
  });

  // Course Title
  const courseTitle = cert.course_title || 'Software Engineering Course';
  const courseWidth = fontHelveticaBold.widthOfTextAtSize(courseTitle, 24);
  page.drawText(courseTitle, {
    x: (width - courseWidth) / 2,
    y: height - (isRevoked ? 330 : 295),
    size: 24,
    font: fontHelveticaBold,
    color: rgb(0.15, 0.39, 0.92),
  });

  // Metadata Box / Line
  page.drawLine({
    start: { x: 50, y: 150 },
    end: { x: width - 50, y: 150 },
    thickness: 1,
    color: rgb(0.89, 0.91, 0.94),
  });

  // Left Column Metadata
  page.drawText('CERTIFICATE ID', { x: 50, y: 130, size: 9, font: fontHelveticaBold, color: rgb(0.39, 0.45, 0.55) });
  page.drawText(cert.certificate_id, { x: 50, y: 115, size: 12, font: fontHelveticaBold, color: rgb(0.06, 0.09, 0.16) });

  page.drawText('ISSUE DATE', { x: 50, y: 95, size: 9, font: fontHelveticaBold, color: rgb(0.39, 0.45, 0.55) });
  const issueDateStr = new Date(cert.issued_at).toLocaleDateString();
  page.drawText(issueDateStr, { x: 50, y: 80, size: 11, font: fontHelveticaBold, color: rgb(0.06, 0.09, 0.16) });

  page.drawText('FINAL SCORE', { x: 50, y: 60, size: 9, font: fontHelveticaBold, color: rgb(0.39, 0.45, 0.55) });
  page.drawText(`${cert.final_score}%`, { x: 50, y: 45, size: 11, font: fontHelveticaBold, color: rgb(0.06, 0.73, 0.51) });

  // Embedded QR Code (Center Bottom)
  page.drawImage(qrImage, {
    x: (width - 70) / 2,
    y: 60,
    width: 70,
    height: 70,
  });

  const scanLabel = 'Scan to Verify';
  const scanWidth = fontHelveticaBold.widthOfTextAtSize(scanLabel, 8);
  page.drawText(scanLabel, {
    x: (width - scanWidth) / 2,
    y: 48,
    size: 8,
    font: fontHelveticaBold,
    color: rgb(0.39, 0.45, 0.55),
  });

  // Right Column Metadata & Signature Block
  const sigLineX = width - 230;
  page.drawLine({
    start: { x: sigLineX, y: 95 },
    end: { x: width - 50, y: 95 },
    thickness: 1,
    color: rgb(0.06, 0.09, 0.16),
  });

  const boardText = 'First Move (11–18) Board';
  page.drawText(boardText, {
    x: sigLineX + 40,
    y: 102,
    size: 14,
    font: fontHelveticaOblique,
    color: rgb(0.12, 0.16, 0.23),
  });

  const authTitle = 'First Move (11–18) Certification Authority';
  const authWidth = fontHelveticaBold.widthOfTextAtSize(authTitle, 9);
  page.drawText(authTitle, {
    x: width - 50 - authWidth,
    y: 80,
    size: 9,
    font: fontHelveticaBold,
    color: rgb(0.06, 0.09, 0.16),
  });

  const hashText = `Verified Hash: ${cert.verification_hash.slice(0, 16)}...`;
  const hashWidth = fontHelvetica.widthOfTextAtSize(hashText, 8);
  page.drawText(hashText, {
    x: width - 50 - hashWidth,
    y: 65,
    size: 8,
    font: fontHelvetica,
    color: rgb(0.39, 0.45, 0.55),
  });

  // 5. Serialize PDF bytes
  const pdfBytes = await pdfDoc.save();
  const pdfBuffer = Buffer.from(pdfBytes);

  // 6. Return response
  return new Response(pdfBuffer, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="FirstMove-Certificate-${cert.certificate_id}.pdf"`,
      'Cache-Control': 'no-store, max-age=0',
    },
  });
}
