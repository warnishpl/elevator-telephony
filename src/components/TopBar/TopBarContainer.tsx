import { useTheme } from '@/context/ThemeProvider';
import TopBar from './TopBar';

interface TopBarContainerProps {
	isSidebarOpen: boolean;
	toggleSidebar: () => void;
}
export default function TopBarContainer({
	isSidebarOpen,
	toggleSidebar,
}: TopBarContainerProps) {
	const context = useTheme();

	if (!context) {
		return null;
	}

	const { isDarkMode, toggleTheme } = context;
	const theme = isDarkMode as boolean;

	return (
		<TopBar
			isSidebarOpen={isSidebarOpen}
			toggleSidebar={toggleSidebar}
			isDarkMode={theme}
			toggleTheme={toggleTheme}
		/>
	);
}
