'use server';

import { createClient } from '@/lib/supabase/server';
import { PasswordRecoveryFormData } from '@/types/forms';

export type PasswordResetState = { 
    status: 'success' | 'error';
    authError?: boolean;
} | null;

// Submit a password reset request
export async function resetPassword(_: PasswordResetState, data: PasswordRecoveryFormData): Promise<PasswordResetState> {
    const supabase = createClient();
    try {
        await supabase.auth.resetPasswordForEmail(data.email, { redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/password-reset` });
    } catch (error) {
        return { status: 'error' };
    }

    return { status: 'success' };
};
