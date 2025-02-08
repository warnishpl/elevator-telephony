'use client';

import { useRequestApi } from '@/hooks/useRequestApi';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { ApiResponse } from '../auth.types';

export default function Auth() {
	const { token } = useParams();
	const { requestApi } = useRequestApi();
	const router = useRouter();

	useEffect(() => {
		requestApi<ApiResponse>({
			path: `/auth/email/${token}`,
			method: 'GET',
		}).then(() => {
			router.push('/dashboard');
		});
	}, [token]);

	return null;
}
