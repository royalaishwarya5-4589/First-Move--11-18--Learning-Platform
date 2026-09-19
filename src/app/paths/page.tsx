import React, { Suspense } from 'react';
import { getAllCategories, getAllPaths } from '@/content';
import { PathCatalogClient } from '@/components/Path/PathCatalogClient';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Multi-Course Catalog | First Move (11~18)',
  description: 'Explore 15 structured technology learning paths across Programming, Computer Science Core, Full-Stack Web Development, AI/Machine Learning, Cybersecurity, and Career Skills.',
  alternates: {
    canonical: '/paths',
  },
  openGraph: {
    title: 'Multi-Course Catalog | First Move (11~18)',
    description: 'Explore 15 structured technology learning paths from foundational exploration to industry mastery.',
    url: '/paths',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Multi-Course Catalog | First Move (11~18)',
    description: 'Explore 15 structured technology learning paths from foundational exploration to industry mastery.',
  },
};

export default function PathCatalogPage() {
  const categories = getAllCategories();
  const allPaths = getAllPaths();

  return (
    <Suspense fallback={<div className="site-container" style={{ padding: '3rem 1.5rem' }}>Loading course catalog...</div>}>
      <PathCatalogClient categories={categories} allPaths={allPaths} />
    </Suspense>
  );
}

