import React from 'react';
import { useParams } from 'react-router-dom';
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
  Paper,
  Divider,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { gridSpacing } from 'config.js';

const mockInvoiceList = [
  {
    id: 'INV001',
    unit: 'Master Diskon',
    date: '2024-10-10',
    total: 200000,
    customer: {
      name: 'John Doe',
      address: '123 Main St, City, Country',
      contact: 'john.doe@example.com',
    },
    terms: {
      paymentTerms: 'Due on receipt',
      dueDate: '2024-10-20',
    },
    items: [
      { description: 'Item 1', quantity: 1, price: 100000 },
      { description: 'Item 2', quantity: 1, price: 100000 },
    ],
  },
  {
    id: 'INV002',
    unit: 'Katarasa',
    date: '2024-10-12',
    total: 150000,
    customer: {
      name: 'Jane Smith',
      address: '456 Another St, City, Country',
      contact: 'jane.smith@example.com',
    },
    terms: {
      paymentTerms: 'Net 30 days',
      dueDate: '2024-11-11',
    },
    items: [{ description: 'Item 3', quantity: 2, price: 75000 }],
  },
];

const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
  marginTop: theme.spacing(-4),
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(0.5),
  fontWeight: 'bold',
  fontSize: '0.9rem', // Reduced font size for compactness
}));

const InfoSection = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  marginBottom: theme.spacing(1),
  backgroundColor: theme.palette.background.default,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],
}));

const OrderInvoiceDetailPage = () => {
  const { id } = useParams();
  const invoice = mockInvoiceList.find((invoice) => invoice.id === id);

  if (!invoice) {
    return (
      <Typography variant="h6" color="error">
        Invoice not found
      </Typography>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <Grid container spacing={gridSpacing} justifyContent="center">
      <Grid item xs={12} md={10} lg={8}>
        <StyledCard>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Order Invoice Detail
            </Typography>
            <Divider sx={{ mb: 1 }} />
            <Grid container spacing={1}>
              <Grid item xs={4}>
                <SectionTitle>Invoice ID:</SectionTitle>
                <Typography variant="body2">{invoice.id}</Typography>
              </Grid>
              <Grid item xs={4}>
                <SectionTitle>Date:</SectionTitle>
                <Typography variant="body2">{invoice.date}</Typography>
              </Grid>
              <Grid item xs={4}>
                <SectionTitle>Business Unit:</SectionTitle>
                <Typography variant="body2">{invoice.unit}</Typography>
              </Grid>
            </Grid>
            <Divider sx={{ my: 1 }} />
            <InfoSection>
              <SectionTitle>Customer Information</SectionTitle>
              <Typography variant="body2"><strong>Name:</strong> {invoice.customer.name}</Typography>
              <Typography variant="body2"><strong>Address:</strong> {invoice.customer.address}</Typography>
              <Typography variant="body2"><strong>Contact:</strong> {invoice.customer.contact}</Typography>
            </InfoSection>
            <InfoSection>
              <SectionTitle>Invoice Terms</SectionTitle>
              <Typography variant="body2"><strong>Payment Terms:</strong> {invoice.terms.paymentTerms}</Typography>
              <Typography variant="body2"><strong>Due Date:</strong> {invoice.terms.dueDate}</Typography>
            </InfoSection>
            <SectionTitle sx={{ mt: 1 }}>Items</SectionTitle>
            <Paper sx={{ overflow: 'hidden', mb: 1 }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Description</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {invoice.items.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.description}</TableCell>
                      <TableCell align="right">{item.quantity}</TableCell>
                      <TableCell align="right">Rp {item.price.toLocaleString()}</TableCell>
                      <TableCell align="right">Rp {(item.price * item.quantity).toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
            <Typography variant="h6" sx={{ mt: 1 }}>
              Total: Rp {invoice.total.toLocaleString()}
            </Typography>
            <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handlePrint}>
              Print Invoice
            </Button>
          </CardContent>
        </StyledCard>
      </Grid>
    </Grid>
  );
};

export default OrderInvoiceDetailPage;
