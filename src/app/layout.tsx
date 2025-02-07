'use client';

import { Roboto } from 'next/font/google';
import './globals.css';
import { AlertProvider } from '@/context/AlertContext';
import { ThemeProvider } from '@/context/ThemeProvider';
import { SessionProvider } from '@/context/SessionProvider';

const roboto = Roboto({
	weight: ['400', '700'],
	style: ['normal', 'italic'],
	subsets: ['latin'],
	display: 'swap',
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={roboto.className}>
				<ThemeProvider>
					<AlertProvider>
						<SessionProvider>{children}</SessionProvider>
					</AlertProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
