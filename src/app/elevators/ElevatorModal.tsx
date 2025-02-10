import { Box, Modal, Typography, useTheme } from "@mui/material";
import { StatusIcon } from "./StatusIcon";
import { Elevator } from "./elevators.types";

type ElevatorModalProps = {
  isModalOpen: boolean;
  handleCloseModal: () => void;
  selectedElevatorData: Elevator;
};
export default function ElevatorModal({
  isModalOpen,
  handleCloseModal,
  selectedElevatorData,
}: ElevatorModalProps) {
    const theme = useTheme();
  return (
    <Modal
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      open={isModalOpen}
      onClose={handleCloseModal}
    >
      <Box
        sx={{
          p: 3,
          bgcolor: theme.palette.menuBackground?.main,
          borderRadius: "10px",
          boxShadow: 3,
        }}
      >
        <>
          <Typography
            variant="h6"
            component="h1"
            sx={{ mb: 2, fontWeight: "bold", textAlign: "center" }}
          >
            Szczegóły windy
          </Typography>
          <Typography sx={{ mb: 1 }}>
            <strong>ID: </strong>
            {selectedElevatorData.uuid}
          </Typography>
          <Typography sx={{ mb: 1 }}>
            <strong>Adres: </strong>
            {selectedElevatorData.address}
          </Typography>
          <Typography sx={{ mb: 1 }}>
            <strong>Miasto: </strong>
            {selectedElevatorData.city}
          </Typography>
          <Typography sx={{ mb: 1 }}>
            <strong>Telefon: </strong>
            {selectedElevatorData.phoneNumber}
          </Typography>
          <Typography sx={{ mb: 1 }}>
            <strong>Region: </strong>
            {selectedElevatorData.region}
          </Typography>
          <Typography sx={{ mb: 1 }}>
            <strong>Status: </strong>
            <StatusIcon status={selectedElevatorData.status} />
          </Typography>
          <Typography sx={{ mb: 2 }}>
            <strong>Ostatnia aktualizacja: </strong>
            {selectedElevatorData.updatedAt}
          </Typography>
        </>
      </Box>
    </Modal>
  );
}
