export function getSiteBaseUrl(): string {
  if (typeof window !== 'undefined' && window.location && window.location.origin) {
    return window.location.origin;
  }
  const envUrl = process.env.NEXT_PUBLIC_APP_URL;
  if (envUrl && !envUrl.includes('localhost')) {
    return envUrl.replace(/\/$/, '');
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  if (process.env.NODE_ENV === 'development' && envUrl) {
    return envUrl.replace(/\/$/, '');
  }
  return 'https://first-move-11-18.vercel.app';
}

export function getCertificateVerifyUrl(certificateId: string): string {
  const baseUrl = getSiteBaseUrl();
  return `${baseUrl}/verify/${certificateId}`;
}
