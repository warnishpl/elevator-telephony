'use client';
import TopBarItem from '@/components/TopBarItem/TopBarItem';
import shrinkSidebarIcon from 'public/shrink-sidebar.svg';
import expandSidebarIcon from 'public/expand-sidebar.svg';
import userIcon from 'public/user-circle.svg';
import settingsIcon from 'public/settings.svg';
import newMessageIcon from 'public/message-exclamation.svg';
import moonIcon from 'public/moon.svg';
import sunIcon from 'public/sun.svg';

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
