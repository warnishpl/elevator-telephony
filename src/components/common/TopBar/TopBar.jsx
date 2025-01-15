'use client';
import TopBarItem from '@/components/common/TopBarItem/TopBarItem';
import { getSidebarContext } from '@/context/SidebarContext';
import { useTheme } from '@/context/ThemeProvider';
import shrinkSidebarIcon from '@/assets/shrink-sidebar.svg';
import expandSidebarIcon from '@/assets/expand-sidebar.svg';
import userIcon from '@/assets/user-circle.svg';
import settingsIcon from '@/assets/settings.svg';
import messageIcon from '@/assets/message.svg';
import newMessageIcon from '@/assets/message-exclamation.svg';
import moonIcon from '@/assets/moon.svg';
import sunIcon from '@/assets/sun.svg';

export default function TopBar() {
	const { isSidebarOpen, toggleSidebar } = getSidebarContext();
	const { isDarkMode, toggleTheme } = useTheme();
	const notification = true;
	const containerClassName = isSidebarOpen ? 'pl-64' : 'pl-16';

	return (
		<div
			className={`flex flex-row w-full h-16 items-center bg-menuPrimary transition-all duration-300 ease-in-out  ${containerClassName}`}
		>
			<TopBarItem
				onClick={toggleSidebar}
				iconPath={isSidebarOpen ? shrinkSidebarIcon : expandSidebarIcon}
			/>
			<div>
				<input
					type='text'
					placeholder='Wyszukaj'
					className="h-9 w-96 pl-7 ml-2 pr-2 rounded-md border-2 border-transparent bg-inputBackground text-text bg-no-repeat bg-[url('@/assets/search.svg')] bg-[3px_50%] transition-all duration-300 ease-in-out focus:outline-none focus:border-menuSecondary"
				/>
			</div>
			<div className='ml-auto flex items-center outline-none'>
				<TopBarItem
					iconPath={notification ? newMessageIcon : messageIcon}
				></TopBarItem>
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
