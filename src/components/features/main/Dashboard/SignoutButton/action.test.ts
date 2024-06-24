import { createClient } from '@/lib/supabase/server';
import { signout } from './actions';

// Mock the Supabase client
jest.mock('@/lib/supabase/server', () => ({
	createClient: jest.fn().mockReturnValue({
		auth: {
			signOut: jest.fn(),
		},
	}),
}));

describe('signout', () => {
	it('calls Supabase signOut', async () => {
		const supabase = createClient();
		supabase.auth.signOut = jest.fn().mockResolvedValueOnce({});

		const result = await signout();

		expect(supabase.auth.signOut).toHaveBeenCalled();
        expect(result).toEqual({ success: true });
	});

    it('throws an error if signOut fails', async () => {
        const supabase = createClient();
        supabase.auth.signOut = jest.fn().mockRejectedValueOnce(new Error('Failed to sign out'));

        const result = await signout();
        expect(result).toEqual({ success: false });
    });
});
