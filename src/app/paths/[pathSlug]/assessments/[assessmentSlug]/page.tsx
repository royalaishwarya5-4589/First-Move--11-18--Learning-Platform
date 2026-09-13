import React from 'react';
import { getAssessmentBySlug } from '@/content/assessments-data';
import { AssessmentRunnerClient } from '@/components/Assessment/AssessmentRunnerClient';
import { notFound } from 'next/navigation';

interface AssessmentPageProps {
  params: Promise<{
    pathSlug: string;
    assessmentSlug: string;
  }>;
}

export async function generateMetadata({ params }: AssessmentPageProps) {
  const { assessmentSlug } = await params;
  const assessment = getAssessmentBySlug(assessmentSlug);

  if (!assessment) {
    return { title: 'Assessment Not Found | First Move(11~18)' };
  }

  return {
    title: `${assessment.title} | First Move(11~18)`,
    description: assessment.description,
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
