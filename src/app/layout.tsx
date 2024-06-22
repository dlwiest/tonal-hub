import type { Metadata } from "next";
import { Sen, Roboto } from "next/font/google";
import { ColorSchemeScript } from "@mantine/core";

import '@mantine/core/styles.css';
import "./globals.css";
import "./mantineOverrides.css";

import styles from "./layout.module.css";
import Providers from './providers';

const senSemibold = Sen({
    subsets: ["latin"],
    display: 'swap',
    variable: '--font-sen-semibold',
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

const robotoBold = Roboto({
    subsets: ["latin"],
    display: 'swap',
    variable: '--font-roboto-bold',
    weight: "700",
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
            <body className={`${senSemibold.variable} ${roboto.variable} ${robotoMedium.variable} ${robotoBold.variable}`}>
                <Providers>
                    <div className={styles.container}>
                        {children}
                    </div>
                </Providers>
            </body>
        </html>
    );
}
