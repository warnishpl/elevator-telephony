import { useTheme } from "@mui/material";
import { DataGrid, gridClasses, GridColDef } from "@mui/x-data-grid";
import { plPL } from "@mui/x-data-grid/locales";
import { CustomLoadingOverlay } from "@/components/common/Loader/Loader";
import { Dispatch, SetStateAction } from "react";

interface TableProps {
  isLoading: boolean;
  columns: GridColDef[];
  rows: any[];
  setRowId: Dispatch<SetStateAction<string | null>>;
}
export function Table({ rows, isLoading, columns, setRowId }: TableProps) {
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
        columns={columns}
        disableColumnSelector
        slots={{
          loadingOverlay: CustomLoadingOverlay,
        }}
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
        }}
        onCellEditStop={(params) => {
          setRowId(params.id as string);
        }}
      />
    </>
  );
}
