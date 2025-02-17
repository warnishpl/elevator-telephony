"use client";
import { Box, Fab, Tooltip, useTheme } from "@mui/material";
import { GridRenderCellParams } from "@mui/x-data-grid";
import { JSX } from "react";

interface ElevatorsActionsProps {
  rowId: string;
  buttons: {
    icon: JSX.Element;
    title: string;
    onClick: (rowId: string) => void;
  }[];
}

export function TableActionButtons({
  rowId,
  buttons,
}: Readonly<ElevatorsActionsProps>) {
  const theme = useTheme();

  return (
    <Box sx={{ display: "flex", gap: "0.5rem" }}>
      {buttons.map(({ icon, title, onClick }) => (
        <Tooltip key={title} title={title}>
          <Fab
            size="small"
            onClick={() => onClick(rowId)}
            sx={{
              color: theme.palette.textReverse?.primary,
              bgcolor: theme.palette.primary.main,
              "&:hover": { bgcolor: theme.palette.primaryHover?.main },
            }}
          >
            {icon}
          </Fab>
        </Tooltip>
      ))}
    </Box>
  );
}
