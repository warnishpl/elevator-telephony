import { Button, TextField } from '@mui/material';
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
	if (!isSubmitted) {
		return (
			<>
				{activeOption === Option.Email && (
					<TextField
						error={inputError}
						helperText={inputErrorMessage}
						id='email'
						type='email'
						name='email'
						placeholder='twoj@email.com'
						autoComplete='email'
						autoFocus
						fullWidth
						variant='outlined'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				)}
				{activeOption === Option.Phone && (
					<TextField
						error={inputError}
						helperText={inputErrorMessage}
						name='phone'
						placeholder='796 152 116'
						type='tel'
						id='phone'
						autoComplete='phone'
						autoFocus
						fullWidth
						variant='outlined'
						value={phoneNumber}
						onChange={(e) => setPhoneNumber(e.target.value)}
					/>
				)}
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
		<div className='flex flex-col gap-4'>
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
		</div>
	) : (
		<p className='text-center text-green-600'>
			Sprawdź swoją skrzynkę pocztową i postępuj zgodnie z instrukcjami.
		</p>
	);
}
