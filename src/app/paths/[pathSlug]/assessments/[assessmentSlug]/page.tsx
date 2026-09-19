import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { sampleAssessments, getAssessmentBySlug } from '@/content/assessments-data';
import { AssessmentRunnerClient } from '@/components/Assessment/AssessmentRunnerClient';

interface AssessmentPageProps {
  params: Promise<{
    pathSlug: string;
    assessmentSlug: string;
  }>;
}

export function generateStaticParams() {
  return sampleAssessments.map((a) => ({
    pathSlug: a.pathSlug,
    assessmentSlug: a.slug,
  }));
}

export async function generateMetadata({ params }: AssessmentPageProps): Promise<Metadata> {
  const { pathSlug, assessmentSlug } = await params;
  const assessment = getAssessmentBySlug(assessmentSlug);

  if (!assessment) {
    return {
      title: 'Assessment Not Found | First Move (11~18)',
      robots: { index: false, follow: false },
    };
  }

  const canonicalUrl = `/paths/${pathSlug}/assessments/${assessmentSlug}`;

  return {
    title: `${assessment.title} | First Move (11~18)`,
    description: assessment.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${assessment.title} | First Move (11~18)`,
      description: assessment.description,
      url: canonicalUrl,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${assessment.title} | First Move (11~18)`,
      description: assessment.description,
    },
  };
}

export default async function AssessmentPage({ params }: AssessmentPageProps) {
  const { pathSlug, assessmentSlug } = await params;
  const assessment = getAssessmentBySlug(assessmentSlug);

  if (!assessment) {
    notFound();
  }

  return <AssessmentRunnerClient assessment={assessment} pathSlug={pathSlug} />;
}
