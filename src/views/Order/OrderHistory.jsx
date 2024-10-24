import React, { useState } from 'react';

// Material-UI components
import {
  Card, CardHeader, CardContent, Divider, Grid, Typography, Box, Stack, Chip, Paper, MenuItem, Select, InputLabel, FormControl, Table, TableBody, TableCell, TableHead, TableRow, TablePagination
} from '@mui/material';

// Project import
import { gridSpacing } from 'config.js';

// Simulated order history data
const orderHistoryData = [
  {
    businessUnit: 'master diskon',
    orders: [
      { id: 'ORD123', date: '2024-10-05', status: 'Completed', total: '$150', items: 3 },
      { id: 'ORD124', date: '2024-10-03', status: 'Processing', total: '$200', items: 2 }
    ]
  },
  {
    businessUnit: 'katarasa',
    orders: [
      { id: 'ORD125', date: '2024-09-28', status: 'Shipped', total: '$85', items: 1 }
    ]
  },
  {
    businessUnit: 'raja cepat',
    orders: [
      { id: 'ORD126', date: '2024-09-21', status: 'Cancelled', total: '$300', items: 5 }
    ]
  },
  {
    businessUnit: 'jaja',
    orders: [
      { id: 'ORD127', date: '2024-09-10', status: 'Completed', total: '$450', items: 7 }
    ]
  },
  {
    businessUnit: 'logistics',
    orders: [
      { id: 'ORD128', date: '2024-08-30', status: 'Completed', total: '$90', items: 2 }
    ]
  },
  {
    businessUnit: 'bookhouse',
    orders: [
      { id: 'ORD129', date: '2024-08-15', status: 'Returned', total: '$120', items: 4 }
    ]
  }
];

// ==============================|| ORDER HISTORY PAGE ||============================== //

const OrderHistoryPage = () => {
  const [selectedBusinessUnit, setSelectedBusinessUnit] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3); // Items per page

  // Handle filter by business unit
  const handleBusinessUnitChange = (event) => {
    setSelectedBusinessUnit(event.target.value);
    setCurrentPage(0); // Reset to the first page when changing filters
  };

  // Handle filter by month
  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
    setCurrentPage(0); // Reset to the first page when changing filters
  };

  // Filter the orders based on the selected business unit and month
  const filteredOrders = orderHistoryData.filter((data) => {
    return (
      (selectedBusinessUnit === '' || data.businessUnit === selectedBusinessUnit) &&
      data.orders.some((order) => {
        const orderMonth = new Date(order.date).getMonth() + 1;
        return selectedMonth === '' || orderMonth === parseInt(selectedMonth);
      })
    );
  });

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <div variant="outlined" sx={{ borderRadius: '12px', boxShadow: 3 }}>
          <CardHeader
            title={
              <Typography variant="h5" sx={{ fontWeight: 'bold', textAlign: 'center', color: '#1976d2' }}>
                Order History
              </Typography>
            }
            sx={{ borderRadius: '12px 12px 0 0' }}
          />
          <Divider />

          {/* Filter section */}
          <CardContent>
            <Grid container spacing={2} mb={3}>
              <Grid item xs={6} sm={4}>
                <FormControl fullWidth>
                  <InputLabel id="business-unit-select-label">Business Unit</InputLabel>
                  <Select
                    labelId="business-unit-select-label"
                    value={selectedBusinessUnit}
                    label="Business Unit"
                    onChange={handleBusinessUnitChange}
                  >
                    <MenuItem value="">All</MenuItem>
                    {orderHistoryData.map((unit) => (
                      <MenuItem key={unit.businessUnit} value={unit.businessUnit}>
                        {unit.businessUnit}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6} sm={4}>
                <FormControl fullWidth>
                  <InputLabel id="month-select-label">Month</InputLabel>
                  <Select
                    labelId="month-select-label"
                    value={selectedMonth}
                    label="Month"
                    onChange={handleMonthChange}
                  >
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="1">January</MenuItem>
                    <MenuItem value="2">February</MenuItem>
                    <MenuItem value="3">March</MenuItem>
                    <MenuItem value="4">April</MenuItem>
                    <MenuItem value="5">May</MenuItem>
                    <MenuItem value="6">June</MenuItem>
                    <MenuItem value="7">July</MenuItem>
                    <MenuItem value="8">August</MenuItem>
                    <MenuItem value="9">September</MenuItem>
                    <MenuItem value="10">October</MenuItem>
                    <MenuItem value="11">November</MenuItem>
                    <MenuItem value="12">December</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            {/* Display filtered orders */}
            {filteredOrders.length > 0 ? (
              filteredOrders.map((businessUnitData) => {
                const { businessUnit, orders } = businessUnitData;

                // Pagination logic
                const paginatedOrders = orders
                  .filter((order) => {
                    const orderMonth = new Date(order.date).getMonth() + 1;
                    return selectedMonth === '' || orderMonth === parseInt(selectedMonth);
                  })
                  .slice(currentPage * rowsPerPage, currentPage * rowsPerPage + rowsPerPage);

                return (
                  <Box key={businessUnit} mb={3}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: '#1976d2' }}>
                      {businessUnit.toUpperCase()}
                    </Typography>
                    {paginatedOrders.map((order) => (
                      <Paper
                        key={order.id}
                        sx={{
                          p: 2,
                          mb: 2,
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          boxShadow: 2,
                          borderRadius: '8px',
                          transition: '0.3s',
                          '&:hover': { boxShadow: 4 }
                        }}
                      >
                        <Box>
                          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                            Order ID: {order.id}
                          </Typography>
                          <Typography variant="body2">Date: {order.date}</Typography>
                          <Typography variant="body2">Items: {order.items}</Typography>
                        </Box>
                        <Stack direction="row" alignItems="center" spacing={2}>
                          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                            {order.total}
                          </Typography>
                          <Chip
                            label={order.status}
                            color={
                              order.status === 'Completed'
                                ? 'success'
                                : order.status === 'Processing'
                                ? 'primary'
                                : order.status === 'Cancelled'
                                ? 'error'
                                : 'warning'
                            }
                            sx={{ borderRadius: '8px' }}
                          />
                        </Stack>
                      </Paper>
                    ))}
                    <TablePagination
                      component="div"
                      count={orders.filter((order) => selectedMonth === '' || new Date(order.date).getMonth() + 1 === parseInt(selectedMonth)).length}
                      page={currentPage}
                      onPageChange={(event, newPage) => setCurrentPage(newPage)}
                      rowsPerPage={rowsPerPage}
                      onRowsPerPageChange={(event) => {
                        setRowsPerPage(parseInt(event.target.value, 10));
                        setCurrentPage(0); // Reset to the first page when changing rows per page
                      }}
                      rowsPerPageOptions={[3, 5, 10]} // Options for items per page
                    />
                  </Box>
                );
              })
            ) : (
              <Typography variant="body1" color="textSecondary">
                No orders found for the selected filters.
              </Typography>
            )}
          </CardContent>
        </div>
      </Grid>
    </Grid>
  );
};

export default OrderHistoryPage;
