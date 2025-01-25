'use client';

import Home from '@/app/page';
import { useRequestApi } from '@/utils/useRequestApi';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';

export default function Auth() {
	const { token } = useParams();
	const { requestApi } = useRequestApi();

	useEffect(() => {
		if (!token) {
			return;
		}

		const fetchData = async () => {
			try {
				await requestApi({
					path: `/auth/email/${token}`,
					method: 'GET',
				});
			} catch (error) {
				console.error('Błąd podczas pobierania danych:', error);
				if (axios.isAxiosError(error)) {
					console.error('Szczegóły błędu Axios:', {
						status: error.response?.status,
						data: error.response?.data,
					});
				}
			}
		};

		fetchData();
	}, [token]);

	return <Home></Home>;
}
