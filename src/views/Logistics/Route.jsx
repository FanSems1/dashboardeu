import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Grid,
  TextField,
  Select,
  MenuItem,
  Button,
  IconButton,
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

const routeData = [
  { id: 1, name: 'Route 1', start: 'Location A', end: 'Location B', distance: '10 km' },
  { id: 2, name: 'Route 2', start: 'Location C', end: 'Location D', distance: '20 km' },
  // Add more routes as needed
];

const RoutePage = () => {
  const [routes, setRoutes] = useState(routeData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRoutes, setSelectedRoutes] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDialog, setOpenDialog] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentRoute, setCurrentRoute] = useState({ name: '', start: '', end: '', distance: '' });

  const filteredRoutes = routes.filter(route =>
    route.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectRoute = (id) => {
    setSelectedRoutes((prev) =>
      prev.includes(id) ? prev.filter((routeId) => routeId !== id) : [...prev, id]
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
        setRoutes(routes.filter((route) => !selectedRoutes.includes(route.id)));
        setSelectedRoutes([]);
        Swal.fire('Deleted!', 'Selected routes have been deleted.', 'success');
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

  const handleOpenDialog = (route = null) => {
    setIsEditMode(!!route);
    setCurrentRoute(route ? { name: route.name, start: route.start, end: route.end, distance: route.distance } : { name: '', start: '', end: '', distance: '' });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSaveRoute = () => {
    if (isEditMode) {
      const updatedRoutes = routes.map((r) =>
        r.id === selectedRoutes[0] ? { ...r, name: currentRoute.name, start: currentRoute.start, end: currentRoute.end, distance: currentRoute.distance } : r
      );
      setRoutes(updatedRoutes);
      Swal.fire('Success', 'Route updated successfully', 'success');
    } else {
      const newRoute = {
        id: routes.length + 1,
        name: currentRoute.name,
        start: currentRoute.start,
        end: currentRoute.end,
        distance: currentRoute.distance,
      };
      setRoutes((prev) => [...prev, newRoute]);
      Swal.fire('Success', 'Route added successfully', 'success');
    }
    handleCloseDialog();
  };

  const handleDeleteRoute = (id) => {
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
        setRoutes(routes.filter((route) => route.id !== id));
        Swal.fire('Deleted!', 'Route has been deleted.', 'success');
      }
    });
  };

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Card style={{ borderRadius: '8px', boxShadow: '0px 4px 6px rgba(0,0,0,0.2)' }}>
          <CardHeader
            title={<h1 style={{ color: '#2d3436', fontFamily: 'Poppins', fontSize: '20px' }}>Route Management</h1>}
            action={
              <Box display="flex" alignItems="center">
                <TextField
                  variant="outlined"
                  size="small"
                  placeholder="Search Route Name"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ width: '250px', marginRight: 4 }}
                />
                <Button variant="contained" onClick={() => handleOpenDialog()}>
                  Add Route
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
                          if (selectedRoutes.length === filteredRoutes.length) {
                            setSelectedRoutes([]);
                          } else {
                            setSelectedRoutes(filteredRoutes.map(route => route.id));
                          }
                        }}
                        checked={selectedRoutes.length === filteredRoutes.length}
                      />
                    </TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Start</TableCell>
                    <TableCell>End</TableCell>
                    <TableCell>Distance</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredRoutes
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((route) => (
                      <TableRow key={route.id}>
                        <TableCell padding="checkbox">
                          <input
                            type="checkbox"
                            checked={selectedRoutes.includes(route.id)}
                            onChange={() => handleSelectRoute(route.id)}
                          />
                        </TableCell>
                        <TableCell>{route.name}</TableCell>
                        <TableCell>{route.start}</TableCell>
                        <TableCell>{route.end}</TableCell>
                        <TableCell>{route.distance}</TableCell>
                        <TableCell align="right">
                          <IconButton onClick={() => handleOpenDialog(route)}>
                            <Edit color="primary" />
                          </IconButton>
                          <IconButton onClick={() => handleDeleteRoute(route.id)}>
                            <Delete sx={{ color: '#f44336' }} />
                          </IconButton>
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
                disabled={selectedRoutes.length === 0}
                style={{ marginRight: '16px' }}
              >
                Delete Selected
              </Button>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={filteredRoutes.length}
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
        <DialogTitle>{isEditMode ? 'Edit Route' : 'Add Route'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Route Name"
            type="text"
            fullWidth
            variant="outlined"
            value={currentRoute.name}
            onChange={(e) => setCurrentRoute({ ...currentRoute, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Start Location"
            type="text"
            fullWidth
            variant="outlined"
            value={currentRoute.start}
            onChange={(e) => setCurrentRoute({ ...currentRoute, start: e.target.value })}
          />
          <TextField
            margin="dense"
            label="End Location"
            type="text"
            fullWidth
            variant="outlined"
            value={currentRoute.end}
            onChange={(e) => setCurrentRoute({ ...currentRoute, end: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Distance"
            type="text"
            fullWidth
            variant="outlined"
            value={currentRoute.distance}
            onChange={(e) => setCurrentRoute({ ...currentRoute, distance: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveRoute} color="primary">
            {isEditMode ? 'Save Changes' : 'Add Route'}
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default RoutePage;
