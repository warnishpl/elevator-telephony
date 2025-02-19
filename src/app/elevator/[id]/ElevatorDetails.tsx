import {
  Box,
  Fab,
  FormControl,
  Grid2,
  InputAdornment,
  InputLabel,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { AllowedElevatorEditData, Elevator } from "../elevator.types";
import { ArrowBackOutlined, Done } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { Region } from "@/app/region/regions.types";
import { refreshRecords } from "@/utils/apiFunctions";
import { Loader } from "@/components/common/Loader/Loader";

type ElevatorDetailsProps = {
  handleGoBack: () => void;
  displayedElevatorData: Elevator;
  updateElevator: (data: AllowedElevatorEditData, id: string) => void;
  elevatorId: string;
};

type BlurEvent = React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>;

export default function ElevatorDetails({
  handleGoBack,
  displayedElevatorData: { address, city, phoneNumber, region },
  elevatorId,
  updateElevator,
}: ElevatorDetailsProps) {
  const [elevatorState, setElevatorState] = useState({
    address,
    city,
    phoneNumber,
    regionUuid: region?.uuid || "",
  });
  const [inputAdornmentState, setInputAdornmentState] = useState(
    Object.fromEntries(Object.keys(elevatorState).map((key) => [key, false]))
  );

  function setAdornment(field: keyof typeof elevatorState) {
    setInputAdornmentState((prev) => ({ ...prev, [field]: true }));
    setTimeout(() => {
      setInputAdornmentState((prev) => ({ ...prev, [field]: false }));
    }, 3000);
  }

  function handleUpdateElevator(
    field: keyof typeof elevatorState,
    value: string
  ) {
    if (elevatorState[field] === value) return;
    updateElevator({ [field]: value }, elevatorId);
    setElevatorState((prev) => ({ ...prev, [field]: value }));
    setAdornment(field);
  }

  const [regionsState, setRegionsState] = useState<Region[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    refreshRecords("region", setRegionsState).then(() => {
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          height: "calc( 100dvh - 8rem )",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Loader />
      </Box>
    );
  }

  const editFields = [
    {
      label: "Adres",
      value: elevatorState.address,
      onBlur: (e: BlurEvent) => handleUpdateElevator("address", e.target.value),
      endAdornmentStatus: inputAdornmentState.address,
    },
    {
      label: "Miasto",
      value: elevatorState.city,
      onBlur: (e: BlurEvent) => handleUpdateElevator("city", e.target.value),
      endAdornmentStatus: inputAdornmentState.city,
    },
    {
      label: "Telefon",
      value: elevatorState.phoneNumber,
      onBlur: (e: BlurEvent) =>
        handleUpdateElevator("phoneNumber", e.target.value),
      endAdornmentStatus: inputAdornmentState.phoneNumber,
    },
  ];
  return (
    <Box>
      <Box
        sx={{
          m: 3,
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mb: 10,
        }}
      >
        <Fab
          sx={{ position: "absolute", left: 0 }}
          size="small"
          color="primary"
          onClick={handleGoBack}
        >
          <ArrowBackOutlined />
        </Fab>
        <Typography
          variant="h6"
          component="h1"
          sx={{ fontWeight: "bold", textAlign: "center" }}
        >
          Szczegóły windy
        </Typography>
      </Box>
      <Grid2 container spacing={2}>
        {editFields.map(({ label, value, onBlur, endAdornmentStatus }) => (
          <Grid2 size={6} key={label}>
            <TextField
              fullWidth
              label={label}
              defaultValue={value}
              onBlur={onBlur}
              margin="normal"
              variant="outlined"
              slotProps={{
                input: {
                  endAdornment: endAdornmentStatus && (
                    <InputAdornment position="end">
                      <Done color="success" />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Grid2>
        ))}

        <Grid2 size={6}>
          <FormControl margin="normal" fullWidth variant="outlined">
            <InputLabel shrink>Region</InputLabel>
            <Select
              native
              fullWidth
              label="Region"
              value={elevatorState.regionUuid}
              onChange={(e) => {
                handleUpdateElevator("regionUuid", e.target.value);
              }}
            >
              <option value="none">Wybierz region</option>
              {regionsState.map((region) => (
                <option key={region.uuid} value={region.uuid}>
                  {region.name}
                </option>
              ))}
            </Select>
          </FormControl>
        </Grid2>
      </Grid2>
    </Box>
  );
}
