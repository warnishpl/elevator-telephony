'use client';

import { SidebarProvider } from '@/context/SidebarContext';
import TopBar from '@/components/TopBar/TopBar';
import SideBar from '@/components/SideBar/SideBar';
import ContextArea from '@/components/ContextArea/ContextArea';
import { ThemeProvider } from '@/context/ThemeProvider';

export default function Home() {
	return (
		<ThemeProvider>
			<SidebarProvider>
				<TopBar />
				<SideBar />
				<ContextArea>HOME HOME HOME HOME HOME HOME HOME HOME HOME</ContextArea>
			</SidebarProvider>
		</ThemeProvider>
	);
}
