import React, { useState, useEffect } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Grid,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Box,
  TablePagination,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import Swal from 'sweetalert2';
import axios from 'axios';
import { gridSpacing } from 'config.js';

const BisnisPage = () => {
  const [Bisnis, setBisnis] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBisnis, setSelectedBisnis] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  
  // State for dialog
  const [openDialog, setOpenDialog] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentBusiness, setCurrentBusiness] = useState({ id: '', name: '' });

  // Fetch Bisnis on component mount
  useEffect(() => {
    fetchBisnis();
  }, []);

  const fetchBisnis = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('https://3wzg6m6x-5000.asse.devtunnels.ms/api/bu_master', {
        headers: {
          Authorization: token,
        },
      });
      setBisnis(response.data);
    } catch (error) {
      console.error('Error fetching Bisnis:', error);
    }
  };

  const filteredBisnis = Bisnis.filter((Business) =>
    Business.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectBusiness = (id) => {
    setSelectedBisnis((prev) =>
      prev.includes(id) ? prev.filter((BusinessId) => BusinessId !== id) : [...prev, id]
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
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const token = localStorage.getItem('token');
          await Promise.all(
            selectedBisnis.map((id) =>
              axios.delete(`https://3wzg6m6x-5000.asse.devtunnels.ms/api/bu_master/delete/${id}`, {
                headers: {
                  Authorization: token,
                },
              })
            )
          );
          fetchBisnis();
          setSelectedBisnis([]);
          Swal.fire('Deleted!', 'Selected Bisnis have been deleted.', 'success');
        } catch (error) {
          console.error('Error deleting Bisnis:', error);
          Swal.fire('Error!', 'There was an error deleting the Bisnis.', 'error');
        }
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

  const handleOpenDialog = (Business = null) => {
    setIsEditMode(!!Business);
    setCurrentBusiness(Business ? { id: Business.id, name: Business.name } : { id: '', name: '' });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSaveBusiness = async () => {
    const token = localStorage.getItem('token');
    try {
      if (isEditMode) {
        await axios.put('https://3wzg6m6x-5000.asse.devtunnels.ms/api/bu_master/edit', {
          id: currentBusiness.id,
          name: currentBusiness.name,
        }, {
          headers: {
            Authorization: token,
          },
        });
        Swal.fire('Success', 'Business updated successfully', 'success');
      } else {
        await axios.post('https://3wzg6m6x-5000.asse.devtunnels.ms/api/bu_master/add', {
          id: currentBusiness.id,
          name: currentBusiness.name,
        }, {
          headers: {
            Authorization: token,
          },
        });
        Swal.fire('Success', 'Business added successfully', 'success');
      }
      fetchBisnis();
      handleCloseDialog();
    } catch (error) {
      console.error('Error saving Business:', error);
      Swal.fire('Error!', 'There was an error saving the Business.', 'error');
    }
  };

  const handleDeleteBusiness = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const token = localStorage.getItem('token');
        try {
          await axios.delete(`https://3wzg6m6x-5000.asse.devtunnels.ms/api/bu_master/delete/${id}`, {
            headers: {
              Authorization: token,
            },
          });
          fetchBisnis();
          Swal.fire('Deleted!', 'Business has been deleted.', 'success');
        } catch (error) {
          console.error('Error deleting Business:', error);
          Swal.fire('Error!', 'There was an error deleting the Business.', 'error');
        }
      }
    });
  };

  return (
    <Grid container spacing={1}> {/* Reduced spacing */}
      <Grid item xs={12}>
        <Card style={{ borderRadius: '8px' }}>
          <CardHeader
            title={<h1 style={{ color: '#2d3436', fontFamily: 'Poppins', fontSize: '16px' }}>Business Unit Management</h1>} // Reduced font size
            action={
              <Box display="flex" alignItems="center">
                <TextField
                  variant="outlined"
                  size="small"
                  placeholder="Search Business Name"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ width: '200px', marginRight: 10 }} 
                />
                <Button variant="contained" onClick={() => handleOpenDialog()}>
                  Add
                </Button>
              </Box>
            }
          />
          <CardContent>
            <TableContainer sx={{ overflow: 'visible' }}>
              <Table size="small"> 
                <TableHead>
                  <TableRow sx={{ background: '#dfe6e9' }}>
                    <TableCell padding="checkbox">
                      <input
                        type="checkbox"
                        onChange={() => {
                          if (selectedBisnis.length === filteredBisnis.length) {
                            setSelectedBisnis([]);
                          } else {
                            setSelectedBisnis(filteredBisnis.map(Business => Business.id));
                          }
                        }}
                        checked={selectedBisnis.length === filteredBisnis.length}
                      />
                    </TableCell>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredBisnis
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((Business) => (
                      <TableRow key={Business.id}>
                        <TableCell padding="checkbox">
                          <input
                            type="checkbox"
                            checked={selectedBisnis.includes(Business.id)}
                            onChange={() => handleSelectBusiness(Business.id)}
                          />
                        </TableCell>
                        <TableCell>{Business.id}</TableCell>
                        <TableCell>{Business.name}</TableCell>
                        <TableCell align="right">
                          <IconButton onClick={() => handleOpenDialog(Business)}>
                            <Edit color="primary" />
                          </IconButton>
                          <IconButton onClick={() => handleDeleteBusiness(Business.id)}>
                            <Delete sx={{ color: '#f44336' }} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={filteredBisnis.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
            />
            <Button
              variant="outlined"
              color="error"
              onClick={handleBatchDelete}
              disabled={selectedBisnis.length === 0}
            >
              Delete Selected
            </Button>
          </CardContent>
        </Card>
      </Grid>
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{isEditMode ? 'Edit Business Unit' : 'Add Business Unit'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="ID"
            type="text"
            fullWidth
            variant="outlined"
            value={currentBusiness.id}
            onChange={(e) => setCurrentBusiness({ ...currentBusiness, id: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            variant="outlined"
            value={currentBusiness.name}
            onChange={(e) => setCurrentBusiness({ ...currentBusiness, name: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveBusiness} color="primary">
            {isEditMode ? 'Update' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default BisnisPage;
