import { screen, fireEvent, waitFor, act } from '@testing-library/react';
import RegistrationForm, { ServerErrorMessage, SubmitButton } from './RegistrationForm';
import { register } from './actions';
import renderWithMantine from '@/test-utils/render';

// Mock actions
jest.mock('./actions', () => ({
	register: jest.fn(),
}));

const mockRegister = register as jest.Mock;

jest.mock('react-dom', () => {
    const originalModule = jest.requireActual('react-dom');
    return {
        ...originalModule,
        useFormStatus: jest.fn(),
        useFormState: jest.fn((action, _) => {
            let state = null;
            const mockFormAction = jest.fn(async (data) => {
                const result = await action(data);
                state = result;
                return result
            });
            return [state, mockFormAction];
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

		expect(screen.getByRole('button')).toHaveTextContent('Register');
		expect(screen.getByRole('button')).toBeDisabled();
	});
});

// ServerErrorMessage
describe('ServerErrorMessage', () => {
	it('should be hidden by default', () => {
		require('react-dom').useFormStatus.mockReturnValue({ pending: false });

		renderWithMantine(<ServerErrorMessage state={null} />);
		expect(screen.queryByText('Unable to register user. Please try again.')).not.toBeInTheDocument();
	});

	it('should be shown when there is an error', () => {
		require('react-dom').useFormStatus.mockReturnValue({ pending: false });

		renderWithMantine(<ServerErrorMessage state={{ status: 'error' }} />);
		expect(screen.getByText('Unable to register user. Please try again.')).toBeInTheDocument();
	});

	it('should not show error if request status is pending', () => {
		require('react-dom').useFormStatus.mockReturnValue({ pending: true });

		renderWithMantine(<ServerErrorMessage state={{ status: 'error' }} />);
		expect(screen.queryByText('Unable to register user. Please try again.')).not.toBeInTheDocument();
	});

	it('should not show error if the cause is a duplicate email', () => {
		require('react-dom').useFormStatus.mockReturnValue({ pending: false });

		renderWithMantine(<ServerErrorMessage state={{ status: 'error', isEmailTaken: true }} />);
		expect(screen.queryByText('Unable to register user. Please try again.')).not.toBeInTheDocument();
	});
});

// RegistrationForm
describe('RegistrationForm', () => {
	beforeEach(() => {
        mockRegister.mockReset();
		renderWithMantine(<RegistrationForm />);
	});

	it('should not submit if any of the fields are empty', async () => {
		fireEvent.submit(screen.getByRole('form'));

		await waitFor(() => {
			expect(screen.getByText('Username is required')).toBeInTheDocument();
			expect(screen.getByText('Email is required')).toBeInTheDocument();
			expect(screen.getByText('Password is required')).toBeInTheDocument();
		});
	});

	it('should not submit if password is too short', async () => {
		fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testuser' } });
		fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
		fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'short' } });

		fireEvent.submit(screen.getByRole('form'));

		expect(await screen.findByText('Password must be at least 8 characters')).toBeInTheDocument();
	});

	it('should not submit if username is invalid', async () => {
		fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'invalid username' } });
		fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
		fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'validPassword123' } });

		fireEvent.submit(screen.getByRole('form'));

		expect(await screen.findByText('Username may only contain letters and numbers')).toBeInTheDocument();
	});

	it('should submit if all conditions are met', async () => {
        require('react-dom').useFormStatus.mockReturnValue({ pending: false });

        fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'validUsername' } });
        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'validPassword123' } });

        await act(() => {
            fireEvent.submit(screen.getByRole('form'));
        });

        await waitFor(() => {
            expect(mockRegister).toHaveBeenCalled();
        });
	});
});
