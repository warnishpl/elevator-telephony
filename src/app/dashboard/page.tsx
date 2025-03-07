"use client";

import { Header } from "@/components/common/Header/Header";
import { Box } from "@mui/material";

export default function Dashboard() {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Header title="Dashboard" subtitle="Panel administracyjny" />
      </Box>
    </>
  );
}
