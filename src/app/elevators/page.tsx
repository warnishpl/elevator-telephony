'use client';
import { SidebarProvider } from '@/context/SidebarContext';
import TopBar from '@/components/TopBar/TopBar';
import SideBar from '@/components/SideBar/SideBar';

export default function Elevators() {
	return (
		<SidebarProvider>
			<TopBar />
			<SideBar />
			<div>ELEVATORS ELEVATORS ELEVATORS ELEVATORS ELEVATORS ELEVATORS </div>
		</SidebarProvider>
	);
}
