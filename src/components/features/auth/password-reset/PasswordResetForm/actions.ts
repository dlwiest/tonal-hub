'use server';

import { createClient } from '@/lib/supabase/server';
import { PasswordUpdateFormData } from '@/types/forms';
import { redirect } from 'next/navigation';

export type PasswordUpdateState = { 
    status: 'success' | 'error';
    errorCode?: string;
} | null;

// Submit a password reset request
export async function updatePassword(_: PasswordUpdateState, data: PasswordUpdateFormData): Promise<PasswordUpdateState> {
    const supabase = createClient();

    try {
        // Try to retrieve active user from session
        const { data: { user } } = await supabase.auth.getUser();

        // No active user -- try to get user based on auth code
        if (!user) {
            const { error } = await supabase.auth.exchangeCodeForSession(data.authCode);

            if (error) {
                return { status: 'error', errorCode: 'invalid_code' };
            }
        }
    } catch (error) {
        return { status: 'error', errorCode: 'invalid_code' };
    }

    // Update the password
    try {
        await supabase.auth.updateUser({ password: data.password });
    } catch (error) {
        return { status: 'error', errorCode: 'invalid_password' };
    }

    redirect('/');
};
