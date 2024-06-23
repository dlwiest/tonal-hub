import { Button, Input, PasswordInput, TextInput, Title, createTheme } from '@mantine/core';

const theme = createTheme({
	colors: {
		primary: [
			'#E6FCF5', // teal 0
			'#C3FAE8', // teal 1
			'#96F2D7', // teal 2
			'#63E6BE', // teal 3
			'#38D9A9', // teal 4
			'#20C997', // teal 5
			'#12B886', // teal 6
			'#0CA678', // teal 7
			'#099268', // teal 8
			'#087F5B', // teal 9
		],
	},
	components: {
		Button: Button.extend({
			classNames: {
				root: 'mantine-button',
			},
		}),
		Input: Input.extend({
			classNames: {
				input: 'mantine-input',
				section: 'mantine-input-section',
			},
		}),
		PasswordInput: PasswordInput.extend({
			classNames: {
				input: 'mantine-input',
				innerInput: 'mantine-input mantine-inner-input',
				label: 'mantine-input-label',
				section: 'mantine-input-section',
			},
		}),
		TextInput: TextInput.extend({
			classNames: {
				label: 'mantine-input-label',
			},
		}),
		Title: Title.extend({
			classNames: {
				root: 'mantine-title',
			},
		}),
	},
	primaryColor: 'primary',
});

export default theme;
