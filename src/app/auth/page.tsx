'use client'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import MuiCard from '@mui/material/Card'
import { useState } from 'react'
import { useRequestApi } from '@/utils/useRequestApi'
import { useTheme } from '@/context/ThemeProvider'
import { LoginHeader } from './LoginHeader'
import { LoginSelectionButtons } from './LoginSelectionButtons'
import { LoginContentSection } from './LoginContentSection'
import { LoginFooter } from './LoginFooter'
import { Option } from './auth.types'
import { redirectTo } from '@/utils/redirectUrl'

export default function Auth() {
  const { requestApi } = useRequestApi()
  const { toggleTheme } = useTheme()
  const [verificationCode, setVerificationCode] = useState<string>('')
  const [phoneNumber, setPhoneNumber] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [activeOption, setActiveOption] = useState<Option | undefined>()
  const [inputError, setInputError] = useState<string | null>(null)
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)

  function handleOptionClick(option: Option) {
    setActiveOption(option)
    setInputError(null)
    setIsSubmitted(false)
    setVerificationCode('')
    setPhoneNumber('')
    setEmail('')
  }

  async function handleInputValidation() {
    if (!activeOption) return
    let regex = /!./
    let errorMessage = 'invalid login option'
    let login = ''
    if (activeOption === Option.Phone) {
      regex = /^\d{9}$/
      errorMessage = 'Nieprawidłowy numer telefonu'
      login = phoneNumber
    }
    if (activeOption === Option.Email) {
      regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      errorMessage = 'Nieprawidłowy adres email'
      login = email
    }

    if (!regex.test(login)) {
      setInputError(errorMessage)
      return
    }
    await fetchUserData(login, activeOption)
    setIsSubmitted(true)
  }

  async function fetchUserData(login: string, provider: Option, code?: string) {
    if (!provider) return
    const loginKeys = {
      [Option.Phone]: 'phoneNumber',
      [Option.Email]: 'email'
    }

    const data = {
      provider,
      [loginKeys[provider]]: login,
      ...(code && { code })
    }

    await requestApi({
      path: '/auth/login',
      method: 'POST',
      data
    })
  }

  async function signIn() {
    if (!verificationCode) {
      setInputError('Proszę wprowadzić kod weryfikacyjny')
      return
    }
    fetchUserData(phoneNumber, Option.Phone, verificationCode).then(() =>
      redirectTo('/home', true)
    )
  }

  return (
    <Stack className="h-dvh p-2">
      <MuiCard
        variant="outlined"
        className={`flex flex-col self-center w-full px-4 py-10 gap-2 m-auto max-w-[450px] 
                    shadow-[0px_5px_15px_0px_hsla(220,30%,5%,0.5),0px_15px_35px_-5px_hsla(220,25%,10%,0.08)]`}
      >
        <LoginHeader toggleTheme={toggleTheme} />
        <h1>Zaloguj się</h1>
        <LoginSelectionButtons
          activeOption={activeOption}
          handleOptionClick={handleOptionClick}
        />
        <Divider />
        <LoginContentSection
          activeOption={activeOption}
          isSubmitted={isSubmitted}
          verificationCode={verificationCode}
          handleCodeSubmit={signIn}
          handleInputValidation={handleInputValidation}
          inputError={inputError}
          email={email}
          setEmail={setEmail}
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          setVerificationCode={setVerificationCode}
        />
        <LoginFooter />
      </MuiCard>
    </Stack>
  )
}
