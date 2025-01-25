import sitemarkIcon from 'public/sitemark.svg';
import moonIcon from 'public/moon.svg';
import sunIcon from 'public/sun.svg';
import Image from 'next/image';
import { Box, Button } from '@mui/material';

export function UnloggedHeader({
	isDarkMode,
	toggleTheme,
}: {
	isDarkMode: boolean;
	toggleTheme: () => void;
}) {
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'row',
				justifyContent: 'space-between',
			}}
		>
			<Image priority src={sitemarkIcon} alt='sitemark-icon' />
			<Button onClick={toggleTheme} sx={{ marginRight: '0.5rem' }}>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						borderRadius: '0.25rem',
						padding: '0.25rem',
						transition: 'all 0.3s ease-in-out',
					}}
				>
					<Image
						src={isDarkMode ? moonIcon : sunIcon}
						alt='theme-button'
						width={24}
						height={24}
					/>
				</Box>
			</Button>
		</Box>
	);
}
