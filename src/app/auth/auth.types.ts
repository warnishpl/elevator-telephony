import { Dispatch, ReactNode, SetStateAction } from 'react'

export interface UserInputStateProps {
  verificationCode: string
  setVerificationCode: Dispatch<SetStateAction<string>>
  phoneNumber: string
  setPhoneNumber: React.Dispatch<React.SetStateAction<string>>
  email: string
  setEmail: React.Dispatch<React.SetStateAction<string>>
}

export enum Option {
  Email = 'EMAIL',
  Phone = 'PHONE'
}

export interface InputErrorStateProps {
  inputError: string | null
}

export interface IsSubmittedProp {
  isSubmitted: boolean
}
export interface HandlersProps {
  handleCodeSubmit: () => void
  handleInputValidation: () => void
}
export interface AuthProps {
  children: ReactNode;
}
export interface ApiResponse {
  status?: number;
}