import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  Grid,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  MenuItem,
  Select,
  Box,
  TablePagination,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import Swal from 'sweetalert2';
import { gridSpacing } from 'config.js';

const initialBusinessUnits = [
  { name: 'Master Diskon', vehicleCount: 10, vehicles: ['COD 5', 'Trailer 2', 'Motor 3'] },
  { name: 'Katarasa', vehicleCount: 8, vehicles: ['Motor 4', 'Tronton 2', 'Fuso 2'] },
  { name: 'Raja Cepat', vehicleCount: 15, vehicles: ['Fuso 7', 'Trailer 5', 'Motor 3'] },
  { name: 'Jaja', vehicleCount: 5, vehicles: ['Motor 2', 'COD 3', 'Van 1'] },
  { name: 'Bookhouse', vehicleCount: 12, vehicles: ['Tronton 4', 'Fuso 4', 'Scooter 2', 'Motor 2'] },
  { name: 'Logistics', vehicleCount: 20, vehicles: ['COD 10', 'Motor 5', 'Fuso 3', 'Tronton 2', 'Bike 2'] },
];

const VehiclePage = () => {
  const [selectedUnit, setSelectedUnit] = useState('');
  const [selectedUnits, setSelectedUnits] = useState([]); // State for selected business units
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5); // Number of rows per page

  const [open, setOpen] = useState(false); // Modal state
  const [editMode, setEditMode] = useState(false); // Determine if in edit mode
  const [currentUnit, setCurrentUnit] = useState({ name: '', vehicleCount: 0, vehicles: [] }); // Current unit to add/edit

  const handleSelectUnit = (unit) => {
    setSelectedUnits((prev) =>
      prev.includes(unit) ? prev.filter((u) => u !== unit) : [...prev, unit]
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
        // Handle the deletion logic here
        Swal.fire('Deleted!', 'Selected vehicles have been deleted.', 'success');
        setSelectedUnits([]); // Clear selected units after deletion
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

  const handleOpen = (unit = null) => {
    if (unit) {
      setCurrentUnit(unit);
      setEditMode(true);
    } else {
      setCurrentUnit({ name: '', vehicleCount: 0, vehicles: [] });
      setEditMode(false);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentUnit({ name: '', vehicleCount: 0, vehicles: [] });
  };

  const handleSubmit = () => {
    if (editMode) {
      // Edit logic here
      Swal.fire('Updated!', 'Vehicle has been updated.', 'success');
    } else {
      // Add logic here
      Swal.fire('Added!', 'Vehicle has been added.', 'success');
    }
    handleClose();
  };

  return (
    <>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <Card>
            <CardHeader
              title={
                <Grid container alignItems="center" justifyContent="space-between">
                  <Grid item>
                    <h1 style={{ color: '#2d3436', fontFamily: 'Poppins', fontSize: '20px' }}>
                      Vehicle Management
                    </h1>
                  </Grid>
                  <Grid item>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item>
                        <Select
                          value={selectedUnit}
                          onChange={(e) => setSelectedUnit(e.target.value)}
                          displayEmpty
                          style={{ minWidth: 110 }}
                        >
                          <MenuItem value="">
                            <em>All Units</em>
                          </MenuItem>
                          {initialBusinessUnits.map((unit, index) => (
                            <MenuItem key={index} value={unit.name}>
                              {unit.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </Grid>
                      <Grid item>
                        <Button
                          variant="contained"
                          component={Link}
                          to="/master/vehicle-category"
                          sx={{
                            background: '#3f51b5',
                            color: 'white',
                            borderRadius: '20px',
                            '&:hover': { background: 'linear-gradient(45deg, #0984e3, #00b894)' },
                            padding: '10px 20px',
                          }}
                        >
                          Vehicle Category
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button
                          variant="contained"
                          component={Link}
                          to="/master/vehicle-location"
                          sx={{
                            background: '#f50057',
                            color: 'white',
                            borderRadius: '20px',
                            marginLeft: '15px',
                            '&:hover': { background: 'linear-gradient(45deg, #e17055, #fdcb6e)' },
                            padding: '10px 20px',
                          }}
                        >
                          Vehicle Location
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button
                          variant="contained"
                          onClick={() => handleOpen()}
                          sx={{
                            background: '#4caf50',
                            color: 'white',
                            borderRadius: '20px',
                            marginLeft: '15px',
                            '&:hover': { background: '#388e3c' },
                            padding: '10px 20px',
                          }}
                        >
                          <Add /> Add
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
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
                          checked={selectedUnits.length === initialBusinessUnits.length}
                          onChange={() => {
                            if (selectedUnits.length === initialBusinessUnits.length) {
                              setSelectedUnits([]);
                            } else {
                              setSelectedUnits(initialBusinessUnits.map(unit => unit.name));
                            }
                          }}
                        />
                      </TableCell>
                      <TableCell>Business Unit</TableCell>
                      <TableCell align="right">Vehicle Count</TableCell>
                      <TableCell align="right">Vehicle Types</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {initialBusinessUnits
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((unit, index) => (
                        <TableRow key={index}>
                          <TableCell padding="checkbox">
                            <input
                              type="checkbox"
                              checked={selectedUnits.includes(unit.name)}
                              onChange={() => handleSelectUnit(unit.name)}
                            />
                          </TableCell>
                          <TableCell>{unit.name}</TableCell>
                          <TableCell align="right">{unit.vehicleCount}</TableCell>
                          <TableCell align="right">{unit.vehicles.join(', ')}</TableCell>
                          <TableCell align="right">
                            <IconButton color="primary" onClick={() => handleOpen(unit)}>
                              <Edit color="primary" />
                            </IconButton>
                            <IconButton
                              color="secondary"
                              onClick={() => {
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
                                    // Handle the deletion logic here
                                    Swal.fire('Deleted!', 'Vehicle has been deleted.', 'success');
                                  }
                                });
                              }}
                            >
                              <Delete sx={{ color: '#f44336' }} />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                <Box>
                  {selectedUnits.length > 0 && (
                    <Button
                      variant="contained"
                      color="error"
                      onClick={handleBatchDelete}
                      style={{ marginBottom: '10px' }}
                    >
                      Delete Selected
                    </Button>
                  )}
                </Box>
                <Box>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={initialBusinessUnits.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleRowsPerPageChange}
                  />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Modal for Add/Edit */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editMode ? 'Edit Vehicle' : 'Add Vehicle'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {editMode ? 'Edit the details of the vehicle.' : 'Enter the details of the new vehicle.'}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Business Unit"
            type="text"
            fullWidth
            variant="outlined"
            value={currentUnit.name}
            onChange={(e) => setCurrentUnit({ ...currentUnit, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Vehicle Count"
            type="number"
            fullWidth
            variant="outlined"
            value={currentUnit.vehicleCount}
            onChange={(e) => setCurrentUnit({ ...currentUnit, vehicleCount: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Vehicle Types (comma separated)"
            type="text"
            fullWidth
            variant="outlined"
            value={currentUnit.vehicles.join(', ')}
            onChange={(e) => setCurrentUnit({ ...currentUnit, vehicles: e.target.value.split(',').map(v => v.trim()) })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            {editMode ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default VehiclePage;
