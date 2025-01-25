'use client';

import { Roboto } from 'next/font/google';
import './globals.css';
import { AlertProvider } from '@/context/AlertContext';
import SessionProvider from '@/components/SessionProvider/SessionProvider';
import { ThemeProvider } from '@/context/ThemeProvider';

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
		<ThemeProvider>
			<html lang='en'>
				<body className={roboto.className}>
					<AlertProvider>
						<SessionProvider>{children}</SessionProvider>
					</AlertProvider>
				</body>
			</html>
		</ThemeProvider>
	);
}
