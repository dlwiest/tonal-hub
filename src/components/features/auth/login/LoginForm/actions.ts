'use server';

import { createClient } from '@/lib/supabase/server';
import { LoginFormData } from '@/types/forms';
import { redirect } from 'next/navigation';

export type LoginState = { 
    status: 'success' | 'error';
    authError?: boolean;
} | null;

// Log in a user
export async function login(_: LoginState, data: LoginFormData): Promise<LoginState> {
    const supabase = createClient();

    try {
        const { error } = await supabase.auth.signInWithPassword({ email: data.email, password: data.password });

        if (error) {
            return { status: 'error', authError: true };
        }
    } catch (error) {
        return { status: 'error' };
    }

    redirect('/');
};
