'use client';
import { useSidebar } from '@/context/SidebarContext';
import SideBarItem from '@/components/SideBarItem/SideBarItem';
//icons
import homeIcon from '@/assets/home.svg';
import aboutIcon from '@/assets/about.svg';
import elevatorIcon from '@/assets/elevators.svg';


export default function Sidebar() {
	const { isSidebarOpen } = useSidebar();
	

	return (
		<div
			className={`fixed top-0 left-0 h-screen bg-menuPrimary text-text transition-all duration-300 ease-in-out transform ${
				isSidebarOpen ? 'w-64' : 'w-16'
			}`}
		>
			<nav className='p-4'>
				<SideBarItem isOpen={isSidebarOpen} iconPath={homeIcon} href='/'>
					Home
				</SideBarItem>
				<SideBarItem isOpen={isSidebarOpen} iconPath={aboutIcon} href='/about'>
					About
				</SideBarItem>
				<SideBarItem
					isOpen={isSidebarOpen}
					iconPath={elevatorIcon}
					href='/elevators'
				>
					Elevators
				</SideBarItem>
			</nav>
		</div>
	);
}
