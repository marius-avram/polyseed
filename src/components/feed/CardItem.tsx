import * as React from 'react';
import { useState, useCallback } from 'react';
import { Card, CardContent, CardActions, CardHeader, Collapse, Typography, Button, TextField, Tooltip, Select, MenuItem } from '@mui/material';
import moment from 'moment';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ExpandMore from './ExpandMore';
import useSequenceService from '../../services/SequenceService.hook';


interface CardItemProps {
  campaign: any
}

export default function CardItem(props: CardItemProps) {
  const sequence = useSequenceService();

  const [expanded, setExpanded] = useState<boolean>(false);
  const [amount, setAmount] = useState<string>('0.1');
  const coin = 'MATIC';

  const getSubheader = (campaign: any) => {
    return new String('by ' + campaign.user + ' on ' + moment(campaign.created_at).format('LLL'));
  }

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  const onChangeAmount = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
  }, [setAmount]);

  const donate = useCallback(() => {
    sequence.sendAmount(props.campaign.user, amount, props.campaign.id);
  }, [sequence.sendAmount, amount]);

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
            <Tooltip title="Get more info and donate">
              <ExpandMoreIcon />
            </Tooltip>
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <TextField 
              type="number"
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', step: '0.1' }}
              size="small"
              defaultValue={amount}
              onChange={onChangeAmount}
            />
            &nbsp;&nbsp;
            <Select size="small"  value={coin} style={{width: '140px'}}>
              <MenuItem value={'MATIC'}>MATIC</MenuItem>
            </Select>
            &nbsp;
            <Button onClick={donate} color="success"><MonetizationOnIcon />&nbsp;Donate</Button>
          </CardContent>
        </Collapse>
      </Card>
    </>
  );
}