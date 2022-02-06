import * as React from 'react';
import { styled } from '@mui/material/styles';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { Grid } from '@mui/material';


interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMoreImplementation = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function ExpandMore(props: ExpandMoreProps) { 

  return (
    <Grid sx={{ paddingRight: '10px' }}container justifyContent='flex-end'>
      <ExpandMoreImplementation {...props} />
    </Grid>
  );

}