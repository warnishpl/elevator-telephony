'use client';

import { useEffect, useState } from 'react';
import { useRequestApi } from './../utils/useRequestApi';

interface SessionState {
	isLoggedIn: boolean | null;
	isSessionChecked: boolean;
	userData?: object;
}
interface ApiResponse {
	status: number;
}

export const useSession = (): SessionState => {
	const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
	const [isSessionChecked, setIsSessionChecked] = useState(false); 

	const { requestApi } = useRequestApi();

	useEffect(() => {
		const handleUserData = (response: ApiResponse) => {
			if (response?.status === 200) {
				setIsLoggedIn(true);
			} else {
				setIsLoggedIn(false);
			}
		};

		requestApi<ApiResponse>({
			path: '/user/who-am-i',
			method: 'GET',
		})
			.then((res) => handleUserData(res))
			.catch(() => setIsLoggedIn(false))
			.finally(() => setIsSessionChecked(true));
	}, []);

	return { isLoggedIn, isSessionChecked };
};
