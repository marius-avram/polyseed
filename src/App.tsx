import * as React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Box from '@mui/material/Box';
import { ThemeProvider, useTheme, createTheme } from '@mui/material/styles';
import { AppProvider } from './context/App.context';
import Navbar from './components/navbar/Navbar';
import Feed from './components/feed/Feed';
import About from './components/settings/About';
import CreateCampaign from './components/create/CreateCampaign';

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
            minHeight: '100vh',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'background.default',
            color: 'text.primary',
            p: 3,
          }}
        >
          <AppProvider>
            <Router>
              <Navbar />
              <Routes>
                {/* Homepage */}
                <Route path="/" element={<Feed />} />
                {/* Create a new campaign */}
                <Route path="/create" element={<CreateCampaign />} />
                {/* About page */}
                <Route path="/about" element={<About />} />
              </Routes>
            </Router>
          </AppProvider>
        </Box>
      </ThemeProvider>
  );
}
