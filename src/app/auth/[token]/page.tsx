'use client';

import Home from '@/app/page';
import { useRequestApi } from '@/utils/useRequestApi';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';

export default function Auth() {
	const { token } = useParams();
	const { requestApi } = useRequestApi();

	useEffect(() => {
		if (!token) {
			return;
		}
		requestApi({
			path: `/auth/email/${token}`,
			method: 'GET',
		});
	}, [token]);

	return <Home></Home>;
}
