import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllPaths, getPathBySlug, getProjectDetails } from '@/content';
import { Path } from '@/types/content';
import { ProjectView } from '@/components/Project/ProjectView';

interface ProjectPageProps {
  params: Promise<{
    pathSlug: string;
    projectSlug: string;
  }>;
}

export function generateStaticParams() {
  const params: { pathSlug: string; projectSlug: string }[] = [];
  for (const p of getAllPaths()) {
    const fullPath = getPathBySlug(p.slug);
    if (fullPath && 'modules' in fullPath) {
      for (const proj of (fullPath as Path).projects || []) {
        params.push({ pathSlug: p.slug, projectSlug: proj.slug });
      }
    }
  }
  return params;
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { pathSlug, projectSlug } = await params;
  const details = getProjectDetails(pathSlug, projectSlug);

  if (!details) {
    return {
      title: 'Project Not Found | First Move (11~18)',
      robots: { index: false, follow: false },
    };
  }

  const canonicalUrl = `/paths/${pathSlug}/projects/${projectSlug}`;

  return {
    title: `${details.project.title} - ${details.path.title} | First Move (11~18)`,
    description: details.project.subtitle || details.project.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${details.project.title} - ${details.path.title} | First Move (11~18)`,
      description: details.project.subtitle || details.project.description,
      url: canonicalUrl,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${details.project.title} - ${details.path.title} | First Move (11~18)`,
      description: details.project.subtitle || details.project.description,
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { pathSlug, projectSlug } = await params;
  const details = getProjectDetails(pathSlug, projectSlug);

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
        name: details.project.title,
        item: `https://first-move-11-18.vercel.app/paths/${pathSlug}/projects/${projectSlug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ProjectView
        path={details.path}
        project={details.project}
        projectIndex={details.projectIndex}
        totalProjects={details.totalProjects}
      />
    </>
  );
}
