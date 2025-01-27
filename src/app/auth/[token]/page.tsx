'use client';

import Home from '@/app/page';
import { useRequestApi } from '@/utils/useRequestApi';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Auth() {
	const { token } = useParams();
	const { requestApi } = useRequestApi();
	const router = useRouter();

	useEffect(() => {
		if (!token) {
			return;
		}
		requestApi({
			path: `/auth/email/${token}`,
			method: 'GET',
		}).then(() => {
			router.replace('/');
		});
	}, [token]);

	return <Home></Home>;
}
