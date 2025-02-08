import React, { useEffect, useState } from 'react';
import ContextArea from '@/components/ContextArea';
import SidebarContainer from '@/components/Sidebar/SidebarContainer';
import TopBarContainer from '@/components/TopBar/TopBarContainer';

interface LoggedLayoutProps {
	children: React.ReactNode;
}

export default function LoggedLayout({
	children,
}: Readonly<LoggedLayoutProps>) {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	useEffect(() => {
		const storedSidebarState = localStorage.getItem('isSidebarOpen');
		if (storedSidebarState !== null) {
			setIsSidebarOpen(JSON.parse(storedSidebarState));
		}
	}, []);

	const toggleSidebar = () => {
		setIsSidebarOpen((prevState) => {
			const newState = !prevState;
			localStorage.setItem('isSidebarOpen', JSON.stringify(newState));
			return newState;
		});
	};

	return (
		<>
			<TopBarContainer
				isSidebarOpen={isSidebarOpen}
				toggleSidebar={toggleSidebar}
			/>
			<SidebarContainer isSidebarOpen={isSidebarOpen} />
			<ContextArea isSidebarOpen={isSidebarOpen}>{children}</ContextArea>
		</>
	);
}
