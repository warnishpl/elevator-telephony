'use client';

import { useAlert } from '@/context/AlertContext';
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
	const { showAlert } = useAlert();

	const handleClick = () => {
		showAlert('To jest wiadomość alertu!', 'success', 3000);
	};
	return (
		<div
			className={`transition-all  px-10 py-2 duration-300  ease-in-out transform ${containerClassName}`}
		>
			{children}
			<br />
			<button className='bg-blue-300 rounded-lg p-2' onClick={handleClick}>
				Wywolaj mnie w ContentArea
			</button>
		</div>
	);
}
