import React from 'react';
import { notFound } from 'next/navigation';
import { getProjectDetails } from '@/content';
import { ProjectView } from '@/components/Project/ProjectView';

interface ProjectPageProps {
  params: Promise<{
    pathSlug: string;
    projectSlug: string;
  }>;
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { pathSlug, projectSlug } = await params;
  const details = getProjectDetails(pathSlug, projectSlug);

  if (!details) {
    return {
      title: 'Project Not Found | First Move(11~18)',
    };
  }

  return {
    title: `${details.project.title} - ${details.path.title} | First Move(11~18)`,
    description: details.project.subtitle,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { pathSlug, projectSlug } = await params;
  const details = getProjectDetails(pathSlug, projectSlug);

  if (!details) {
    notFound();
  }

  return (
    <ProjectView
      path={details.path}
      project={details.project}
      projectIndex={details.projectIndex}
      totalProjects={details.totalProjects}
    />
  );
}
