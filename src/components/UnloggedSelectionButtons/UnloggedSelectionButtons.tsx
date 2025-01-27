import { Box, Button } from '@mui/material';
import { Option } from './../../app/auth/auth.types';

export function UnloggedSelectionButtons({
	activeOption,
	handleOptionClick,
}: {
	activeOption: Option;
	handleOptionClick: (option: Option) => void;
}) {
	const LoginOptionButtonsArray = [
		{ label: 'Email', value: Option.Email },
		{ label: 'Telefon', value: Option.Phone },
	];

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: { xs: 'column', sm: 'row' },
				justifyContent: 'space-between',
				gap: '1rem',
				marginTop: '1rem',
			}}
		>
			{LoginOptionButtonsArray.map((button) => (
				<Button
					key={button.value}
					variant={activeOption === button.value ? 'contained' : 'outlined'}
					onClick={() => handleOptionClick(button.value)}
					sx={{ width: { xs: '50%', sm: '100%' } }}
				>
					{button.label}
				</Button>
			))}
		</Box>
	);
}
