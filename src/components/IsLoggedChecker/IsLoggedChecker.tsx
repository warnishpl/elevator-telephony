import { useRequestApi } from '@/utils/useRequestApi';
import { useEffect, useState } from 'react';
import LoggedLayout from '../layout/LoggedLayout';
import UnloggedLayout from '../layout/UnloggedLayout';

interface LoggedLayoutProps {
	children: React.ReactNode;
}
interface ApiResponse {
	status: number;
}

export default function IsLoggedChecker({ children }: LoggedLayoutProps) {
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
	const { requestApi } = useRequestApi();

	useEffect(() => {
		const checkWhoAmI = async () => {
			try {
				const response = await requestApi({
					path: '/user/who-am-i',
					method: 'GET',
					headers: {
						Authorization:
							'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiYWNjZXNzIiwidXVpZCI6IjA3MjkzNmY0LWU0ZmQtNGNhYi1iZjdhLWEwYmM4NWU5OWI0OSIsImlhdCI6MTczNzUwNDU4NiwiZXhwIjoxNzM3Njc3Mzg2fQ.J4kvBJnKyAQ_SXFv7V_IfQYoxuPhVbLDwqsg7I1zKvk',
					},
				});
				if ((response as ApiResponse).status === 200) {
					setIsLoggedIn(true);
				} else {
					setIsLoggedIn(false);
				}
			} catch (error) {
				console.error(error);
				setIsLoggedIn(false);
			}
		};

		checkWhoAmI();
	}, []);
	return (
		<>
			{isLoggedIn ? (
				<LoggedLayout>{children}</LoggedLayout>
			) : (
				<UnloggedLayout>{children}</UnloggedLayout>
			)}
		</>
	);
}
