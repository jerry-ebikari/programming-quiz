import React from 'react';
import Typography from '@mui/material/Typography';

function Settings() {
  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', flexDirection: 'column'}}>
      <Typography variant='h6' textAlign='center' color='var(--color-danger)'>Currently Unavailable</Typography>
      <Typography variant='body1' textAlign='center'>Settings will be available in a later release</Typography>
    </div>
  )
}

export default Settings