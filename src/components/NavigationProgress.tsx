'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

function NavigationProgressBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentKey = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
  const [prevKey, setPrevKey] = useState(currentKey);
  const [isNavigating, setIsNavigating] = useState(false);

  // Turn off progress indicator during render as soon as new URL arrives
  if (prevKey !== currentKey) {
    setPrevKey(currentKey);
    setIsNavigating(false);
  }

  useEffect(() => {
    // Intercept clicks on internal links to provide instant feedback
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (!target) return;

      const href = target.getAttribute('href');
      const targetAttr = target.getAttribute('target');

      // Only trigger for internal links that are not new tabs or downloads or hash links
      if (
        href &&
        href.startsWith('/') &&
        !href.startsWith('//') &&
        targetAttr !== '_blank' &&
        !target.hasAttribute('download')
      ) {
        const currentFull = window.location.pathname + window.location.search;
        if (href !== currentFull && !href.startsWith('#')) {
          setIsNavigating(true);
        }
      }
    };

    document.addEventListener('click', handleAnchorClick, { capture: true });
    return () => {
      document.removeEventListener('click', handleAnchorClick, { capture: true });
    };
  }, []);

  if (!isNavigating) return null;

  return <div className="nav-progress-bar" role="progressbar" aria-label="Loading page..." />;
}

export function NavigationProgress() {
  return (
    <Suspense fallback={null}>
      <NavigationProgressBar />
    </Suspense>
  );
}
