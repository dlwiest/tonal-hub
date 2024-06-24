import { render, fireEvent, screen } from '@testing-library/react';
import SignoutButton from './SignoutButton';
import * as actionModule from './actions';
import { redirect } from 'next/navigation';
import renderWithMantine from '@/test-utils/render';

jest.mock('./actions', () => ({
	signout: jest.fn(),
}));

jest.mock('next/navigation', () => ({
	redirect: jest.fn(),
}));

describe('SignoutButton', () => {
	it('calls signout and redirects on success', async () => {
		const signoutMock = jest.spyOn(actionModule, 'signout');
		signoutMock.mockResolvedValue({ success: true });

		renderWithMantine(<SignoutButton />);

		fireEvent.click(screen.getByRole('button', { name: /sign out/i }));

		await screen.findByRole('button', { name: /sign out/i });

		expect(signoutMock).toHaveBeenCalled();
		expect(redirect).toHaveBeenCalledWith('/');
	});

	it('does not redirect on failure', async () => {
		const signoutMock = jest.spyOn(actionModule, 'signout');
		signoutMock.mockResolvedValue({ success: false });

		renderWithMantine(<SignoutButton />);

		fireEvent.click(screen.getByRole('button', { name: /sign out/i }));

		await screen.findByRole('button', { name: /sign out/i });

		expect(signoutMock).toHaveBeenCalled();
		expect(redirect).not.toHaveBeenCalled();
	});
});
