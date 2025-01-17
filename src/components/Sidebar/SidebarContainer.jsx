'use client';
import { usePathname } from 'next/navigation';
import Sidebar from '@/components/Sidebar/Sidebar';

export default function SidebarContainer({ isSidebarOpen }) {
	const pathname = usePathname();

	return <Sidebar pathname={pathname} isSidebarOpen={isSidebarOpen}></Sidebar>;
}
