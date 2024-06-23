'use client';

import { MantineProvider } from "@mantine/core";
import theme from "@/theme";

const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <MantineProvider defaultColorScheme="dark" theme={theme}>
            {children}
        </MantineProvider>
    );
};

export default Providers;