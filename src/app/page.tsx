'use client';

import { useSession } from '@/utils/useSession';
import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function LoadingPage() {
	const { isAuthenticated } = useSession();
	const router = useRouter();

	if (!isAuthenticated) {
		router.push('/auth');
	}

	return (
		<Box>
			<Typography variant='h6' component='h1'>
				Jakis content
			</Typography>
		</Box>
	);
}
