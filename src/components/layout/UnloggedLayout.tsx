'use client';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { useState } from 'react';
import { useRequestApi } from '@/utils/useRequestApi';
import { useTheme } from '@/context/ThemeProvider';
import { usePathname } from 'next/navigation';
import { UnloggedHeader } from '../UnloggedHeader/UnloggedHeader';
import { UnloggedSelectionButtons } from '../UnloggedSelectionButtons/UnloggedSelectionButtons';
import { UnloggedContentSection } from '../UnloggedContentSection/UnloggedContentSection';
import { UnloggedFooter } from '../UnloggedFooter/UnloggedFooter';
import { Option } from './../../app/auth/auth.types';

interface LoggedLayoutProps {
	children: React.ReactNode;
}

export default function UnloggedLayout({ children }: LoggedLayoutProps) {
	const { requestApi } = useRequestApi();
	const [verificationCode, setVerificationCode] = useState<string>('');
	const [phoneNumber, setPhoneNumber] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [activeOption, setActiveOption] = useState<Option>(Option.None);
	const [inputError, setInputError] = useState<boolean>(false);
	const [inputErrorMessage, setInputErrorMessage] = useState<string>('');
	const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
	const pathName = usePathname();

	const context = useTheme();
	const isDarkMode = context?.isDarkMode || false;
	const toggleTheme = context?.toggleTheme || (() => {});

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
		if (activeOption === Option.Phone) {
			const phoneRegex = /^[0-9]{9}$/;
			if (!phoneRegex.test(phoneNumber)) {
				setInputError(true);
				setInputErrorMessage('Nieprawidłowy numer telefonu');
				return;
			}
			await fetchUserData(phoneNumber, 'PHONE');
			setIsSubmitted(true);
		} else if (activeOption === Option.Email) {
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if (!emailRegex.test(email)) {
				setInputError(true);
				setInputErrorMessage('Nieprawidłowy adres email');
				return;
			}
			await fetchUserData(email, 'EMAIL');
			setIsSubmitted(true);
		}
	}

	async function fetchUserData(
		login: string,
		provider: 'PHONE' | 'EMAIL',
		verificationCode?: string
	) {
		const phoneData = !verificationCode
			? { provider: 'PHONE', phoneNumber: login }
			: { provider: 'PHONE', phoneNumber: login, code: verificationCode };
		const data =
			provider === 'EMAIL' ? { provider: 'EMAIL', email: login } : phoneData;
		await requestApi({
			path: '/auth/login',
			method: 'POST',
			data,
		});
	}

	async function handleCodeSubmit() {
		if (!verificationCode) {
			setInputError(true);
			setInputErrorMessage('Proszę wprowadzić kod weryfikacyjny');
			return;
		}
		fetchUserData(phoneNumber, 'PHONE', verificationCode);
	}

	return (
		<Stack className='h-dvh p-2'>
			<MuiCard
				variant='outlined'
				className={`flex flex-col self-center w-full px-4 py-10 gap-2 m-auto max-w-[450px] 
                    shadow-[0px_5px_15px_0px_hsla(220,30%,5%,0.5),0px_15px_35px_-5px_hsla(220,25%,10%,0.08)]`}
			>
				<UnloggedHeader isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
				<h1>Zaloguj się</h1>
				<UnloggedSelectionButtons
					activeOption={activeOption}
					handleOptionClick={handleOptionClick}
				/>
				{!pathName.startsWith('/auth/') ? '' : children}
				<Divider />
				<UnloggedContentSection
					activeOption={activeOption}
					isSubmitted={isSubmitted}
					verificationCode={verificationCode}
					handleCodeSubmit={handleCodeSubmit}
					handleInputValidation={handleInputValidation}
					inputError={inputError}
					inputErrorMessage={inputErrorMessage}
					email={email}
					setEmail={setEmail}
					phoneNumber={phoneNumber}
					setPhoneNumber={setPhoneNumber}
					setVerificationCode={setVerificationCode}
				/>
				<UnloggedFooter />
			</MuiCard>
		</Stack>
	);
}
