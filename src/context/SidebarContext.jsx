'use client';
import { createContext, useContext, useState } from 'react';

const SidebarContext = createContext();

export const useSidebar = () => {
	return useContext(SidebarContext);
};

export const SidebarProvider = ({ children }) => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const toggleSidebar = () => {
		setIsSidebarOpen((prevState) => !prevState);
	};

	return (
		<SidebarContext.Provider value={{ isSidebarOpen, toggleSidebar }}>
			{children}
		</SidebarContext.Provider>
	);
};
