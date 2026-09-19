import React from 'react';
import { getUserAnalyticsReport } from '@/app/actions/analytics';
import { redirect } from 'next/navigation';
import { ProgressReportClient } from '@/components/Progress/ProgressReportClient';

export const metadata = {
  title: 'Learner Progress & Performance Report | First Move (11~18)',
  description: 'Detailed real-time analytics, course breakdown, assessment history, project tracking, and certification status.',
};

export default async function ProgressPage() {
  const report = await getUserAnalyticsReport();

  if (!report) {
    redirect('/login');
  }

  return <ProgressReportClient report={report} />;
}
