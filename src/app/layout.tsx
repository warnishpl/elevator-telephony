'use client';

import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeProvider';
import { AlertProvider } from '@/context/AlertContext';

import SessionProvider from '@/components/SessionPrivider/SessionPrivider';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ThemeProvider>
			<html lang='en'>
				<body
					className={`${geistSans.variable} ${geistMono.variable} antialiased`}
				>
					<AlertProvider>
						<SessionProvider>{children}</SessionProvider>
					</AlertProvider>
				</body>
			</html>
		</ThemeProvider>
	);
}
