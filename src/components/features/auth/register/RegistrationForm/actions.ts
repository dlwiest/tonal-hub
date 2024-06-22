'use server';

import { createClient } from '@/lib/supabase/server';
import { RegisterFormData } from '@/types/forms';
import { redirect } from 'next/navigation';

export type RegisterState = { 
    status: 'success' | 'error';
    isEmailTaken: boolean;
} | null;

// Register a new user
export async function register(_: RegisterState, data: RegisterFormData): Promise<RegisterState> {
    const supabase = createClient();

    const { error } = await supabase.auth.signUp({ email: data.email, password: data.password });

    if (error) {
        return { status: 'error', isEmailTaken: error.code === 'user_already_exists' };
    }

    redirect('/');
};
