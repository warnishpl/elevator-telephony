import { Box, Button, TextField, Typography, useTheme } from '@mui/material';
import { ChangeEvent } from 'react';
import {
	Option,
	UserInputStateProps,
	InputErrorStateProps,
	handlersProps,
	isSubmittedProp,
} from '../../app/auth/auth.types';

export function UnloggedContentSection({
	activeOption,
	isSubmitted,
	verificationCode,
	handleCodeSubmit,
	handleInputValidation,
	inputError,
	inputErrorMessage,
	email,
	setEmail,
	phoneNumber,
	setPhoneNumber,
	setVerificationCode,
}: UserInputStateProps &
	InputErrorStateProps &
	handlersProps &
	isSubmittedProp & { activeOption: Option }) {
	const theme = useTheme();

	const inputFields = [
		{
			option: Option.Email,
			id: 'email',
			type: 'email',
			name: 'email',
			placeholder: 'twoj@email.com',
			autoComplete: 'email',
			value: email,
			setValue: setEmail,
		},
		{
			option: Option.Phone,
			id: 'phone',
			type: 'tel',
			name: 'phone',
			placeholder: '796 152 116',
			autoComplete: 'phone',
			value: phoneNumber,
			setValue: setPhoneNumber,
		},
	];

	if (!isSubmitted) {
		return (
			<>
				{inputFields
					.filter((field) => field.option === activeOption)
					.map((field) => (
						<TextField
							key={field.id}
							error={inputError}
							helperText={inputErrorMessage}
							id={field.id}
							type={field.type}
							name={field.name}
							placeholder={field.placeholder}
							autoComplete={field.autoComplete}
							autoFocus
							fullWidth
							variant='outlined'
							value={field.value}
							onChange={(e) => field.setValue(e.target.value)}
						/>
					))}
				<Button
					type='button'
					fullWidth
					variant='contained'
					onClick={handleInputValidation}
				>
					Zaloguj
				</Button>
			</>
		);
	}
	return activeOption === Option.Phone ? (
		<Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
			<TextField
				error={inputError}
				helperText={inputErrorMessage}
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
	) : (
		<Typography
			component='p'
			sx={{ textAlign: 'center', color: theme.palette.primary.main }}
		>
			Sprawdź swoją skrzynkę pocztową i postępuj zgodnie z instrukcjami.
		</Typography>
	);
}
