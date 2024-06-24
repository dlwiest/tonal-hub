import { screen, fireEvent, waitFor, act } from '@testing-library/react';
import PasswordResetForm, { PasswordResetErrorMessage, SubmitButton } from './PasswordResetForm';
import { updatePassword } from './actions';
import renderWithMantine from '@/test-utils/render';

// Mock actions
jest.mock('./actions', () => ({
    updatePassword: jest.fn(),
}));

const mockUpdatePassword = updatePassword as jest.Mock;

let mockFormState = { status: 'idle', errorCode: null };

jest.mock('react-dom', () => {
    const originalModule = jest.requireActual('react-dom');
    return {
        ...originalModule,
        useFormStatus: jest.fn(),
        useFormState: jest.fn((action, _) => {
            const mockFormAction = jest.fn(async (data) => {
                const result = await action(data);
                return result;
            });
            return [mockFormState, mockFormAction];
        }),
    };
});

// SubmitButton
describe('SubmitButton', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should be available by default', () => {
        require('react-dom').useFormStatus.mockReturnValue({ pending: false });

        renderWithMantine(<SubmitButton />);

        expect(screen.getByRole('button')).toBeInTheDocument();
        expect(screen.getByRole('button')).not.toBeDisabled();
    });

    it('renders a loading button when pending', () => {
        require('react-dom').useFormStatus.mockReturnValue({ pending: true });

        renderWithMantine(<SubmitButton />);

        expect(screen.getByRole('button')).toHaveTextContent('Update Password');
        expect(screen.getByRole('button')).toBeDisabled();
    });
});

// PasswordResetErrorMessage
describe('PasswordResetErrorMessage', () => {
    it('should be hidden by default', () => {
        require('react-dom').useFormStatus.mockReturnValue({ pending: false });

        renderWithMantine(<PasswordResetErrorMessage state={null} />);
        expect(screen.queryByText(/Unable to reset your password/)).not.toBeInTheDocument();
    });

    it('should not show error if request status is pending', () => {
        require('react-dom').useFormStatus.mockReturnValue({ pending: true });

        renderWithMantine(<PasswordResetErrorMessage state={{ status: 'error' }} />);
        expect(screen.queryByText(/Unable to reset your password/)).not.toBeInTheDocument();
    });

    it('should show an invalid code error if errorCode is invalid_code', () => {
        require('react-dom').useFormStatus.mockReturnValue({ pending: false });

        renderWithMantine(<PasswordResetErrorMessage state={{ status: 'error', errorCode: 'invalid_code' }} />);
        expect(screen.getByText('Your password recovery link has expired. Please try to reset your password again.')).toBeInTheDocument();
    });

    it('should show a generic error if errorCode is anything else', () => {
        require('react-dom').useFormStatus.mockReturnValue({ pending: false });

        renderWithMantine(<PasswordResetErrorMessage state={{ status: 'error', errorCode: 'user_not_found' }} />);
        expect(screen.getByText('Unable to reset your password. Please try again.')).toBeInTheDocument();
    });
});

// PasswordResetForm
describe('PasswordResetForm', () => {
    beforeEach(() => {
        mockUpdatePassword.mockReset();
        jest.clearAllMocks();
    });

    it('should not submit if the password field is empty', async () => {
        renderWithMantine(<PasswordResetForm authCode="authCode123" />);
        fireEvent.submit(screen.getByRole('form'));

        await waitFor(() => {
            expect(screen.getByText('Password is required')).toBeInTheDocument();
        });
    });

    it('should submit if all conditions are met', async () => {
        require('react-dom').useFormStatus.mockReturnValue({ pending: false });
        
        renderWithMantine(<PasswordResetForm authCode="authCode123" />);

        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'newPassword123' } });

        await act(() => {
            fireEvent.submit(screen.getByRole('form'));
        });

        await waitFor(() => {
            expect(mockUpdatePassword).toHaveBeenCalled();
        });
    });
});