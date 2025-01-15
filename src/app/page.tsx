'use client';

import { SidebarProvider } from '@/context/SidebarContext';
import TopBar from '@/components/TopBar/TopBar';
import SideBar from '@/components/SideBar/SideBar';

export default function Home() {
	return (
		<SidebarProvider>
			<TopBar />
			<SideBar />
			<div>HOME HOME HOME HOME HOME HOME HOME HOME HOME</div>
		</SidebarProvider>
	);
}
