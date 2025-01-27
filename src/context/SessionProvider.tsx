import { useSession } from '@/utils/useSession';
import LoggedLayout from '../components/layout/LoggedLayout';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import UnloggedLayout from '@/components/layout/UnloggedLayout';

interface LoggedLayoutProps {
	children: React.ReactNode;
}

export default function SessionProvider({ children }: LoggedLayoutProps) {
	const router = useRouter();
	const { isLoggedIn, isSessionChecked } = useSession(); 
	const [isSessionLoaded, setIsSessionLoaded] = useState(false); 

	useEffect(() => {
		if (isSessionChecked) {
			setIsSessionLoaded(true);

			if (isLoggedIn === false) {
				router.replace('/auth');
			} else {
				router.replace('');
			}
		}
	}, [isLoggedIn, isSessionChecked, router]);

	if (!isSessionLoaded) {
		return null;
	}
	
	if (!isLoggedIn) {
		return <UnloggedLayout>{children}</UnloggedLayout>;
	} else {
		return <LoggedLayout>{children}</LoggedLayout>;
	}
}
