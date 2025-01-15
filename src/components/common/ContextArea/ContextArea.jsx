'use client';
import { getSidebarContext } from '@/context/SidebarContext';

export default function ContextArea({ children }) {
	const { isSidebarOpen } = getSidebarContext();
	const containerClassName = isSidebarOpen ? 'ml-64' : 'ml-16';
	
	return (
		<div
			className={`transition-all  px-10 py-2 duration-300  ease-in-out transform ${containerClassName}`}
		>
			{children}
		</div>
	);
}
