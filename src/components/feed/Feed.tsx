
import * as React from 'react';
import { useEffect, useCallback, useState } from 'react';
import moment from 'moment';
import { Card, CardHeader, Box, CardActions, CardContent, Typography, Collapse } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import useCampaignService from '../../services/CampaignService.hook';
import CardItem from './CardItem';


export default function Feed() {
  const service = useCampaignService();
  const [campaigns, setCampaigns] = useState<any>([]);
  const [expanded, setExpanded] = useState<any>({});
  const lightTheme = createTheme({
    palette: {
      mode: 'light'
    },
  });

  const feedSorter = (element1: any, element2: any) => {
    if (element1['created_at'] > element2['created_at']) {
      return -1;
    }
    else {
      return 1;
    }
  }

  useEffect(() => {
    const campaignsDict = service.getAllCampaigns();
    const campaignsList = Object.keys(campaignsDict).map((id : any) => (campaignsDict[id]));
    const sortedCampaigns = campaignsList.sort(feedSorter)
    setCampaigns(campaignsList);
  }, [setCampaigns]);

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
              <CardItem campaign={campaign} />
            </Box>
          ))}
        </Box>
      </ThemeProvider>
      
    </>
  );
}