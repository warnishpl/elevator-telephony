'use client';

import { SidebarProvider } from '@/context/SidebarContext';
import TopBar from '@/components/TopBar/TopBar';
import SideBar from '@/components/SideBar/SideBar';
import ContextArea from '@/components/ContextArea/ContextArea';

export default function Home() {
	return (
		<SidebarProvider>
			<TopBar />
			<SideBar />
			<ContextArea >HOME HOME HOME HOME HOME HOME HOME HOME HOME</ContextArea>
		</SidebarProvider>
	);
}
