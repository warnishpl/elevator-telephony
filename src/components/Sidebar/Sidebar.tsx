'use client';
import { Box, List, useTheme } from '@mui/material';
import {
	EngineeringOutlined,
	EscalatorOutlined,
	HomeOutlined,
	InfoOutlined,
} from '@mui/icons-material';
import Image from 'next/image';
import sitemarkLogoIcon from './../../../public/sitemark-logo.svg';
import { SidebarItem } from '../SidebarItem/SidebarItem';

interface SidebarProps {
	pathname: string;
	isSidebarOpen: boolean;
}
export default function Sidebar({ pathname, isSidebarOpen }: SidebarProps) {
	const theme = useTheme();

	return (
		<Box
			position='fixed'
			left='0'
			top='0'
			height='100vh'
			sx={{
				width: isSidebarOpen ? '16rem' : '4rem',
				transition: 'all 0.3s ease-in-out',
				background: theme.palette.menuBackground?.main,
			}}
		>
			<Image
				src={sitemarkLogoIcon}
				alt='logo'
				style={{ height: '4rem', padding: '10px' }}
			></Image>
			<List disablePadding>
				<SidebarItem
					pathname={pathname}
					isSidebarOpen={isSidebarOpen}
					path='/'
					icon={<HomeOutlined />}
				>
					Home
				</SidebarItem>
				<SidebarItem
					pathname={pathname}
					isSidebarOpen={isSidebarOpen}
					path='/about'
					icon={<InfoOutlined />}
				>
					About
				</SidebarItem>
				<SidebarItem
					pathname={pathname}
					isSidebarOpen={isSidebarOpen}
					path='/elevators'
					icon={<EscalatorOutlined />}
				>
					Windy
				</SidebarItem>
				<SidebarItem
					pathname={pathname}
					isSidebarOpen={isSidebarOpen}
					path='/employees'
					icon={<EngineeringOutlined />}
				>
					Pracownicy
				</SidebarItem>
			</List>
		</Box>
	);
}
