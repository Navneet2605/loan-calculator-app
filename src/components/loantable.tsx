import React from 'react';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Typography
} from '@mui/material';

interface LoanRow {
  month: number;
  principal: number;
  interest: number;
  balance: number;
}

interface LoanTableProps {
  data: LoanRow[];
  emi: number;
  currency: string;
}

const LoanTable: React.FC<LoanTableProps> = ({ data, emi, currency }) => {
  return (
    <Paper sx={{ maxHeight: 400, overflow: 'auto', p: 2 }}>
      <Typography variant="h5" gutterBottom>
        Amortization Schedule ({currency})
      </Typography>

      <TableContainer>
        <Table stickyHeader sx={{ minWidth: '100%' }}>
          <TableHead>
            <TableRow>
              <TableCell><strong>Month</strong></TableCell>
              <TableCell align="center"><strong>EMI ({currency})</strong></TableCell>
              <TableCell align="center"><strong>Principal</strong></TableCell>
              <TableCell align="center"><strong>Interest</strong></TableCell>
              <TableCell align="right"><strong>Remaining Balance</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.month}>
                <TableCell>{row.month}</TableCell>
                <TableCell align="center">{emi.toFixed(2)}</TableCell>
                <TableCell align="center">{row.principal.toFixed(2)}</TableCell>
                <TableCell align="center">{row.interest.toFixed(2)}</TableCell>
                <TableCell align="right">{row.balance.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default LoanTable;