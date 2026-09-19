import React from 'react';
import { getPathBySlug } from '@/content';
import { Path } from '@/types/content';
import { CoursePathClient } from '@/components/Path/CoursePathClient';

export const metadata = {
  title: 'Python Developer Mastery Path | First Move (11~18)',
  description: 'Structured Python roadmap from foundational fundamentals to advanced object-oriented design, portfolio projects, and technical interview mastery.',
};

export default function PythonPathPage() {
  const path = getPathBySlug('python') as Path;

  if (!path) {
    return <div className="site-container">Path not found.</div>;
  }

  return <CoursePathClient path={path} />;
}


