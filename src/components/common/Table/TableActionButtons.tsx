"use client";
import { ModeEditOutlined } from "@mui/icons-material";
import { Fab, Tooltip, useTheme } from "@mui/material";
import { GridRenderCellParams } from "@mui/x-data-grid";
import { useRouter } from "next/navigation";

interface ElevatorsActionsProps {
  rowId: GridRenderCellParams;
}

export function TableActionButtons({ rowId }: Readonly<ElevatorsActionsProps>) {
  const theme = useTheme();
  const router = useRouter();

  function handleElevatorModal() {
    router.push(`/elevators/${rowId}`);
  }

  return (
    <Tooltip title="Edytuj">
      <Fab
        onClick={handleElevatorModal}
        sx={{
          minWidth: 40,
          width: 40,
          height: 40,
          color: theme.palette.textReverse?.primary,
          bgcolor: theme.palette.primary.main,
          "&:hover": { bgcolor: theme.palette.primaryHover?.main },
        }}
      >
        <ModeEditOutlined />
      </Fab>
    </Tooltip>
  );
}
