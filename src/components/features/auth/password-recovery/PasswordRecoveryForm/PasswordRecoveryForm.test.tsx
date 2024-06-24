import { screen, fireEvent, waitFor, act } from '@testing-library/react';
import PasswordRecoveryForm, { PasswordRecoveryErrorMessage, SubmitButton } from './PasswordRecoveryForm';
import { resetPassword } from './actions';
import renderWithMantine from '@/test-utils/render';

// Mock actions
jest.mock('./actions', () => ({
	resetPassword: jest.fn(),
}));

const mockResetPassword = resetPassword as jest.Mock;

let mockFormState = { status: 'idle', authError: false };

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

		expect(screen.getByRole('button')).toHaveTextContent('Reset Password');
		expect(screen.getByRole('button')).toBeDisabled();
	});
});

// PasswordRecoveryErrorMessage
describe('PasswordRecoveryErrorMessage', () => {
	it('should be hidden by default', () => {
		require('react-dom').useFormStatus.mockReturnValue({ pending: false });

		renderWithMantine(<PasswordRecoveryErrorMessage state={null} />);
		expect(screen.queryByText('Unable to reset your password. Please try again.')).not.toBeInTheDocument();
	});

	it('should not show error if request status is pending', () => {
		require('react-dom').useFormStatus.mockReturnValue({ pending: true });

		renderWithMantine(<PasswordRecoveryErrorMessage state={{ status: 'error' }} />);
		expect(screen.queryByText('Unable to reset your password. Please try again.')).not.toBeInTheDocument();
	});

    it('should show generic error if status is error', () => {
        require('react-dom').useFormStatus.mockReturnValue({ pending: false });

        renderWithMantine(<PasswordRecoveryErrorMessage state={{ status: 'error' }} />);
        expect(screen.queryByText('Unable to reset your password. Please try again.')).toBeInTheDocument();
        
    });
});

// PasswordRecoveryForm
describe('PasswordRecoveryForm', () => {
    beforeEach(() => {
		mockResetPassword.mockReset();
        jest.clearAllMocks();
	});

    it('should not submit if the email field is empty', async () => {
        renderWithMantine(<PasswordRecoveryForm />);
		fireEvent.submit(screen.getByRole('form'));

		await waitFor(() => {
			expect(screen.getByText('Email is required')).toBeInTheDocument();
		});
	});

    it('should submit if all conditions are met', async () => {
		require('react-dom').useFormStatus.mockReturnValue({ pending: false });
        
        renderWithMantine(<PasswordRecoveryForm />);

		fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });

		await act(() => {
			fireEvent.submit(screen.getByRole('form'));
		});

		await waitFor(() => {
			expect(mockResetPassword).toHaveBeenCalled();
		});
	});

    it('should show success message if password reset is successful', async () => {
        mockFormState = { status: 'success', authError: false };
        renderWithMantine(<PasswordRecoveryForm />);

        await waitFor(() => {
            expect(screen.getByText('Password reset link sent. Please check your email for instructions.')).toBeInTheDocument();
        });
    });
});