import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import styles from "./layout.module.css";

const inter = Inter({ subsets: ["latin"] });

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
            <body className={inter.className}>
                <div className={styles.container}>
                    {children}
                </div>
            </body>
        </html>
    );
}
