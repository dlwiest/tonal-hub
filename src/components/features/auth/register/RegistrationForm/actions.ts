'use server';

import { createClient } from '@/lib/supabase/server';
import { RegisterFormData } from '@/types/forms';
import { redirect } from 'next/navigation';

export type RegisterState = { 
    status: 'success' | 'error';
    isEmailTaken?: boolean;
    isUsernameTaken?: boolean;
} | null;

// Register a new user
export async function register(_: RegisterState, data: RegisterFormData): Promise<RegisterState> {
    const supabase = createClient();

    try {
        // Check if username is already taken
        const { data: usernameMatches } = await supabase.from('profiles').select('username').eq('username', data.username);
        if (usernameMatches?.length) {
            return { status: 'error', isUsernameTaken: true };
        }

        // Create the account
        const { error } = await supabase.auth.signUp({ email: data.email, password: data.password, options: { data: { username: data.username } } });

        if (error) {
            return { status: 'error', isEmailTaken: error.code === 'user_already_exists' };
        }
    } catch (error) {
        return { status: 'error' };
    }

    redirect('/');
};
