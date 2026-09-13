-- Migration: Smart Pre-Course Assessment & Personalized Learning Path Schema

-- 1. Add onboarding tracking columns to profiles table if not existing
ALTER TABLE public.profiles 
  ADD COLUMN IF NOT EXISTS has_completed_onboarding BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS selected_domain TEXT;

-- 2. Pre-Course Assessment Attempts & Recommendations Table
CREATE TABLE IF NOT EXISTS public.pre_course_assessments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  domain_slug TEXT NOT NULL,
  is_general_tech BOOLEAN DEFAULT FALSE,
  score INT DEFAULT 0,
  max_score INT DEFAULT 100,
  percentage INT DEFAULT 0,
  level_label TEXT NOT NULL CHECK (level_label IN ('beginner', 'basic', 'intermediate', 'advanced')),
  skill_breakdown JSONB DEFAULT '{}'::jsonb,
  recommended_paths JSONB DEFAULT '[]'::jsonb,
  top_domain_recommendations JSONB DEFAULT '[]'::jsonb,
  answers JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for lookup performance
CREATE INDEX IF NOT EXISTS idx_pre_course_assessments_user ON public.pre_course_assessments(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_pre_course_assessments_domain ON public.pre_course_assessments(user_id, domain_slug);

-- Enable Row Level Security (RLS)
ALTER TABLE public.pre_course_assessments ENABLE ROW LEVEL SECURITY;

-- RLS Policies
DROP POLICY IF EXISTS "Users can view own pre course assessments" ON public.pre_course_assessments;
CREATE POLICY "Users can view own pre course assessments" ON public.pre_course_assessments 
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own pre course assessments" ON public.pre_course_assessments;
CREATE POLICY "Users can insert own pre course assessments" ON public.pre_course_assessments 
  FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own pre course assessments" ON public.pre_course_assessments;
CREATE POLICY "Users can update own pre course assessments" ON public.pre_course_assessments 
  FOR UPDATE USING (auth.uid() = user_id);
