"use client";

import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { StatusIcon } from "./StatusIcon";
import { Elevator } from "./elevator.types";
import { Table } from "@/components/common/Table/Table";
import { GridColDef } from "@mui/x-data-grid";
import { Loader } from "@/components/common/Loader/Loader";
import { refreshRecords } from "@/utils/apiFunctions";
import { updateAtParser } from "@/utils/updateAtParser";

export default function Elevators() {
  const [elevatorsList, setElevatorsList] = useState<Elevator[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    refreshRecords("elevator", setElevatorsList).then(() => {
      setIsLoading(false);
    });
  }, []);

  const elevatorsListWithUpdatedAt = elevatorsList.map((elevator) => ({
    ...elevator,
    updatedAt: updateAtParser(elevator.updatedAt),
  }));

  const columns: GridColDef[] = [
    {
      field: "address",
      headerName: "Adres",
      flex: 3,
      editable: false,
    },
    {
      field: "city",
      headerName: "Miasto",
      flex: 2,
      editable: false,
    },
    {
      field: "phoneNumber",
      headerName: "Numer telefonu",
      flex: 2,
      editable: false,
    },
    {
      field: "region",
      headerName: "Region",
      flex: 2,
      editable: false,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      editable: false,
      filterable: false,
      renderCell: (params) => (
        <StatusIcon status={params.row.status}></StatusIcon>
      ),
    },
    {
      field: "updatedAt",
      headerName: "Zaaktualizowano",
      flex: 2,
    },
  ];

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          height: "calc( 100dvh - 8rem )",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Loader />
      </Box>
    );
  }

  return (
    <Box sx={{ height: 700, width: "100%" }}>
      <Typography
        mb={2}
        variant="h6"
        component="h1"
        sx={{ textAlign: "center" }}
      >
        Lista wind
      </Typography>
      <Table
        columns={columns}
        rows={elevatorsListWithUpdatedAt}
        isLoading={isLoading}
        path="elevator"
        stateToRefresh={setElevatorsList}
      />
    </Box>
  );
}
