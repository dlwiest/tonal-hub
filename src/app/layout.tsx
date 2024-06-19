import type { Metadata } from "next";
import { Oswald, Roboto } from "next/font/google";
import { MantineProvider, ColorSchemeScript } from "@mantine/core";

import '@mantine/core/styles.css';
import "./globals.css";
import styles from "./layout.module.css";

const oswaldMedium = Oswald({
    subsets: ["latin"],
    display: 'swap',
    variable: '--font-oswald-medium',
    weight: "500",
});

const roboto = Roboto({
    subsets: ["latin"],
    display: 'swap',
    variable: '--font-roboto',
    weight: "400",
});

export const metadata: Metadata = {
    title: "TonalHub",
    description: "Find your next Tonal workout here",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <ColorSchemeScript />
            </head>
            <body className={`${oswaldMedium.variable} ${roboto.variable}`}>
                <MantineProvider>
                    <div className={styles.container}>
                        {children}
                    </div>
                </MantineProvider>
            </body>
        </html>
    );
}
