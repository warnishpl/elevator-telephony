import {
  Box,
  Button,
  Link,
  Stack,
  Tooltip,
  Typography,
  useTheme as useMuiTheme,
} from "@mui/material";
import Image from "next/image";
import Divider from "@mui/material/Divider";
import MuiCard from "@mui/material/Card";
import { BedtimeOutlined, WbSunnyOutlined } from "@mui/icons-material";
import { useTheme } from "@/context/ThemeProvider";
import {
  HandlersProps,
  InputError,
  InputField,
  IsSubmittedProp,
  Option,
  UserInputStateProps,
} from "./auth.types";
import sitemarkIcon from "public/sitemark.svg";
import { AuthEmail } from "./AuthEmail";
import { AuthInitial } from "./AuthInital";
import { JSX } from "react";
import { AuthPhone } from "./AuthPhone";

type AuthPanelProps = {
  toggleTheme: () => void;
  activeOption?: Option;
  handleOptionClick: (option: Option) => void;
  inputError: InputError;
} & UserInputStateProps &
  HandlersProps &
  IsSubmittedProp;

export function AuthPanel({
  toggleTheme,
  activeOption,
  isSubmitted,
  verificationCode,
  handleCodeSubmit,
  handleInputValidation,
  inputError,
  email,
  setEmail,
  phoneNumber,
  setPhoneNumber,
  setVerificationCode,
  handleOptionClick,
}: Readonly<AuthPanelProps>) {
  const { isDarkMode } = useTheme();
  const theme = useMuiTheme();
  const LoginOptionButtonsArray = [
    { label: "Email", value: Option.Email },
    { label: "Telefon", value: Option.Phone },
  ];

  const authOptions: {
    [key in Option]: { fields: InputField; finalComponent: JSX.Element };
  } = {
    [Option.Email]: {
      fields: {
        option: Option.Email,
        id: "email",
        type: "email",
        name: "email",
        placeholder: "twoj@email.com",
        autoComplete: "email",
        value: email,
        setValue: setEmail,
      },
      finalComponent: <AuthEmail />,
    },
    [Option.Phone]: {
      fields: {
        option: Option.Phone,
        id: "phone",
        type: "tel",
        name: "phone",
        placeholder: "796 152 116",
        autoComplete: "phone",
        value: phoneNumber,
        setValue: setPhoneNumber,
      },
      finalComponent: (
        <AuthPhone
          inputError={inputError}
          verificationCode={verificationCode}
          setVerificationCode={setVerificationCode}
          handleCodeSubmit={handleCodeSubmit}
        />
      ),
    },
  };

  return (
    <Stack className="h-dvh p-2">
      <MuiCard
        variant="outlined"
        className={`flex flex-col self-center w-full px-4 py-10 gap-2 m-auto max-w-[450px] 
                    shadow-[0px_5px_15px_0px_hsla(220,30%,5%,0.5),0px_15px_35px_-5px_hsla(220,25%,10%,0.08)]`}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Image priority src={sitemarkIcon} alt="sitemark-icon" />
          <Button onClick={toggleTheme} sx={{ marginRight: "0.5rem" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                bordadius: "0.25rem",
                padding: "0.25rem",
                transition: "all 0.3s ease-in-out",
              }}
            ></Box>
          </Button>
          <Tooltip title="Zmiana skórki">
            <Button onClick={toggleTheme}>
              {isDarkMode ? <WbSunnyOutlined /> : <BedtimeOutlined />}
            </Button>
          </Tooltip>
        </Box>
        <h1>Zaloguj się</h1>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          {LoginOptionButtonsArray.map((button) => (
            <Button
              key={button.value}
              variant={activeOption === button.value ? "contained" : "outlined"}
              onClick={() => handleOptionClick(button.value)}
              sx={{ width: { xs: "50%", sm: "100%" } }}
            >
              {button.label}
            </Button>
          ))}
        </Box>
        <Divider />
        {!isSubmitted && activeOption ? (
          <AuthInitial
            field={authOptions[activeOption].fields}
            inputError={inputError}
            handleInputValidation={handleInputValidation}
          />
        ) : (
          activeOption && authOptions[activeOption].finalComponent
        )}

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            paddingTop: "1rem",
          }}
        >
          <Typography
            component="span"
            sx={{ textAlign: "center", color: theme.palette.text.primary }}
          >
            Nie masz konta?{" "}
            <Link
              href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
              variant="body2"
            >
              Masz pecha
            </Link>
          </Typography>
        </Box>
      </MuiCard>
    </Stack>
  );
}
