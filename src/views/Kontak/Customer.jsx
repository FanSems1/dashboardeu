import React, { useState } from 'react';
import {
  Button, Card, Grid, Typography, IconButton, Avatar, Pagination,
  TextField
} from '@mui/material';
import { Add, Edit, Delete, Gavel } from '@mui/icons-material';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const initialCustomers = [
  { id: 1, name: 'John Doe', email: 'johndoe@example.com', businessUnit: 'Master Diskon' },
  { id: 2, name: 'Jane Smith', email: 'janesmith@example.com', businessUnit: 'Katarasa' },
  { id: 3, name: 'Alice Johnson', email: 'alicejohnson@example.com', businessUnit: 'Jaja' },
  { id: 4, name: 'Bob Brown', email: 'bobbrown@example.com', businessUnit: 'Logistics' },
  { id: 5, name: 'Charlie Davis', email: 'charliedavis@example.com', businessUnit: 'Bookhouse' },
  { id: 6, name: 'Diana Prince', email: 'dianaprince@example.com', businessUnit: 'Raja Cepat' },
];

const CustomerPage = () => {
  const [customers, setCustomers] = useState(initialCustomers);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const itemsPerPage = 6;
  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedCustomers = filteredCustomers.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleAddCustomer = () => {
    MySwal.fire({
      title: 'Add New Customer',
      html: `
        <input type="text" id="name" class="swal2-input" placeholder="Name">
        <input type="text" id="email" class="swal2-input" placeholder="Email">
        <input type="text" id="businessUnit" class="swal2-input" placeholder="Business Unit">
        <input type="file" id="image" class="swal2-file" placeholder="Upload Image">`,
      confirmButtonText: 'Add',
      showCancelButton: true,
      preConfirm: () => {
        const name = Swal.getPopup().querySelector('#name').value;
        const email = Swal.getPopup().querySelector('#email').value;
        const businessUnit = Swal.getPopup().querySelector('#businessUnit').value;
        const image = Swal.getPopup().querySelector('#image').files[0];

        if (!name || !email || !businessUnit) {
          Swal.showValidationMessage(`Please enter name, email, and business unit`);
        }
        return { name, email, businessUnit, image };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        setCustomers([
          ...customers,
          {
            id: customers.length + 1,
            name: result.value.name,
            email: result.value.email,
            businessUnit: result.value.businessUnit,
          },
        ]);
      }
    });
  };

  const handleEditCustomer = (customer) => {
    MySwal.fire({
      title: `Edit ${customer.name}`,
      html: `
        <input type="text" id="name" class="swal2-input" placeholder="Name" value="${customer.name}">
        <input type="text" id="email" class="swal2-input" placeholder="Email" value="${customer.email}">
        <input type="text" id="businessUnit" class="swal2-input" placeholder="Business Unit" value="${customer.businessUnit}">
        <input type="file" id="image" class="swal2-file" placeholder="Upload Image">`,
      confirmButtonText: 'Update',
      showCancelButton: true,
      preConfirm: () => {
        const name = Swal.getPopup().querySelector('#name').value;
        const email = Swal.getPopup().querySelector('#email').value;
        const businessUnit = Swal.getPopup().querySelector('#businessUnit').value;
        const image = Swal.getPopup().querySelector('#image').files[0];

        if (!name || !email || !businessUnit) {
          Swal.showValidationMessage(`Please enter name, email, and business unit`);
        }
        return { name, email, businessUnit, image };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        setCustomers(
          customers.map((cust) =>
            cust.id === customer.id
              ? {
                  ...cust,
                  name: result.value.name,
                  email: result.value.email,
                  businessUnit: result.value.businessUnit,
                }
              : cust
          )
        );
      }
    });
  };

  return (
    <>
      <Grid container spacing={2} alignItems="center" justifyContent="space-between" style={{ marginBottom: '16px' }}>
        <Grid item>
          <TextField
            label="Search"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<Gavel />}
            style={{ marginRight: '10px' }}
            onClick={() => window.location.href = '/kontak/customer-legality'}
          >
            Customer Legality
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={handleAddCustomer}
          >
            Add Customer
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        {paginatedCustomers.map((customer) => (
          <Grid item xs={12} sm={6} key={customer.id}>
            <Card
              style={{
                backgroundColor: '#A9DEF9',
                padding: '16px',
                borderRadius: '8px',
              }}
            >
              <Grid container alignItems="center" spacing={2}>
                <Grid item>
                  <Avatar>{customer.name[0]}</Avatar>
                </Grid>
                <Grid item xs>
                  <Typography variant="h6">{customer.name}</Typography>
                  <Typography>{customer.email}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {customer.businessUnit}
                  </Typography>
                </Grid>
                <Grid item>
                  <IconButton color="primary" onClick={() => handleEditCustomer(customer)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="secondary">
                    <Delete />
                  </IconButton>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container justifyContent="flex-end" style={{ marginTop: '16px' }}>
        <Pagination
          count={Math.ceil(filteredCustomers.length / itemsPerPage)}
          page={page}
          onChange={handlePageChange}
          color="primary"
          siblingCount={0}
          boundaryCount={1}
          showFirstButton
          showLastButton
        />
      </Grid>
    </>
  );
};

export default CustomerPage;
