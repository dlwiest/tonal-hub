'use client';

import { Button, MantineProvider, createTheme } from "@mantine/core";

const theme = createTheme({
    components: {
        Button: Button.extend({
            classNames: {
                root: 'mantine-button',
            }
        })
    }
});

const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <MantineProvider defaultColorScheme="dark" theme={theme}>
            {children}
        </MantineProvider>
    );
};

export default Providers;