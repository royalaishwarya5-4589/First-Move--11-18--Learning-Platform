'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  MEGA_MENU_CATEGORIES,
  MegaMenuCategory,
  MegaMenuSubcategory,
  getCourseCareerMetadata,
  CourseCareerMetadata,
} from '@/content/course-career-data';

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activeMenuType?: 'courses' | 'course-pathway' | 'career-pathway';
}

export function MegaMenu({ isOpen, onClose, activeMenuType = 'courses' }: MegaMenuProps) {
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);

  // Expanded categories accordion (default: first category expanded)
  const [expandedCategoryIds, setExpandedCategoryIds] = useState<string[]>([
    MEGA_MENU_CATEGORIES[0]?.id || 'it',
  ]);

  // Selected subcategory for dynamic Columns 2, 3, 4 (default: Generative AI)
  const [selectedSubcategory, setSelectedSubcategory] = useState<MegaMenuSubcategory>(
    MEGA_MENU_CATEGORIES[0]?.subcategories[0] || {
      name: 'Generative AI',
      slug: 'genai-llm-agents',
      description: 'Autonomous agents, RAG, and foundation models.',
    }
  );

  // Career metadata for selected subcategory derived directly from selectedSubcategory
  const careerMeta = getCourseCareerMetadata(selectedSubcategory.slug);

  // Handle clicking outside to close
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Handle escape key
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const toggleCategoryExpand = (catId: string) => {
    setExpandedCategoryIds((prev) =>
      prev.includes(catId) ? prev.filter((id) => id !== catId) : [...prev, catId]
    );
  };

  const handleSubcategorySelect = (sub: MegaMenuSubcategory) => {
    setSelectedSubcategory(sub);
  };

  const handleNavigateToCourse = (slug: string) => {
    onClose();
    router.push(`/paths/${slug}`);
  };

  const handleFilterCatalog = (filterType: 'area' | 'tool' | 'role', value: string) => {
    onClose();
    router.push(`/paths?${filterType}=${encodeURIComponent(value)}`);
  };

  return (
    <div
      ref={menuRef}
      className="mega-menu-container"
      style={{
        position: 'absolute',
        top: '100%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'min(1240px, 96vw)',
        backgroundColor: 'var(--bg-surface, #FFFFFF)',
        borderRadius: '16px',
        border: '1px solid var(--border-color, #E2E8F0)',
        boxShadow: '0 24px 54px -12px rgba(15, 23, 42, 0.22), 0 8px 24px -4px rgba(0, 0, 0, 0.08)',
        zIndex: 100,
        overflow: 'hidden',
        animation: 'megaMenuFadeIn 200ms cubic-bezier(0.16, 1, 0.3, 1)',
        marginTop: '0.4rem',
      }}
    >
      {/* 4-Column Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '300px 1.15fr 1.25fr 1.3fr',
          minHeight: '490px',
          maxHeight: '620px',
        }}
      >
        {/* ========================================================= */}
        {/* COLUMN 1: CATEGORIES */}
        {/* ========================================================= */}
        <div
          style={{
            borderRight: '1px solid var(--border-color, #E2E8F0)',
            backgroundColor: 'var(--bg-app, #F8FAFC)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '1.25rem 0.85rem 1.25rem 1.25rem',
          }}
        >
          <div style={{ overflowY: 'auto', flex: 1, paddingRight: '0.35rem' }}>
            <div
              style={{
                fontSize: '1.05rem',
                fontWeight: 800,
                color: '#1D4ED8',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
              }}
            >
              <span>Categories</span>
            </div>

            {/* Accordion Categories List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {MEGA_MENU_CATEGORIES.map((cat: MegaMenuCategory) => {
                const isExpanded = expandedCategoryIds.includes(cat.id);

                return (
                  <div key={cat.id} style={{ display: 'flex', flexDirection: 'column' }}>
                    {/* Category Header Row */}
                    <button
                      type="button"
                      onClick={() => toggleCategoryExpand(cat.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '100%',
                        padding: '0.65rem 0.75rem',
                        backgroundColor: 'transparent',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '0.92rem',
                        fontWeight: 700,
                        color: 'var(--text-main, #0F172A)',
                        textAlign: 'left',
                        transition: 'background-color 150ms ease, color 150ms ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.04)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span>{cat.name}</span>
                      </span>
                      <span
                        style={{
                          fontSize: '0.8rem',
                          color: '#64748B',
                          transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                          transition: 'transform 200ms ease',
                        }}
                      >
                        ▼
                      </span>
                    </button>

                    {/* Subcategories (Expanded) */}
                    {isExpanded && (
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '0.2rem',
                          paddingLeft: '0.5rem',
                          marginTop: '0.2rem',
                          marginBottom: '0.5rem',
                        }}
                      >
                        {cat.subcategories.map((sub) => {
                          const isSelected = selectedSubcategory.name === sub.name;

                          return (
                            <button
                              key={sub.name}
                              type="button"
                              onClick={() => handleSubcategorySelect(sub)}
                              onMouseEnter={() => handleSubcategorySelect(sub)}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                width: '100%',
                                padding: '0.55rem 0.75rem',
                                borderRadius: '8px',
                                border: 'none',
                                cursor: 'pointer',
                                fontSize: '0.88rem',
                                fontWeight: isSelected ? 700 : 500,
                                backgroundColor: isSelected
                                  ? 'rgba(37, 99, 235, 0.12)'
                                  : 'transparent',
                                color: isSelected ? '#1D4ED8' : 'var(--text-main, #334155)',
                                textAlign: 'left',
                                transition: 'all 150ms ease',
                              }}
                            >
                              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                <span>{sub.name}</span>
                                {sub.badge && (
                                  <span
                                    style={{
                                      fontSize: '0.68rem',
                                      fontWeight: 800,
                                      padding: '0.1rem 0.35rem',
                                      borderRadius: '4px',
                                      backgroundColor: '#2563EB',
                                      color: '#FFFFFF',
                                    }}
                                  >
                                    {sub.badge}
                                  </span>
                                )}
                              </span>
                              <span
                                style={{
                                  fontSize: '0.85rem',
                                  color: isSelected ? '#1D4ED8' : '#94A3B8',
                                  fontWeight: 800,
                                }}
                              >
                                ›
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Browse All Categories Button */}
          <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--border-color, #E2E8F0)' }}>
            <Link
              href="/paths"
              onClick={onClose}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0.65rem 1rem',
                borderRadius: '8px',
                border: '1.5px solid #2563EB',
                backgroundColor: 'transparent',
                color: '#2563EB',
                fontWeight: 700,
                fontSize: '0.88rem',
                textDecoration: 'none',
                transition: 'all 160ms ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#EFF6FF';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              Browse All Categories
            </Link>
          </div>
        </div>

        {/* ========================================================= */}
        {/* COLUMN 2: AREAS */}
        {/* ========================================================= */}
        <div
          style={{
            borderRight: '1px solid var(--border-color, #E2E8F0)',
            padding: '1.5rem 1.25rem',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              fontSize: '1.05rem',
              fontWeight: 800,
              color: '#1D4ED8',
              marginBottom: '1.15rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span>Areas</span>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748B' }}>
              {careerMeta?.areas?.length || 0} Domains
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {careerMeta?.areas?.map((area) => (
              <div
                key={area.id}
                onClick={() => handleFilterCatalog('area', area.name)}
                style={{
                  padding: '0.65rem 0.85rem',
                  borderRadius: '8px',
                  backgroundColor: 'var(--bg-app, #F8FAFC)',
                  border: '1px solid transparent',
                  cursor: 'pointer',
                  transition: 'all 150ms ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#EFF6FF';
                  e.currentTarget.style.borderColor = '#BFDBFE';
                  e.currentTarget.style.transform = 'translateX(2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--bg-app, #F8FAFC)';
                  e.currentTarget.style.borderColor = 'transparent';
                  e.currentTarget.style.transform = 'translateX(0)';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-main, #0F172A)' }}>
                  <span>{area.icon}</span>
                  <span>{area.name}</span>
                </div>
                {area.description && (
                  <p
                    style={{
                      fontSize: '0.78rem',
                      color: 'var(--text-muted, #64748B)',
                      margin: '0.25rem 0 0 0',
                      lineHeight: 1.35,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {area.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================= */}
        {/* COLUMN 3: TOOLS */}
        {/* ========================================================= */}
        <div
          style={{
            borderRight: '1px solid var(--border-color, #E2E8F0)',
            padding: '1.5rem 1.25rem',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              fontSize: '1.05rem',
              fontWeight: 800,
              color: '#1D4ED8',
              marginBottom: '1.15rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span>Tools</span>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748B' }}>
              {careerMeta?.tools?.length || 0} Stacks
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
            {careerMeta?.tools?.map((tool) => (
              <div
                key={tool.id}
                onClick={() => handleFilterCatalog('tool', tool.name)}
                style={{
                  padding: '0.65rem 0.85rem',
                  borderRadius: '8px',
                  backgroundColor: 'var(--bg-app, #F8FAFC)',
                  border: '1px solid transparent',
                  cursor: 'pointer',
                  transition: 'all 150ms ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#EFF6FF';
                  e.currentTarget.style.borderColor = '#BFDBFE';
                  e.currentTarget.style.transform = 'translateX(2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--bg-app, #F8FAFC)';
                  e.currentTarget.style.borderColor = 'transparent';
                  e.currentTarget.style.transform = 'translateX(0)';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.35rem' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--text-main, #0F172A)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span>{tool.icon}</span>
                    <span>{tool.name}</span>
                  </span>
                  {tool.relevance && (
                    <span
                      style={{
                        fontSize: '0.7rem',
                        fontWeight: 600,
                        backgroundColor: '#E2E8F0',
                        color: '#475569',
                        padding: '0.1rem 0.35rem',
                        borderRadius: '4px',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {tool.relevance}
                    </span>
                  )}
                </div>
                {tool.description && (
                  <p
                    style={{
                      fontSize: '0.78rem',
                      color: 'var(--text-muted, #64748B)',
                      margin: '0.2rem 0 0 0',
                      lineHeight: 1.3,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {tool.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================= */}
        {/* COLUMN 4: JOB ROLES */}
        {/* ========================================================= */}
        <div
          style={{
            padding: '1.5rem 1.25rem',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              fontSize: '1.05rem',
              fontWeight: 800,
              color: '#1D4ED8',
              marginBottom: '1.15rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span>Job Roles</span>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748B' }}>
              {careerMeta?.jobRoles?.length || 0} Careers
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', flex: 1 }}>
            {careerMeta?.jobRoles?.map((role) => (
              <div
                key={role.id}
                onClick={() => handleFilterCatalog('role', role.title)}
                style={{
                  padding: '0.65rem 0.85rem',
                  borderRadius: '8px',
                  backgroundColor: 'var(--bg-app, #F8FAFC)',
                  border: '1px solid transparent',
                  cursor: 'pointer',
                  transition: 'all 150ms ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#EFF6FF';
                  e.currentTarget.style.borderColor = '#BFDBFE';
                  e.currentTarget.style.transform = 'translateX(2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--bg-app, #F8FAFC)';
                  e.currentTarget.style.borderColor = 'transparent';
                  e.currentTarget.style.transform = 'translateX(0)';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.35rem' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--text-main, #0F172A)' }}>
                    {role.title}
                  </span>
                  <span
                    style={{
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      backgroundColor: role.industryDemand === 'Very High' ? '#DCFCE7' : '#EFF6FF',
                      color: role.industryDemand === 'Very High' ? '#15803D' : '#1D4ED8',
                      padding: '0.1rem 0.4rem',
                      borderRadius: '4px',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {role.industryDemand || 'High'} Demand
                  </span>
                </div>
                {role.description && (
                  <p
                    style={{
                      fontSize: '0.78rem',
                      color: 'var(--text-muted, #64748B)',
                      margin: '0.2rem 0 0 0',
                      lineHeight: 1.3,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {role.description}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Quick Course Launch Footer CTA */}
          <div style={{ paddingTop: '1rem', marginTop: '0.75rem', borderTop: '1px solid var(--border-color, #E2E8F0)' }}>
            <button
              type="button"
              onClick={() => handleNavigateToCourse(selectedSubcategory.slug)}
              style={{
                width: '100%',
                padding: '0.65rem 1rem',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: '#2563EB',
                color: '#FFFFFF',
                fontWeight: 700,
                fontSize: '0.88rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.4rem',
                boxShadow: '0 2px 8px rgba(37, 99, 235, 0.35)',
                transition: 'background-color 150ms ease, transform 150ms ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#1D4ED8';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#2563EB';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <span>Explore {selectedSubcategory.name} Curriculum</span>
              <span>→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
