
import * as React from 'react';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { Card, CardHeader, Box, CardContent, Typography } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import useCampaignService from '../../services/CampaignService.hook';


export default function Feed() {
  const service = useCampaignService();
  const [campaigns, setCampaigns] = useState<any>([]);
  const lightTheme = createTheme({
    palette: {
      mode: 'light'
    },
  });

  useEffect(() => {
    const campaignsDict = service.getAllCampaigns();
    const campaignsList = Object.keys(campaignsDict).map((id : any) => (campaignsDict[id]));
    setCampaigns(campaignsList);
  }, [setCampaigns]);

  const getSubheader = (campaign: any) => {
    return new String('by ' + campaign.userId + ' on ' + moment(campaign.created_at).format('LLL'));
  }

  return (
    <>
      <ThemeProvider theme={lightTheme}>
        <Box sx={{
          width: '65%',
          position: 'absolute',
          top: '80px'
        }}>
          { campaigns.map((campaign : any) => (
            <Box
              key={campaign.id}
              sx={{ p: '15px'}}
            >
              <Card sx={
                  {
                    width: '100%',
                    minHeight: '100px'
                  }
                }
                variant='outlined'>
                  <CardHeader
                    title={campaign.title}
                    subheader={getSubheader(campaign)}
                  />
                  <CardContent>
                    <Typography>
                      <div dangerouslySetInnerHTML={{__html: campaign.content}}></div>
                    </Typography>
                    
                  </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      </ThemeProvider>
      
    </>
  );
}