import { render as testingLibraryRender } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import theme from '@/theme';

const renderWithMantine = (el: React.ReactNode) => {
    return testingLibraryRender(<>{el}</>, {
        wrapper: ({ children }: { children: React.ReactNode; }) => (
            <MantineProvider theme={theme}>{children}</MantineProvider>
        ),
    });
}

export default renderWithMantine;
