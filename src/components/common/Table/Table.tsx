import { useTheme } from "@mui/material";
import { DataGrid, gridClasses, GridColDef } from "@mui/x-data-grid";
import { plPL } from "@mui/x-data-grid/locales";
import { TableActionButtons } from "@/components/common/Table/TableActionButtons";

interface TableProps {
  isLoading: boolean;
  columns: GridColDef[];
  rows: any[];
}
export function Table({ rows, isLoading, columns }: TableProps) {
  const theme = useTheme();
  return (
    <>
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
              <TableActionButtons rowId={params.row.uuid} />
            ),
            editable: false,
            filterable: false,
            sortable: false,
            resizable: false,
            flex: 1,
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
            "--DataGrid-containerBackground":
              theme.palette.menuBackground?.main,
          },
          [`&.${gridClasses.root} .${gridClasses.cell}`]: {
            outline: "none !important",
          },
        }}
      />
    </>
  );
}
