import React from 'react';
import { getPathBySlug } from '@/content';
import { Path } from '@/types/content';
import { CoursePathClient } from '@/components/Path/CoursePathClient';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Python Developer Mastery Path | First Move (11~18)',
  description: 'Structured Python roadmap from foundational fundamentals to advanced object-oriented design, portfolio projects, and technical interview mastery.',
  alternates: {
    canonical: '/paths/python',
  },
  openGraph: {
    title: 'Python Developer Mastery Path | First Move (11~18)',
    description: 'Structured Python roadmap from foundational fundamentals to advanced object-oriented design, portfolio projects, and technical interview mastery.',
    url: '/paths/python',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Python Developer Mastery Path | First Move (11~18)',
    description: 'Structured Python roadmap from foundational fundamentals to advanced object-oriented design, portfolio projects, and technical interview mastery.',
  },
};

export default function PythonPathPage() {
  const path = getPathBySlug('python') as Path;

  if (!path) {
    return <div className="site-container">Path not found.</div>;
  }

  const courseJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: path.title,
    description: path.description,
    provider: {
      '@type': 'Organization',
      name: 'First Move (11~18)',
      sameAs: 'https://first-move-11-18.vercel.app',
    },
    educationalLevel: 'Beginner to Advanced',
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'Online',
      courseWorkload: `${path.modules?.length || 0} Modules`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }}
      />
      <CoursePathClient path={path} />
    </>
  );
}


