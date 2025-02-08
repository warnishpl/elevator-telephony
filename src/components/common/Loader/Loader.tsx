import React from "react";
import { Box } from "@mui/material";
import { styled, keyframes } from "@mui/system";

const loaderAnimation = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const StyledGridOverlay = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  backgroundColor: "rgba(18, 18, 18, 0.9)",
  color: "#fff",
  ...theme.applyStyles?.("light", {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    color: "#000",
  }),
}));

const LoaderContainer = styled(Box)({
  position: "relative",
  width: "50px",
  height: "50px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const Square = styled(Box)(({ theme }) => ({
  background: theme.palette.primary.main,
  width: "10px",
  height: "10px",
  position: "absolute",
}));

const squares = [
  { id: "sq1", marginTop: "-25px", marginLeft: "-25px", delay: "0s" },
  { id: "sq2", marginTop: "-25px", marginLeft: "0", delay: "75ms" },
  { id: "sq3", marginTop: "-25px", marginLeft: "25px", delay: "150ms" },
  { id: "sq4", marginTop: "0", marginLeft: "-25px", delay: "225ms" },
  { id: "sq5", marginTop: "0", marginLeft: "0", delay: "300ms" },
  { id: "sq6", marginTop: "0", marginLeft: "25px", delay: "375ms" },
  { id: "sq7", marginTop: "25px", marginLeft: "-25px", delay: "450ms" },
  { id: "sq8", marginTop: "25px", marginLeft: "0", delay: "525ms" },
  { id: "sq9", marginTop: "25px", marginLeft: "25px", delay: "600ms" },
];

export function Loader() {
  return (
    <LoaderContainer>
      {squares.map((square) => (
        <Square
          key={square.id}
          sx={{
            marginTop: square.marginTop,
            marginLeft: square.marginLeft,
            animation: `${loaderAnimation} 675ms ease-in-out ${square.delay} infinite alternate`,
          }}
        />
      ))}
    </LoaderContainer>
  );
}

export function CustomLoadingOverlay() {
  return (
    <StyledGridOverlay>
      <Loader />
      <Box sx={{ mt: 2 }}>Ładowanie danych...</Box>
    </StyledGridOverlay>
  );
}
