"use client";
import { useState } from "react";
import { requestApi } from "@/utils/requestApi";
import { useTheme } from "@/context/ThemeProvider";
import { Option } from "./auth.types";
import { AuthPanel } from "./AuthPanel";
import { useRouter } from "next/navigation";

export default function Auth() {
  const { toggleTheme } = useTheme();
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [activeOption, setActiveOption] = useState<Option | undefined>();
  const [inputError, setInputError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const router = useRouter();

  function handleOptionClick(option: Option) {
    setActiveOption(option);
    setInputError(null);
    setIsSubmitted(false);
    setVerificationCode("");
    setPhoneNumber("");
    setEmail("");
  }

  async function handleInputValidation() {
    if (!activeOption) return;
    let regex = /!./;
    let errorMessage = "invalid login option";
    let login = "";
    if (activeOption === Option.Phone) {
      regex = /^\d{9}$/;
      errorMessage = "Nieprawidłowy numer telefonu";
      login = phoneNumber;
    }
    if (activeOption === Option.Email) {
      regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      errorMessage = "Nieprawidłowy adres email";
      login = email;
    }

    if (!regex.test(login)) {
      setInputError(errorMessage);
      return;
    }
    await fetchUserData(login, activeOption);
    setIsSubmitted(true);
  }

  async function fetchUserData(login: string, provider: Option, code?: string) {
    if (!provider) return;
    const loginKeys = {
      [Option.Phone]: "phoneNumber",
      [Option.Email]: "email",
    };

    const data = {
      provider,
      [loginKeys[provider]]: login,
      ...(code && { code }),
    };

    await requestApi({
      path: "/auth/login",
      method: "POST",
      data,
    });
  }

  async function signIn() {
    if (!verificationCode) {
      setInputError("Proszę wprowadzić kod weryfikacyjny");
      return;
    }
    fetchUserData(phoneNumber, Option.Phone, verificationCode).then(() =>
      router.push("/dashboard")
    );
  }

  return (
    <AuthPanel
      toggleTheme={toggleTheme}
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
      handleOptionClick={handleOptionClick}
    />
  );
}
