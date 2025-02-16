"use client";
import { requestApi } from "@/utils/requestApi";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { Region, RegionsList } from "./regions.types";
import { Table } from "@/components/common/Table/Table";
import { GridColDef } from "@mui/x-data-grid";
import { Loader } from "@/components/common/Loader/Loader";
import { addRecord, refreshRecords } from "@/utils/apiFunctions";

export default function Regions() {
  const [regionsState, setRegionsState] = useState<Region[]>([]); //dlaczego nie typ RegionsList?
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    refreshRecords("region", refreshRegions);
    setIsLoading(false);
  }, []);

  function refreshRegions() {
    requestApi<RegionsList>({
      path: "/region",
      method: "GET",
    }).then((res) => {
      setRegionsState(res.data);
    });
  }

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
      <button
        onClick={() =>
          addRecord({ name: "Nowy region" }, "region", refreshRegions)
        }
      >
        Dodaj region
      </button>
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
