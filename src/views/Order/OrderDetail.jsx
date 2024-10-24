import React from 'react';
import { Link, useParams } from 'react-router-dom';

// Material-UI components
import {
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
  Avatar,
  Chip,
  Divider,
  IconButton,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// Project import
import Breadcrumb from 'component/Breadcrumb';
import { gridSpacing } from 'config.js';

// ==============================|| ORDER DETAIL PAGE ||============================== //

const OrderDetailPage = () => {
  // Get the orderId from URL params
  const { orderId } = useParams();

  // Simulated order data for demonstration purposes
  const orderDetails = [
    {
      id: '1',
      date: '2024-10-01',
      customer: {
        name: 'John Doe',
        phone: '123-456-7890',
        email: 'john.doe@example.com',
      },
      items: [
        { id: 1, name: 'Product A', quantity: 2, price: 25.0 },
        { id: 2, name: 'Product B', quantity: 1, price: 15.0 },
      ],
      total: 65.0,
    },
    {
      id: '2',
      date: '2024-10-02',
      customer: {
        name: 'Jane Smith',
        phone: '234-567-8901',
        email: 'jane.smith@example.com',
      },
      items: [
        { id: 3, name: 'Product C', quantity: 1, price: 30.0 },
        { id: 4, name: 'Product D', quantity: 3, price: 10.0 },
      ],
      total: 60.0,
    },
    {
      id: '3',
      date: '2024-10-03',
      customer: {
        name: 'Mike Johnson',
        phone: '345-678-9012',
        email: 'mike.johnson@example.com',
      },
      items: [
        { id: 5, name: 'Product E', quantity: 2, price: 40.0 },
        { id: 6, name: 'Product F', quantity: 1, price: 50.0 },
      ],
      total: 130.0,
    },
  ];

  const currentOrder = orderDetails.find(order => order.id === orderId);

  return (
    <>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <div
            sx={{
              padding: '32px',
              borderRadius: '12px',
              backgroundColor: '#fff',
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Box display="flex" alignItems="center" mb={3}>
              <IconButton component={Link} to="/order" color="primary">
                <ArrowBackIcon />
              </IconButton>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#3f51b5', ml: 2 }}>
                Order Detail
              </Typography>
            </Box>
            <Divider />
            {currentOrder ? (
              <Box mt={3}>
                <Box mb={3}>
                  <Typography variant="subtitle1"><strong>Order ID:</strong> {currentOrder.id}</Typography>
                  <Typography variant="subtitle1"><strong>Date:</strong> {currentOrder.date}</Typography>
                </Box>

                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#3f51b5', mb: 1 }}>Customer Information</Typography>
                <Box
                  sx={{
                    padding: '20px',
                    mb: 3,
                    borderRadius: '8px',
                    backgroundColor: 'white',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Avatar sx={{ bgcolor: '#3f51b5', mr: 2 }}>{currentOrder.customer.name[0]}</Avatar>
                  <Box>
                    <List>
                      <ListItem>
                        <ListItemText primary="Name" secondary={currentOrder.customer.name} />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Phone" secondary={currentOrder.customer.phone} />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Email" secondary={currentOrder.customer.email} />
                      </ListItem>
                    </List>
                  </Box>
                </Box>
                <Divider sx={{ mb: 3 }} />

                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#3f51b5', mb: 1 }}>Items Ordered</Typography>
                <Box
                  sx={{
                    padding: '20px',
                    borderRadius: '8px',
                    backgroundColor: 'white',
                  }}
                >
                  <List>
                    {currentOrder.items.map(item => (
                      <ListItem key={item.id}>
                        <ListItemText
                          primary={<Typography sx={{ fontWeight: 'bold' }}>{item.name}</Typography>}
                          secondary={
                            <Box display="flex" alignItems="center">
                              <Typography sx={{ mr: 2 }}>Quantity: {item.quantity}</Typography>
                              <Chip label={`$${item.price.toFixed(2)}`} variant="outlined" sx={{ backgroundColor: '#e3f2fd', color: '#3f51b5' }} />
                            </Box>
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>
                <Divider sx={{ my: 3 }} />

                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#3f51b5' }}>
                  <strong>Total Amount:</strong> ${currentOrder.total.toFixed(2)}
                </Typography>
              </Box>
            ) : (
              <Typography variant="body2" color="error">Order not found.</Typography>
            )}
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default OrderDetailPage;
