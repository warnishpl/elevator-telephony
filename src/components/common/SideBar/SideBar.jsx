'use client';
import { getSidebarContext } from '@/context/SidebarContext';
import SideBarItem from '@/components/common/SideBarItem/SideBarItem';
import homeIcon from '@/assets/home.svg';
import aboutIcon from '@/assets/about.svg';
import elevatorIcon from '@/assets/elevators.svg';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
	const pathname = usePathname();
	const { isSidebarOpen } = getSidebarContext();
	const containerClassName = isSidebarOpen ? 'w-64' : 'w-16';
	return (
		<div
			className={`fixed top-0 left-0 h-screen bg-menuPrimary text-text transition-all duration-300 ease-in-out transform ${containerClassName}`}
		>
			<nav className='p-4'>
				<SideBarItem
					isActive={pathname}
					isOpen={isSidebarOpen}
					iconPath={homeIcon}
					href='/'
				>
					Home
				</SideBarItem>
				<SideBarItem
					isActive={pathname}
					isOpen={isSidebarOpen}
					iconPath={aboutIcon}
					href='/about'
				>
					About
				</SideBarItem>
				<SideBarItem
					isActive={pathname}
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
