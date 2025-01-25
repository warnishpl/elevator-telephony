'use client';
import { useTheme } from '@/context/ThemeProvider';
import TopBar from './TopBar';
import { useEffect, useState } from 'react';
import { useRequestApi } from '@/utils/useRequestApi';

interface TopBarContainerProps {
	isSidebarOpen: boolean;
	toggleSidebar: () => void;
}

interface ApiResponse {
	data: { firstName: string; lastName: string };
}

export default function TopBarContainer({
	isSidebarOpen,
	toggleSidebar,
}: TopBarContainerProps) {
	const context = useTheme();

	const [fullName, setFullName] = useState<string>('');
	const { requestApi } = useRequestApi();

	useEffect(() => {
		const checkWhoAmI = async () => {
			try {
				const response = await requestApi({
					path: '/user/who-am-i',
					method: 'GET',
				});
				const userData = response as ApiResponse;

				if (userData) {
					const { firstName, lastName } = userData.data || {};

					if (firstName && lastName) {
						setFullName(`${firstName} ${lastName}`);
					}
				}
			} catch (error) {
				console.error(error);
			}
		};

		checkWhoAmI();
	}, []);

	if (!context) {
		return null;
	}

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
