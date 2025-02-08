import { Box, Button, TextField } from '@mui/material';
import { InputError } from './auth.types';
import { ChangeEvent } from 'react';

interface AuthPhoneProps {
	inputError: InputError;
	verificationCode: string;
	setVerificationCode: (value: string) => void;
	handleCodeSubmit: () => void;
}

export function AuthPhone({
	inputError,
	verificationCode,
	setVerificationCode,
	handleCodeSubmit,
}: AuthPhoneProps) {
	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
			<TextField
				error={!!inputError}
				helperText={inputError}
				id='verification-code'
				type='text'
				name='verification-code'
				placeholder='Wpisz otrzymany kod'
				autoFocus
				fullWidth
				variant='outlined'
				value={verificationCode}
				onChange={(e: ChangeEvent<HTMLInputElement>) =>
					setVerificationCode(e.target.value)
				}
			/>
			<Button
				type='button'
				fullWidth
				variant='contained'
				onClick={handleCodeSubmit}
			>
				Zatwierdź kod
			</Button>
		</Box>
	);
}
