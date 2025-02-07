'use client';

import { useRequestApi } from '@/utils/useRequestApi';
import { Box, Typography } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { DataGrid, gridClasses, GridColDef } from '@mui/x-data-grid';
import { StatusIcon } from './StatusIcon';
import { plPL } from '@mui/x-data-grid/locales';
import { useTheme } from '@mui/material';
import { ElevatorsActions } from './ElevatorsActions';

interface ApiResponse {
	data: Array<{
		number: number;
		uuid: string;
		address: string;
		city: string;
		phoneNumber: string;
		region: string;
		status: string;
	}>;
}

interface Elevator {
	id: string;
	address: string;
	city: string;
	phoneNumber: string;
	region: string;
	status: string;
}

export default function Elevators() {
	const { requestApi } = useRequestApi();
	const [elevatorsList, setElevatorsList] = useState<Elevator[]>([]);
	const theme = useTheme();
	const [rowId, setRowId] = useState<number | null>(null);

	useEffect(() => {
		async function fetchElevators() {
			const { data } = await requestApi<ApiResponse>({
				path: '/elevator',
				method: 'GET',
			});
			setElevatorsList(
				data.map((elevator) => ({
					...elevator,
					id: elevator.uuid,
					address: elevator.address,
					city: elevator.city,
					phoneNumber: elevator.phoneNumber,
					region: elevator.region,
					status: elevator.status,
				}))
			);
		}
		fetchElevators();
	}, []);

	// function createNewElevator() {
	// 	requestApi({
	// 		path: '/elevator',
	// 		method: 'POST',
	// 		data: {
	// 			address: '',
	// 			city: '',
	// 			phoneNumber: '',
	// 		},
	// 	});
	// }

	const columns: GridColDef[] = useMemo(
		() => [
			{ field: 'address', headerName: 'Adres', width: 200, editable: true },
			{ field: 'city', headerName: 'Miasto', width: 150, editable: true },
			{
				field: 'phoneNumber',
				headerName: 'Numer telefonu',
				width: 150,
				editable: true,
			},
			{ field: 'region', headerName: 'Region', width: 150 },
			{
				field: 'status',
				headerName: 'Status',
				width: 100,
				renderCell: (params) => (
					<StatusIcon status={params.row.status}></StatusIcon>
				),
			},
			{
				field: 'actions',
				headerName: 'Akcje',
				type: 'actions',
				renderCell: (params) => (
					<ElevatorsActions {...{ params, rowId, setRowId }} />
				),
				editable: false,
				filterable: false,
				sortable: false,
				resizable: false,
				width: 110,
				disableColumnMenu: true,
			},
		],
		[rowId]
	);
	return (
		<Box sx={{ height: 700, width: '100%' }}>
			<Typography variant='h6' component='h1' sx={{ textAlign: 'center' }}>
				Lista wind
			</Typography>
			<DataGrid
				localeText={plPL.components.MuiDataGrid.defaultProps.localeText}
				pageSizeOptions={[
					10,
					100,
					{ value: 1000, label: '1,000' },
					{ value: -1, label: 'Wszystkie' },
				]}
				rows={elevatorsList}
				getRowId={(row) => row.uuid}
				columns={columns}
				slotProps={{
					loadingOverlay: {
						variant: 'linear-progress',
						noRowsVariant: 'linear-progress',
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
