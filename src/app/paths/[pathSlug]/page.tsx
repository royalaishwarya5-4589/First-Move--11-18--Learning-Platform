import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllPaths, getPathBySlug } from '@/content';
import { Path } from '@/types/content';
import { CoursePathClient } from '@/components/Path/CoursePathClient';

interface PathPageProps {
  params: Promise<{
    pathSlug: string;
  }>;
}

export function generateStaticParams() {
  return getAllPaths().map((p) => ({
    pathSlug: p.slug,
  }));
}

export async function generateMetadata({ params }: PathPageProps): Promise<Metadata> {
  const { pathSlug } = await params;
  const path = getPathBySlug(pathSlug);

  if (!path || !('modules' in path)) {
    return {
      title: 'Path Not Found | First Move (11~18)',
      robots: { index: false, follow: false },
    };
  }

  const canonicalUrl = `/paths/${pathSlug}`;

  return {
    title: `${path.title} | First Move (11~18)`,
    description: path.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${path.title} | First Move (11~18)`,
      description: path.description,
      url: canonicalUrl,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${path.title} | First Move (11~18)`,
      description: path.description,
    },
  };
}

export default async function GenericPathPage({ params }: PathPageProps) {
  const { pathSlug } = await params;
  const pathObj = getPathBySlug(pathSlug);

  if (!pathObj || !('modules' in pathObj)) {
    notFound();
  }

  const path = pathObj as Path;

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
