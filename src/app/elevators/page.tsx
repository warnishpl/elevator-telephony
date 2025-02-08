'use client';

import { useRequestApi } from '@/utils/useRequestApi';
import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

interface ApiResponse {
	data: Array<{
		number: string;
		uuid: string;
		adress: string;
		city: string;
		phoneNumber: string;
		region: string;
		status: string;
	}>;
}

interface Elevator {
	number: number;
	id: string;
	adress: string;
	city: string;
	phoneNumber: string;
	region: string;
	status: string;
}

export default function Elevators() {
	const { requestApi } = useRequestApi();
	const [elevatorsList, setElevatorsList] = useState<Elevator[]>([]);

	useEffect(() => {
		async function fetchElevators() {
			const response = await requestApi<ApiResponse>({
				path: '/elevator',
				method: 'GET',
			});
			setElevatorsList(
				response.data.map((elevator, index) => ({
					...elevator,
					number: index + 1,
					id: elevator.uuid,
					adress: elevator.adress,
					city: elevator.city,
					phoneNumber: elevator.phoneNumber,
					region: elevator.region,
					status: elevator.status,
				}))
			);
		}
		fetchElevators();
	}, []);

	const columns: GridColDef[] = [
		{ field: 'number', headerName: 'Lp.', width: 20 },
		{ field: 'adress', headerName: 'Adres', width: 200 },
		{ field: 'city', headerName: 'Miasto', width: 150 },
		{ field: 'phoneNumber', headerName: 'Numer telefonu', width: 150 },
		{ field: 'region', headerName: 'Region', width: 150 },
		{ field: 'status', headerName: 'Status', width: 100 },
		{ field: 'gsmModule', headerName: 'Moduł GSM', width: 150 },
	];
	return (
		<Box>
			<Typography variant='h6' component='h1' gutterBottom>
				Lista wind
			</Typography>
			<Box sx={{ height: '400px', width: '100%' }}>
				<DataGrid
					rows={elevatorsList}
					columns={columns}
					slotProps={{
						loadingOverlay: {
							variant: 'linear-progress',
							noRowsVariant: 'linear-progress',
						},
					}}
				/>
			</Box>
		</Box>
	);
}
