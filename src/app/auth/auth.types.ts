import { Dispatch, SetStateAction } from 'react';

export interface UserInputStateProps {
	verificationCode: string;
	setVerificationCode: Dispatch<SetStateAction<string>>;
	phoneNumber: string;
	setPhoneNumber: React.Dispatch<React.SetStateAction<string>>;
	email: string;
	setEmail: React.Dispatch<React.SetStateAction<string>>;
}

export enum Option {
	Email = 'email',
	Phone = 'phone',
	None = 'none',
}

export interface InputErrorStateProps {
	inputError: boolean;
	inputErrorMessage: string;
}

export interface isSubmittedProp {
	isSubmitted: boolean;
}
export interface handlersProps {
	handleCodeSubmit: () => void;
	handleInputValidation: () => void;
}
