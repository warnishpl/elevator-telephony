'use client';
import Link from 'next/link';
import Image from 'next/image';
import TopBarItem from '@/components/TopBarItem/TopBarItem';
import { useSidebar } from '@/context/SidebarContext';
//icons
import shrinkSidebarIcon from '@/assets/shrink-sidebar.svg';
import expandSidebarIcon from '@/assets/expand-sidebar.svg';
import searchIcon from '@/assets/search.svg';
import userIcon from '@/assets/user-circle.svg';
import settingsIcon from '@/assets/settings.svg';
import messageIcon from '@/assets/message.svg';
import newMessageIcon from '@/assets/message-exclamation.svg';

export default function TopBar() {
	const { isSidebarOpen, toggleSidebar } = useSidebar();

	return (
		<div
			className={`flex flex-row w-full h-16 items-center bg-menuPrimary transition-all duration-300 ease-in-out  ${
				isSidebarOpen ? 'pl-64' : 'pl-16'
			}`}
		>
			<button onClick={toggleSidebar} className=''>
				<Image
					src={isSidebarOpen ? shrinkSidebarIcon : expandSidebarIcon}
					alt='menu'
					height={24}
					width={24}
				/>
			</button>
			<div className='ml-auto flex items-center space-x-4 pr-4'>
				<Image src={searchIcon} alt='search' />
				{/* <Link href='/about'>
					<button className='px-4 py-2 h-8 bg-menuSecondary text-white rounded'>
						About Us
					</button>
				</Link>
				<Link href='/elevators'>
					<button className='px-4 py-2 bg-menuSecondary text-white rounded'>
						Elevators
					</button>
				</Link> */}
				<TopBarItem
					href='/'
					iconPath={true ? newMessageIcon : messageIcon}
				></TopBarItem>
				<TopBarItem href='/' iconPath={settingsIcon}></TopBarItem>
				<TopBarItem href='/' iconPath={userIcon}></TopBarItem>
			</div>
		</div>
	);
}
