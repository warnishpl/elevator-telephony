'use client';
import { Box } from '@mui/material';
import UnloggedLayout from './../../components/layout/UnloggedLayout';

export default function Auth({ children }) {

	return (
		<Box>
			<UnloggedLayout>{children}</UnloggedLayout>
		</Box>
	);
}
