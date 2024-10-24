import React, { useState, useEffect } from 'react';
import {
  Box, Button, Card, CardContent, Dialog, DialogActions, DialogContent,
  DialogTitle, Grid, IconButton, Table, TableBody, TableCell,
  TableHead, TableRow, TextField, TablePagination, InputLabel, Select, MenuItem
} from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import Swal from 'sweetalert2';

const CityPage = () => {
  const [cities, setCities] = useState([]);
  const [newCity, setNewCity] = useState({ name: '', province: '' });
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  
  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchedCities = [
      { id: 1, name: 'Jakarta', province: 'DKI Jakarta' },
      { id: 2, name: 'Bandung', province: 'West Java' },
      { id: 3, name: 'Surabaya', province: 'East Java' },
      // Add more dummy data as needed
    ];
    setCities(fetchedCities);
  }, []);

  const handleOpen = (city) => {
    setEditMode(!!city);
    setNewCity(city || { name: '', province: '' });
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleSave = () => {
    if (editMode) {
      const updatedCities = cities.map((city) =>
        city.id === newCity.id ? newCity : city
      );
      setCities(updatedCities);
      Swal.fire('Updated!', 'City details have been updated.', 'success');
    } else {
      const newCityData = { ...newCity, id: cities.length + 1 };
      setCities([...cities, newCityData]);
      Swal.fire('Added!', 'City has been added.', 'success');
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
        const updatedCities = cities.filter(city => city.id !== id);
        setCities(updatedCities);
        Swal.fire('Deleted!', 'City has been deleted.', 'success');
      }
    });
  };

  const filteredCities = cities.filter(city =>
    city.name.toLowerCase().includes(searchTerm.toLowerCase())
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
                  <h1 style={{ color: '#2d3436', fontFamily: 'Poppins', fontSize: '28px', margin: 0 }}>City Management</h1>
                  <TextField
                    placeholder="Search City"
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
                    Add City
                  </Button>
                </Grid>
              </Grid>
              <Table sx={{ marginTop: '20px' }}>
                <TableHead>
                  <TableRow sx={{ background: '#dfe6e9' }}>
                    <TableCell>City Name</TableCell>
                    <TableCell>Province</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredCities.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((city) => (
                    <TableRow
                      key={city.id}
                      sx={{
                        '&:hover': {
                          backgroundColor: '#f5f6fa',
                          transform: 'scale(1.02)',
                          transition: 'all 0.3s ease-in-out',
                        },
                      }}
                    >
                      <TableCell>{city.name}</TableCell>
                      <TableCell>{city.province}</TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleOpen(city)} color="primary">
                          <Edit />
                        </IconButton>
                        <IconButton onClick={() => handleDelete(city.id)} color="secondary">
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
                count={filteredCities.length}
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
        <DialogTitle>{editMode ? 'Edit City' : 'Add City'}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="City Name"
            fullWidth
            variant="outlined"
            value={newCity.name}
            onChange={(e) => setNewCity({ ...newCity, name: e.target.value })}
          />
          <InputLabel id="province-select-label">Province</InputLabel>
          <Select
            labelId="province-select-label"
            value={newCity.province}
            onChange={(e) => setNewCity({ ...newCity, province: e.target.value })}
            fullWidth
            sx={{ marginTop: '15px' }}
          >
            <MenuItem value="DKI Jakarta">DKI Jakarta</MenuItem>
            <MenuItem value="West Java">West Java</MenuItem>
            <MenuItem value="East Java">East Java</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>{editMode ? 'Update' : 'Add'}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CityPage;
