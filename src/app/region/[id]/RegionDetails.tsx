import { Box, Fab, TextField, Typography, InputAdornment } from "@mui/material";
import { ArrowBackOutlined, Done } from "@mui/icons-material";
import { useState } from "react";

type RegionDetailsProps = {
  displayedRegionData: { name: string };
  handleGoBack: () => void;
  updateRegion: (name: string, id: string) => void;
  regionId: string;
};

export default function RegionDetails({
  displayedRegionData: { name },
  handleGoBack,
  updateRegion,
  regionId,
}: RegionDetailsProps) {
  console.log(regionId);
  const [regionName, setRegionName] = useState(name);
  const [previousRegionName, setPreviousRegionName] = useState(name);
  const [regionNameChangeStatus, setRegionNameChangeStatus] = useState(false);

  function handleUpdateRegion() {
    if (regionName === previousRegionName) return;
    updateRegion(regionName, regionId);
    setRegionNameChangeStatus(true);
    setPreviousRegionName(regionName);
    setTimeout(() => setRegionNameChangeStatus(false), 3000);
  }

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
          Szczegóły regionu
        </Typography>
      </Box>
      <TextField
        fullWidth
        label="Nazwa regionu"
        value={regionName}
        onChange={(e) => setRegionName(e.target.value)}
        onBlur={handleUpdateRegion}
        margin="normal"
        variant="outlined"
        InputProps={{
          endAdornment: regionNameChangeStatus && (
            <InputAdornment position="end">
              <Done color="success" />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
}
