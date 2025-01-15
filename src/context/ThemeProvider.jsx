'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
	const [isDarkMode, setIsDarkMode] = useState(null);

	useEffect(() => {
		const storedTheme = localStorage.getItem('theme');
		const prefersDarkMode = window.matchMedia(
			'(prefers-color-scheme: dark)'
		).matches;

		setIsDarkMode(storedTheme === 'dark' || (!storedTheme && prefersDarkMode));
	}, []);

	useEffect(() => {
		if (isDarkMode === null) return;

		const root = window.document.documentElement;
		if (isDarkMode) {
			root.classList.add('dark');
			localStorage.setItem('theme', 'dark');
		} else {
			root.classList.remove('dark');
			localStorage.setItem('theme', 'light');
		}
	}, [isDarkMode]);

	const toggleTheme = () => {
		setIsDarkMode((prevMode) => !prevMode);
	};

	return (
		<ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};
