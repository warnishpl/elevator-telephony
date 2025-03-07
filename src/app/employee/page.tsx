"use client";

import { Table } from "@/components/common/Table/Table";
import { Box } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Loader } from "@/components/common/Loader/Loader";
import { Employee } from "./employee.types";
import { refreshRecords } from "@/utils/apiFunctions";
import { AddRecordModal } from "../../components/common/AddRecordModal/AddRecordModal";
import { Header } from "@/components/common/Header/Header";

export default function Employees() {
  const [employeesState, setEmployeesState] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleOpenModal() {
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  useEffect(() => {
    refreshRecords("region", setEmployeesState).then(() => {
      setIsLoading(false);
    });
  }, []);

  const columns: GridColDef[] = [
    {
      field: "firstName",
      headerName: "Imię",
      flex: 1,
      editable: false,
    },
    {
      field: "lastName",
      headerName: "Nazwisko",
      flex: 1,
      editable: false,
    },
    {
      field: "phoneNumber",
      headerName: "Numer telefonu",
      flex: 1,
      editable: false,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      editable: false,
    },
  ];
  const filteredColumns = columns.map(({ field, headerName }) => ({
    field,
    headerName,
  }));

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
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Header title="Pracownicy" subtitle="Lista pracowników" />
      </Box>
      <Box
        sx={{
          height: "75vh",
          width: "calc( 100% - 40px )",
          margin: "20px",
        }}
      >
        <Table
          columns={columns}
          rows={employeesState}
          isLoading={isLoading}
          path="employee"
          stateToRefresh={setEmployeesState}
          handleOpenModal={handleOpenModal}
          CanAddNew={true}
        />
        <AddRecordModal
          data={filteredColumns}
          isModalOpen={isModalOpen}
          handleCloseModal={handleCloseModal}
          path="employee"
        />
      </Box>
    </>
  );
}
