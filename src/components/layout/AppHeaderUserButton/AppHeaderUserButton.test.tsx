import { render, screen, fireEvent } from '@testing-library/react';
import AppHeaderUserButton from './AppHeaderUserButton';

jest.mock('next/navigation');
const pushMock = jest.fn();

jest.mock('next/navigation', () => ({
    useRouter: () => ({
        push: pushMock,
    }),
}));

describe('AppHeaderUserButton', () => {
    it('navigates to /login when the button is clicked', () => {
        render(<AppHeaderUserButton />);
        const button = screen.getByRole('button');
        fireEvent.click(button);

        expect(pushMock).toHaveBeenCalledWith('/login');
    });
});