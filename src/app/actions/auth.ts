'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const NETWORK_ERROR_MSG =
  'Unable to connect to the authentication server. Please check your Supabase configuration and try again.';

function formatAuthError(err: unknown): string {
  if (err instanceof Error) {
    const msg = err.message.toLowerCase();

    if (
      msg.includes('fetch failed') ||
      msg.includes('enotfound') ||
      msg.includes('econnrefused') ||
      msg.includes('failed to fetch') ||
      msg.includes('networkerror')
    ) {
      return NETWORK_ERROR_MSG;
    }

    return err.message;
  }

  return NETWORK_ERROR_MSG;
}

/**
 * SIGN IN
 */
export async function signInWithEmail(formData: FormData) {
  const email = String(formData.get('email') || '').trim();
  const password = String(formData.get('password') || '');

  if (!email || !password) {
    return {
      error: 'Email and password are required.',
    };
  }

  try {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return {
        error: error.message,
      };
    }

    if (!data.session || !data.user) {
      return {
        error: 'Login failed. Please try again.',
      };
    }

    // Check if user has completed onboarding assessment
    let targetPath = '/dashboard';
    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('has_completed_onboarding')
        .eq('id', data.user.id)
        .maybeSingle();

      if (profile && profile.has_completed_onboarding === false) {
        targetPath = '/assessment';
      }
    } catch {
      targetPath = '/dashboard';
    }

    revalidatePath('/', 'layout');
    redirect(targetPath);
  } catch (err: unknown) {
    return {
      error: formatAuthError(err),
    };
  }
}

/**
 * SIGN UP
 */
export async function signUpWithEmail(formData: FormData) {
  const email = String(formData.get('email') || '').trim();
  const password = String(formData.get('password') || '');
  const displayName =
    String(formData.get('displayName') || '').trim();

  if (!email || !password) {
    return {
      error: 'Email and password are required.',
    };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return {
      error: 'Please enter a valid email address.',
    };
  }

  if (password.length < 6) {
    return {
      error: 'Password must be at least 6 characters long.',
    };
  }

  try {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name:
            displayName || email.split('@')[0],
        },
      },
    });

    if (error) {
      return {
        error: error.message,
      };
    }

    if (!data.user) {
      return {
        error: 'Account could not be created. Please try again.',
      };
    }

    /*
     * If email confirmation is enabled, Supabase will not create
     * an active session until the email is confirmed.
     *
     * If a session exists, the user can go directly to dashboard.
     */
    if (data.session) {
      revalidatePath('/', 'layout');
      redirect('/assessment');
    }

    /*
     * Email confirmation is required.
     * Do not redirect to dashboard because there is no active session yet.
     */
    return {
      success: true,
      message:
        'Account created successfully. Please check your email and confirm your account before signing in.',
    };
  } catch (err: unknown) {
    return {
      error: formatAuthError(err),
    };
  }
}

/**
 * SIGN OUT
 */
export async function signOutUser() {
  try {
    const supabase = await createClient();

    await supabase.auth.signOut();

    revalidatePath('/', 'layout');
  } catch {
    // Ignore sign-out network errors.
  }

  redirect('/');
}

/**
 * GET CURRENT SESSION
 */
export async function getUserSession() {
  try {
    const supabase = await createClient();

    const {
      data: { session },
    } = await supabase.auth.getSession();

    return session;
  } catch {
    return null;
  }
}
