import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  Grid,
  TextField,
  Select,
  MenuItem,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  TablePagination,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import Swal from 'sweetalert2';
import { gridSpacing } from 'config.js';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const orderData = [
  { id: 1, orderNumber: 'ORD001', customer: 'John Doe', businessUnit: 'Logistics', total: 150.00, status: 'Pending' },
  { id: 2, orderNumber: 'ORD002', customer: 'Jane Smith', businessUnit: 'Katarasa', total: 200.00, status: 'Completed' },
  { id: 3, orderNumber: 'ORD003', customer: 'Sam Wilson', businessUnit: 'Master Diskon', total: 120.00, status: 'Cancelled' },
  { id: 4, orderNumber: 'ORD004', customer: 'Emma Brown', businessUnit: 'Jaja', total: 300.00, status: 'Pending' },
  { id: 5, orderNumber: 'ORD005', customer: 'Liam Johnson', businessUnit: 'Bookhouse', total: 250.00, status: 'Completed' },
  { id: 6, orderNumber: 'ORD006', customer: 'Olivia Davis', businessUnit: 'Raja Cepat', total: 350.00, status: 'Pending' },
  // Add more orders as needed
];

const OrderPage = () => {
  const [orders, setOrders] = useState(orderData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDialog, setOpenDialog] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentOrder, setCurrentOrder] = useState({ orderNumber: '', customer: '', businessUnit: '', total: '', status: '' });
  const [businessUnitFilter, setBusinessUnitFilter] = useState('');

  const filteredOrders = orders.filter(order =>
    order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (businessUnitFilter ? order.businessUnit === businessUnitFilter : true)
  );

  const handleSelectOrder = (id) => {
    setSelectedOrders((prev) =>
      prev.includes(id) ? prev.filter((orderId) => orderId !== id) : [...prev, id]
    );
  };

  const handleBatchDelete = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete them!',
    }).then((result) => {
      if (result.isConfirmed) {
        setOrders(orders.filter((order) => !selectedOrders.includes(order.id)));
        setSelectedOrders([]);
        Swal.fire('Deleted!', 'Selected orders have been deleted.', 'success');
      }
    });
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenDialog = (order = null) => {
    setIsEditMode(!!order);
    setCurrentOrder(order ? { orderNumber: order.orderNumber, customer: order.customer, businessUnit: order.businessUnit, total: order.total, status: order.status } : { orderNumber: '', customer: '', businessUnit: '', total: '', status: '' });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSaveOrder = () => {
    if (isEditMode) {
      const updatedOrders = orders.map((o) =>
        o.id === selectedOrders[0] ? { ...o, orderNumber: currentOrder.orderNumber, customer: currentOrder.customer, businessUnit: currentOrder.businessUnit, total: currentOrder.total, status: currentOrder.status } : o
      );
      setOrders(updatedOrders);
      Swal.fire('Success', 'Order updated successfully', 'success');
    } else {
      const newOrder = {
        id: orders.length + 1,
        orderNumber: currentOrder.orderNumber,
        customer: currentOrder.customer,
        businessUnit: currentOrder.businessUnit,
        total: currentOrder.total,
        status: currentOrder.status,
      };
      setOrders((prev) => [...prev, newOrder]);
      Swal.fire('Success', 'Order added successfully', 'success');
    }
    handleCloseDialog();
  };

  const handleDeleteOrder = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        setOrders(orders.filter((order) => order.id !== id));
        Swal.fire('Deleted!', 'Order has been deleted.', 'success');
      }
    });
  };

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Card style={{ borderRadius: '8px', boxShadow: '0px 4px 6px rgba(0,0,0,0.2)' }}>
          <CardHeader
            title={<h1 style={{ color: '#2d3436', fontFamily: 'Poppins', fontSize: '20px' }}>Order Management</h1>}
            action={
              <Box display="flex" alignItems="center">
                <TextField
                  variant="outlined"
                  size="small"
                  placeholder="Search Order Number"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ width: '250px', marginRight: 4 }}
                />
                <Select
                  variant="outlined"
                  size="small"
                  value={businessUnitFilter}
                  onChange={(e) => setBusinessUnitFilter(e.target.value)}
                  style={{ width: '150px', marginRight: 4 }}
                >
                  <MenuItem value="">
                    <em>All Business Units</em>
                  </MenuItem>
                  <MenuItem value="Master Diskon">Master Diskon</MenuItem>
                  <MenuItem value="Katarasa">Katarasa</MenuItem>
                  <MenuItem value="Logistics">Logistics</MenuItem>
                  <MenuItem value="Bookhouse">Bookhouse</MenuItem>
                  <MenuItem value="Raja Cepat">Raja Cepat</MenuItem>
                  <MenuItem value="Jaja">Jaja</MenuItem>
                </Select>
                <Button variant="contained" onClick={() => handleOpenDialog()}>
                  Add Order
                </Button>
              </Box>
            }
          />
          <CardContent>
            <TableContainer sx={{ marginTop: '-30px', overflow: 'visible' }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ background: '#dfe6e9' }}>
                    <TableCell padding="checkbox">
                      <input
                        type="checkbox"
                        onChange={() => {
                          if (selectedOrders.length === filteredOrders.length) {
                            setSelectedOrders([]);
                          } else {
                            setSelectedOrders(filteredOrders.map(order => order.id));
                          }
                        }}
                        checked={selectedOrders.length === filteredOrders.length}
                      />
                    </TableCell>
                    <TableCell>Order Number</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell>Business Unit</TableCell>
                    <TableCell>Total</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredOrders
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((order) => (
                      <TableRow key={order.id}>
                        <TableCell padding="checkbox">
                          <input
                            type="checkbox"
                            checked={selectedOrders.includes(order.id)}
                            onChange={() => handleSelectOrder(order.id)}
                          />
                        </TableCell>
                        <TableCell>{order.orderNumber}</TableCell>
                        <TableCell>{order.customer}</TableCell>
                        <TableCell>{order.businessUnit}</TableCell>
                        <TableCell>{order.total.toFixed(2)}</TableCell>
                        <TableCell>{order.status}</TableCell>
                        <TableCell align="center">
                          <Button onClick={() => handleOpenDialog(order)}>
                            <Edit color="primary" />
                          </Button>
                          <Button onClick={() => handleDeleteOrder(order.id)}>
                            <Delete sx={{ color: '#f44336' }} />
                          </Button>
                          <Button
                            component={Link}
                            to={`/order/order-detail/${order.id}`} 
                            target="_blank"
                            variant="outlined"
                            color="primary"
                            style={{ marginLeft: '8px' }}
                          >
                            Order Detail
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box display="flex" justifyContent="space-between" alignItems="center" style={{ marginTop: '16px' }}>
              <Button
                variant="contained"
                color="error"
                onClick={handleBatchDelete}
                disabled={selectedOrders.length === 0}
                style={{ marginRight: '16px' }}
              >
                Delete Selected
              </Button>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={filteredOrders.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                sx={{ display: 'flex', justifyContent: 'flex-end' }}
              />
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{isEditMode ? 'Edit Order' : 'Add Order'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Order Number"
            type="text"
            fullWidth
            variant="outlined"
            value={currentOrder.orderNumber}
            onChange={(e) => setCurrentOrder({ ...currentOrder, orderNumber: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Customer Name"
            type="text"
            fullWidth
            variant="outlined"
            value={currentOrder.customer}
            onChange={(e) => setCurrentOrder({ ...currentOrder, customer: e.target.value })}
          />
          <Select
            fullWidth
            margin="dense"
            label="Business Unit"
            value={currentOrder.businessUnit}
            onChange={(e) => setCurrentOrder({ ...currentOrder, businessUnit: e.target.value })}
          >
            <MenuItem value="Master Diskon">Master Diskon</MenuItem>
            <MenuItem value="Katarasa">Katarasa</MenuItem>
            <MenuItem value="Logistics">Logistics</MenuItem>
            <MenuItem value="Bookhouse">Bookhouse</MenuItem>
            <MenuItem value="Raja Cepat">Raja Cepat</MenuItem>
            <MenuItem value="Jaja">Jaja</MenuItem>
          </Select>
          <TextField
            margin="dense"
            label="Total Amount"
            type="number"
            fullWidth
            variant="outlined"
            value={currentOrder.total}
            onChange={(e) => setCurrentOrder({ ...currentOrder, total: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Status"
            type="text"
            fullWidth
            variant="outlined"
            value={currentOrder.status}
            onChange={(e) => setCurrentOrder({ ...currentOrder, status: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveOrder} color="primary">
            {isEditMode ? 'Save Changes' : 'Add Order'}
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default OrderPage;
