'use client';
import { useTheme } from '@/context/ThemeProvider';
import TopBar from './TopBar';
import { useEffect, useState } from 'react';
import { useRequestApi } from '@/hooks/useRequestApi';

interface TopBarContainerProps {
	isSidebarOpen: boolean;
	toggleSidebar: () => void;
}

interface WhoAmIResponse {
	firstName: string;
	lastName: string;
}

export default function TopBarContainer({
	isSidebarOpen,
	toggleSidebar,
}: Readonly<TopBarContainerProps>) {
	const context = useTheme();
	const { requestApi } = useRequestApi();

	const [fullName, setFullName] = useState<string>('');

	function handleUserData(data: WhoAmIResponse) {
		const { firstName, lastName } = data;
		if (firstName && lastName) {
			setFullName(`${firstName} ${lastName}`);
		}
	}

	useEffect(() => {
		requestApi<WhoAmIResponse>({
			path: '/user/who-am-i',
			method: 'GET',
			onError: console.error,
		}).then((res) => handleUserData(res.data));
	}, []);

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
