import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardHeader, 
  CardContent, 
  Divider, 
  Grid, 
  Typography, 
  IconButton, 
  Button, 
  Dialog, 
  FormControl,
  InputLabel,
  Alert,
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Snackbar, 
  Pagination, 
  Select, 
  TextField,
  MenuItem 
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import Swal from 'sweetalert2';

const StudyPage = () => {
  const [studies, setStudies] = useState([]);
  const [buMasters, setBuMasters] = useState([]); 
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);  
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingStudy, setEditingStudy] = useState(null);
  const [newStudyData, setNewStudyData] = useState({ title: '', bu_master: '', description: '', author: '', image: '', category: '' });
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [imagePreview, setImagePreview] = useState('');
  const [imageFile, setImageFile] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('error');
  const studiesPerPage = 6;

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchStudies();
    fetchBuMasters(); 
  }, []);

  const handleEditButtonClick = (study) => {
    setEditingStudy(study);
    setIsEditModalOpen(true);
  };  

  const truncateDescription = (description, limit = 100) => {
    if (description.length > limit) {
      return description.substring(0, limit) + '...'; 
    }
    return description;
  };

  const fetchStudies = async () => {
    try {
      const response = await axios.get('https://3wzg6m6x-5000.asse.devtunnels.ms/api/study', {
        headers: {
          Authorization: `${token}`
        }
      });
      setStudies(response.data);
    } catch (error) {
      console.error("Error fetching studies:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      }
    }
  };

  const getUserDetailsFromLocalStorage = () => {
    const data = JSON.parse(localStorage.getItem('user')); // Fetch the whole object
    console.log("Retrieved data from localStorage:", data); // Debugging line
    if (data && data.user) {
      return { id: data.user.id, username: data.user.username }; // Access the nested user object
    }
    return { id: null, username: '' };
  };

  const fetchBuMasters = async () => {
    try {
      const response = await axios.get('https://3wzg6m6x-5000.asse.devtunnels.ms/api/bu_master', {
        headers: {
          Authorization: `${token}`
        }
      });
      setBuMasters(response.data); 
    } catch (error) {
      console.error("Error fetching BU Masters:", error);
    }
  };

  const handleOpenAddModal = () => {
    const { id, username } = getUserDetailsFromLocalStorage();
    console.log("Adding post - Author ID:", id); 
    console.log("LocalStorage before retrieval:", localStorage.getItem('user'));
    setNewStudyData({ title: '', bu_master: '', description: '', author: username, image: '', category: '' });
    setImagePreview('');
    setIsAddModalOpen(true);
  };

  const handleOpenEditModal = (study) => {
    const { id, username } = getUserDetailsFromLocalStorage();
    console.log("Editing post - Author ID:", id);
    setEditingPost({ ...study, author: username }); 
    setImagePreview(study.image);
    setIsEditModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
    setNewStudyData({ title: '', bu_master: '', description: '', author: '', image: '', category: '' });
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingStudy(null);
    setImagePreview('');
  };

  const handleDeleteStudy = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`https://3wzg6m6x-5000.asse.devtunnels.ms/api/study/delete/${id}`, {
            headers: {
              Authorization: `${token}`,
            }
          });
  
          setStudies(studies.filter((study) => study.id !== id));
          Swal.fire({
            icon: 'success',
            title: 'Study deleted successfully!',
            showConfirmButton: false,
            timer: 1500
          });
        } catch (error) {
          console.error("Error deleting study:", error);
          Swal.fire({
            icon: 'error',
            title: 'Failed to delete study',
          });
        }
      }
    });
  };  

  const handleAddStudy = async () => {
    const formDatas = new FormData();
    const { id } = getUserDetailsFromLocalStorage();
    formDatas.append('author', id );
    formDatas.append('id_bu_master', newStudyData.bu_master);
    formDatas.append('description', newStudyData.description);
    formDatas.append('image', imageFile);
    formDatas.append('title', newStudyData.title);
    formDatas.append('category', newStudyData.category);
  
    try {
      const token = localStorage.getItem('token');
      await axios.post('https://3wzg6m6x-5000.asse.devtunnels.ms/api/study/add', formDatas, {
        headers: {
          Authorization: `${token}`,
        }
      });
  
      fetchStudies();
      handleCloseAddModal();
      Swal.fire({
        icon: 'success',
        title: 'Study added successfully!',
        showConfirmButton: false,
        timer: 1500
      });
    } catch (error) {
      console.error("Error adding study:", error);
  
      // Set error message for Snackbar
      setSnackbarMessage('Failed to add study: ' + (error.response?.data?.message || ''));
      setSnackbarSeverity('error');
      setSnackbarOpen(true); // Open Snackbar
    }
  };  

  const handleEditStudy = async () => {
    const formDatas = new FormData();
    const { id } = getUserDetailsFromLocalStorage();
    formDatas.append('author', id );
    formDatas.append('id_bu_master', editingStudy.bu_master); 
    formDatas.append('description', editingStudy.description);
    formDatas.append('image', imageFile);
    formDatas.append('title', editingStudy.title);
    formDatas.append('category', editingStudy.category);
    formDatas.append('id', editingStudy.id);
  
    try {
      const token = localStorage.getItem('token');
      await axios.put('https://3wzg6m6x-5000.asse.devtunnels.ms/api/study/edit', formDatas, {
        headers: {
          Authorization: `${token}`,
        }
      });
  
      fetchStudies();
      handleCloseEditModal();
      Swal.fire({
        icon: 'success',
        title: 'Study updated successfully!',
        showConfirmButton: false,
        timer: 1500
      });
    } catch (error) {
      console.error("Error editing study:", error);
  
      // Set error message for Snackbar
      setSnackbarMessage('Failed to update study: ' + (error.response?.data?.message || ''));
      setSnackbarSeverity('error');
      setSnackbarOpen(true); // Open Snackbar
    }
  };  

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        if (editingStudy) {
          setEditingStudy({ ...editingStudy, image: reader.result });
        } else {
          setNewStudyData({ ...newStudyData, image: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const indexOfLastStudy = currentPage * studiesPerPage;
  const indexOfFirstStudy = indexOfLastStudy - studiesPerPage;
  const currentStudies = studies.slice(indexOfFirstStudy, indexOfLastStudy);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleOpenAddModal}
            sx={{ mb: 2 }}
          >
            Add Study
          </Button>
          <Grid container spacing={2}>
            {currentStudies.map((study) => (
              <Grid item xs={12} sm={6} md={4} key={study.id}>
                <Card sx={{ height: '100%' }}>
                  <CardHeader
                    title={<Typography variant="h6">{study.title}</Typography>}
                    subheader={<Typography variant="body2" color="textSecondary">{`By ${study.user.username}`}</Typography>}
                    action={
                      <div>
                        <IconButton onClick={() => handleOpenEditModal(study)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => handleDeleteStudy(study.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </div>
                    }
                  />
                  <Divider />
                  <CardContent>
                    <img 
                      src={study.image} 
                      alt={study.title} 
                      style={{ 
                        width: '100%', 
                        height: '150px',
                        objectFit: 'cover'
                      }} 
                    />
                    <Typography variant="body2"><strong>Business Unit:</strong> {study.bu_master.name}</Typography>
                    <Typography variant="body2"><strong>Category:</strong> {study.category}</Typography>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                    {truncateDescription(study.description, 100)} 
                  </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Pagination
            count={Math.ceil(studies.length / studiesPerPage)}
            page={currentPage}
            onChange={(event, value) => setCurrentPage(value)}
            variant="outlined"
            shape="rounded"
            sx={{ mt: 2 }}
          />
        </Grid>
      </Grid>

      {/* Add Study Dialog */}
      <Dialog
  open={isAddModalOpen}
  onClose={(event, reason) => {
    // Prevent closing when clicking outside
    if (reason === 'backdropClick') return;
    handleCloseAddModal();
  }}
>
  <DialogTitle sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    Add New Study
    <IconButton onClick={handleCloseAddModal}>
      <CloseIcon />
    </IconButton>
  </DialogTitle>
  <DialogContent>
    <TextField
      label="Title"
      fullWidth
      variant="outlined"
      value={newStudyData.title}
      onChange={(e) => setNewStudyData({ ...newStudyData, title: e.target.value })}
      sx={{ mb: 2 }}
    />
    <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
      <InputLabel>Business Unit</InputLabel>
      <Select
        value={newStudyData.id_bu_master}
        onChange={(e) => setNewStudyData({ ...newStudyData, bu_master: e.target.value })}
        label="Business Unit"
      >
        {buMasters.map((bu) => (
          <MenuItem key={bu.id} value={bu.id}>{bu.name}</MenuItem>
        ))}
      </Select>
    </FormControl>
    <TextField
      label="Description"
      fullWidth
      variant="outlined"
      multiline
      rows={4}
      value={newStudyData.description}
      onChange={(e) => setNewStudyData({ ...newStudyData, description: e.target.value })}
      sx={{ mb: 2 }}
    />
    <TextField
      label="Author"
      variant="outlined"
      fullWidth
      margin="normal"
      value={newStudyData.author}
      InputProps={{
        readOnly: true,
      }}
    />
    <TextField
      label="Category"
      fullWidth
      variant="outlined"
      value={newStudyData.category}
      onChange={(e) => setNewStudyData({ ...newStudyData, category: e.target.value })}
      sx={{ mb: 2 }}
    />
    <input type="file" onChange={handleImageChange} />
    {imagePreview && (
      <img src={imagePreview} alt="Preview" style={{ width: '100%', marginTop: '10px' }} />
    )}
  </DialogContent>
  <DialogActions>
    <Button onClick={handleCloseAddModal}>Cancel</Button>
    <Button onClick={handleAddStudy} variant="contained" color="primary">Add Study</Button>
  </DialogActions>
      </Dialog>

      {/* Edit Study Dialog */}
      <Dialog
  open={isEditModalOpen}
  onClose={(event, reason) => {
    // Prevent closing when clicking outside
    if (reason === 'backdropClick') return;
    handleCloseEditModal();
  }}
>
  <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    Edit Study
    <IconButton onClick={handleCloseEditModal}>
      <CloseIcon />
    </IconButton>
  </DialogTitle>
  <DialogContent>
    <TextField
      label="Title"
      margin="normal"
      fullWidth
      variant="outlined"
      value={editingStudy?.title || ''}
      onChange={(e) => setEditingStudy({ ...editingStudy, title: e.target.value })}
    />
    <TextField
      label="Author"
      variant="outlined"
      fullWidth
      margin="normal"
      value={editingStudy?.author || ''}
      InputProps={{
        readOnly: true,
      }}
      sx={{
        fontWeight: 'bold',
        mb: 2,
      }}
    />
    <TextField
      label="Category"
      fullWidth
      variant="outlined"
      value={editingStudy?.category || ''}
      onChange={(e) => setEditingStudy({ ...editingStudy, category: e.target.value })}
      sx={{ mb: 2 }}
    />
    <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
      <InputLabel>Business Unit</InputLabel>
      <Select
        value={editingStudy?.id_bu_master || ''}
        variant="outlined"
        onChange={(e) => setEditingStudy({ ...editingStudy, bu_master: e.target.value })}
        label="Business Unit"
      >
        {buMasters.map((bu) => (
          <MenuItem key={bu.id} value={bu.id}>{bu.name}</MenuItem>
        ))}
      </Select>
    </FormControl>
    <TextField
      label="Description"
      fullWidth
      variant="outlined"
      multiline
      rows={4}
      value={editingStudy?.description || ''}
      onChange={(e) => setEditingStudy({ ...editingStudy, description: e.target.value })}
      sx={{ mb: 2 }}
    />
    <input type="file" onChange={handleImageChange} />
    {imagePreview && (
      <img src={imagePreview} alt="Preview" style={{ width: '100%', marginTop: '10px' }} />
    )}
  </DialogContent>
  <DialogActions>
    <Button onClick={handleCloseEditModal}>Cancel</Button>
    <Button onClick={handleEditStudy} variant="contained" color="primary">Update Study</Button>
  </DialogActions>
      </Dialog>

      {/* Snackbar for Notifications */}
      <Snackbar
        open={notificationOpen}
        autoHideDuration={6000}
        onClose={() => setNotificationOpen(false)}
        message={notificationMessage}
      />

      {/* Snackbar for error messages */}
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default StudyPage;
