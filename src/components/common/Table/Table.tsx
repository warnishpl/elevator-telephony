import { Box, Button, Fab, Modal, Typography, useTheme } from "@mui/material";
import { DataGrid, gridClasses, GridColDef } from "@mui/x-data-grid";
import { plPL } from "@mui/x-data-grid/locales";
import { TableActionButtons } from "@/components/common/Table/TableActionButtons";
import { Dispatch, JSX, SetStateAction, useState } from "react";
import { deleteRecord, refreshRecords } from "@/utils/apiFunctions";
import {
  Add,
  ArrowBackIosNewOutlined,
  DeleteForeverOutlined,
  ModeEditOutlined,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { redirect } from "next/dist/server/api-utils";

interface TableProps {
  isLoading: boolean;
  columns: GridColDef[];
  rows: any[];
  path: string;
  stateToRefresh: Dispatch<SetStateAction<any>>;
  CanAddNew?: boolean;
  handleOpenModal?: () => void;
}
export function Table({
  rows,
  isLoading,
  columns,
  path,
  stateToRefresh,
  CanAddNew,
  handleOpenModal,
}: TableProps) {
  const theme = useTheme();
  const router = useRouter();

  function handleOpenDetails(rowId: string) {
    router.push(`/${path}/${rowId}`);
  }

  function handleDeleteRecord(rowId: string) {
    deleteRecord(rowId, path, () => refreshRecords(path, stateToRefresh));
  }
  const buttons = [
    { icon: <ModeEditOutlined />, title: "Edytuj", onClick: handleOpenDetails },
    {
      icon: <DeleteForeverOutlined />,
      title: "Usuń",
      onClick: handleDeleteRecord,
    },
  ];

  return (
    <Box sx={{ position: "relative", height: "100%" }}>
      <DataGrid
        localeText={plPL.components.MuiDataGrid.defaultProps.localeText}
        pageSizeOptions={[
          10,
          100,
          { value: 1000, label: "1,000" },
          { value: -1, label: "Wszystkie" },
        ]}
        rows={rows}
        getRowId={(row) => row.uuid}
        columns={[
          ...columns,
          {
            field: "actions",
            headerName: "Akcje",
            type: "actions",
            renderCell: (params) => (
              <TableActionButtons rowId={params.row.uuid} buttons={buttons} />
            ),
            editable: false,
            filterable: false,
            sortable: false,
            resizable: false,
            width: 90,
            disableColumnMenu: true,
            hideable: false,
          },
        ]}
        disableColumnSelector
        hideFooterSelectedRowCount
        scrollbarSize={10}
        loading={isLoading}
        getRowSpacing={(params) => ({
          top: params.isFirstVisible ? 0 : 5,
          bottom: params.isLastVisible ? 0 : 5,
        })}
        sx={{
          height: "100%",
          [`& .${gridClasses.row}`]: {
            bgcolor: theme.palette.menuBackground?.main,
          },
          [`&.${gridClasses.root}`]: {
            "--DataGrid-containerBackground":
              theme.palette.menuBackground?.main,
          },
          [`&.${gridClasses.root} .${gridClasses.cell}`]: {
            outline: "none !important",
          },
          [`& .${gridClasses.footerContainer}`]: {
            background: theme.palette.menuBackground?.main,
          },
        }}
      />
      {CanAddNew && (
        <>
          <Fab
            onClick={handleOpenModal}
            size="small"
            color="primary"
            sx={{
              position: "absolute",
              left: "1rem",
              bottom: "calc( 1rem + 52px )",
            }}
          >
            <Add />
          </Fab>
        </>
      )}
    </Box>
  );
}
