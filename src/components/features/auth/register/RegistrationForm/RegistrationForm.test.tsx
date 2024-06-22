import { screen } from '@testing-library/react';
import { SubmitButton } from './RegistrationForm';
import renderWithMantine from '@/test-utils/render';

window.matchMedia = window.matchMedia || function() {
    return {
        matches: false,
        addListener: function() {},
        removeListener: function() {}
    };
};

jest.mock('react-dom', () => ({
    ...jest.requireActual('react-dom'),
    useFormStatus: jest.fn(),
}));

describe('SubmitButton', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders a loading button when pending', () => {
        require('react-dom').useFormStatus.mockReturnValue({ pending: true });

        renderWithMantine(<SubmitButton />);

        expect(screen.getByRole('button')).toHaveTextContent('Register');
        expect(screen.getByRole('button')).toBeDisabled();
    });
});