import {
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	useTheme,
} from '@mui/material';
interface SidebarItemProps {
	isSelected: boolean;
	isSidebarOpen: boolean;
	children: React.ReactNode;
	icon: React.ReactNode;
	path: string;
	label: string;
}
export function SidebarItem({
	isSelected,
	isSidebarOpen,
	path,
	icon,
	label,
}: SidebarItemProps) {
	const theme = useTheme();

	return (
		<ListItem
			disablePadding
			sx={{
				background: isSelected
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
				{isSidebarOpen ? <ListItemText primary={`${label}`} /> : ''}
			</ListItemButton>
		</ListItem>
	);
}
