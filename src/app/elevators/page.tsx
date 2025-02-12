"use client";

import { requestApi } from "@/utils/requestApi";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { StatusIcon } from "./StatusIcon";
import { ActionButtons } from "@/app/elevators/ActionButtons";
import { Elevator, ElevatorList } from "./elevators.types";
import { useRouter, useSearchParams } from "next/navigation";
import ElevatorModal from "./ElevatorModal";
import { Table } from "@/components/common/Table/Table";
import { GridColDef } from "@mui/x-data-grid";

export default function Elevators() {
  const [elevatorsList, setElevatorsList] = useState<Elevator[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [rowId, setRowId] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const queryId = searchParams.get("id");
  const router = useRouter();
  const [selectedElevatorData, setSelectedElevatorData] =
    useState<Elevator | null>();

  const handleCloseModal = () => {
    setSelectedElevatorData(null);
    router.push(`/elevators`);
  };

  useEffect(() => {
    if (queryId) {
      fetchElevator();
    }
  }, [queryId]);

  useEffect(() => {
    async function fetchElevators() {
      const { data } = await requestApi<ElevatorList>({
        path: "/elevator",
        method: "GET",
      });
      setElevatorsList(
        data.map((elevator) => ({
          ...elevator,
          updatedAt: updateAtParser(elevator.updatedAt),
        }))
      );
      setIsLoading(true);
    }
    fetchElevators();
  }, []);

  async function fetchElevator() {
    const { data: elevatorData } = await requestApi<Elevator>({
      path: `/elevator/${queryId}`,
      method: "GET",
    });
    if (elevatorData?.updatedAt) {
      elevatorData.updatedAt = updateAtParser(elevatorData.updatedAt);
    }
    setSelectedElevatorData(elevatorData);
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

  const columns: GridColDef[] = [
    { field: "address", headerName: "Adres", flex: 3, editable: true },
    { field: "city", headerName: "Miasto", flex: 2, editable: true },
    {
      field: "phoneNumber",
      headerName: "Numer telefonu",
      flex: 2,
      editable: true,
    },
    { field: "region", headerName: "Region", flex: 2, editable: false },
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
    { field: "updatedAt", headerName: "Zaaktualizowano", flex: 2 },
    {
      field: "actions",
      headerName: "Akcje",
      type: "actions",
      renderCell: (params) => (
        <ActionButtons
          {...{
            params,
            rowId,
            setRowId,
            fetchElevator,
          }}
        />
      ),
      editable: false,
      filterable: false,
      sortable: false,
      resizable: false,
      flex: 1,
      disableColumnMenu: true,
      hideable: false,
    },
  ];

  // useEffect(() => {
  //   requestApi<ElevatorList>({
  //     path: "/elevator",
  //     method: "GET",
  //   }).then((res) => {
  //     setElevatorsList(
  //       res.data.map((elevator) => ({
  //         ...elevator,
  //         updatedAt: updateAtParser(elevator.updatedAt),
  //       }))
  //     );
  //     setIsLoading(false);
  //   });
  // }, []);

  return (
    <Box sx={{ height: 700, width: "100%" }}>
      <Typography variant="h6" component="h1" sx={{ textAlign: "center" }}>
        Lista wind
      </Typography>
      <Table
        columns={columns}
        rows={elevatorsList}
        isLoading={isLoading}
        setRowId={setRowId}
      />
      {selectedElevatorData && (
        <ElevatorModal
          isModalOpen={!!selectedElevatorData}
          handleCloseModal={handleCloseModal}
          selectedElevatorData={selectedElevatorData}
        />
      )}
    </Box>
  );
}
