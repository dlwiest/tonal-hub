import { createServerClient } from '@supabase/ssr';

jest.mock('@supabase/ssr', () => ({
	createServerClient: jest.fn(),
}));

jest.mock('next/headers', () => ({
	cookies: jest.fn(() => ({
		get: jest.fn(),
		set: jest.fn(),
		remove: jest.fn(),
	})),
}));

describe('createClient', () => {
	beforeEach(() => {
		process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test-supabase-url.com';
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test-anon-key';

		jest.clearAllMocks();
	});

	it('should create a server client with the correct parameters', () => {
		const { cookies } = require('next/headers');
		const cookieStore = cookies();
		cookieStore.get.mockReturnValue({ value: 'cookie-value' });

		expect(createServerClient).toHaveBeenCalledWith(
			'https://test-supabase-url.com',
			'test-anon-key',
			expect.objectContaining({
				cookies: expect.objectContaining({
					get: expect.any(Function),
					set: expect.any(Function),
					remove: expect.any(Function)
				})
			})
		);
	});
});
