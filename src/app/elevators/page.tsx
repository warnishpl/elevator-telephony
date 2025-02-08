"use client";

import { requestApi } from "@/utils/requestApi";
import { Box, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { DataGrid, gridClasses, GridColDef } from "@mui/x-data-grid";
import { StatusIcon } from "./StatusIcon";
import { plPL } from "@mui/x-data-grid/locales";
import { ElevatorsActions } from "./ElevatorsActions";

type ElevatorList = Array<{
  number: number;
  uuid: string;
  address: string;
  city: string;
  phoneNumber: string;
  region: string;
  status: string;
  updatedAt: string;
}>;

interface Elevator {
  id: string;
  address: string;
  city: string;
  phoneNumber: string;
  region: string;
  status: string;
  updatedAt: string;
}

function updateAtParser(stringDate: string) {
	const date = new Date(stringDate);
	const lastUpdateMinutes = Math.floor(
		(new Date().getTime() - date.getTime()) / (60 * 1000)
	);
	return lastUpdateMinutes < 60
		? `${lastUpdateMinutes} min temu`
		: date.toLocaleString();
}

export default function Elevators() {
  const [elevatorsList, setElevatorsList] = useState<Elevator[]>([]);
  const theme = useTheme();
  const [rowId, setRowId] = useState<number | null>(null);

  useEffect(() => {
    async function fetchElevators() {
      const { data } = await requestApi<ElevatorList>({
        path: "/elevator",
        method: "GET",
      });
      setElevatorsList(
        data.map((elevator) => ({
          ...elevator,
          id: elevator.uuid,
          updatedAt: updateAtParser(elevator.updatedAt),
        }))
      );
    }
    fetchElevators();
  }, []);



  const columns: GridColDef[] = [
    { field: "address", headerName: "Adres", flex: 3, editable: true },
    { field: "city", headerName: "Miasto", flex: 2, editable: true },
    {
      field: "phoneNumber",
      headerName: "Numer telefonu",
      flex: 2,
      editable: true,
    },
    { field: "region", headerName: "Region", flex: 2 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => (
        <StatusIcon status={params.row.status}></StatusIcon>
      ),
    },
    { field: "updatedAt", headerName: "Zaaktualizowano", flex: 2 },
    {
      field: "actions",
      headerName: "Akcje",
      type: "actions",
      renderCell: (params) => (
        <ElevatorsActions {...{ params, rowId, setRowId }} />
      ),
      editable: false,
      filterable: false,
      sortable: false,
      resizable: false,
      flex: 1,
      disableColumnMenu: true,
    },
  ];

  return (
    <Box sx={{ height: 700, width: "100%" }}>
      <Typography variant="h6" component="h1" sx={{ textAlign: "center" }}>
        Lista wind
      </Typography>
      <DataGrid
        localeText={plPL.components.MuiDataGrid.defaultProps.localeText}
        pageSizeOptions={[
          10,
          100,
          { value: 1000, label: "1,000" },
          { value: -1, label: "Wszystkie" },
        ]}
        rows={elevatorsList}
        getRowId={(row) => row.uuid}
        columns={columns}
        slotProps={{
          loadingOverlay: {
            variant: "linear-progress",
            noRowsVariant: "linear-progress",
          },
        }}
        getRowSpacing={(params) => ({
          top: params.isFirstVisible ? 0 : 5,
          bottom: params.isLastVisible ? 0 : 5,
        })}
        sx={{
          [`& .${gridClasses.row}`]: {
            bgcolor: theme.palette.menuBackground?.main,
          },
        }}
        onCellEditStop={(params) => setRowId(params.id as number)}
      />
    </Box>
  );
}
