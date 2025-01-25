import {
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	useTheme,
} from '@mui/material';
interface SidebarItemProps {
	pathname: string;
	isSidebarOpen: boolean;
	children: React.ReactNode;
	icon: React.ReactNode;
	path: string;
}
export function SidebarItem({
	children,
	pathname,
	isSidebarOpen,
	path,
	icon,
}: SidebarItemProps) {
	const theme = useTheme();

	return (
		<ListItem
			disablePadding
			sx={{
				background:
					pathname === path
						? theme.palette.primary.main
						: theme.palette.menuBackground?.main,
				'&:hover': {
					background: theme.palette.primaryHover?.main,
				},
				transition: 'all 0.3s ease-in-out',
			}}
		>
			<ListItemButton
				component='a'
				href={`${path}`}
				sx={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-between',
				}}
			>
				<ListItemIcon>{icon}</ListItemIcon>
				{isSidebarOpen ? <ListItemText primary={`${children}`} /> : ''}
			</ListItemButton>
		</ListItem>
	);
}
