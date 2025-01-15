'use client';
import { useSidebar } from '@/context/SidebarContext';

export default function ContextArea ({ children }) {
	const { isSidebarOpen } = useSidebar();

	return (
		<div
			className={`transition-all duration-300 ease-in-out transform ${
				isSidebarOpen ? 'ml-64' : 'ml-16'
			}`}
		>
			{children}
		</div>
	);
}
