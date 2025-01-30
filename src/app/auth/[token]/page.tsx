'use client';

import UnloggedLayout from '@/layouts/UnloggedLayout';
import { redirectTo } from '@/utils/redirectUrl';
import { useRequestApi } from '@/utils/useRequestApi';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { ApiResponse, AuthProps } from '../auth.types';


export default function Auth({ children }: AuthProps) {
	const { token } = useParams();
	const { requestApi } = useRequestApi();

	useEffect(() => {
		requestApi<ApiResponse>({
			path: `/auth/email/${token}`,
			method: 'GET',
		}).then((response) => {
			if (response && response.status === 200) {
				redirectTo('/dashboard', true);
			}
		});
	}, [token]);

	return <UnloggedLayout>{children}</UnloggedLayout>;
}
