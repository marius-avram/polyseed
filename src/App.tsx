import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { ThemeProvider, useTheme, createTheme } from '@mui/material/styles';
import Navbar from './components/navbar/Navbar';
import CreateCampaign from './components/create/CreateCampaign';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}.
    </Typography>
  );
}

export default function App() {
  const theme = useTheme();

  const darkTheme = createTheme({
    palette:{
      mode: "dark"
    },
    typography: {
      button: {
        textTransform: 'none'
      }
    }
  })
  return (
    <ThemeProvider theme={darkTheme}>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          height: '100vh',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'background.default',
          color: 'text.primary',
          p: 3,
        }}
      >
          <Navbar />
          <CreateCampaign />
      </Box>
    </ThemeProvider>
  
  );
}
