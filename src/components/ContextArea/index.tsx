"use client";

import { Box } from "@mui/material";

interface ContextAreaProps {
  children: React.ReactNode;
  isSidebarOpen: boolean;
}
export default function ContextArea({
  children,
  isSidebarOpen,
}: ContextAreaProps) {
  return (
    <Box
      sx={{
        height: "100%",
        transition: "all 0.3s ease-in-out",
        marginLeft: isSidebarOpen ? "16rem" : "4rem",
      }}
    >
      {children}
    </Box>
  );
}
