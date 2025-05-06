import React, { useState, useEffect } from 'react';
import {
  Box, Button, Paper, TextField, Typography, Stack, FormControl,
  InputLabel, Select, MenuItem, SelectChangeEvent
} from '@mui/material';
import LoanTable from './loantable';

interface LoanRow {
  month: number;
  principal: number;
  interest: number;
  balance: number;
}

const Homepage = () => {
  const [loanAmount, setLoanAmount] = useState(1000);
  const [interestRate, setInterestRate] = useState(7.5);
  const [termYears, setTermYears] = useState(2);
  const [currency, setCurrency] = useState('USD');
  const [emi, setEmi] = useState<number | null>(null);
  const [schedule, setSchedule] = useState<LoanRow[]>([]);
  const [showTable, setShowTable] = useState(false);
  const [exchangeRates, setExchangeRates] = useState<{ [key: string]: number }>({});

 
  useEffect(() => {
    const fetchRates = async () => {
      if (!emi || currency === 'USD') return; 
      try {
        const res = await fetch(`https://v6.exchangerate-api.com/v6/3e5addd00f93efa1bdad35c5/latest/USD`);
        const data = await res.json();
  
        if (data && data.conversion_rates) {
          setExchangeRates(data.conversion_rates);
        }
      } catch (error) {
        console.error('Error fetching exchange rates:', error);
      }
    };
  
    fetchRates();
  }, [currency, emi]);

  const handleChange = (event: SelectChangeEvent) => {
    setCurrency(event.target.value as string);
  };

  const calculateEMI = () => {
    const principal = loanAmount;
    const rate = interestRate / (12 * 100);
    const time = termYears * 12;

    const emiVal = (principal * rate * Math.pow(1 + rate, time)) / (Math.pow(1 + rate, time) - 1);
    setEmi(emiVal);

    // Generate schedule
    let balance = principal;
    const scheduleData: LoanRow[] = [];

    for (let month = 1; month <= time; month++) {
      const interest = balance * rate;
      const principalPaid = emiVal - interest;
      balance -= principalPaid;

      scheduleData.push({
        month,
        principal: principalPaid,
        interest: interest,
        balance: balance > 0 ? balance : 0,
      });
    }

    setSchedule(scheduleData);
    setShowTable(true);
  };

  const resetForm = () => {
    setLoanAmount(1000);
    setInterestRate(7.5);
    setTermYears(2);
    setCurrency('USD');
    setEmi(null);
    setSchedule([]);
    setShowTable(false);
  };

  const convertedEMI =
    emi !== null && exchangeRates[currency]
      ? (emi * exchangeRates[currency]).toFixed(2)
      : null;

  return (
    <>
      <Box sx={{
        minHeight: '30vh',
        display: 'flex',
        justifyContent: 'left',
        alignItems: 'center',
        paddingLeft: '12%',
        paddingRight: '12%'
      }}>
        <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
          <Typography variant="h4" gutterBottom>
            Loan Calculator Dashboard
          </Typography>

          <Stack direction="row" spacing={2}>
            <TextField
              label="Loan Amount"
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
            />
            <TextField
              label="Interest Rate (%)"
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
            />
            <TextField
              label="Term (Years)"
              type="number"
              value={termYears}
              onChange={(e) => setTermYears(Number(e.target.value))}
            />
          </Stack>

          <Stack direction="row" spacing={2} sx={{ pt: 2 }}>
            <Button variant="contained" onClick={calculateEMI}>
              Calculate
            </Button>
          </Stack>

          {showTable && (
            <>
              <Stack sx={{ paddingTop: 3 }}>
                {convertedEMI && (
                  <Typography variant="h6" sx={{ mt: 3 }}>
                    Monthly EMI: {convertedEMI} {currency}
                  </Typography>
                )}
              </Stack>

              <Stack
                direction="row"
                spacing={2}
                sx={{
                  paddingTop: 3,
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <FormControl sx={{ maxWidth: 120 }}>
                  <InputLabel>Currency</InputLabel>
                  <Select
                    value={currency}
                    onChange={handleChange}
                    label="Currency"
                  >
                    <MenuItem value='USD'>USD</MenuItem>
                    <MenuItem value='INR'>INR</MenuItem>
                    <MenuItem value='EUR'>EUR</MenuItem>
                    <MenuItem value='GBP'>GBP</MenuItem>
                    <MenuItem value='JPY'>JPY</MenuItem>
                    <MenuItem value='AUD'>AUD</MenuItem>
                    <MenuItem value='CAD'>CAD</MenuItem>
                  </Select>
                </FormControl>

                <Button variant="outlined" color='secondary' onClick={resetForm}>
                  Reset Table
                </Button>
              </Stack>
            </>
          )}
        </Paper>
      </Box>

      {showTable && (
  <Box sx={{ px: '12%', pt: 4 }}>
    <LoanTable
      data={schedule}
      emi={emi! * (exchangeRates[currency] || 1)}
      currency={currency}
    />
  </Box>
)}
    </>
  );
};

export default Homepage;