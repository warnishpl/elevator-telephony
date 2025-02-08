'use client';
import {
	Avatar,
	Badge,
	Divider,
	ListItemIcon,
	Menu,
	MenuItem,
	Stack,
	Tooltip,
	useTheme,
} from '@mui/material';
import {
	WbSunnyOutlined,
	BedtimeOutlined,
	Settings,
	MenuOutlined,
	MenuOpenOutlined,
	EmailOutlined,
	SearchOutlined,
	PersonAdd,
	Logout,
} from '@mui/icons-material';
import { Box, Button, InputAdornment, TextField } from '@mui/material';
import { useState } from 'react';

interface TopBarProps {
	isSidebarOpen: boolean;
	toggleSidebar: () => void;
	isDarkMode: boolean;
	toggleTheme: () => void;
	fullName: string;
}

export default function TopBar({
	isSidebarOpen,
	toggleSidebar,
	isDarkMode,
	toggleTheme,
	fullName,
}: TopBarProps) {
	const theme = useTheme();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const openPersonalMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const closePersonalMenu = () => {
		setAnchorEl(null);
	};
	function handleLogout() {
		//zapytanie do api odsylajace Set-Cookie z data wygasniecia w przeszlosci
	}
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'row',
				alignItems: 'center',
				height: '4rem',
				paddingLeft: isSidebarOpen ? '16rem' : '4rem',
				transition: 'all 0.3s ease-in-out',
				background: theme.palette.menuBackground?.main,
			}}
		>
			<Tooltip title='Menu boczne'>
				<Button onClick={toggleSidebar}>
					{!isSidebarOpen ? <MenuOutlined /> : <MenuOpenOutlined />}
				</Button>
			</Tooltip>
			<Box
				sx={{
					height: '2.25rem',
					padding: '0 10px',
					borderRadius: theme.shape.borderRadius,
					width: '30%',
				}}
			>
				<TextField
					id='outlined-basic'
					variant='outlined'
					placeholder='Wyszukaj'
					type='text'
					size='small'
					slotProps={{
						input: {
							startAdornment: (
								<InputAdornment position='start'>
									<SearchOutlined sx={{ color: theme.palette.primary.main }} />
								</InputAdornment>
							),
						},
					}}
					sx={{ width: { sx: '15rem', sm: '25rem' } }}
				/>
			</Box>

			<Stack direction='row' marginLeft='auto'>
				<Tooltip title='Wiadomości'>
					<Button>
						<Badge badgeContent={4} color='error'>
							<EmailOutlined />
						</Badge>
					</Button>
				</Tooltip>
				<Tooltip title='Zmiana skórki'>
					<Button onClick={toggleTheme}>
						{isDarkMode ? <WbSunnyOutlined /> : <BedtimeOutlined />}
					</Button>
				</Tooltip>
				<Tooltip title='Ustawienia'>
					<Button>
						<Settings />
					</Button>
				</Tooltip>
				<Tooltip title='Konto'>
					<Button
						onClick={openPersonalMenu}
						startIcon={
							<Avatar sx={{ bgcolor: theme.palette.primary.main }}>
								{fullName.slice(0, 1)}
							</Avatar>
						}
					>
						{fullName}
					</Button>
				</Tooltip>
			</Stack>
			<Menu
				anchorEl={anchorEl}
				id='account-menu'
				open={open}
				onClose={closePersonalMenu}
				onClick={closePersonalMenu}
				slotProps={{
					paper: {
						elevation: 0,
						sx: {
							background: theme.palette.menuBackground?.main,
							color: theme.palette.text.primary,
							overflow: 'visible',
							filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
							mt: 1.5,
							'& .MuiAvatar-root': {
								width: 32,
								height: 32,
								ml: -0.5,
								mr: 1,
								bgcolor: theme.palette.primary.main,
							},
							'&::before': {
								content: '""',
								display: 'block',
								position: 'absolute',
								top: 0,
								right: 14,
								width: 10,
								height: 10,
								bgcolor: theme.palette.menuBackground?.main,
								transform: 'translateY(-50%) rotate(45deg)',
								zIndex: 0,
							},
						},
					},
				}}
				transformOrigin={{ horizontal: 'right', vertical: 'top' }}
				anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
			>
				<MenuItem onClick={closePersonalMenu}>
					<Avatar /> Profil
				</MenuItem>
				<MenuItem onClick={closePersonalMenu}>
					<Avatar /> Moje konto
				</MenuItem>
				<Divider />
				<MenuItem onClick={closePersonalMenu}>
					<ListItemIcon>
						<PersonAdd
							sx={{ color: theme.palette.primary.main }}
							fontSize='small'
						/>
					</ListItemIcon>
					Dodaj kolejne konto
				</MenuItem>
				<MenuItem onClick={closePersonalMenu}>
					<ListItemIcon>
						<Settings
							sx={{ color: theme.palette.primary.main }}
							fontSize='small'
						/>
					</ListItemIcon>
					Ustawienia
				</MenuItem>
				<MenuItem
					onClick={() => {
						closePersonalMenu();
						handleLogout();
					}}
				>
					<ListItemIcon>
						<Logout
							sx={{ color: theme.palette.primary.main }}
							fontSize='small'
						/>
					</ListItemIcon>
					Wyloguj się
				</MenuItem>
			</Menu>
		</Box>
	);
}
