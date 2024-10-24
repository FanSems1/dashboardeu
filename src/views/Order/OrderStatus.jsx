import React from 'react';

// Material-UI components
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  Grid,
  Typography,
  Chip,
  Box,
  Stack,
  Button,
} from '@mui/material';
import { Link } from 'react-router-dom'; // Import Link for navigation

// Project import
import { gridSpacing } from 'config.js';

// ==============================|| ORDER STATUS PAGE ||============================== //

const OrderStatusPage = () => {
  // Simulated order status data for demonstration purposes
  const orderStatuses = [
    { id: '1', label: 'Pending', count: 12, description: 'Orders that are created but not yet confirmed.' },
    { id: '2', label: 'Confirmed', count: 8, description: 'Orders that have been confirmed by the admin.' },
    { id: '3', label: 'Processing', count: 5, description: 'Orders currently being processed for shipment.' },
    { id: '4', label: 'Shipped', count: 10, description: 'Orders that have been shipped to customers.' },
    { id: '5', label: 'Delivered', count: 15, description: 'Orders that have been successfully delivered.' },
    { id: '6', label: 'Canceled', count: 3, description: 'Orders that were canceled by the admin or customer.' },
    { id: '7', label: 'Returned', count: 2, description: 'Orders that have been returned by the customer.' },
  ];

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <div variant="outlined" sx={{ borderRadius: '12px', boxShadow: 3 }}>
          <CardHeader
            title={
              <Typography variant="h5" sx={{ fontWeight: 'bold', textAlign: 'center', color: '#1976d2' }}>
                Order Status Overview
              </Typography>
            }
            sx={{ borderRadius: '12px 12px 0 0' }}
          />
          <Divider />
          <CardContent>
            <Typography variant="body2" sx={{ mb: 2, textAlign: 'center', color: '#555' }}>
              Track the status of your orders efficiently. Each status shows how many orders are in that phase.
            </Typography>
            <Grid container spacing={2} justifyContent="center">
              {orderStatuses.map((status) => (
                <Grid item xs={6} sm={4} md={3} key={status.id}>
                  <Box
                    sx={{
                      p: 2,
                      border: '1px solid #1976d2',
                      borderRadius: '8px',
                      backgroundColor: '#ffffff',
                      textAlign: 'center',
                      boxShadow: 1,
                      transition: '0.3s',
                      '&:hover': { boxShadow: 3, transform: 'scale(1.02)' }
                    }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                      {status.label}
                    </Typography>
                    <Chip label={status.count} color="primary" sx={{ marginTop: 1, borderRadius: '16px' }} />
                    <Typography variant="body2" sx={{ marginTop: 1, color: '#555', fontSize: '0.875rem' }}>
                      {status.description}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
            {/* Order History Button */}
            <Box mt={3} textAlign="center">
              <Link to="/order/order-history" style={{ textDecoration: 'none' }}>
                <Button variant="contained" color="primary" size="large" sx={{ borderRadius: '8px' }}>
                  View Order History
                </Button>
              </Link>
            </Box>
          </CardContent>
        </div>
      </Grid>
    </Grid>
  );
};

export default OrderStatusPage;
