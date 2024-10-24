import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  TablePagination,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import Swal from 'sweetalert2';

const ProvincePage = () => {
  const [provinces, setProvinces] = useState([]);
  const [newProvince, setNewProvince] = useState({ name: '' });
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);

  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchedProvinces = [
      { id: 1, name: 'DKI Jakarta' },
      { id: 2, name: 'West Java' },
      { id: 3, name: 'East Java' },
      // Add more dummy data as needed
    ];
    setProvinces(fetchedProvinces);
  }, []);

  const handleOpen = (province) => {
    setEditMode(!!province);
    setNewProvince(province || { name: '' });
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleSave = () => {
    if (editMode) {
      const updatedProvinces = provinces.map((province) =>
        province.id === newProvince.id ? newProvince : province
      );
      setProvinces(updatedProvinces);
      Swal.fire('Updated!', 'Province details have been updated.', 'success');
    } else {
      const newProvinceData = { ...newProvince, id: provinces.length + 1 };
      setProvinces([...provinces, newProvinceData]);
      Swal.fire('Added!', 'Province has been added.', 'success');
    }
    setOpen(false);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedProvinces = provinces.filter(province => province.id !== id);
        setProvinces(updatedProvinces);
        Swal.fire('Deleted!', 'Province has been deleted.', 'success');
      }
    });
  };

  const filteredProvinces = provinces.filter(province =>
    province.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination handlers
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card sx={{ boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)', borderRadius: '12px' }}>
            <CardContent>
              <Grid container justifyContent="space-between" alignItems="center">
                <Grid item xs={8} display="flex" alignItems="center">
                  <h1 style={{ color: '#2d3436', fontFamily: 'Poppins', fontSize: '28px', margin: 0 }}>Province Management</h1>
                  <TextField
                    placeholder="Search Province"
                    variant="outlined"
                    size="small"
                    sx={{ marginLeft: '20px', width: '200px' }}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </Grid>
                <Grid item xs={4} container justifyContent="flex-end">
                  <Button
                    startIcon={<Add />}
                    sx={{
                      background: 'linear-gradient(45deg, #00b894, #0984e3)',
                      color: 'white',
                      borderRadius: '20px',
                      '&:hover': { background: 'linear-gradient(45deg, #0984e3, #00b894)' },
                      padding: '10px 20px',
                    }}
                    onClick={() => handleOpen(null)}
                  >
                    Add Province
                  </Button>
                </Grid>
              </Grid>
              <Table sx={{ marginTop: '20px' }}>
                <TableHead>
                  <TableRow sx={{ background: '#dfe6e9' }}>
                    <TableCell>Province Name</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredProvinces.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((province) => (
                    <TableRow
                      key={province.id}
                      sx={{
                        '&:hover': {
                          backgroundColor: '#f5f6fa',
                          transform: 'scale(1.02)',
                          transition: 'all 0.3s ease-in-out',
                        },
                      }}
                    >
                      <TableCell>{province.name}</TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleOpen(province)} color="primary">
                          <Edit />
                        </IconButton>
                        <IconButton onClick={() => handleDelete(province.id)} color="secondary">
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={filteredProvinces.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                sx={{
                  marginTop: '20px',
                  '& .MuiTablePagination-selectRoot': {
                    marginRight: '10px',
                  },
                }}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{editMode ? 'Edit Province' : 'Add Province'}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Province Name"
            fullWidth
            variant="outlined"
            value={newProvince.name}
            onChange={(e) => setNewProvince({ ...newProvince, name: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>{editMode ? 'Update' : 'Add'}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProvincePage;
