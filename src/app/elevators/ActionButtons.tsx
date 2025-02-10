"use client";
import { requestApi } from "@/utils/requestApi";
import {
  CheckOutlined,
  PreviewOutlined,
  SaveOutlined,
} from "@mui/icons-material";
import { Box, CircularProgress, Fab, useTheme } from "@mui/material";
import { green } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { GridRenderCellParams } from "@mui/x-data-grid";
import { useRouter } from "next/navigation";

interface ElevatorRow {
  uuid: string;
  address: string;
  city: string;
  phoneNumber: string;
}

interface ElevatorsActionsProps {
  params: GridRenderCellParams;
  rowId: number | null;
  setRowId: React.Dispatch<React.SetStateAction<number | null>>;
}

export function ActionButtons({
  params,
  rowId,
  setRowId,
}: Readonly<ElevatorsActionsProps>) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const theme = useTheme();
  const router = useRouter();

  function handleElevatorModal() {
    router.push(`/elevators?id=${params.row.uuid}`);
  }

  async function updateElevatorData(
    data: { address: string; city: string; phoneNumber: string },
    id: string
  ) {
    const result = await requestApi({
      path: `/elevator/${id}`,
      method: "PUT",
      data,
    });
    return result;
  }

  const handleSubmit = async () => {
    setLoading(true);
    const { address, city, phoneNumber, uuid } = params.row as ElevatorRow;
    const result = await updateElevatorData(
      { address, city, phoneNumber },
      uuid
    );

    if (result.status === 200) {
      setSuccess(true);
      setRowId(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (params.id === rowId) {
      setSuccess(false);
    }
  }, [params.id, rowId]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        gap: "0.5rem",
      }}
    >
      <Box sx={{ position: "relative" }}>
        {success ? (
          <Fab
            color="primary"
            sx={{
              width: 40,
              height: 40,
              bgcolor: green[500],
              "&:hover": { bgcolor: green[700] },
            }}
          >
            <CheckOutlined />
          </Fab>
        ) : (
          <Fab
            color="primary"
            sx={{
              width: 40,
              height: 40,
            }}
            disabled={params.id !== rowId || loading}
            onClick={handleSubmit}
          >
            <SaveOutlined />
          </Fab>
        )}
        {loading && (
          <CircularProgress
            size={52}
            sx={{
              color: green[500],
              position: "absolute",
              top: -6,
              left: -6,
              zIndex: 1,
            }}
          />
        )}
      </Box>
      <Box>
        <Fab
          sx={{
            width: 40,
            height: 40,
            color: theme.palette.textReverse?.primary,
            bgcolor: theme.palette.primary.main,
            "&:hover": { bgcolor: theme.palette.primaryHover?.main },
          }}
        >
          <PreviewOutlined onClick={handleElevatorModal} />
        </Fab>
      </Box>
    </Box>
  );
}
