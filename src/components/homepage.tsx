import Button from '@mui/material/Button'
import { Box, Paper, TextField, Typography, Stack, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import React from 'react'

const Homepage = () => {
    const [currency, setCurrency] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
      setCurrency(event.target.value as string);
    };
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
        <Stack sx={{
            paddingTop:"2%"
        }}
        direction="row"
        >
        <Typography variant="h5" align="left" gutterBottom sx={{
            mt:2
        }}>
          Monthly EMI: 
        </Typography>

        </Stack>
        <Stack direction="row" spacing={2} sx={{
            mt:2
        }}>
        <Box sx={{ minWidth: 110}}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Currency</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={currency}
          label="Age"
          onChange={handleChange}
          defaultValue="USD"
        >
          <MenuItem value='USD'>USD</MenuItem>
          <MenuItem value='EUR'>EUR</MenuItem>
          <MenuItem value='INR'>INR</MenuItem>
          <MenuItem value='GBP'>GBP</MenuItem>
          <MenuItem value='JPY'>JPY</MenuItem>
          <MenuItem value='AUD'>AUD</MenuItem>
          <MenuItem value='CAD'>CAD</MenuItem>
        </Select>
      </FormControl>
    </Box>
        </Stack>
      </Paper>
    </Box>
  </>
  )
}

export default Homepage
