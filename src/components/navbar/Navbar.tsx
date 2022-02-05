import { AppBar, Box, Button, Container, Toolbar } from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AddIcon from '@mui/icons-material/Add';
import * as React from 'react';

export default function Navbar() {
  const pages = ['Add campaign']

  const onNewCampaign = () => {
  }

  return (
    <AppBar position='absolute'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button>
              <img src='logo.png' height='48px' />
            </Button>
            <Button
              key={'new_campaign'}
              onClick={onNewCampaign}
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