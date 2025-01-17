'use client';

import React from 'react';

interface ContextAreaProps {
	children: React.ReactNode;
	isSidebarOpen: boolean;
}
export default function ContextArea({
	children,
	isSidebarOpen,
}: ContextAreaProps) {
	const containerClassName = isSidebarOpen ? 'ml-64' : 'ml-16';

	return (
		<div
			className={`transition-all  px-10 py-2 duration-300  ease-in-out transform ${containerClassName}`}
		>
			{children}
		</div>
	);
}
