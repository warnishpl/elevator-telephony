"use client";
import { deleteRecord, refreshRecords } from "@/utils/apiFunctions";
import { DeleteForeverOutlined, ModeEditOutlined } from "@mui/icons-material";
import { Box, Fab, Tooltip, useTheme } from "@mui/material";
import { GridRenderCellParams } from "@mui/x-data-grid";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

interface ElevatorsActionsProps {
  rowId: GridRenderCellParams;
  path: string;
  parseUpdatedAt?: boolean;
  stateToRefresh: Dispatch<SetStateAction<any>>;
}

export function TableActionButtons({
  rowId,
  path,
  stateToRefresh,
  parseUpdatedAt,
}: Readonly<ElevatorsActionsProps>) {
  const theme = useTheme();
  const router = useRouter();

  function handleOpenDetails() {
    router.push(`/${path}/${rowId}`);
  }

  return (
    <Box sx={{ display: "flex", gap: "0.5rem" }}>
      <Tooltip title="Edytuj">
        <Fab
          size="small"
          onClick={handleOpenDetails}
          sx={{
            color: theme.palette.textReverse?.primary,
            bgcolor: theme.palette.primary.main,
            "&:hover": { bgcolor: theme.palette.primaryHover?.main },
          }}
        >
          <ModeEditOutlined />
        </Fab>
      </Tooltip>
      <Tooltip title="Usuń">
        <Fab
          size="small"
          onClick={() =>
            deleteRecord(String(rowId), path, () =>
              refreshRecords(path, stateToRefresh, parseUpdatedAt)
            )
          }
          sx={{
            color: theme.palette.textReverse?.primary,
            bgcolor: theme.palette.primary.main,
            "&:hover": { bgcolor: theme.palette.primaryHover?.main },
          }}
        >
          <DeleteForeverOutlined />
        </Fab>
      </Tooltip>
    </Box>
  );
}
