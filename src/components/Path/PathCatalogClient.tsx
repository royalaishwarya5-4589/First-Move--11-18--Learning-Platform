'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Badge } from '@/components/Badge';
import { Button } from '@/components/Button';
import { CategorySummary, PathSummary } from '@/content/paths';
import { CourseImage } from '@/components/Course/CourseImage';
import { getCourseImages } from '@/content/course-images';
import { getCourseCareerMetadata } from '@/content/course-career-data';

interface PathCatalogClientProps {
  categories: CategorySummary[];
  allPaths: PathSummary[];
}

export function PathCatalogClient({ categories, allPaths }: PathCatalogClientProps) {
  const searchParams = useSearchParams();

  // Search & Basic Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(
    () => searchParams.get('category') || 'all'
  );
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');

  // Faceted Multi-Select Filters matching screenshot
  const [selectedAreas, setSelectedAreas] = useState<string[]>(() => {
    const area = searchParams.get('area');
    return area ? [area] : [];
  });
  const [selectedTools, setSelectedTools] = useState<string[]>(() => {
    const tool = searchParams.get('tool');
    return tool ? [tool] : [];
  });
  const [selectedRoles, setSelectedRoles] = useState<string[]>(() => {
    const role = searchParams.get('role');
    return role ? [role] : [];
  });

  // Accordion collapse state for sidebar sections
  const [cyberSecurityOpen, setCyberSecurityOpen] = useState(true);
  const [areasSectionOpen, setAreasSectionOpen] = useState(true);
  const [jobRolesSectionOpen, setJobRolesSectionOpen] = useState(true);
  const [toolsSectionOpen, setToolsSectionOpen] = useState(true);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Aggregate all unique areas, tools, and roles from course metadata
  const { allFacetAreas, allFacetTools, allFacetRoles } = useMemo(() => {
    const areasSet = new Set<string>();
    const toolsSet = new Set<string>();
    const rolesSet = new Set<string>();

    allPaths.forEach((path) => {
      const meta = getCourseCareerMetadata(path.slug);
      meta.areas?.forEach((a) => areasSet.add(a.name));
      meta.tools?.forEach((t) => toolsSet.add(t.name));
      meta.jobRoles?.forEach((r) => rolesSet.add(r.title));
    });

    return {
      allFacetAreas: Array.from(areasSet),
      allFacetTools: Array.from(toolsSet),
      allFacetRoles: Array.from(rolesSet),
    };
  }, [allPaths]);

  // Handle toggling faceted filters
  const toggleArea = (areaName: string) => {
    setSelectedAreas((prev) =>
      prev.includes(areaName) ? prev.filter((a) => a !== areaName) : [...prev, areaName]
    );
  };

  const toggleTool = (toolName: string) => {
    setSelectedTools((prev) =>
      prev.includes(toolName) ? prev.filter((t) => t !== toolName) : [...prev, toolName]
    );
  };

  const toggleRole = (roleTitle: string) => {
    setSelectedRoles((prev) =>
      prev.includes(roleTitle) ? prev.filter((r) => r !== roleTitle) : [...prev, roleTitle]
    );
  };

  const resetAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedStatus('all');
    setSelectedDifficulty('all');
    setSelectedAreas([]);
    setSelectedTools([]);
    setSelectedRoles([]);
  };

  const totalActiveFiltersCount =
    (selectedCategory !== 'all' ? 1 : 0) +
    (selectedStatus !== 'all' ? 1 : 0) +
    (selectedDifficulty !== 'all' ? 1 : 0) +
    selectedAreas.length +
    selectedTools.length +
    selectedRoles.length +
    (searchQuery.trim() ? 1 : 0);

  // Filter paths
  const filteredPaths = allPaths.filter((path) => {
    const careerMeta = getCourseCareerMetadata(path.slug);
    const searchTarget = `${path.title} ${path.subtitle} ${path.description} ${careerMeta.skills.technical.join(' ')} ${careerMeta.tools.map((t) => t.name).join(' ')} ${careerMeta.areas.map((a) => a.name).join(' ')} ${careerMeta.jobRoles.map((r) => r.title).join(' ')}`.toLowerCase();
    const matchesSearch = searchTarget.includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'all' || path.category === selectedCategory;
    const matchesStatus =
      selectedStatus === 'all' ||
      (selectedStatus === 'active' && path.isActive) ||
      (selectedStatus === 'coming_soon' && !path.isActive);

    const difficulty = (path as unknown as { difficulty?: string }).difficulty || (path.slug === 'python' || path.slug === 'html-css' ? 'beginner' : 'intermediate');
    const matchesDifficulty =
      selectedDifficulty === 'all' || difficulty === selectedDifficulty;

    // Faceted matches
    const pathAreaNames = careerMeta.areas.map((a) => a.name.toLowerCase());
    const matchesAreas =
      selectedAreas.length === 0 ||
      selectedAreas.some((selectedArea) =>
        pathAreaNames.some((pa) => pa.includes(selectedArea.toLowerCase()) || selectedArea.toLowerCase().includes(pa))
      );

    const pathToolNames = careerMeta.tools.map((t) => t.name.toLowerCase());
    const matchesTools =
      selectedTools.length === 0 ||
      selectedTools.some((selectedTool) =>
        pathToolNames.some((pt) => pt.includes(selectedTool.toLowerCase()) || selectedTool.toLowerCase().includes(pt))
      );

    const pathRoleTitles = careerMeta.jobRoles.map((r) => r.title.toLowerCase());
    const matchesRoles =
      selectedRoles.length === 0 ||
      selectedRoles.some((selectedRole) =>
        pathRoleTitles.some((pr) => pr.includes(selectedRole.toLowerCase()) || selectedRole.toLowerCase().includes(pr))
      );

    return matchesSearch && matchesCategory && matchesStatus && matchesDifficulty && matchesAreas && matchesTools && matchesRoles;
  });

  return (
    <div className="site-container-wide">
      {/* Header Banner */}
      <div style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
          <span
            style={{
              backgroundColor: '#EFF6FF',
              color: '#1D4ED8',
              fontSize: '0.85rem',
              fontWeight: 800,
              padding: '0.3rem 0.75rem',
              borderRadius: '6px',
              border: '1px solid #BFDBFE',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
            }}
          >
            Course-to-Career Catalog
          </span>
          <span style={{ fontSize: '0.925rem', color: '#64748B', fontWeight: 600 }}>
            • 15+ Verified Curricula
          </span>
        </div>

        <h1
          style={{
            fontSize: 'clamp(1.85rem, 3.2vw + 0.5rem, 2.75rem)',
            fontWeight: 850,
            color: 'var(--text-main, #0F172A)',
            letterSpacing: '-0.02em',
            margin: '0.35rem 0 0.5rem 0',
            lineHeight: 1.2,
          }}
        >
          Explore Courses, Industry Areas &amp; Job Roles
        </h1>

        <p style={{ color: 'var(--text-muted, #64748B)', fontSize: 'clamp(1rem, 0.5vw + 0.9rem, 1.125rem)', maxWidth: '960px', margin: 0, lineHeight: 1.65 }}>
          Filter programs by real-world application areas, developer tooling stacks, and career profiles matching the enterprise standards of L&amp;T EduTech.
        </p>

        {/* Mobile Filter Toggle Button */}
        <div style={{ marginTop: '1.25rem' }}>
          <button
            type="button"
            className="mobile-filter-toggle btn-interactive"
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            aria-expanded={mobileFilterOpen}
          >
            <span>⚡ Filters &amp; Facets {totalActiveFiltersCount > 0 ? `(${totalActiveFiltersCount} active)` : ''}</span>
            <span>{mobileFilterOpen ? '▲ Hide Filters' : '▼ Show Filters'}</span>
          </button>
        </div>
      </div>

      {/* Main 2-Column Catalog Container */}
      <div className="catalog-layout-grid">
        {/* ========================================================= */}
        {/* LEFT FACETED SIDEBAR FILTERS (Matching Screenshot) */}
        {/* ========================================================= */}
        <aside className={`catalog-filter-aside ${mobileFilterOpen ? 'open' : ''}`}>
          {/* Header Row with Filter Count & Clear */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color, #E2E8F0)', paddingBottom: '0.85rem' }}>
            <span style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-main, #0F172A)' }}>
              Filters {totalActiveFiltersCount > 0 && `(${totalActiveFiltersCount})`}
            </span>
            {totalActiveFiltersCount > 0 && (
              <button
                type="button"
                onClick={resetAllFilters}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#2563EB',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  padding: 0,
                }}
              >
                Clear All
              </button>
            )}
          </div>

          {/* Section 1: Domain / Topic Accordion (Cyber Security Style) */}
          <div>
            <button
              type="button"
              onClick={() => setCyberSecurityOpen(!cyberSecurityOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                background: 'none',
                border: 'none',
                padding: '0.35rem 0',
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              <span style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main, #0F172A)' }}>
                Domains &amp; Categories
              </span>
              <span
                style={{
                  fontSize: '0.85rem',
                  color: '#64748B',
                  transform: cyberSecurityOpen ? 'rotate(180deg)' : 'none',
                  transition: 'transform 180ms ease',
                }}
              >
                ▼
              </span>
            </button>

            {cyberSecurityOpen && (
              <div style={{ marginTop: '0.65rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                <button
                  type="button"
                  onClick={() => setSelectedCategory('all')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.45rem 0.65rem',
                    borderRadius: '6px',
                    border: 'none',
                    fontSize: '0.86rem',
                    fontWeight: selectedCategory === 'all' ? 700 : 500,
                    backgroundColor: selectedCategory === 'all' ? '#EFF6FF' : 'transparent',
                    color: selectedCategory === 'all' ? '#1D4ED8' : 'var(--text-main, #334155)',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <span>All Categories</span>
                  <span style={{ fontSize: '0.75rem', color: '#64748B' }}>{allPaths.length}</span>
                </button>

                {categories.map((cat) => {
                  const isSelected = selectedCategory === cat.id;
                  const catCount = allPaths.filter((p) => p.category === cat.id).length;

                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategory(isSelected ? 'all' : cat.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.45rem 0.65rem',
                        borderRadius: '6px',
                        border: 'none',
                        fontSize: '0.86rem',
                        fontWeight: isSelected ? 700 : 500,
                        backgroundColor: isSelected ? '#EFF6FF' : 'transparent',
                        color: isSelected ? '#1D4ED8' : 'var(--text-main, #334155)',
                        cursor: 'pointer',
                        textAlign: 'left',
                      }}
                    >
                      <span>
                        {cat.icon} {cat.title}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: '#64748B' }}>{catCount}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Section 2: Areas Tag & Checkboxes (Matching Screenshot Exactly) */}
          <div style={{ borderTop: '1px solid var(--border-color, #E2E8F0)', paddingTop: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              {/* Blue Pill Tag for "Areas" matching screenshot */}
              <span
                style={{
                  backgroundColor: '#EFF6FF',
                  color: '#2563EB',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  padding: '0.2rem 0.65rem',
                  borderRadius: '6px',
                  border: '1px solid #BFDBFE',
                }}
              >
                Areas
              </span>
              <button
                type="button"
                onClick={() => setAreasSectionOpen(!areasSectionOpen)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#64748B',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  transform: areasSectionOpen ? 'rotate(180deg)' : 'none',
                  transition: 'transform 180ms ease',
                }}
              >
                ▼
              </button>
            </div>

            {areasSectionOpen && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', maxHeight: '240px', overflowY: 'auto', paddingRight: '0.25rem' }}>
                {allFacetAreas.slice(0, 14).map((areaName) => {
                  const isChecked = selectedAreas.includes(areaName);

                  return (
                    <label
                      key={areaName}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.65rem',
                        fontSize: '0.875rem',
                        color: isChecked ? '#1D4ED8' : 'var(--text-main, #1E293B)',
                        fontWeight: isChecked ? 700 : 500,
                        cursor: 'pointer',
                        padding: '0.25rem 0.35rem',
                        borderRadius: '4px',
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleArea(areaName)}
                        style={{
                          width: '16px',
                          height: '16px',
                          accentColor: '#2563EB',
                          cursor: 'pointer',
                        }}
                      />
                      <span>{areaName}</span>
                    </label>
                  );
                })}
              </div>
            )}
          </div>

          {/* Section 3: Job Roles Tag & Checkboxes (Matching Screenshot Exactly) */}
          <div style={{ borderTop: '1px solid var(--border-color, #E2E8F0)', paddingTop: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              {/* Blue Pill Tag for "Job Roles" matching screenshot */}
              <span
                style={{
                  backgroundColor: '#EFF6FF',
                  color: '#2563EB',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  padding: '0.2rem 0.65rem',
                  borderRadius: '6px',
                  border: '1px solid #BFDBFE',
                }}
              >
                Job Roles
              </span>
              <button
                type="button"
                onClick={() => setJobRolesSectionOpen(!jobRolesSectionOpen)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#64748B',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  transform: jobRolesSectionOpen ? 'rotate(180deg)' : 'none',
                  transition: 'transform 180ms ease',
                }}
              >
                ▼
              </button>
            </div>

            {jobRolesSectionOpen && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', maxHeight: '240px', overflowY: 'auto', paddingRight: '0.25rem' }}>
                {allFacetRoles.slice(0, 14).map((roleTitle) => {
                  const isChecked = selectedRoles.includes(roleTitle);

                  return (
                    <label
                      key={roleTitle}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.65rem',
                        fontSize: '0.875rem',
                        color: isChecked ? '#1D4ED8' : 'var(--text-main, #1E293B)',
                        fontWeight: isChecked ? 700 : 500,
                        cursor: 'pointer',
                        padding: '0.25rem 0.35rem',
                        borderRadius: '4px',
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleRole(roleTitle)}
                        style={{
                          width: '16px',
                          height: '16px',
                          accentColor: '#2563EB',
                          cursor: 'pointer',
                        }}
                      />
                      <span>{roleTitle}</span>
                    </label>
                  );
                })}
              </div>
            )}
          </div>

          {/* Section 4: Tools Tag & Checkboxes (Matching Screenshot Exactly) */}
          <div style={{ borderTop: '1px solid var(--border-color, #E2E8F0)', paddingTop: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              {/* Blue Pill Tag for "Tools" matching screenshot */}
              <span
                style={{
                  backgroundColor: '#EFF6FF',
                  color: '#2563EB',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  padding: '0.2rem 0.65rem',
                  borderRadius: '6px',
                  border: '1px solid #BFDBFE',
                }}
              >
                Tools
              </span>
              <button
                type="button"
                onClick={() => setToolsSectionOpen(!toolsSectionOpen)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#64748B',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  transform: toolsSectionOpen ? 'rotate(180deg)' : 'none',
                  transition: 'transform 180ms ease',
                }}
              >
                ▼
              </button>
            </div>

            {toolsSectionOpen && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', maxHeight: '240px', overflowY: 'auto', paddingRight: '0.25rem' }}>
                {allFacetTools.slice(0, 14).map((toolName) => {
                  const isChecked = selectedTools.includes(toolName);

                  return (
                    <label
                      key={toolName}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.65rem',
                        fontSize: '0.875rem',
                        color: isChecked ? '#1D4ED8' : 'var(--text-main, #1E293B)',
                        fontWeight: isChecked ? 700 : 500,
                        cursor: 'pointer',
                        padding: '0.25rem 0.35rem',
                        borderRadius: '4px',
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleTool(toolName)}
                        style={{
                          width: '16px',
                          height: '16px',
                          accentColor: '#2563EB',
                          cursor: 'pointer',
                        }}
                      />
                      <span>{toolName}</span>
                    </label>
                  );
                })}
              </div>
            )}
          </div>
        </aside>

        {/* ========================================================= */}
        {/* RIGHT MAIN CONTENT: SEARCH, ACTIVE CHIPS, & COURSE CARDS */}
        {/* ========================================================= */}
        <main style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Search Bar & Level Selector */}
          <div
            style={{
              backgroundColor: 'var(--bg-surface, #FFFFFF)',
              border: '1px solid var(--border-color, #E2E8F0)',
              borderRadius: '16px',
              padding: '1.25rem 1.5rem',
              display: 'flex',
              gap: '1rem',
              flexWrap: 'wrap',
              alignItems: 'center',
              boxShadow: '0 2px 8px rgba(15, 23, 42, 0.03)',
            }}
          >
            <div style={{ flex: '1 1 320px', position: 'relative' }}>
              <input
                type="text"
                placeholder="🔍 Search by course, tool (Pandas, PyTorch, React), or job role..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.85rem 1.15rem',
                  borderRadius: '10px',
                  border: '1px solid var(--border-color, #CBD5E1)',
                  backgroundColor: 'var(--bg-app, #F8FAFC)',
                  color: 'var(--text-main, #0F172A)',
                  fontSize: '0.95rem',
                  outline: 'none',
                }}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: '#94A3B8',
                    cursor: 'pointer',
                    fontSize: '1rem',
                  }}
                >
                  ✕
                </button>
              )}
            </div>

            {/* Status Selector */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              style={{
                padding: '0.85rem 1rem',
                borderRadius: '10px',
                border: '1px solid var(--border-color, #CBD5E1)',
                backgroundColor: 'var(--bg-app, #F8FAFC)',
                color: 'var(--text-main, #0F172A)',
                fontSize: '0.88rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              <option value="all">All Statuses ({allPaths.length})</option>
              <option value="active">Active Flagships ({allPaths.filter((p) => p.isActive).length})</option>
              <option value="coming_soon">Upcoming Roadmap</option>
            </select>

            {/* Difficulty Selector */}
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              style={{
                padding: '0.85rem 1rem',
                borderRadius: '10px',
                border: '1px solid var(--border-color, #CBD5E1)',
                backgroundColor: 'var(--bg-app, #F8FAFC)',
                color: 'var(--text-main, #0F172A)',
                fontSize: '0.88rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              <option value="all">All Difficulties</option>
              <option value="beginner">Beginner Friendly</option>
              <option value="intermediate">Intermediate Level</option>
              <option value="advanced">Advanced Mastery</option>
            </select>
          </div>

          {/* Active Filter Chips Bar */}
          {totalActiveFiltersCount > 0 && (
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748B' }}>
                Active Filters:
              </span>

              {selectedCategory !== 'all' && (
                <span
                  style={{
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    padding: '0.2rem 0.6rem',
                    borderRadius: '20px',
                    backgroundColor: '#EFF6FF',
                    color: '#1D4ED8',
                    border: '1px solid #BFDBFE',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                  }}
                >
                  <span>Category: {selectedCategory}</span>
                  <button
                    type="button"
                    onClick={() => setSelectedCategory('all')}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#1D4ED8', padding: 0 }}
                  >
                    ×
                  </button>
                </span>
              )}

              {selectedAreas.map((area) => (
                <span
                  key={area}
                  style={{
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    padding: '0.2rem 0.6rem',
                    borderRadius: '20px',
                    backgroundColor: '#EFF6FF',
                    color: '#1D4ED8',
                    border: '1px solid #BFDBFE',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                  }}
                >
                  <span>Area: {area}</span>
                  <button
                    type="button"
                    onClick={() => toggleArea(area)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#1D4ED8', padding: 0 }}
                  >
                    ×
                  </button>
                </span>
              ))}

              {selectedRoles.map((role) => (
                <span
                  key={role}
                  style={{
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    padding: '0.2rem 0.6rem',
                    borderRadius: '20px',
                    backgroundColor: '#F0FDF4',
                    color: '#15803D',
                    border: '1px solid #BBF7D0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                  }}
                >
                  <span>Role: {role}</span>
                  <button
                    type="button"
                    onClick={() => toggleRole(role)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#15803D', padding: 0 }}
                  >
                    ×
                  </button>
                </span>
              ))}

              {selectedTools.map((tool) => (
                <span
                  key={tool}
                  style={{
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    padding: '0.2rem 0.6rem',
                    borderRadius: '20px',
                    backgroundColor: '#F8FAFC',
                    color: '#334155',
                    border: '1px solid #CBD5E1',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                  }}
                >
                  <span>Tool: {tool}</span>
                  <button
                    type="button"
                    onClick={() => toggleTool(tool)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#334155', padding: 0 }}
                  >
                    ×
                  </button>
                </span>
              ))}

              <button
                type="button"
                onClick={resetAllFilters}
                style={{
                  fontSize: '0.78rem',
                  color: '#EF4444',
                  fontWeight: 700,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  marginLeft: '0.4rem',
                }}
              >
                Reset All
              </button>
            </div>
          )}

          {/* Results Count Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main, #0F172A)' }}>
              Showing {filteredPaths.length} of {allPaths.length} Courses
            </span>
          </div>

          {/* Courses Cards Grid */}
          {filteredPaths.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: '4.5rem 1rem',
                backgroundColor: 'var(--bg-surface, #FFFFFF)',
                borderRadius: '16px',
                border: '1px dashed var(--border-color, #CBD5E1)',
              }}
            >
              <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '0.75rem' }}>🔍</span>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--text-main, #0F172A)' }}>
                No courses match your selected filter criteria
              </h3>
              <p style={{ color: 'var(--text-muted, #64748B)', fontSize: '0.95rem', maxWidth: '480px', margin: '0 auto 1.25rem auto' }}>
                Try unchecking some checkboxes in the Areas, Job Roles, or Tools sidebar, or clear your search term.
              </p>
              <button
                type="button"
                onClick={resetAllFilters}
                style={{
                  padding: '0.65rem 1.25rem',
                  borderRadius: '8px',
                  backgroundColor: '#2563EB',
                  color: '#FFFFFF',
                  fontWeight: 700,
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(280px, 22vw, 360px), 1fr))',
                gap: '1.75rem',
              }}
            >
              {filteredPaths.map((path) => {
                const images = getCourseImages(path.slug);
                const careerMeta = getCourseCareerMetadata(path.slug);
                const difficulty =
                  (path as unknown as { difficulty?: string }).difficulty ||
                  (path.slug === 'python' || path.slug === 'html-css' ? 'Beginner' : 'Intermediate');

                return (
                  <div
                    key={path.id}
                    className="catalog-course-card"
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      backgroundColor: 'var(--bg-surface, #FFFFFF)',
                      border: '1px solid var(--border-color, #E2E8F0)',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      boxShadow: '0 2px 8px rgba(15, 23, 42, 0.04)',
                      transition: 'transform 220ms ease, box-shadow 220ms ease, border-color 220ms ease',
                      position: 'relative',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#2563EB';
                      e.currentTarget.style.transform = 'translateY(-3px)';
                      e.currentTarget.style.boxShadow =
                        '0 14px 30px -4px rgba(37, 99, 235, 0.12), 0 4px 12px rgba(15, 23, 42, 0.06)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border-color, #E2E8F0)';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 2px 8px rgba(15, 23, 42, 0.04)';
                    }}
                  >
                    {/* Course Visual Thumbnail */}
                    <div style={{ position: 'relative' }}>
                      <CourseImage
                        src={images.thumbnailImage}
                        alt={images.altText}
                        aspectRatio="16/9"
                        accentColor={images.accentColor}
                        fallbackIcon={path.icon}
                      />

                      {/* Category Pill Tag */}
                      <div
                        style={{
                          position: 'absolute',
                          top: '12px',
                          left: '12px',
                          zIndex: 2,
                        }}
                      >
                        <Badge variant="active">{path.categoryLabel}</Badge>
                      </div>

                      {/* Difficulty Tag */}
                      <div
                        style={{
                          position: 'absolute',
                          top: '12px',
                          right: '12px',
                          zIndex: 2,
                        }}
                      >
                        <span
                          style={{
                            fontSize: '0.725rem',
                            fontWeight: 700,
                            backgroundColor: 'rgba(255, 255, 255, 0.95)',
                            color: '#0F172A',
                            padding: '0.2rem 0.55rem',
                            borderRadius: '6px',
                            border: '1px solid #E2E8F0',
                            backdropFilter: 'blur(4px)',
                          }}
                        >
                          ⭐ {difficulty}
                        </span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div
                      style={{
                        padding: '1.4rem',
                        display: 'flex',
                        flexDirection: 'column',
                        flex: 1,
                        justifyContent: 'space-between',
                      }}
                    >
                      <div>
                        <h3
                          style={{
                            fontSize: '1.2rem',
                            fontWeight: 800,
                            marginBottom: '0.45rem',
                            color: 'var(--text-main, #0F172A)',
                            lineHeight: 1.3,
                          }}
                        >
                          {path.title}
                        </h3>

                        <p
                          style={{
                            fontSize: '0.865rem',
                            color: 'var(--text-muted, #64748B)',
                            marginBottom: '1rem',
                            lineHeight: 1.45,
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                          }}
                        >
                          {careerMeta.tagline || path.subtitle || path.description}
                        </p>

                        {/* Top 2 Areas Covered */}
                        <div style={{ marginBottom: '0.85rem' }}>
                          <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748B', display: 'block', marginBottom: '0.35rem' }}>
                            APPLICATION AREAS:
                          </span>
                          <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                            {careerMeta.areas.slice(0, 3).map((a) => (
                              <span
                                key={a.id}
                                style={{
                                  fontSize: '0.72rem',
                                  fontWeight: 600,
                                  padding: '0.15rem 0.45rem',
                                  borderRadius: '4px',
                                  backgroundColor: '#EFF6FF',
                                  color: '#1D4ED8',
                                  border: '1px solid #DBEAFE',
                                }}
                              >
                                {a.icon} {a.name}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Top 2 Job Roles */}
                        <div style={{ marginBottom: '1.25rem' }}>
                          <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748B', display: 'block', marginBottom: '0.35rem' }}>
                            CAREER ROLES:
                          </span>
                          <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                            {careerMeta.jobRoles.slice(0, 2).map((r) => (
                              <span
                                key={r.id}
                                style={{
                                  fontSize: '0.72rem',
                                  fontWeight: 600,
                                  padding: '0.15rem 0.45rem',
                                  borderRadius: '4px',
                                  backgroundColor: '#F0FDF4',
                                  color: '#15803D',
                                  border: '1px solid #DCFCE7',
                                }}
                              >
                                💼 {r.title}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div>
                        {/* Metrics Bar */}
                        <div
                          style={{
                            backgroundColor: 'var(--bg-app, #F8FAFC)',
                            borderRadius: '8px',
                            padding: '0.65rem 0.85rem',
                            marginBottom: '1rem',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            fontSize: '0.785rem',
                            color: 'var(--text-muted, #64748B)',
                            border: '1px solid var(--border-color, #E2E8F0)',
                          }}
                        >
                          <span>⏱️ ~{path.estimatedHours}h</span>
                          <span>📚 {path.totalLessons} Lessons</span>
                          <span style={{ color: '#15803D', fontWeight: 700 }}>
                            {path.isActive ? 'Active Program' : 'Roadmap'}
                          </span>
                        </div>

                        {/* CTA Link */}
                        <Link
                          href={`/paths/${path.slug}`}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.4rem',
                            width: '100%',
                            padding: '0.7rem 1rem',
                            borderRadius: '8px',
                            backgroundColor: '#1E40AF',
                            color: '#FFFFFF',
                            fontWeight: 700,
                            fontSize: '0.88rem',
                            textDecoration: 'none',
                            boxShadow: '0 2px 8px rgba(30, 64, 175, 0.28)',
                            transition: 'background-color 160ms ease, transform 160ms ease',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#1D4ED8';
                            e.currentTarget.style.transform = 'translateY(-1px)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = '#1E40AF';
                            e.currentTarget.style.transform = 'translateY(0)';
                          }}
                        >
                          <span>Explore Curriculum &amp; Careers</span>
                          <span>→</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .site-container > div {
            grid-template-columns: 1fr !important;
          }
          aside {
            position: static !important;
            max-height: none !important;
          }
        }
      `}</style>
    </div>
  );
}
