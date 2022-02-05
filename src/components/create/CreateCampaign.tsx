import * as React from 'react';
import { useState, useCallback } from 'react';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import ReactQuill from 'react-quill';
import EditorMetadata from './EditorMetadata';
import useCampaignService from '../../services/CampaignService.hook';


export default function CreateCampaign() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const service = useCampaignService();

  const onTitleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  }, [setTitle])

  const onPublish = useCallback(() => {
    service.saveCampaign(title, content);
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
          </Grid>
        </Box>
      
      </Box>
     
    </>
  )
}