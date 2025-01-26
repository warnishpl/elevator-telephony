import sitemarkIcon from 'public/sitemark.svg';
import Image from 'next/image';
import { Box, Button, Tooltip } from '@mui/material';
import { BedtimeOutlined, WbSunnyOutlined } from '@mui/icons-material';

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
				></Box>
			</Button>
			<Tooltip title='Zmiana skórki'>
				<Button onClick={toggleTheme}>
					{isDarkMode ? <WbSunnyOutlined /> : <BedtimeOutlined />}
				</Button>
			</Tooltip>
		</Box>
	);
}
