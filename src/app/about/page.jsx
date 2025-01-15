'use client';
import { SidebarProvider } from '@/context/SidebarContext';
import TopBar from '@/components/TopBar/TopBar';
import SideBar from '@/components/SideBar/SideBar';

export default function About() {
	return (
		<SidebarProvider>
			<TopBar />
			<SideBar />
			<div>ABOUT ABOUT ABOUT ABOUT ABOUT ABOUT</div>
		</SidebarProvider>
	);
}
