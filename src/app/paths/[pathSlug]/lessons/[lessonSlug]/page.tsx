import React from 'react';
import { notFound } from 'next/navigation';
import { getLessonDetails } from '@/content';
import { LessonWorkbench } from '@/components/Workbench/LessonWorkbench';

interface PageProps {
  params: Promise<{
    pathSlug: string;
    lessonSlug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { pathSlug, lessonSlug } = await params;
  const details = getLessonDetails(pathSlug, lessonSlug);

  if (!details) {
    return {
      title: 'Lesson Not Found | First Move (11~18)',
    };
  }

  return {
    title: `${details.lesson.title} - ${details.path.title} | First Move (11~18)`,
    description: details.lesson.description,
  };
}

export default async function LessonPage({ params }: PageProps) {
  const { pathSlug, lessonSlug } = await params;
  const details = getLessonDetails(pathSlug, lessonSlug);

  if (!details) {
    notFound();
  }

  return (
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
  );
}
