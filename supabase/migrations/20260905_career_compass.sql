-- Migration: LearnTech Career Compass System Schema Update

ALTER TABLE public.pre_course_assessments
  ADD COLUMN IF NOT EXISTS assessment_type TEXT DEFAULT 'career_compass',
  ADD COLUMN IF NOT EXISTS domain_matches JSONB DEFAULT '{}'::jsonb;
