import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { AppBar, Box, Button, Container, Grow, ClickAwayListener, Paper, Popper, Toolbar, MenuItem, MenuList } from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AddIcon from '@mui/icons-material/Add';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import InfoIcon from '@mui/icons-material/Info';
import LogoutIcon from '@mui/icons-material/Logout';
import useSequenceService from '../../services/SequenceService.hook';
import useUtils from '../../services/Utils';
import { useAppContext } from '../../context/App.context';

export default function Navbar() {
  const navigate = useNavigate();
  const sequence = useSequenceService();
  const appContext = useAppContext();
  const utils = useUtils();

  const [openSettings, setOpenSettings] = useState<boolean>(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);

  const goHome = () => {
    navigate('/');
  }

  const openAbout = () => {
    navigate('about');
  }
  
  const createNewCampaign = () => {
    navigate('/create');
  }

  const connectWallet = () => {
    sequence.connectWallet();
  }

  const logout = () => {
    sequence.disconnectWallet();
  }

  const toggleSettings = () => {
    setOpenSettings(!openSettings);
  }

  const closeSettings = () => {
    setOpenSettings(false);
  }

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpenSettings(false);
    } else if (event.key === 'Escape') {
      setOpenSettings(false);
    }
  }

  return (
    <AppBar position='absolute'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button
              key={'homepage'}
              onClick={goHome}
              color="success"
            >
              <img src='logo.png' height='48px' />&nbsp;&nbsp;&nbsp;
              <h3>Polyseed</h3>
            </Button>
              {appContext.state.address != null && (
                 <Button
                  key={'create'}
                  onClick={createNewCampaign}
                  color="success"
                >
                  <AddIcon />&nbsp;Add campaign
                </Button>
              )}
          </Box>
          {appContext.state.address != null && (
            <i>{appContext.state.network} - {utils.shortenAddress(appContext.state.address)}&nbsp;</i>
          )}
          {appContext.state.address == null && (
            <Button color='inherit' onClick={connectWallet}>
              <AccountBalanceWalletIcon fontSize='small' />&nbsp;Connect wallet
            </Button>
          )}
          {appContext.state.address != null && (
            <>
              <Button
                ref={anchorRef}
                color='inherit'
                aria-controls={openSettings ? 'composition-menu' : undefined}
                aria-expanded={openSettings ? 'true' : undefined}
                aria-haspopup="true"
                onClick={toggleSettings}
              >
                <SettingsIcon fontSize='small' />
              </Button>
              <Popper
                open={openSettings}
                anchorEl={anchorRef.current}
                role={undefined}
                placement="bottom-start"
                transition
                disablePortal
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin:
                        placement === 'bottom-start' ? 'left top' : 'left bottom',
                    }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={closeSettings}>
                        <MenuList
                          autoFocusItem={openSettings}
                          id="composition-menu"
                          aria-labelledby="composition-button"
                          onKeyDown={handleListKeyDown}
                        >
                          <MenuItem onClick={closeSettings}><PersonIcon fontSize="small" />&nbsp;&nbsp;Profile</MenuItem>
                          <MenuItem onClick={openAbout}><InfoIcon fontSize="small" />&nbsp;&nbsp;About</MenuItem>
                          <MenuItem onClick={logout}><LogoutIcon fontSize="small" />&nbsp;&nbsp;Logout</MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}