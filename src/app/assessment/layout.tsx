import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Career Compass Discovery | First Move (11~18)',
  description: 'Take the Career Compass discovery test: 12 guided scenarios evaluating your curiosity, problem-solving habits, and workflow preferences across 10 technology disciplines.',
  alternates: {
    canonical: '/assessment',
  },
  openGraph: {
    title: 'Career Compass Discovery | First Move (11~18)',
    description: 'Find your ideal software engineering domain through 12 guided scenarios evaluating your interests, strengths, and goals.',
    url: '/assessment',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Career Compass Discovery | First Move (11~18)',
    description: 'Find your ideal software engineering domain through 12 guided scenarios evaluating your interests, strengths, and goals.',
  },
};

export default function AssessmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
