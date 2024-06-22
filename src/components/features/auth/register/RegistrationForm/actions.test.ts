import { createClient } from '@/lib/supabase/server';
import { register } from './actions';
import * as nextNavigation from 'next/navigation';

jest.mock('next/navigation', () => ({
    redirect: jest.fn()
}));

jest.mock('@/lib/supabase/server', () => ({
    createClient: jest.fn().mockReturnValue({
        auth: {
            signUp: jest.fn()
        }
    })
}));

describe('register', () => {
    const mockEmail = 'test@example.com';
    const mockPassword = 'password123';
    const mockUsername = 'testuser';

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should register a new user successfully', async () => {
        const mockSignUp = jest.fn().mockResolvedValue({ user: { id: '123' }, error: null });
        const supabase = createClient();
        supabase.auth.signUp = mockSignUp;

        const result = await register(null, { email: mockEmail, password: mockPassword, username: mockUsername });

        expect(mockSignUp).toHaveBeenCalledWith({ email: mockEmail, password: mockPassword });
        expect(result).toEqual(undefined);
        expect(nextNavigation.redirect).toHaveBeenCalledWith('/');
    });

    it('should handle error when email is already taken', async () => {
        const mockError = { message: 'Email already in use', code: 'user_already_exists' };
        const mockSignUp = jest.fn().mockResolvedValue({ error: mockError });
        const supabase = createClient();
        supabase.auth.signUp = mockSignUp;

        const result = await register(null, { email: mockEmail, password: mockPassword, username: mockUsername });

        expect(mockSignUp).toHaveBeenCalledWith({ email: mockEmail, password: mockPassword });
        expect(result).toEqual({ status: 'error', isEmailTaken: true });
        expect(nextNavigation.redirect).not.toHaveBeenCalled();
    });

    it('should handle misc errors', async () => {
        const mockError = { message: 'An error occurred', code: 'unknown_error' };
        const mockSignUp = jest.fn().mockResolvedValue({ error: mockError });
        const supabase = createClient();
        supabase.auth.signUp = mockSignUp;

        const result = await register(null, { email: mockEmail, password: mockPassword, username: mockUsername });

        expect(mockSignUp).toHaveBeenCalledWith({ email: mockEmail, password: mockPassword });
        expect(result).toEqual({ status: 'error', isEmailTaken: false });
        expect(nextNavigation.redirect).not.toHaveBeenCalled();
    });
});
