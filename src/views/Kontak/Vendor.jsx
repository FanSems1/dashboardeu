import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  TablePagination,
  TableSortLabel,
  Checkbox,
  Tooltip,
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import BusinessIcon from '@mui/icons-material/Business'; // Import Vendor Legality Icon

const initialVendors = [
  { id: 1, name: 'Master Diskon', type: 'Discount Provider' },
  { id: 2, name: 'Katarasa', type: 'Food Supplier' },
  { id: 3, name: 'Jaja', type: 'General Supplier' },
  { id: 4, name: 'Logistics', type: 'Logistics Service' },
  { id: 5, name: 'Bookhouse', type: 'Book Supplier' },
  { id: 6, name: 'Raja Cepat', type: 'Courier Service' },
  { id: 7, name: 'FreshMart', type: 'Grocery Supplier' },
  { id: 8, name: 'Tech Suppliers', type: 'Electronics Provider' },
];

const VendorPage = () => {
  const [vendors, setVendors] = useState(initialVendors);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [newVendor, setNewVendor] = useState({ id: null, name: '', type: '' });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selected, setSelected] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleOpen = (vendor = null) => {
    setEditMode(!!vendor);
    setSelectedVendor(vendor);
    setNewVendor(vendor ? vendor : { id: null, name: '', type: '' });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    if (editMode) {
      setVendors(vendors.map((vend) => (vend.id === selectedVendor.id ? newVendor : vend)));
    } else {
      setVendors([...vendors, { ...newVendor, id: vendors.length + 1 }]);
    }
    handleClose();
  };

  const handleDelete = (id) => {
    setVendors(vendors.filter((vendor) => vendor.id !== id));
  };

  const handleDeleteSelected = () => {
    setVendors(vendors.filter((vendor) => !selected.includes(vendor.id)));
    setSelected([]);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = vendors.map((vendor) => vendor.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleCheckboxClick = (id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredVendors = vendors.filter((vendor) =>
    vendor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card style={{ backgroundColor: '#F9FAFB' }}>
            <CardHeader
              title={<h1 style={{ color: '#2d3436', fontFamily: 'Poppins', fontSize: '20px' }}>Supplier Management</h1>
            }
              action={
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <TextField
                    label="Search Vendor"
                    variant="outlined"
                    size="small"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    sx={{ marginRight: 2 }}
                  />
                  <Button
                    variant="contained"
                    sx={{
                      background: '#3f51b5',
                      color: 'white',
                      borderRadius: '20px',
                      '&:hover': { background: 'linear-gradient(45deg, #0984e3, #00b894)' },
                      padding: '10px 20px',
                    }}
                    onClick={() => handleOpen()}
                    startIcon={<Add />}
                  >
                    Add Vendor
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      background: '#f50057',
                      color: 'white',
                      borderRadius: '20px',
                      marginLeft: '15px',
                      '&:hover': { background: 'linear-gradient(45deg, #e17055, #fdcb6e)' },
                      padding: '10px 20px',
                    }}
                    component={Link}
                    to="/kontak/vendor-legality" 
                    startIcon={<BusinessIcon />} 
                  >
                    Vendor Legality
                  </Button>
                </div>
              }
            />
            <CardContent>
              <Table sx={{ marginTop: '-30px' }}>
                <TableHead>
                  <TableRow sx={{ background: '#dfe6e9' }}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        indeterminate={selected.length > 0 && selected.length < filteredVendors.length}
                        checked={filteredVendors.length > 0 && selected.length === filteredVendors.length}
                        onChange={handleSelectAllClick}
                      />
                    </TableCell>
                    <TableCell style={{ color: '#333333' }}>ID</TableCell>
                    <TableCell style={{ color: '#333333' }}>
                      <TableSortLabel active direction="asc">
                        Name
                      </TableSortLabel>
                    </TableCell>
                    <TableCell style={{ color: '#333333' }}>Type</TableCell>
                    <TableCell style={{ color: '#333333' }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredVendors.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((vendor) => {
                    const isItemSelected = isSelected(vendor.id);
                    return (
                      <TableRow key={vendor.id} selected={isItemSelected}>
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            onClick={(event) => {
                              event.stopPropagation(); // Prevent row click from toggling selection
                              handleCheckboxClick(vendor.id);
                            }}
                          />
                        </TableCell>
                        <TableCell>{vendor.id}</TableCell>
                        <TableCell>{vendor.name}</TableCell>
                        <TableCell>{vendor.type}</TableCell>
                        <TableCell>
                          <IconButton color="primary" onClick={() => handleOpen(vendor)}>
                            <Edit />
                          </IconButton>
                          <IconButton color="secondary" onClick={() => handleDelete(vendor.id)}>
                            <Delete sx={{ color: '#f44336' }}/>
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
              {/* Grid to Align Delete Selected Button with Pagination */}
              <Grid container justifyContent="space-between" alignItems="center" style={{ marginTop: '10px' }}>
                <Grid item>
                  {selected.length > 0 && (
                    <Tooltip title="Delete Selected">
                      <Button
                        variant="contained"
                        style={{ color: '#f50057', 
                          variant: 'outlined',
                          backgroundColor: 'white',
                          borderRadius: '20px',
                          padding: '10px 20px',
                          marginRight: '15px', }}
                        startIcon={<Delete />}
                        onClick={handleDeleteSelected}
                      >
                        Delete Selected
                      </Button>
                    </Tooltip>
                  )}
                </Grid>
                <Grid item>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={filteredVendors.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Modal for Add/Edit Vendor */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{editMode ? 'Edit Vendor' : 'Add Vendor'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {editMode ? 'Edit the vendor details below.' : 'Fill in the details to add a new vendor.'}
          </DialogContentText>
          <TextField
            margin="dense"
            label="Name"
            fullWidth
            value={newVendor.name}
            onChange={(e) => setNewVendor({ ...newVendor, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Type"
            fullWidth
            value={newVendor.type}
            onChange={(e) => setNewVendor({ ...newVendor, type: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} style={{ color: '#FF5733' }}>
            Cancel
          </Button>
          <Button onClick={handleSave} style={{ backgroundColor: '#4A90E2', color: '#FFFFFF' }}>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default VendorPage;
