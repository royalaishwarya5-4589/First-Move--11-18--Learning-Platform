'use server';

import { createClient } from '@/lib/supabase/server';
import {
  calculateCareerCompassResult,
  getPersonalizedLearningPath,
  CareerCompassResult,
  PersonalizedLearningPath,
} from '@/lib/preCourseEngine';
import { revalidatePath } from 'next/cache';

export async function submitPreCourseAssessmentAction(
  answers: Record<string, number>
): Promise<{
  success: boolean;
  result?: CareerCompassResult;
  learningPath?: PersonalizedLearningPath;
  error?: string;
}> {
  const safeAnswers = answers && typeof answers === 'object' ? answers : {};

  // Calculate Career Compass discovery result
  const result = calculateCareerCompassResult(safeAnswers);
  const primarySlug = result.primaryDomain.domainSlug;

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      // 1. Insert assessment record into DB
      const { error: insertErr } = await supabase
        .from('pre_course_assessments')
        .insert({
          user_id: user.id,
          domain_slug: primarySlug,
          is_general_tech: true,
          assessment_type: 'career_compass',
          score: result.primaryDomain.matchPercentage,
          max_score: 100,
          percentage: result.primaryDomain.matchPercentage,
          level_label: 'beginner',
          domain_matches: result.domainMatches,
          top_domain_recommendations: result.topRecommendations,
          answers: safeAnswers,
        });

      if (insertErr) {
        console.error('[PreCourse Server Action Error]', insertErr);
      }

      // 2. Update user profile onboarding state and default selected domain
      const { error: profileErr } = await supabase
        .from('profiles')
        .update({
          has_completed_onboarding: true,
          selected_domain: primarySlug,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);

      if (profileErr) {
        console.error('[PreCourse Profile Update Error]', profileErr);
      }

      revalidatePath('/dashboard');
      revalidatePath('/assessment');
      revalidatePath('/learning-path');
    }
  } catch (err) {
    console.error('[PreCourse Action Exception]', err);
  }

  const learningPath = getPersonalizedLearningPath(result, primarySlug);

  return {
    success: true,
    result,
    learningPath,
  };
}

export async function selectCareerCompassDomainAction(
  domainSlug: string
): Promise<{ success: boolean; error?: string }> {
  if (!domainSlug || typeof domainSlug !== 'string') {
    return { success: false, error: 'Invalid domain slug provided.' };
  }

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      const { error } = await supabase
        .from('profiles')
        .update({
          selected_domain: domainSlug,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);

      if (error) {
        console.error('[selectCareerCompassDomainAction Error]', error);
        return { success: false, error: error.message };
      }

      revalidatePath('/dashboard');
      revalidatePath('/learning-path');
      revalidatePath('/assessment/result');
    }

    return { success: true };
  } catch (err) {
    console.error('[selectCareerCompassDomainAction Exception]', err);
    return { success: false, error: 'Failed to update selected domain.' };
  }
}

export async function fetchLatestPreCourseAssessmentAction(
  overrideDomainSlug?: string
): Promise<{
  result: CareerCompassResult | null;
  learningPath: PersonalizedLearningPath | null;
  selectedDomain: string | null;
}> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { result: null, learningPath: null, selectedDomain: null };
    }

    // Get user profile selected domain
    const { data: profile } = await supabase
      .from('profiles')
      .select('selected_domain')
      .eq('id', user.id)
      .maybeSingle();

    const dbSelectedDomain = profile?.selected_domain || null;

    // Fetch latest pre_course_assessments record
    const { data, error } = await supabase
      .from('pre_course_assessments')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error || !data) {
      return { result: null, learningPath: null, selectedDomain: dbSelectedDomain };
    }

    // Reconstruct Career Compass Result
    let result: CareerCompassResult;

    if (data.answers && Object.keys(data.answers).length > 0) {
      result = calculateCareerCompassResult(data.answers);
    } else {
      // Fallback reconstruction if answers JSON not saved
      result = calculateCareerCompassResult({});
    }

    const activeDomain = overrideDomainSlug || dbSelectedDomain || result.primaryDomain.domainSlug;
    const learningPath = getPersonalizedLearningPath(result, activeDomain);

    return { result, learningPath, selectedDomain: activeDomain };
  } catch (err) {
    console.error('[fetchLatestPreCourseAssessment Action Error]', err);
    return { result: null, learningPath: null, selectedDomain: null };
  }
}

export async function checkUserOnboardingStatusAction(): Promise<{
  hasCompletedOnboarding: boolean;
  selectedDomain: string | null;
}> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { hasCompletedOnboarding: true, selectedDomain: null };
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('has_completed_onboarding, selected_domain')
      .eq('id', user.id)
      .maybeSingle();

    if (profile && profile.has_completed_onboarding) {
      return {
        hasCompletedOnboarding: true,
        selectedDomain: profile.selected_domain || null,
      };
    }

    const { count } = await supabase
      .from('pre_course_assessments')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', user.id);

    if ((count || 0) > 0) {
      return { hasCompletedOnboarding: true, selectedDomain: null };
    }

    return { hasCompletedOnboarding: false, selectedDomain: null };
  } catch {
    return { hasCompletedOnboarding: true, selectedDomain: null };
  }
}
