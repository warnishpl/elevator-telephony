import { Button } from '@mui/material';
import { Option } from './../../app/auth/auth.types';

export function UnloggedSelectionButtons({
	activeOption,
	handleOptionClick,
}: {
	activeOption: Option;
	handleOptionClick: (option: Option) => void;
}) {
	return (
		<div className='flex flex-col sm:flex-row justify-between gap-4 mt-4'>
			<Button
				variant={activeOption === Option.Email ? 'contained' : 'outlined'}
				onClick={() => handleOptionClick(Option.Email)}
				className='sm:w-1/2'
			>
				Email
			</Button>
			<Button
				variant={activeOption === Option.Phone ? 'contained' : 'outlined'}
				onClick={() => handleOptionClick(Option.Phone)}
				className='sm:w-1/2'
			>
				Telefon
			</Button>
		</div>
	);
}
