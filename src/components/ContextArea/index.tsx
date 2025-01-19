'use client';

import { useAlert } from '@/context/AlertContext';
import { useRequestApi } from '@/utils/useRequestApi';
import { useState } from 'react';

interface Elevator {
	id: number;
	city: string;
	address: string;
	region: { name: string };
}

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

	const { requestApi } = useRequestApi();
	const [elevator, setElevator] = useState<Elevator[]>([]);

	const fetchElevatorData = async () => {
		const data = await requestApi<Elevator[]>({
			path: '/ale',
			method: 'GET',
		});
		setElevator(data);
		console.log('Pobrane dane:', data);
	};
	console.log(elevator);

	const handleClick = () => {
		showAlert('To jest wiadomość alertu!', 'success', 3000);
	};

	return (
		<div
			className={`transition-all  px-10 py-2 duration-300  ease-in-out transform ${containerClassName}`}
		>
			{children}
			<br />
			<button
				className='bg-blue-300 rounded-lg p-2'
				onClick={fetchElevatorData}
			>
				Pobierz dane windy
			</button>
			<button className='bg-blue-300 rounded-lg p-2' onClick={handleClick}>
				Wywolaj mnie w ContentArea
			</button>
		</div>
	);
}
