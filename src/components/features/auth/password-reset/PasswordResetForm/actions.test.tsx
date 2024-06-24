import { createClient } from '@/lib/supabase/server';
import { updatePassword } from './actions';
import * as nextNavigation from 'next/navigation';

jest.mock('next/navigation', () => ({
    redirect: jest.fn(),
}));

jest.mock('@/lib/supabase/server', () => {
    return {
        createClient: jest.fn().mockReturnValue({
            auth: {
                getUser: jest.fn(),
                updateUser: jest.fn(),
                exchangeCodeForSession: jest.fn(),
            },
        }),
    };
});

describe('updatePassword', () => {
    const mockPassword = 'newPassword123';
    const mockAuthCode = 'authCode123';

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should update the password successfully from an active session', async () => {
        const supabase = createClient();
        supabase.auth.getUser = jest.fn().mockResolvedValue({ data: { user: { id: 'user1' } } });
        supabase.auth.updateUser = jest.fn().mockResolvedValue({});

        const result = await updatePassword(null, { password: mockPassword, authCode: mockAuthCode });

        expect(supabase.auth.updateUser).toHaveBeenCalledWith({ password: mockPassword });
        expect(result).toEqual(undefined);
        expect(nextNavigation.redirect).toHaveBeenCalledWith('/');
    });

    it('should update the password from a valid access code', async () => {
        const supabase = createClient();
        supabase.auth.getUser = jest.fn().mockResolvedValue({ data: { user: null } });
        supabase.auth.exchangeCodeForSession = jest.fn().mockResolvedValue({ error: null });

        const result = await updatePassword(null, { password: mockPassword, authCode: mockAuthCode });

        expect(supabase.auth.exchangeCodeForSession).toHaveBeenCalledWith(mockAuthCode);
        expect(result).toEqual(undefined);
        expect(nextNavigation.redirect).toHaveBeenCalledWith('/');
    });

    it('should return an error when there is a generic error in user retrieval or session exchange', async () => {
        const supabase = createClient();
        // Simulate a generic error during the user retrieval or session exchange
        supabase.auth.getUser = jest.fn().mockRejectedValue(new Error('Network error'));

        const result = await updatePassword(null, { password: mockPassword, authCode: mockAuthCode });

        expect(result).toEqual({ status: 'error', errorCode: 'invalid_code' });
        expect(nextNavigation.redirect).not.toHaveBeenCalled();
    });

    it('should return error when a session could not be established', async () => {
        const supabase = createClient();
        supabase.auth.getUser = jest.fn().mockResolvedValue({ data: { user: null } });
        supabase.auth.exchangeCodeForSession = jest.fn().mockResolvedValue({ error: { message: 'Invalid code' } });

        const result = await updatePassword(null, { password: mockPassword, authCode: mockAuthCode });

        expect(result).toEqual({ status: 'error', errorCode: 'invalid_code' });
        expect(nextNavigation.redirect).not.toHaveBeenCalled();
    });

    it('should return an error when the password update fails', async () => {
        const supabase = createClient();
        supabase.auth.getUser = jest.fn().mockResolvedValue({ data: { user: { id: 'user1' } } });
        supabase.auth.updateUser = jest.fn().mockRejectedValue(new Error('Update failed'));

        const result = await updatePassword(null, { password: mockPassword, authCode: mockAuthCode });

        expect(result).toEqual({ status: 'error', errorCode: 'invalid_password' });
        expect(nextNavigation.redirect).not.toHaveBeenCalled();
    });
});