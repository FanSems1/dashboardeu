import React, { useState, useEffect } from 'react';
import {
  Box, Button, Card, CardContent, Dialog, DialogActions, DialogContent,
  DialogContentText, DialogTitle, Grid, IconButton, Table, TableBody, TableCell,
  TableHead, TableRow, TableSortLabel, TextField, Checkbox, TablePagination
} from '@mui/material';
import { Edit, Delete, Add, FileDownload } from '@mui/icons-material';
import Swal from 'sweetalert2';

const SupplierPage = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [sortedSuppliers, setSortedSuppliers] = useState([]);
  const [newSupplier, setNewSupplier] = useState({
    name: '', address: '', contact: '', businessUnit: '', status: 'Active'
  });
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const fetchedSuppliers = [
      { id: 1, name: 'ABC Corp', address: 'Jakarta', contact: '123456', businessUnit: 'Logistics', status: 'Active' },
      { id: 2, name: 'XYZ Ltd', address: 'Bandung', contact: '789012', businessUnit: 'Retail', status: 'Inactive' },
      { id: 3, name: 'DEF Industries', address: 'Surabaya', contact: '345678', businessUnit: 'Manufacturing', status: 'Active' },
      { id: 4, name: 'GHI Corp', address: 'Medan', contact: '901234', businessUnit: 'Logistics', status: 'Inactive' },
      { id: 5, name: 'JKL Co', address: 'Bali', contact: '567890', businessUnit: 'Retail', status: 'Active' },
      { id: 6, name: 'MNO Ltd', address: 'Jakarta', contact: '123123', businessUnit: 'Manufacturing', status: 'Active' },
      { id: 7, name: 'PQR Corp', address: 'Bandung', contact: '456456', businessUnit: 'Logistics', status: 'Inactive' },
      { id: 8, name: 'STU Industries', address: 'Surabaya', contact: '789789', businessUnit: 'Retail', status: 'Active' },
    ];
    setSuppliers(fetchedSuppliers);
    setSortedSuppliers(fetchedSuppliers);
  }, []);

  useEffect(() => {
    setSortedSuppliers(suppliers.filter(supplier => 
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase())
    ));
  }, [searchTerm, suppliers]);

  const handleOpen = (supplier) => {
    setEditMode(!!supplier);
    setNewSupplier(supplier || { name: '', address: '', contact: '', businessUnit: '', status: 'Active' });
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleSave = () => {
    if (editMode) {
      const updatedSuppliers = suppliers.map((supplier) =>
        supplier.id === newSupplier.id ? newSupplier : supplier
      );
      setSuppliers(updatedSuppliers);
    } else {
      const newSupplierData = { ...newSupplier, id: suppliers.length + 1 };
      const updatedSuppliers = [...suppliers, newSupplierData];
      setSuppliers(updatedSuppliers);
    }
    setOpen(false);
    Swal.fire(editMode ? 'Updated!' : 'Added!', editMode ? 'Supplier details have been updated.' : 'Supplier has been added.', 'success');
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedSuppliers = suppliers.filter(supplier => supplier.id !== id);
        setSuppliers(updatedSuppliers);
        Swal.fire('Deleted!', 'Supplier has been deleted.', 'success');
      }
    });
  };

  const handleDeleteSelected = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover the deleted suppliers!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete them!'
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedSuppliers = suppliers.filter(supplier => !selectedIds.includes(supplier.id));
        setSuppliers(updatedSuppliers);
        setSelectedIds([]);
        Swal.fire('Deleted!', 'Selected suppliers have been deleted.', 'success');
      }
    });
  };

  const handleRequestSort = (property) => {
    const isAsc = sortedSuppliers[0]?.[property] === 'asc';
    const sorted = [...sortedSuppliers].sort((a, b) => {
      if (a[property] < b[property]) return isAsc ? -1 : 1;
      if (a[property] > b[property]) return isAsc ? 1 : -1;
      return 0;
    });
    setSortedSuppliers(sorted);
  };

  const handleSelect = (id) => {
    const newSelected = selectedIds.includes(id)
      ? selectedIds.filter((selectedId) => selectedId !== id)
      : [...selectedIds, id];
    setSelectedIds(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedSuppliers = sortedSuppliers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card sx={{ boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)', borderRadius: '12px' }}>
            <CardContent>
              <Grid container justifyContent="space-between" alignItems="center">
                <Grid item>
                  <h1 style={{ color: '#2d3436', fontFamily: 'Poppins', fontSize: '20px' }}>Supplier Management</h1>
                </Grid>
                <Grid item>
                  <TextField
                    label="Search Supplier"
                    variant="outlined"
                    size="small"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    sx={{ marginRight: '15px' }}
                  />
                  <Button
                    startIcon={<Add />}
                    sx={{
                      background: '#3f51b5',
                      color: 'white',
                      borderRadius: '20px',
                      '&:hover': { background: 'linear-gradient(45deg, #0984e3, #00b894)' },
                      padding: '10px 20px',
                    }}
                    onClick={() => handleOpen(null)}
                  >
                    Add Supplier
                  </Button>
                  <Button
                    startIcon={<FileDownload />}
                    sx={{
                      background: '#f50057',
                      color: 'white',
                      borderRadius: '20px',
                      marginLeft: '15px',
                      '&:hover': { background: 'linear-gradient(45deg, #e17055, #fdcb6e)' },
                      padding: '10px 20px',
                    }}
                  >
                    Download
                  </Button>
                </Grid>
              </Grid>
              <Table sx={{ marginTop: '20px' }}>
                <TableHead>
                  <TableRow sx={{ background: '#dfe6e9' }}>
                    <TableCell padding="checkbox">
                      <Checkbox />
                    </TableCell>
                    <TableCell>
                      <TableSortLabel onClick={() => handleRequestSort('name')}>Supplier Name</TableSortLabel>
                    </TableCell>
                    <TableCell>
                      <TableSortLabel onClick={() => handleRequestSort('address')}>Address</TableSortLabel>
                    </TableCell>
                    <TableCell>
                      <TableSortLabel onClick={() => handleRequestSort('contact')}>Contact</TableSortLabel>
                    </TableCell>
                    <TableCell>
                      <TableSortLabel onClick={() => handleRequestSort('businessUnit')}>Business Unit</TableSortLabel>
                    </TableCell>
                    <TableCell>
                      <TableSortLabel onClick={() => handleRequestSort('status')}>Status</TableSortLabel>
                    </TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedSuppliers.map((supplier) => (
                    <TableRow key={supplier.id}>
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedIds.includes(supplier.id)}
                          onChange={() => handleSelect(supplier.id)}
                        />
                      </TableCell>
                      <TableCell>{supplier.name}</TableCell>
                      <TableCell>{supplier.address}</TableCell>
                      <TableCell>{supplier.contact}</TableCell>
                      <TableCell>{supplier.businessUnit}</TableCell>
                      <TableCell>{supplier.status}</TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleOpen(supplier)}>
                          <Edit color="primary" />
                        </IconButton>
                        <IconButton onClick={() => handleDelete(supplier.id)}>
                          <Delete sx={{ color: '#f44336' }} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Box display="flex" justifyContent="space-between" alignItems="center" marginTop={2}>
                <Button
                  variant="outlined" 
                  color="secondary" 
                  onClick={handleDeleteSelected}
                  sx={{ color: '#f50057', borderColor: '#f50057' }}
                >
                  Delete Selected
                </Button>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={sortedSuppliers.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editMode ? 'Edit Supplier' : 'Add Supplier'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {editMode ? 'Edit the supplier details.' : 'Fill in the supplier information.'}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            variant="outlined"
            value={newSupplier.name}
            onChange={(e) => setNewSupplier({ ...newSupplier, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Address"
            type="text"
            fullWidth
            variant="outlined"
            value={newSupplier.address}
            onChange={(e) => setNewSupplier({ ...newSupplier, address: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Contact"
            type="text"
            fullWidth
            variant="outlined"
            value={newSupplier.contact}
            onChange={(e) => setNewSupplier({ ...newSupplier, contact: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Business Unit"
            type="text"
            fullWidth
            variant="outlined"
            value={newSupplier.businessUnit}
            onChange={(e) => setNewSupplier({ ...newSupplier, businessUnit: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Status"
            type="text"
            fullWidth
            variant="outlined"
            value={newSupplier.status}
            onChange={(e) => setNewSupplier({ ...newSupplier, status: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>{editMode ? 'Update' : 'Save'}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SupplierPage;
