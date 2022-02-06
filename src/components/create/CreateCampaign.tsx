import * as React from 'react';
import { useState, useCallback } from 'react';
import { useNavigate } from "react-router-dom";
import { Box, Button, Grid, TextField, Typography, Snackbar, Alert, AlertColor } from '@mui/material';
import ReactQuill from 'react-quill';
import EditorMetadata from './EditorMetadata';
import useCampaignService from '../../services/CampaignService.hook';
import { useAppContext } from '../../context/App.context';


export default function CreateCampaign() {
  const appContext = useAppContext();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const [notificationSeverity, setNotificationSeverity] = useState<AlertColor>('success');
  const [notificationText, setNotificationText] = useState<string>('');
  const service = useCampaignService();

  const alertTimeout = 3000; // ms

  const onTitleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  }, [setTitle])

  const onPublish = useCallback(() => {
    if (appContext.state.address == null) {
      setNotificationSeverity('error');
      setNotificationText('Please connect to wallet first')
      setShowNotification(true);
    }
    else {
      service.saveCampaign(title, content, appContext.state.address);
      setNotificationSeverity('success');
      setNotificationText('Campaign succesfully created. Redirecting...')
      setShowNotification(true);
      setTimeout(() => {
        navigate('/');
      }, alertTimeout);
    }
  }, [title, content])

  return (
    <>
      <Box sx={{
        width: '75%'
      }}>
        <h2><Typography>Title</Typography></h2>
        <TextField
          sx={{backgroundColor: '#fefcfc', borderRadius: '5px', display: 'flex'}}
          variant="standard"
          InputProps={{style: {color: '#000', padding: 4}, disableUnderline: true}}
          onChange={onTitleChange}
          focused
        />
        <h2><Typography>Some context on your campaign</Typography></h2>
        <Box sx={{
          height: '400px',
        }}>
          <ReactQuill
            theme='snow'
            value={content}
            onChange={setContent}
            placeholder={EditorMetadata.placeholder}
            modules={EditorMetadata.modules}
          />
          <Grid sx={{ paddingTop: 2 }} container justifyContent="flex-end">
            <Button variant="contained" color="success" onClick={onPublish}>
              Publish
            </Button>
            <Snackbar
              open={showNotification}
              autoHideDuration={alertTimeout}
            >
              <Alert severity={notificationSeverity}>{notificationText}</Alert>
            </Snackbar>
          </Grid>
        </Box>
      
      </Box>
     
    </>
  )
}