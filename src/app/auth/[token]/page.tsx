'use client';

import { useRequestApi } from '@/utils/useRequestApi';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Auth() {
	const { token } = useParams();
	const { requestApi } = useRequestApi();

	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		async function getUserData() {
			setLoading(true);
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
			} finally {
				setLoading(false);
			}
		}

		if (token) {
			getUserData();
		}
	}, [token]);

	return (
		<div>{loading ? <p>Ładowanie...</p> : <p>Weryfikacja zakończona.</p>}</div>
	);
}
