import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllPaths, getPathBySlug, getLessonDetails } from '@/content';
import { Path } from '@/types/content';
import { LessonWorkbench } from '@/components/Workbench/LessonWorkbench';

interface PageProps {
  params: Promise<{
    pathSlug: string;
    lessonSlug: string;
  }>;
}

export function generateStaticParams() {
  const params: { pathSlug: string; lessonSlug: string }[] = [];
  for (const p of getAllPaths()) {
    const fullPath = getPathBySlug(p.slug);
    if (fullPath && 'modules' in fullPath) {
      for (const mod of (fullPath as Path).modules || []) {
        for (const les of mod.lessons || []) {
          params.push({ pathSlug: p.slug, lessonSlug: les.slug });
        }
      }
    }
  }
  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { pathSlug, lessonSlug } = await params;
  const details = getLessonDetails(pathSlug, lessonSlug);

  if (!details) {
    return {
      title: 'Lesson Not Found | First Move (11~18)',
      robots: { index: false, follow: false },
    };
  }

  const canonicalUrl = `/paths/${pathSlug}/lessons/${lessonSlug}`;

  return {
    title: `${details.lesson.title} - ${details.path.title} | First Move (11~18)`,
    description: details.lesson.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${details.lesson.title} - ${details.path.title} | First Move (11~18)`,
      description: details.lesson.description,
      url: canonicalUrl,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${details.lesson.title} - ${details.path.title} | First Move (11~18)`,
      description: details.lesson.description,
    },
  };
}

export default async function LessonPage({ params }: PageProps) {
  const { pathSlug, lessonSlug } = await params;
  const details = getLessonDetails(pathSlug, lessonSlug);

  if (!details) {
    notFound();
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://first-move-11-18.vercel.app',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Learning Paths',
        item: 'https://first-move-11-18.vercel.app/paths',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: details.path.title,
        item: `https://first-move-11-18.vercel.app/paths/${pathSlug}`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: details.lesson.title,
        item: `https://first-move-11-18.vercel.app/paths/${pathSlug}/lessons/${lessonSlug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <LessonWorkbench
        key={details.lesson.id}
        path={details.path}
        module={details.module}
        lesson={details.lesson}
        prevLesson={details.prevLesson}
        nextLesson={details.nextLesson}
        lessonIndex={details.lessonIndex}
        totalLessons={details.totalLessons}
      />
    </>
  );
}
