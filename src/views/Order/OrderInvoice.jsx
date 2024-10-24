import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TablePagination,
  TextField,
} from '@mui/material';
import { gridSpacing } from 'config.js';

const businessUnits = ['Master Diskon', 'Katarasa', 'Logistics', 'Bookhouse', 'Raja Cepat', 'Jaja'];

const months = [
  { value: '', label: 'All Months' },
  { value: '01', label: 'January' },
  { value: '02', label: 'February' },
  { value: '03', label: 'March' },
  { value: '04', label: 'April' },
  { value: '05', label: 'May' },
  { value: '06', label: 'June' },
  { value: '07', label: 'July' },
  { value: '08', label: 'August' },
  { value: '09', label: 'September' },
  { value: '10', label: 'October' },
  { value: '11', label: 'November' },
  { value: '12', label: 'December' },
];

const mockInvoiceList = [
  { id: 'INV001', unit: 'Master Diskon', date: '2024-10-10', total: 200000 },
  { id: 'INV002', unit: 'Katarasa', date: '2024-10-12', total: 150000 },
  { id: 'INV003', unit: 'Logistics', date: '2024-10-15', total: 175000 },
  { id: 'INV004', unit: 'Raja Cepat', date: '2024-10-18', total: 120000 },
  { id: 'INV005', unit: 'Jaja', date: '2024-09-20', total: 230000 },
  { id: 'INV006', unit: 'Bookhouse', date: '2024-10-22', total: 260000 },
  { id: 'INV007', unit: 'Master Diskon', date: '2024-09-25', total: 195000 },
  { id: 'INV008', unit: 'Katarasa', date: '2024-10-27', total: 250000 },
  { id: 'INV009', unit: 'Logistics', date: '2024-11-29', total: 225000 },
  { id: 'INV010', unit: 'Raja Cepat', date: '2024-10-31', total: 210000 },
];

const OrderInvoicePage = () => {
  const [selectedUnit, setSelectedUnit] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleBusinessUnitChange = (e) => {
    setSelectedUnit(e.target.value);
    setPage(0);
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
    setPage(0);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredInvoices = mockInvoiceList.filter((invoice) => {
    const invoiceMonth = invoice.date.split('-')[1];
    const isUnitMatch = selectedUnit ? invoice.unit === selectedUnit : true;
    const isMonthMatch = selectedMonth ? invoiceMonth === selectedMonth : true;
    const isSearchMatch = invoice.id.toLowerCase().includes(searchTerm.toLowerCase());
    return isUnitMatch && isMonthMatch && isSearchMatch;
  });

  const displayedInvoices = filteredInvoices.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>
          Order Invoices
        </Typography>

        <Grid container spacing={2} alignItems="center" style={{ marginBottom: '16px' }}>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth variant="outlined" size="small">
              <InputLabel>Business Unit</InputLabel>
              <Select
                value={selectedUnit}
                onChange={handleBusinessUnitChange}
                label="Business Unit"
              >
                <MenuItem value="">
                  <em>All Business Units</em>
                </MenuItem>
                {businessUnits.map((unit) => (
                  <MenuItem key={unit} value={unit}>
                    {unit}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={4}>
            <FormControl fullWidth variant="outlined" size="small">
              <InputLabel>Month</InputLabel>
              <Select
                value={selectedMonth}
                onChange={handleMonthChange}
                label="Month"
              >
                {months.map((month) => (
                  <MenuItem key={month.value} value={month.value}>
                    {month.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              label="Search Invoice ID"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </Grid>
        </Grid>

        <Card style={{ marginTop: '16px' }}>
          <CardContent>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Invoice ID</TableCell>
                  <TableCell>Business Unit</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Total</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {displayedInvoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell>{invoice.id}</TableCell>
                    <TableCell>{invoice.unit}</TableCell>
                    <TableCell>{invoice.date}</TableCell>
                    <TableCell>Rp {invoice.total.toLocaleString()}</TableCell>
                    <TableCell>
                      <Button
                        href={`/order/order-invoice-detail/${invoice.id}`}
                        target="_blank"
                        variant="contained"
                        color="primary"
                        size="small"
                      >
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <TablePagination
          component="div"
          count={filteredInvoices.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Grid>
    </Grid>
  );
};

export default OrderInvoicePage;
