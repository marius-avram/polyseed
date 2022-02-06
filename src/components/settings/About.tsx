import React from 'react';
import { Box, Typography } from '@mui/material';


export default function About() {
  return (
    <>
     <Box sx={{
        width: '50%',
        textAlign: 'center'
      }}>
        <h2>About</h2>
        <Typography>
          This is Polyseed, a fundraising platform for social causes.
        </Typography>
        <Typography>
          The users of this platform can use web3 payment systems enabled by 
          the <a style={{color: 'green', textDecoration: 'none'}} href='https://sequence.build/'>Sequence</a>  web wallet SDK.
        </Typography>
        <br />
        <Typography>
          Tested and works on Polygon Mumbai testnet. 
        </Typography>
      </Box>
    </>
  );
}