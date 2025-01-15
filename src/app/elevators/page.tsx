'use client';
import { SidebarProvider } from '@/context/SidebarContext';
import TopBar from '@/components/TopBar/TopBar';
import SideBar from '@/components/SideBar/SideBar';
import ContextArea from '@/components/ContextArea/ContextArea';

export default function Elevators() {
	return (
		<SidebarProvider>
			<TopBar />
			<SideBar />
			<ContextArea>
				ELEVATORS ELEVATORS ELEVATORS ELEVATORS ELEVATORS ELEVATORS{' '}
			</ContextArea>
		</SidebarProvider>
	);
}
