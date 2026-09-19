import React, { Suspense } from 'react';
import { getAllCategories, getAllPaths } from '@/content';
import { PathCatalogClient } from '@/components/Path/PathCatalogClient';

export const metadata = {
  title: 'Multi-Course Catalog | First Move (11~18)',
  description: 'Explore structured technology learning paths across Programming, Computer Science, Web Development, AI, Security, and Career Skills.',
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

