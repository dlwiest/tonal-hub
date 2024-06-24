import { screen } from '@testing-library/react';
import PasswordResetPage from './page';
import renderWithMantine from '@/test-utils/render';

describe('PasswordResetPage', () => {
    it('should display the update password form when there is no error', () => {
        renderWithMantine(<PasswordResetPage searchParams={{ code: '123', error: '' }} />);
        expect(screen.getByText('Update your password')).toBeInTheDocument();
    });

    it('should display an error message when the error query parameter is present', () => {
        renderWithMantine(<PasswordResetPage searchParams={{ code: '', error: 'access_denied' }} />);
        expect(screen.getByText('Invalid reset link')).toBeInTheDocument();
    });
});