import React from 'react';
import { getPathBySlug } from '@/content';
import { Path } from '@/types/content';
import { CoursePathClient } from '@/components/Path/CoursePathClient';
import { notFound } from 'next/navigation';

interface PathPageProps {
  params: Promise<{
    pathSlug: string;
  }>;
}

export async function generateMetadata({ params }: PathPageProps) {
  const { pathSlug } = await params;
  const path = getPathBySlug(pathSlug);

  if (!path || !('modules' in path)) {
    notFound();
  }

  return {
    title: `${path.title} | First Move (11–18)`,
    description: path.description,
  };
}

export default async function GenericPathPage({ params }: PathPageProps) {
  const { pathSlug } = await params;
  const pathObj = getPathBySlug(pathSlug);

  if (!pathObj || !('modules' in pathObj)) {
    notFound();
  }

  const path = pathObj as Path;
  return <CoursePathClient path={path} />;
}
