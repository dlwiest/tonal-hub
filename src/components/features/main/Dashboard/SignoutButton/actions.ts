'use server';

import { createClient } from '@/lib/supabase/server';

export type SignoutState = { 
    success: boolean;
}

// Sign the user out
export async function signout(): Promise<SignoutState> {
    const supabase = createClient();
    try {
        await supabase.auth.signOut();
        return { success: true };
    } catch (_) {
        return { success: false };
    }
};
