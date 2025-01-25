import { Box, Button } from '@mui/material';
import { Option } from './../../app/auth/auth.types';

export function UnloggedSelectionButtons({
	activeOption,
	handleOptionClick,
}: {
	activeOption: Option;
	handleOptionClick: (option: Option) => void;
}) {
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
			<Button
				variant={activeOption === Option.Email ? 'contained' : 'outlined'}
				onClick={() => handleOptionClick(Option.Email)}
				sx={{ width: { xs: '50%', sm: '100%' } }}
			>
				Email
			</Button>
			<Button
				variant={activeOption === Option.Phone ? 'contained' : 'outlined'}
				onClick={() => handleOptionClick(Option.Phone)}
				sx={{ width: { xs: '50%', sm: '100%' } }}
			>
				Telefon
			</Button>
		</Box>
	);
}
