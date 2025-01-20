'use client';
import TopBarItem from '@/components/TopBarItem/TopBarItem';
import shrinkSidebarIcon from '@assets/shrink-sidebar.svg';
import expandSidebarIcon from '@assets/expand-sidebar.svg';
import userIcon from '@assets/user-circle.svg';
import settingsIcon from '@assets/settings.svg';
import newMessageIcon from '@assets/message-exclamation.svg';
import moonIcon from '@assets/moon.svg';
import sunIcon from '@assets/sun.svg';

interface TopBarProps {
	isSidebarOpen: boolean;
	toggleSidebar: () => void;
	isDarkMode: boolean;
	toggleTheme: () => void;
}

export default function TopBar({
	isSidebarOpen,
	toggleSidebar,
	isDarkMode,
	toggleTheme,
}: TopBarProps) {
	const containerClassName = isSidebarOpen ? 'pl-64' : 'pl-16';
	return (
		<div
			className={`flex flex-row w-full h-16 items-center bg-menuPrimary transition-all duration-300 ease-in-out  ${containerClassName}`}
		>
			<div className='flex items-center'>
				<TopBarItem
					onClick={toggleSidebar}
					iconPath={isSidebarOpen ? shrinkSidebarIcon : expandSidebarIcon}
				/>
			</div>

			<div>
				<input
					type='text'
					placeholder='Wyszukaj'
					className={`h-9 w-96 pl-7 ml-2 pr-2 rounded-md border-2 border-transparent bg-inputBackground text-text bg-no-repeat bg-[3px_50%] transition-all duration-300 ease-in-out focus:outline-none focus:border-menuSecondary`}
				/>
			</div>
			<div className='ml-auto flex items-center'>
				<TopBarItem iconPath={newMessageIcon}></TopBarItem>
				<TopBarItem
					iconPath={isDarkMode ? moonIcon : sunIcon}
					onClick={toggleTheme}
				></TopBarItem>
				<TopBarItem iconPath={settingsIcon}></TopBarItem>
				<TopBarItem iconPath={userIcon}>Michał</TopBarItem>
			</div>
		</div>
	);
}
