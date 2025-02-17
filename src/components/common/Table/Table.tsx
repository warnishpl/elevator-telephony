import { useTheme } from "@mui/material";
import { DataGrid, gridClasses, GridColDef } from "@mui/x-data-grid";
import { plPL } from "@mui/x-data-grid/locales";
import { TableActionButtons } from "@/components/common/Table/TableActionButtons";
import { Dispatch, SetStateAction } from "react";
import { deleteRecord, refreshRecords } from "@/utils/apiFunctions";
import { DeleteForeverOutlined, ModeEditOutlined } from "@mui/icons-material";
import { useRouter } from "next/navigation";

interface TableProps {
  isLoading: boolean;
  columns: GridColDef[];
  rows: any[];
  path: string;
  parseUpdatedAt?: boolean;
  stateToRefresh: Dispatch<SetStateAction<any>>;
}
export function Table({
  rows,
  isLoading,
  columns,
  path,
  parseUpdatedAt,
  stateToRefresh,
}: TableProps) {
  const theme = useTheme();
  const router = useRouter();

  function handleOpenDetails(rowId: string) {
    router.push(`/${path}/${rowId}`);
  }

  function handleDeleteRecord(rowId: string) {
    deleteRecord(rowId, path, () =>
      refreshRecords(path, stateToRefresh, parseUpdatedAt)
    );
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
            <TableActionButtons
              rowId={params.row.uuid}
              buttons={buttons}
            />
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
        [`& .${gridClasses.row}`]: {
          bgcolor: theme.palette.menuBackground?.main,
        },
        [`&.${gridClasses.root}`]: {
          "--DataGrid-containerBackground": theme.palette.menuBackground?.main,
        },
        [`&.${gridClasses.root} .${gridClasses.cell}`]: {
          outline: "none !important",
        },
      }}
    />
  );
}
