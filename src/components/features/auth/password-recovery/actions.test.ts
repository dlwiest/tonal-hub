import { createClient } from '@/lib/supabase/server';
import { resetPassword } from './actions';

jest.mock('next/navigation', () => ({
	redirect: jest.fn(),
}));

jest.mock('@/lib/supabase/server', () => {
	return {
		createClient: jest.fn().mockReturnValue({
			auth: {
				resetPasswordForEmail: jest.fn(),
			},
		}),
	};
});

describe('resetPassword', () => {
	const mockEmail = 'test@example.com';

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('should reset a password successfully', async () => {
		const mockResetPassword = jest.fn().mockResolvedValue({ user: { id: '123' }, error: null });
		const supabase = createClient();
		supabase.auth.resetPasswordForEmail = mockResetPassword;

		const result = await resetPassword(null, { email: mockEmail });

		expect(mockResetPassword).toHaveBeenCalledWith('test@example.com', { redirectTo: 'undefined/password-reset' });
		expect(result).toEqual({ status: 'success' });
	});

    it('should handle errors during client creation', async () => {
        const supabase = createClient();
        supabase.auth.resetPasswordForEmail = jest.fn().mockImplementation(() => {
            throw new Error('Client creation failed');
        });
    
        const result = await resetPassword(null, { email: mockEmail });
    
        expect(result).toEqual({ status: 'error' });
    });
});
