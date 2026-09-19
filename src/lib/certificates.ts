import crypto from 'crypto';

const COURSE_PREFIX_MAP: Record<string, string> = {
  python: 'PY',
  java: 'JAVA',
  javascript: 'JS',
  'html-css': 'WEB',
  react: 'REACT',
  dbms: 'SQL',
  dsa: 'DSA',
  'genai-llm-agents': 'AI',
  'web-security': 'SEC',
  'linux-security': 'LINUX',
  'git-github': 'GIT',
  'cloud-devops': 'CLOUD',
  'software-testing': 'TEST',
  'system-design': 'SD',
  'interview-preparation': 'INT',
};

/**
 * Generates a unique, course-prefixed certificate ID (e.g., LT-PY-2026-A8F4E291).
 */
export function generateCertificateId(pathSlug: string): string {
  const prefix = COURSE_PREFIX_MAP[pathSlug] || pathSlug.toUpperCase().slice(0, 4);
  const randomHex = crypto.randomBytes(4).toString('hex').toUpperCase();
  const year = new Date().getFullYear();
  return `LT-${prefix}-${year}-${randomHex}`;
}

/**
 * Generates a cryptographic SHA-256 verification hash.
 */
export function generateVerificationHash(
  certificateId: string,
  userId: string,
  pathSlug: string,
  timestamp: string
): string {
  const secret = process.env.CERTIFICATE_VERIFY_SECRET || 'FIRSTMOVE_VERIFY_SECRET_V1';
  const payload = `${certificateId}:${userId}:${pathSlug}:${timestamp}:${secret}`;
  return crypto.createHash('sha256').update(payload).digest('hex');
}

/**
 * Derives course prefix label for display.
 */
export function getCoursePrefix(pathSlug: string): string {
  return COURSE_PREFIX_MAP[pathSlug] || pathSlug.toUpperCase();
}
