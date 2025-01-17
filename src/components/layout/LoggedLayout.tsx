import React, { useState } from 'react';
import ContextArea from '@/components/ContextArea/ContextArea';
import SidebarContainer from '@/components/Sidebar/SidebarContainer';
import TopBarContainer from '@/components/TopBar/TopBarContainer';

interface LoggedLayoutProps {
	children: React.ReactNode;
}

export default function LoggedLayout({ children }: LoggedLayoutProps) {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const toggleSidebar = () => {
		setIsSidebarOpen((prevState) => !prevState);
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
