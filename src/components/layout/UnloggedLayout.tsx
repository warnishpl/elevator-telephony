'use client';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { useState, ChangeEvent } from 'react';
import Image from 'next/image';
import { useRequestApi } from '@/utils/useRequestApi';
import { useTheme } from '@/context/ThemeProvider';
import sitemarkIcon from './../../../public/sitemark.svg';
import moonIcon from './../../../public/moon.svg';
import sunIcon from './../../../public/sun.svg';

type Option = 'email' | 'phone' | null;

export default function UnloggedLayout() {
	const { requestApi } = useRequestApi();
	const [verificationCode, setVerificationCode] = useState<string>('');
	const [phoneNumber, setPhoneNumber] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [activeOption, setActiveOption] = useState<Option>(null);
	const [inputError, setInputError] = useState<boolean>(false);
	const [inputErrorMessage, setInputErrorMessage] = useState<string>('');
	const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

	const context = useTheme();
	let isDarkMode = false;
	let toggleTheme = () => {};

	if (context) {
		isDarkMode = context.isDarkMode as boolean;
		toggleTheme = context.toggleTheme;
	}

	function handleOptionClick(option: Option) {
		setActiveOption(option);
		setInputError(false);
		setInputErrorMessage('');
		setIsSubmitted(false);
		setVerificationCode('');
		setPhoneNumber('');
		setEmail('');
	}

	async function handleInputValidation() {
		if (activeOption === 'phone') {
			const phoneRegex = /^[0-9]{9}$/;
			if (!phoneRegex.test(phoneNumber)) {
				setInputError(true);
				setInputErrorMessage('Nieprawidłowy numer telefonu');
				return;
			}
			await fetchUserDataByPhone(phoneNumber);
			setIsSubmitted(true);
		} else if (activeOption === 'email') {
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if (!emailRegex.test(email)) {
				setInputError(true);
				setInputErrorMessage('Nieprawidłowy adres email');
				return;
			}
			await fetchUserDataByEmail(email);
			setIsSubmitted(true);
		}
	}

	async function fetchUserDataByPhone(phone: string) {
		try {
			await requestApi({
				path: '/auth/login',
				method: 'POST',
				data: { provider: 'PHONE', phoneNumber: phone },
			});
		} catch (error) {
			console.error('Błąd podczas logowania telefonem:', error);
		}
	}

	async function fetchUserDataByEmail(email: string) {
		try {
			await requestApi({
				path: '/auth/login',
				method: 'POST',
				data: { provider: 'EMAIL', email },
			});
		} catch (error) {
			console.error('Błąd podczas logowania emailem:', error);
		}
	}

	async function handleCodeSubmit() {
		if (!verificationCode) {
			setInputError(true);
			setInputErrorMessage('Proszę wprowadzić kod weryfikacyjny');
			return;
		}

		try {
			await requestApi({
				path: '/auth/login',
				method: 'POST',
				data: {
					provider: 'PHONE',
					phoneNumber: phoneNumber,
					code: verificationCode,
				},
			});
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<Stack className='h-dvh p-2 bg-menuPrimary'>
			<MuiCard
				variant='outlined'
				className={`flex flex-col self-center w-full px-4 py-10 gap-2 m-auto max-w-[450px] 
                    shadow-[0px_5px_15px_0px_hsla(220,30%,5%,0.5),0px_15px_35px_-5px_hsla(220,25%,10%,0.08)]`}
			>
				<div className='flex flex-row justify-between'>
					<Image priority src={sitemarkIcon} alt='sitemark-icon' />
					<button onClick={toggleTheme} className='mr-2'>
						<div className='flex justify-center items-center rounded p-1 hover:bg-menuSecondary transition-all duration-300 ease-in-out'>
							<Image
								src={isDarkMode ? moonIcon : sunIcon}
								alt='theme-button'
								width={24}
								height={24}
							/>
						</div>
					</button>
				</div>
				<h1>Zaloguj się</h1>

				<div className='flex flex-col sm:flex-row justify-between gap-4 mt-4'>
					<Button
						variant={activeOption === 'email' ? 'contained' : 'outlined'}
						onClick={function () {
							handleOptionClick('email');
						}}
						className='sm:w-1/2'
					>
						Email
					</Button>
					<Button
						variant={activeOption === 'phone' ? 'contained' : 'outlined'}
						onClick={function () {
							handleOptionClick('phone');
						}}
						className='sm:w-1/2'
					>
						Telefon
					</Button>
				</div>

				<Divider />

				{!isSubmitted ? (
					<>
						{activeOption === 'email' && (
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
								onChange={function (e) {
									setEmail(e.target.value);
								}}
							/>
						)}
						{activeOption === 'phone' && (
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
								onChange={function (e) {
									setPhoneNumber(e.target.value);
								}}
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
				) : activeOption === 'phone' ? (
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
							onChange={function (e: ChangeEvent<HTMLInputElement>) {
								setVerificationCode(e.target.value);
							}}
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
				)}

				<div className='flex flex-col gap-2 pt-4'>
					<span className='text-center'>
						Nie masz konta?{' '}
						<Link
							href='https://www.youtube.com/watch?v=dQw4w9WgXcQ'
							variant='body2'
						>
							Masz pecha
						</Link>
					</span>
				</div>
			</MuiCard>
		</Stack>
	);
}
