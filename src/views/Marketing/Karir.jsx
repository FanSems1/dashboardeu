import React, { useEffect, useState } from 'react';
import {
  Alert,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  IconButton,
  Box,
  Button,
  Checkbox,
  Snackbar,
  Modal,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Swal from 'sweetalert2';
import axios from 'axios';

// Project import
import { gridSpacing } from 'config.js';

const getToken = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Token not found");
  }
  return token;
};

const CareerPage = () => {
  const [data, setData] = useState([]);
  const [buMasters, setBuMasters] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedCareers, setSelectedCareers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [newPostData, setNewPostData] = useState({ title: '', location: '', type: '', deadline: '', bu_master: '' });
  const [editMode, setEditMode] = useState(false);
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('error');

  // Fetch data from APIs
  const fetchData = async () => {
    const token = getToken();
    try {
      const response = await axios.get('https://3wzg6m6x-5000.asse.devtunnels.ms/api/career', {
        headers: { Authorization: `${token}` },
      });
      setData(response.data);
    } catch (error) {
      console.error('Error fetching career data:', error);
    }
  };

  const fetchBuMasters = async () => {
    const token = getToken();
    try {
      const response = await axios.get('https://3wzg6m6x-5000.asse.devtunnels.ms/api/bu_master', {
        headers: { Authorization: `${token}` },
      });
      setBuMasters(response.data);
    } catch (error) {
      console.error('Error fetching business units:', error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchBuMasters();
  }, []);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const openModal = (career) => {
    setEditMode(!!career);
    setSelectedCareer(career);
    setNewPostData({
      title: career?.title || '',
      location: career?.location || '',
      type: career?.type || '',
      deadline: career?.deadline || new Date().toISOString().slice(0, 16),
      bu_master: career?.bu_master || '',
    });
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedCareer(null);
    setNewPostData({ title: '', location: '', type: '', deadline: '', bu_master: '' });
  };

  const handleAddEditCareer = async () => {
    const token = getToken();
    const payload = { ...newPostData, id_bu_master: newPostData.bu_master };
    delete payload.bu_master;
  
    try {
      if (editMode) {
        await axios.put(`https://3wzg6m6x-5000.asse.devtunnels.ms/api/career/edit`, { ...payload, id: selectedCareer.id }, {
          headers: { Authorization: `${token}` },
        });
        Swal.fire({
          icon: 'success',
          title: 'Career updated successfully!',
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        await axios.post('https://3wzg6m6x-5000.asse.devtunnels.ms/api/career/add', payload, {
          headers: { Authorization: `${token}` },
        });
        Swal.fire({
          icon: 'success',
          title: 'Career added successfully!',
          showConfirmButton: false,
          timer: 1500,
        });
      }
  
      await fetchData();
      await fetchBuMasters();
      handleCloseModal();
    } catch (error) {
      console.error('Error adding/updating career:', error);
  
      // Set error message for Snackbar
      setSnackbarMessage('Unable to add/update career. Please try again.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true); // Open Snackbar
    }
  };

  const handleDeleteClick = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteCareer(id);
      }
    });
  };

  const handleDeleteCareer = async (id) => {
    const token = getToken();
    try {
      await axios.delete(`https://3wzg6m6x-5000.asse.devtunnels.ms/api/career/delete/${id}`, {
        headers: { Authorization: `${token}` },
      });
      setData(data.filter(career => career.id !== id));
      Swal.fire({
        icon: 'success',
        title: 'Career deleted successfully!',
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error('Error deleting career:', error);
    }
  };

  const filteredData = data.filter(career =>
    career.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <Card sx={{ borderRadius: '12px', boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.1)' }}>
            <CardHeader
              title={
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Typography variant="h5" style={{ color: '#2d3436', fontFamily: 'Poppins' }}>
                    Career Management
                  </Typography>
                  <Box>
                    <TextField
                      placeholder="Search..."
                      variant="outlined"
                      size="small"
                      value={searchText}
                      onChange={handleSearchChange}
                      sx={{ marginRight: 2, borderRadius: '8px', backgroundColor: '#f5f5f5' }}
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<AddIcon />}
                      onClick={() => openModal(null)}
                    >
                      Add Career
                    </Button>
                  </Box>
                </Box>
              }
            />
            <Divider />
            <CardContent>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedCareers.length === filteredData.length}
                          onChange={(e) => {
                            setSelectedCareers(e.target.checked ? filteredData.map(career => career.id) : []);
                          }}
                        />
                      </TableCell>
                      <TableCell>Title</TableCell>
                      <TableCell>Location</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell>Deadline</TableCell>
                      <TableCell>Business Unit</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((career) => (
                      <TableRow key={career.id}>
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={selectedCareers.includes(career.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedCareers([...selectedCareers, career.id]);
                              } else {
                                setSelectedCareers(selectedCareers.filter((id) => id !== career.id));
                              }
                            }}
                          />
                        </TableCell>
                        <TableCell>{career.title}</TableCell>
                        <TableCell>{career.location}</TableCell>
                        <TableCell>{career.type}</TableCell>
                        <TableCell>{new Date(career.deadline).toLocaleDateString()}</TableCell>
                        <TableCell>{career.bu_master.name}</TableCell>
                        <TableCell>
                          <IconButton onClick={() => openModal(career)}>
                            <EditIcon />
                          </IconButton>
                          <IconButton onClick={() => handleDeleteClick(career.id)}>
                            <DeleteIcon />
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
                count={filteredData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Modal for adding/editing career */}
      <Modal open={modalOpen} onClose={() => {}} closeAfterTransition>
  <Box sx={{
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: '8px',
    boxShadow: 24,
    p: 4,
  }}>
    <Typography variant="h6" component="h2" gutterBottom>
      {editMode ? 'Edit Career' : 'Add Career'}
    </Typography>
    <TextField
      label="Title"
      value={newPostData.title}
      onChange={(e) => setNewPostData({ ...newPostData, title: e.target.value })}
      fullWidth
      margin="normal"
    />
    <TextField
      label="Location"
      value={newPostData.location}
      onChange={(e) => setNewPostData({ ...newPostData, location: e.target.value })}
      fullWidth
      margin="normal"
    />
    <FormControl fullWidth margin="normal">
      <InputLabel id="type-label">Type</InputLabel>
      <Select
        labelId="type-label"
        value={newPostData.type}
        onChange={(e) => setNewPostData({ ...newPostData, type: e.target.value })}
      >
        <MenuItem value="Part Time">Part Time</MenuItem>
        <MenuItem value="Full Time">Full Time</MenuItem>
      </Select>
    </FormControl>
    <TextField
      label="Deadline"
      type="date"
      value={newPostData.deadline.split('T')[0]}
      onChange={(e) => setNewPostData({ ...newPostData, deadline: e.target.value })}
      fullWidth
      margin="normal"
    />
    <FormControl fullWidth margin="normal">
    <InputLabel id="bu-master-label">Business Unit</InputLabel>
      <Select
        labelId="bu-master-label"
        value={newPostData.bu_master}
        onChange={(e) => setNewPostData({ ...newPostData, bu_master: e.target.value })}
      >
        {buMasters.map((bu) => (
          <MenuItem key={bu.id} value={bu.id}>{bu.name}</MenuItem>
        ))}
      </Select>
    </FormControl>
    <Box mt={2}>
      <Button variant="contained" color="primary" onClick={handleAddEditCareer} fullWidth>
        {editMode ? 'Update Career' : 'Add Career'}
      </Button>
      <Button variant="outlined" color="secondary" onClick={handleCloseModal} style={{ marginTop: '10px' }}>
        Cancel
      </Button>
    </Box>
    <IconButton
      onClick={handleCloseModal}
      sx={{ position: 'absolute', top: 8, right: 8 }}
    >
      <CloseIcon />
    </IconButton>
  </Box>
      </Modal>

      {/* Snackbar for error messages */}
    <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
      <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
        {snackbarMessage}
      </Alert>
    </Snackbar>
    </>
  );
};

export default CareerPage;
