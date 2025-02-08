'use client';

import { useRequestApi } from '@/hooks/useRequestApi';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';


export default function Auth() {
	const { token } = useParams();
	const { requestApi } = useRequestApi();
	const router = useRouter();

	useEffect(() => {
		requestApi({
			path: `/auth/email/${token}`,
			method: 'GET',
		}).then(() => {
			router.push('/dashboard');
		});
	}, []);

	return null;
}
