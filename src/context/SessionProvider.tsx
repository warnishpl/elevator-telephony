import { useSession } from '@/utils/useSession';
import LoggedLayout from '../components/layout/LoggedLayout';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import UnloggedLayout from '@/components/layout/UnloggedLayout';

interface LoggedLayoutProps {
	children: React.ReactNode;
}

export default function SessionProvider({ children }: LoggedLayoutProps) {
	const router = useRouter();
	const { isLoggedIn } = useSession();

	useEffect(() => {
		if (isLoggedIn === false) {
			router.replace('/auth');
		} else {
			router.replace('');
		}
	}, [isLoggedIn, router]);

	if (isLoggedIn === false) {
		return <UnloggedLayout>{children}</UnloggedLayout>;
	} else {
		return <LoggedLayout>{children}</LoggedLayout>;
	}
}
