import { Box, Typography } from "@mui/material";

interface HeaderProps {
  title: string;
  subtitle: string;
}

export function Header({ title, subtitle }: HeaderProps) {
  return (
    <Box margin="20px" height="70px">
      <Typography mb={2} variant="h2">
        {title}
      </Typography>
      <Typography variant="h5">{subtitle}</Typography>
    </Box>
  );
}
