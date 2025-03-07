import { addRecord } from "@/utils/apiFunctions";
import { ArrowBackIosNewOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";

type ColumnData = {
  field: string;
  headerName: string | undefined;
};

type ModalProps = {
  data: ColumnData[];
  isModalOpen: boolean;
  handleCloseModal: () => void;
  path: string;
};

export function AddRecordModal({
  data,
  isModalOpen,
  handleCloseModal,
  path,
}: ModalProps) {
  const theme = useTheme();
  const [formData, setFormData] = useState<Record<string, string>>(
    Object.fromEntries(data.map(({ field }) => [field, ""]))
  );

  function handleChange(field: string, value: string) {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function handleSubmit() {
    addRecord(formData, path).then(handleCloseModal);
  }

  return (
    <Modal open={isModalOpen} onClose={handleCloseModal}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: theme.palette.menuBackground?.main,
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          width: "50dvw",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            position: "relative",
            width: "100%",
            marginBottom: "2rem",
          }}
        >
          <Box sx={{ position: "absolute", left: 0 }}>
            <ArrowBackIosNewOutlined onClick={handleCloseModal} />
          </Box>
          <Box sx={{ flex: 1, textAlign: "center" }}>
            <Typography variant="h4">Dodaj nowy</Typography>
          </Box>
        </Box>
        <Box sx={{ marginX: "1rem" }}>
          {data.map((col, index) => (
            <Box key={index}>
              <TextField
                fullWidth
                label={col.headerName}
                value={formData[col.field]}
                onChange={(e) => handleChange(col.field, e.target.value)}
                margin="normal"
                variant="outlined"
              />
            </Box>
          ))}
        </Box>
        <Button
          onClick={handleSubmit}
          sx={{ marginTop: "2rem" }}
          color="primary"
          variant="contained"
        >
          Dodaj
        </Button>
      </Box>
    </Modal>
  );
}
