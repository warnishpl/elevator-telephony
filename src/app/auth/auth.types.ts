import { Dispatch, ReactNode, SetStateAction } from 'react';

export interface UserInputStateProps {
	verificationCode: string;
	setVerificationCode: Dispatch<SetStateAction<string>>;
	phoneNumber: string;
	setPhoneNumber: React.Dispatch<React.SetStateAction<string>>;
	email: string;
	setEmail: React.Dispatch<React.SetStateAction<string>>;
}

export enum Option {
	Email = 'EMAIL',
	Phone = 'PHONE',
}

export type InputError = string | null;

export interface IsSubmittedProp {
	isSubmitted: boolean;
}
export interface HandlersProps {
	handleCodeSubmit: () => void;
	handleInputValidation: () => void;
}
export interface AuthProps {
	children: ReactNode;
}
export interface ApiResponse {
	status?: number;
}

export interface InputField {
	option: Option;
	id: string;
	type: string;
	name: string;
	placeholder: string;
	autoComplete: string;
	value: string;
	setValue: (value: string) => void;
}
