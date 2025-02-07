'use client';
import { useTheme } from '@/context/ThemeProvider';
import TopBar from './TopBar';
import { useEffect, useState } from 'react';
import { useSessionContext } from '@/context/SessionProvider';

interface TopBarContainerProps {
	isSidebarOpen: boolean;
	toggleSidebar: () => void;
}

export default function TopBarContainer({
	isSidebarOpen,
	toggleSidebar,
}: Readonly<TopBarContainerProps>) {
	const context = useTheme();
	const { getUser } = useSessionContext();
	const [fullName, setFullName] = useState<string>('');
	const user = getUser();

	useEffect(() => {
		if (user) {
			setFullName(`${user.firstName} ${user.lastName}`);
		}
	}, [user]);

	const { isDarkMode, toggleTheme } = context;
	const theme = isDarkMode as boolean;

	return (
		<TopBar
			isSidebarOpen={isSidebarOpen}
			toggleSidebar={toggleSidebar}
			isDarkMode={theme}
			toggleTheme={toggleTheme}
			fullName={fullName}
		/>
	);
}
