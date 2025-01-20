'use client';
import SidebarItem from '@/components/SideBarItem/SidebarItem';
import homeIcon from '@assets/home.svg';
import aboutIcon from '@assets/about.svg';
import elevatorIcon from '@assets/elevators.svg';

interface SidebarProps {
	pathname: string;
	isSidebarOpen: boolean;
}
export default function Sidebar({ pathname, isSidebarOpen }: SidebarProps) {
	const containerClassName = isSidebarOpen ? 'w-64' : 'w-16';
	return (
		<div
			className={`fixed top-0 left-0 h-screen bg-menuPrimary text-text transition-all duration-300 ease-in-out transform ${containerClassName}`}
		>
			<nav className='p-4'>
				<SidebarItem
					isActive={pathname}
					isOpen={isSidebarOpen}
					iconPath={homeIcon}
					href='/'
				>
					Home
				</SidebarItem>
				<SidebarItem
					isActive={pathname}
					isOpen={isSidebarOpen}
					iconPath={aboutIcon}
					href='/about'
				>
					About
				</SidebarItem>
				<SidebarItem
					isActive={pathname}
					isOpen={isSidebarOpen}
					iconPath={elevatorIcon}
					href='/elevators'
				>
					Elevators
				</SidebarItem>
			</nav>
		</div>
	);
}
