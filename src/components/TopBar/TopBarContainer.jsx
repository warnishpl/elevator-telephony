import { useTheme } from '@/context/ThemeProvider';
import TopBar from './TopBar';

export default function TopBarContainer(isSidebarOpen, toggleSidebar) {
	const { isDarkMode, toggleTheme } = useTheme();

	return (
		<TopBar
			isSidebarOpen={isSidebarOpen}
			toggleSidebar={toggleSidebar}
			isDarkMode={isDarkMode}
			toggleTheme={toggleTheme}
		/>
	);
}
