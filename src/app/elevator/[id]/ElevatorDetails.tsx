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
import { AllowedElevatorEditData, Elevator } from "../elevators.types";
import { ArrowBackOutlined, Done } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { Region } from "@/app/region/regions.types";
import { refreshRecords } from "@/utils/apiFunctions";

type ElevatorDetailsProps = {
  handleGoBack: () => void;
  displayedElevatorData: Elevator;
  updateElevator: (data: AllowedElevatorEditData, id: string) => void;
  elevatorId: string;
};

export default function ElevatorDetails({
  handleGoBack,
  displayedElevatorData: { address, city, phoneNumber, region },
  elevatorId,
  updateElevator,
}: ElevatorDetailsProps) {
  const [elevatorState, setElevatorState] = useState({
    address: address,
    city: city,
    phoneNumber: phoneNumber,
  });

  const [previousElevatorState, setPreviousElevatorState] = useState({
    address: address,
    city: city,
    phoneNumber: phoneNumber,
  });

  const [elevatorStateChangeStatus, setElevatorStateChangeStatus] = useState({
    address: false,
    city: false,
    phoneNumber: false,
  });

  function handleUpdateElevator(field: keyof typeof elevatorStateChangeStatus) {
    if (
      elevatorState.address === previousElevatorState.address &&
      elevatorState.city === previousElevatorState.city &&
      elevatorState.phoneNumber === previousElevatorState.phoneNumber
    )
      return;
    updateElevator(
      {
        address: elevatorState.address,
        city: elevatorState.city,
        phoneNumber: elevatorState.phoneNumber,
      },
      elevatorId
    );
    setElevatorStateChangeStatus((prev) => ({ ...prev, [field]: true }));
    setPreviousElevatorState(elevatorState);
    setTimeout(() => {
      setElevatorStateChangeStatus((prev) => ({ ...prev, [field]: false }));
    }, 3000);
  }

  const [regionsState, setRegionsState] = useState<Region[]>([]);
  useEffect(() => {
    refreshRecords<Region>("region", (regions) => setRegionsState(regions));
  }, []);

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
        <Grid2 size={6}>
          <TextField
            fullWidth
            label="Adres"
            value={elevatorState.address}
            onChange={(e) =>
              setElevatorState({ ...elevatorState, address: e.target.value })
            }
            onBlur={() => handleUpdateElevator("address")}
            margin="normal"
            variant="outlined"
            slotProps={{
              input: {
                endAdornment: elevatorStateChangeStatus.address && (
                  <InputAdornment position="end">
                    <Done color="success" />
                  </InputAdornment>
                ),
              },
            }}
          />
        </Grid2>
        <Grid2 size={6}>
          <TextField
            fullWidth
            label="Miasto"
            value={elevatorState.city}
            onChange={(e) =>
              setElevatorState({ ...elevatorState, city: e.target.value })
            }
            onBlur={() => handleUpdateElevator("city")}
            margin="normal"
            variant="outlined"
            slotProps={{
              input: {
                endAdornment: elevatorStateChangeStatus.city && (
                  <InputAdornment position="end">
                    <Done color="success" />
                  </InputAdornment>
                ),
              },
            }}
          />
        </Grid2>
        <Grid2 size={6}>
          <TextField
            fullWidth
            label="Telefon"
            value={elevatorState.phoneNumber}
            onChange={(e) =>
              setElevatorState({
                ...elevatorState,
                phoneNumber: e.target.value,
              })
            }
            onBlur={() => handleUpdateElevator("phoneNumber")}
            margin="normal"
            variant="outlined"
            slotProps={{
              input: {
                endAdornment: elevatorStateChangeStatus.phoneNumber && (
                  <InputAdornment position="end">
                    <Done color="success" />
                  </InputAdornment>
                ),
              },
            }}
          />
        </Grid2>
        <Grid2 size={6}>
          <FormControl margin="normal" fullWidth variant="outlined">
            <InputLabel shrink>Region</InputLabel>
            <Select native fullWidth label="Region">
              {regionsState?.map((region) => (
                <option
                  key={region.uuid}
                  value={region.uuid}
                >
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
