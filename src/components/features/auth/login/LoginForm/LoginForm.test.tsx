import { screen, fireEvent, waitFor, act } from '@testing-library/react';
import LoginForm, { LoginErrorMessage, SubmitButton } from './LoginForm';
import { login } from './actions';
import renderWithMantine from '@/test-utils/render';

// Mock actions
jest.mock('./actions', () => ({
	login: jest.fn(),
}));

const mockLogin = login as jest.Mock;

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

		expect(screen.getByRole('button')).toHaveTextContent('Log In');
		expect(screen.getByRole('button')).toBeDisabled();
	});
});

// LoginErrorMessage
describe('LoginErrorMessage', () => {
	it('should be hidden by default', () => {
		require('react-dom').useFormStatus.mockReturnValue({ pending: false });

		renderWithMantine(<LoginErrorMessage state={null} />);
		expect(screen.queryByText('Unable to log you in. Please try again.')).not.toBeInTheDocument();
        expect(screen.queryByText('Invalid email or password')).not.toBeInTheDocument();
	});

	it('should not show error if request status is pending', () => {
		require('react-dom').useFormStatus.mockReturnValue({ pending: true });

		renderWithMantine(<LoginErrorMessage state={{ status: 'error' }} />);
		expect(screen.queryByText('Unable to log you in. Please try again.')).not.toBeInTheDocument();
        expect(screen.queryByText('Invalid email or password')).not.toBeInTheDocument();
	});

    it('should show auth error if authError is true', () => {
        require('react-dom').useFormStatus.mockReturnValue({ pending: false });

        renderWithMantine(<LoginErrorMessage state={{ status: 'error', authError: true }} />);
        expect(screen.queryByText('Unable to log you in. Please try again.')).not.toBeInTheDocument();
        expect(screen.queryByText('Invalid email or password')).toBeInTheDocument();
    });

    it('should show generic error if authError is false', () => {
        require('react-dom').useFormStatus.mockReturnValue({ pending: false });

        renderWithMantine(<LoginErrorMessage state={{ status: 'error', authError: false }} />);
        expect(screen.queryByText('Unable to log you in. Please try again.')).toBeInTheDocument();
        expect(screen.queryByText('Invalid email or password')).not.toBeInTheDocument();
    });
});

// LoginForm
describe('LoginForm', () => {
    beforeEach(() => {
		mockLogin.mockReset();
        jest.clearAllMocks();
	});

    it('should not submit if any of the fields are empty', async () => {
        renderWithMantine(<LoginForm />);
		fireEvent.submit(screen.getByRole('form'));

		await waitFor(() => {
			expect(screen.getByText('Email is required')).toBeInTheDocument();
			expect(screen.getByText('Password is required')).toBeInTheDocument();
		});
	});

    it('should submit if all conditions are met', async () => {
		require('react-dom').useFormStatus.mockReturnValue({ pending: false });
        renderWithMantine(<LoginForm />);

		fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
		fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'validPassword123' } });

		await act(() => {
			fireEvent.submit(screen.getByRole('form'));
		});

		await waitFor(() => {
			expect(mockLogin).toHaveBeenCalled();
		});
	});

    it('should show error if invalid auth data supplied', async () => {
		mockFormState = { status: 'error', authError: true };
        renderWithMantine(<LoginForm />);

		fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
		fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'validPassword123' } });
		fireEvent.submit(screen.getByRole('form'));

		await waitFor(() => {
			expect(screen.getByText('Invalid email or password')).toBeInTheDocument();
		});
	});
});