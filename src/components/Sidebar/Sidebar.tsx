'use client';
import { Box, List } from '@mui/material';
import {
	EngineeringOutlined,
	EscalatorOutlined,
	HomeOutlined,
	InfoOutlined,
} from '@mui/icons-material';
import Image from 'next/image';
import sitemarkLogoIcon from './../../../public/sitemark-logo.svg';
import { SidebarItem } from '../SidebarItem/SidebarItem';
import { useTheme } from '@mui/material';

interface SidebarProps {
	pathname: string;
	isSidebarOpen: boolean;
}
export default function Sidebar({ pathname, isSidebarOpen }: SidebarProps) {
	const theme = useTheme();
	const sidebarItemsArray = [
		{
			pathname,
			isSidebarOpen,
			path: '/',
			icon: <HomeOutlined />,
			label: 'Home',
		},
		{
			pathname,
			isSidebarOpen,
			path: '/about',
			icon: <InfoOutlined />,
			label: 'About',
		},
		{
			pathname,
			isSidebarOpen,
			path: '/elevators',
			icon: <EscalatorOutlined />,
			label: 'Windy',
		},
		{
			pathname,
			isSidebarOpen,
			path: '/employees',
			icon: <EngineeringOutlined />,
			label: 'Pracownicy',
		},
	];
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
				{sidebarItemsArray &&
					sidebarItemsArray.map((item, index) => (
						<SidebarItem
							label={item.label}
							key={index}
							isSelected={pathname === item.path}
							isSidebarOpen={isSidebarOpen}
							path={item.path}
							icon={item.icon}
						>
							{item.label}
						</SidebarItem>
					))}
			</List>
		</Box>
	);
}
