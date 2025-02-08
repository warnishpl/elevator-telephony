import { Button, TextField } from "@mui/material";
import { InputError, InputField } from "./auth.types";

interface AuthInitialProps {
  field: InputField;
  inputError: InputError;
  handleInputValidation: () => void;
}

export function AuthInitial({
  field,
  inputError,
  handleInputValidation,
}: AuthInitialProps) {
  return (
    <>
      <TextField
        key={field.id}
        error={!!inputError}
        helperText={inputError}
        id={field.id}
        type={field.type}
        name={field.name}
        placeholder={field.placeholder}
        autoComplete={field.autoComplete}
        autoFocus
        fullWidth
        variant="outlined"
        value={field.value}
        onChange={(e) => field.setValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleInputValidation()}
      />
      <Button
        type="button"
        fullWidth
        variant="contained"
        onClick={handleInputValidation}
      >
        Zaloguj
      </Button>
    </>
  );
}
