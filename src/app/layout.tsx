import type { Metadata } from "next";
import { Oswald, Roboto } from "next/font/google";
import { ColorSchemeScript } from "@mantine/core";

import '@mantine/core/styles.css';
import "./globals.css";
import "./mantineOverrides.css";

import styles from "./layout.module.css";
import Providers from './providers';

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

const robotoMedium = Roboto({
    subsets: ["latin"],
    display: 'swap',
    variable: '--font-roboto-medium',
    weight: "500",
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
                <ColorSchemeScript defaultColorScheme="dark" />
            </head>
            <body className={`${oswaldMedium.variable} ${roboto.variable} ${robotoMedium.variable}`}>
                <Providers>
                    <div className={styles.container}>
                        {children}
                    </div>
                </Providers>
            </body>
        </html>
    );
}
