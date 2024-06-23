import { createClient } from '@/lib/supabase/server';
import { login } from './actions';
import * as nextNavigation from 'next/navigation';

jest.mock('next/navigation', () => ({
	redirect: jest.fn(),
}));

jest.mock('@/lib/supabase/server', () => {
	return {
		createClient: jest.fn().mockReturnValue({
			auth: {
				signInWithPassword: jest.fn(),
			},
		}),
	};
});

describe('login', () => {
	const mockEmail = 'test@example.com';
	const mockPassword = 'password123';

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('should log a user in successfully', async () => {
		const mockLogin = jest.fn().mockResolvedValue({ user: { id: '123' }, error: null });
		const supabase = createClient();
		supabase.auth.signInWithPassword = mockLogin;

		const result = await login(null, { email: mockEmail, password: mockPassword });

		expect(mockLogin).toHaveBeenCalledWith({
			email: mockEmail,
			password: mockPassword,
		});
		expect(result).toEqual(undefined);
		expect(nextNavigation.redirect).toHaveBeenCalledWith('/');
	});

    it('should handle error when credentials are invalid', async () => {
        const mockError = 'Invalid login credentials';
        const mockLogin = jest.fn().mockResolvedValue({ error: mockError });
        const supabase = createClient();
        supabase.auth.signInWithPassword = mockLogin;

        const result = await login(null, { email: mockEmail, password: mockPassword });

        expect(result).toEqual({ status: 'error', authError: true });
        expect(nextNavigation.redirect).not.toHaveBeenCalled();
    });

    it('should handle errors during client creation', async () => {
        const supabase = createClient();
        supabase.auth.signInWithPassword = jest.fn().mockImplementation(() => {
            throw new Error('Client creation failed');
        });
    
        const result = await login(null, { email: mockEmail, password: mockPassword });
    
        expect(result).toEqual({ status: 'error' });
        expect(nextNavigation.redirect).not.toHaveBeenCalled();
    });
});
