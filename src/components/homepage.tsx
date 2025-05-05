import Button from '@mui/material/Button'
import { Box, Paper, TextField, Typography, Stack } from '@mui/material';
import React from 'react'

const Homepage = () => {
  return (
  <>
<Box
      sx={{
        height: '20vh', // Full viewport height
        display: 'flex',
        justifyContent: 'left',
        alignItems: 'center',
        paddingLeft: '12%'
        
      }}
    >
      <Paper elevation={0} sx={{ p: 4 }}>
        <Typography variant="h4" align="left" gutterBottom>
          Loan Calculator Dashboard
        </Typography>
        <Stack direction="row" spacing={2}>
          <TextField
            required
            id="loan-amount"
            label="Loan Amount"
            variant="outlined"
            defaultValue="1000"
          />
          <TextField
            required
            id="interest-rate"
            label="Interest Rate (%)"
            variant="outlined"
            defaultValue="7.5"
          />
          <TextField
            required
            id="term-years"
            label="Term (Years)"
            variant="outlined"
            defaultValue="2"
          />
        </Stack>
        <Stack sx={{
            paddingTop:"2%"
        }}
        direction="row"
        >
        <Button variant="contained">Calculate</Button>
        </Stack>
      </Paper>
    </Box>
  </>
  )
}

export default Homepage
