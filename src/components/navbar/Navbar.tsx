import * as React from 'react';
import { useNavigate } from "react-router-dom";
import { AppBar, Box, Button, Container, Toolbar } from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AddIcon from '@mui/icons-material/Add';

export default function Navbar() {
  const navigate = useNavigate();
  const pages = ['Add campaign']

  const goHome = () => {
    navigate('/');
  }
  
  const createNewCampaign = () => {
    navigate('/create');
  }

  return (
    <AppBar position='absolute'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button
              key={'homepage'}
              onClick={goHome}
            >
              <img src='logo.png' height='48px' />
            </Button>
            <Button
              key={'create'}
              onClick={createNewCampaign}
            >
              <AddIcon />&nbsp;Add campaign
            </Button>
          </Box>
          <Button color='inherit'>
            <AccountBalanceWalletIcon fontSize='small'/>&nbsp;Connect wallet
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
}