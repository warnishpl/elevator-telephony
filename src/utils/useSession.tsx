'use client'
import { useState, useEffect, useCallback } from 'react';
import { useRequestApi } from './useRequestApi';
import { User } from './sessionTypes';

export function useSession() {
	const [session, setSession] = useState<User | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const { requestApi } = useRequestApi();

	useEffect(() => {
		const fetchSession = async () => {
			setLoading(true);
			const { status, data } = await requestApi({
				path: 'user/who-am-i',
				method: 'GET',
			});
			if (status === 200) {
				setSession(data as User);
			}
			setLoading(false);
			return data;
		};

		fetchSession();
	}, []);

	const isAuthenticated = !!session;

	const getUser = useCallback(() => {
		return session;
	}, [session]);

	return { isAuthenticated, getUser, loading };
}
