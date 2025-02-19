import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import { cloneElement } from "react";
interface SidebarItemProps {
  isSelected: boolean;
  isSidebarOpen: boolean;
  children: React.ReactNode;
  icon: React.JSX.Element;
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
        "&:hover": {
          background: theme.palette.primaryHover?.main,
        },
        transition: "all 0.3s ease-in-out",
      }}
    >
      <ListItemButton
        component={Link}
        href={`${path}`}
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <ListItemIcon>
          {cloneElement(icon, {style: {height: '2rem'}} )}
        </ListItemIcon>
        {isSidebarOpen ? <ListItemText primary={`${label}`} /> : ""}
      </ListItemButton>
    </ListItem>
  );
}

//
