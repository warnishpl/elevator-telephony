import { useRequestApi } from '@/utils/useRequestApi';
import { CheckOutlined, InfoOutlined, SaveOutlined } from '@mui/icons-material';
import { Box, CircularProgress, Fab, useTheme } from '@mui/material';
import { green } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { GridRenderCellParams } from '@mui/x-data-grid';

interface ApiResponse {
	status: number;
}

interface ElevatorRow {
	id: string;
	address: string;
	city: string;
	phoneNumber: string;
}

interface ElevatorsActionsProps {
	params: GridRenderCellParams;
	rowId: number | null;
	setRowId: React.Dispatch<React.SetStateAction<number | null>>;
}

export function ElevatorsActions({
	params,
	rowId,
	setRowId,
}: ElevatorsActionsProps) {
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const { requestApi } = useRequestApi();
	const theme = useTheme();

	async function updateElevatorData(
		data: { address: string; city: string; phoneNumber: string },
		id: string
	): Promise<ApiResponse> {
		const result = await requestApi<ApiResponse>({
			path: `/elevator/${id}`,
			method: 'PUT',
			data,
		});
		return result;
	}

	const handleSubmit = async () => {
		setLoading(true);
		const { address, city, phoneNumber, id } = params.row as ElevatorRow;
		const result = await updateElevatorData({ address, city, phoneNumber }, id);

		if (result.status === 200) {
			setSuccess(true);
			setRowId(null);
		} 
		setLoading(false);
	};

	useEffect(() => {
		if (params.id === rowId) {
		  setSuccess(false);
		}
	  }, [params.id, rowId]);

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'row',
				width: '100%',
				gap: '0.5rem',
			}}
		>
			<Box sx={{ position: 'relative' }}>
				{success ? (
					<Fab
						color='primary'
						sx={{
							width: 40,
							height: 40,
							bgcolor: green[500],
							'&:hover': { bgcolor: green[700] },
						}}
					>
						<CheckOutlined />
					</Fab>
				) : (
					<Fab
						color='primary'
						sx={{
							width: 40,
							height: 40,
						}}
						disabled={params.id !== rowId || loading}
						onClick={handleSubmit}
					>
						<SaveOutlined />
					</Fab>
				)}
				{loading && (
					<CircularProgress
						size={52}
						sx={{
							color: green[500],
							position: 'absolute',
							top: -6,
							left: -6,
							zIndex: 1,
						}}
					/>
				)}
			</Box>
			<Box>
				<Fab
					sx={{
						width: 40,
						height: 40,
						bgcolor: theme.palette.primary.main,
						'&:hover': { bgcolor: green[700] },
					}}
				>
					<InfoOutlined />
				</Fab>
			</Box>
		</Box>
	);
}
