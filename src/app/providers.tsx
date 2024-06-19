'use client';

import { Button, MantineProvider, createTheme, Input, PasswordInput, TextInput } from "@mantine/core";

const theme = createTheme({
    colors: {
        primary: ['#EDF2FF', '#DBE4FF', '#BAC8FF', '#91A7FF', '#748FFC', '#5C7CFA', '#4C6EF5', '#4263EB', '#3B5BDB', '#364FC7'],
    },
    components: {
        Button: Button.extend({
            classNames: {
                root: 'mantine-button',
            }
        }),
        Input: Input.extend({
            classNames: {
                input: 'mantine-input',
                section: 'mantine-input-section',
            }
        }),
        PasswordInput: PasswordInput.extend({
            classNames: {
                input: 'mantine-input',
                innerInput: 'mantine-input',
                label: 'mantine-input-label',
                section: 'mantine-input-section',
            }
        }),
        TextInput: TextInput.extend({
            classNames: {
                label: 'mantine-input-label',
            }
        })
    },
    primaryColor: 'primary',
});

const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <MantineProvider defaultColorScheme="dark" theme={theme}>
            {children}
        </MantineProvider>
    );
};

export default Providers;