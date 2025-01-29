import { Box, Link, Typography, useTheme } from '@mui/material'

export function LoginFooter() {
  const theme = useTheme()
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        paddingTop: '1rem'
      }}
    >
      <Typography
        component="span"
        sx={{ textAlign: 'center', color: theme.palette.text.primary }}
      >
        Nie masz konta?{' '}
        <Link
          href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          variant="body2"
        >
          Masz pecha
        </Link>
      </Typography>
    </Box>
  )
}
