'use client';
import { useSidebar } from '@/context/SidebarContext';

export default function ContextArea({ children }) {
	const { isSidebarOpen } = useSidebar();

	return (
		<div
			className={`transition-all  px-10 py-2 duration-300  ease-in-out transform ${
				isSidebarOpen ? 'ml-64' : 'ml-16'
			}`}
		>
			{children}
		</div>
	);
}

//bg-background h-[calc(100vh-64px)]