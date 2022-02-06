import * as React from 'react';
import { useState } from 'react';
import { Card, CardContent, CardActions, CardHeader, Collapse, Typography, Button } from '@mui/material';
import moment from 'moment';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ExpandMore from './ExpandMore';


interface CardItemProps {
  campaign: any
}

export default function CardItem(props: CardItemProps) {

  const [expanded, setExanded] = useState<boolean>(false);

  const getSubheader = (campaign: any) => {
    return new String('by ' + campaign.userId + ' on ' + moment(campaign.created_at).format('LLL'));
  }

  const handleExpand = () => {
    setExanded(!expanded);
  };

  return (
    <>
      <Card sx={
        {
          width: '100%',
          minHeight: '100px'
        }
      }
      variant='outlined'>
        <CardHeader
          title={props.campaign.title}
          subheader={getSubheader(props.campaign)}
        />
        <CardContent>
          <Typography>
            <div dangerouslySetInnerHTML={{__html: props.campaign.content}}></div>
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <ExpandMore
            expand={expanded}
            onClick={handleExpand}
            aria-expanded={expanded}
            aria-label="show-more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Button><MonetizationOnIcon />&nbsp;Donate</Button>
          </CardContent>
        </Collapse>
      </Card>
    </>
  );
}