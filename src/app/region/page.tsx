"use client";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { Region } from "./regions.types";
import { Table } from "@/components/common/Table/Table";
import { GridColDef } from "@mui/x-data-grid";
import { Loader } from "@/components/common/Loader/Loader";
import { addRecord, refreshRecords } from "@/utils/apiFunctions";

export default function Regions() {
  const [regionsState, setRegionsState] = useState<Region[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    refreshRecords("region", setRegionsState).then(() => {
      setIsLoading(false);
    });
  }, []);

  const columns: GridColDef[] = [
    {
      field: "uuid",
      headerName: "ID",
      flex: 1,
      editable: false,
    },
    {
      field: "name",
      headerName: "Nazwa",
      flex: 2,
      editable: false,
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
      <Table
        rows={regionsState}
        columns={columns}
        isLoading={isLoading}
        path="region"
        stateToRefresh={setRegionsState}
      />
    </Box>
  );
}
