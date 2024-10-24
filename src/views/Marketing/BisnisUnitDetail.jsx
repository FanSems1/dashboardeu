import React, { useState, useEffect } from 'react';
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Button,
  IconButton,
  Typography,
  Modal,
  Box,
  Alert,
  Select,
  MenuItem,
  TextField,
  Divider,
  Fade,
  Snackbar,
  InputLabel,
  FormControl,
} from '@mui/material';
import Swal from 'sweetalert2';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import Pagination from '@mui/material/Pagination';
import axios from 'axios';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%', 
  maxHeight: '80vh', 
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  overflowY: 'auto', 
};

const BisnisUnitPage = () => {
  const [posts, setPosts] = useState([]);
  const [buMasters, setBuMasters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newPostData, setNewPostData] = useState({
    title_banner: '',
    id_bu_master: '',
    description_banner: '',
    logo_banner: null,
    images_banner: [],
    title_app: '',
    description_app: '',
    images_app: [],
    title_sec: '',
    description_sec: '',
    images_sec: [],
    title_prod_1: '',
    description_1: '',
    images_1: [],
    title_prod_2: '',
    description_2: '',
    images_2: [],
    title_prod_3: '',
    description_3: '',
    images_3: [],
    title_prod_4: '',
    description_4: '',
    images_4: [],
    gallery: [],
  });
  const [editingPost, setEditingPost] = useState(null);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('error');


  // Handle Open and Close Modals
  const handleOpenAddModal = () => setIsAddModalOpen(true);
  const handleCloseAddModal = () => setIsAddModalOpen(false);
  const handleOpenEditModal = (post) => {
    setEditingPost(post);
    setIsEditModalOpen(true);
  };
  const handleCloseEditModal = () => setIsEditModalOpen(false);

  // Fetch posts and business units from the API
  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('https://3wzg6m6x-5000.asse.devtunnels.ms/api/bu_detail', {
        headers: {
          Authorization: `${token}`
        }
      });
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setNotificationMessage('Error fetching posts: ' + error.message);
      setNotificationOpen(true);
    }
  };
  
  const fetchBuMasters = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('https://3wzg6m6x-5000.asse.devtunnels.ms/api/bu_master', {
        headers: {
          Authorization: `${token}`
        }
      });
      console.log('Fetched BU Masters:', response.data); 
      setBuMasters(response.data);
    } catch (error) {
      console.error("Error fetching BU Masters:", error);
      setNotificationMessage('Error fetching BU Masters: ' + error.message);
      setNotificationOpen(true);
    }
  };
  
  useEffect(() => {
    fetchPosts();
    fetchBuMasters();
  }, []);

  // Handle pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Add Post Function
  const handleAddPost = async () => {
    const formData = new FormData();
    formData.append('title_banner', newPostData.title_banner);
    formData.append('id_bu_master', newPostData.id_bu_master);
    formData.append('description_banner', newPostData.description_banner);
    if (newPostData.logo_banner) {
      formData.append('logo_banner', newPostData.logo_banner);
    }
    newPostData.images_banner.forEach((image) => {
      formData.append('images_banner', image);
    });
    formData.append('title_app', newPostData.title_app);
    formData.append('description_app', newPostData.description_app);
    newPostData.images_app.forEach((image) => {
      formData.append('images_app', image);
    });
    formData.append('title_sec', newPostData.title_sec);
    formData.append('description_sec', newPostData.description_sec);
    newPostData.images_sec.forEach((image) => {
      formData.append('images_sec', image);
    });
    for (let i = 1; i <= 4; i++) {
      formData.append(`title_prod_${i}`, newPostData[`title_prod_${i}`]);
      formData.append(`description_${i}`, newPostData[`description_${i}`]);
      newPostData[`images_${i}`].forEach((image) => {
        formData.append(`images_${i}`, image);
      });
    }
    newPostData.gallery.forEach((image) => {
      formData.append('gallery', image);
    });
  
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post('https://3wzg6m6x-5000.asse.devtunnels.ms/api/bu_detail/add', formData, {
        headers: {
          Authorization: `${token}`,
        },
      });
  
      if (!response.data) {
        throw new Error('Failed to add post');
      }
  
      // Close modal immediately before showing SweetAlert
      handleCloseAddModal();
  
      // Show SweetAlert after a brief delay
      setTimeout(() => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Post successfully added!',
        });
        fetchPosts(); // Refresh posts
        // Reset form data
        setNewPostData({
          title_banner: '',
          id_bu_master: '',
          description_banner: '',
          logo_banner: null,
          images_banner: [],
          title_app: '',
          description_app: '',
          images_app: [],
          title_sec: '',
          description_sec: '',
          images_sec: [],
          title_prod_1: '',
          description_1: '',
          images_1: [],
          title_prod_2: '',
          description_2: '',
          images_2: [],
          title_prod_3: '',
          description_3: '',
          images_3: [],
          title_prod_4: '',
          description_4: '',
          images_4: [],
          gallery: [],
        });
      }, 100); // Adjust the delay if necessary
  
    } catch (error) {
      console.error('Error adding post:', error);
      
      // Set error message for Snackbar
      setSnackbarMessage('Failed to add Bisnis Unit / ' + (error.response?.data?.message || 'An unexpected error occurred.'));
      setSnackbarSeverity('error');
      setSnackbarOpen(true); // Open Snackbar
    }
  };
  
  // Edit  Post Function
  const handleEditPost = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token not found");
      }
  
      const formData = new FormData();
      formData.append('id', editingPost.id);
      formData.append('title_banner', editingPost.title_banner);
      formData.append('id_bu_master', editingPost.id_bu_master);
      formData.append('description_banner', editingPost.description_banner);
      if (editingPost.logo_banner) {
        formData.append('logo_banner', editingPost.logo_banner);
      }
      editingPost.images_banner.forEach((image) => {
        formData.append('images_banner', image);
      });
  
      // Edit data for APP section
      formData.append('title_app', editingPost.title_app);
      formData.append('description_app', editingPost.description_app);
      editingPost.images_app.forEach((image) => {
        formData.append('images_app', image);
      });
  
      // Edit data for ABOUT section
      formData.append('title_sec', editingPost.title_sec);
      formData.append('description_sec', editingPost.description_sec);
      editingPost.images_sec.forEach((image) => {
        formData.append('images_sec', image);
      });
  
      // Edit data for PRODUCT section
      for (let i = 1; i <= 4; i++) {
        formData.append(`title_prod_${i}`, editingPost[`title_prod_${i}`]);
        formData.append(`description_${i}`, editingPost[`description_${i}`]);
        editingPost[`images_${i}`].forEach((image) => {
          formData.append(`images_${i}`, image);
        });
      }
  
      editingPost.gallery.forEach((image) => {
        formData.append('gallery', image);
      });
  
      // API Call
      const response = await fetch(`https://3wzg6m6x-5000.asse.devtunnels.ms/api/bu_detail/edit`, {
        method: 'PUT',
        headers: {
          Authorization: `${token}`
        },
        body: formData,
      });
  
      if (!response.ok) throw new Error('Failed to edit post');
  
      // Close modal immediately
      handleCloseEditModal(); 
  
      // Show SweetAlert success alert
      Swal.fire({
        title: 'Success!',
        text: 'Post successfully updated',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(async () => {
        await fetchPosts(); // Refresh posts after success
      });
  
    } catch (error) {
      console.error('Error:', error);
  
      // Set error message for Snackbar
      setSnackbarMessage('Failed to edit Bisnis Unit ' + (error.response?.data?.message || ''));
      setSnackbarSeverity('error');
      setSnackbarOpen(true); // Open Snackbar
    }
  };

  // Handle Delete Post
  const handleDeletePost = async (id) => {
    try {
      // Get the token from local storage
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token not found");
      }

      // Show confirmation alert
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'This will permanently delete the post!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!'
      });

      // If confirmed, proceed to delete
      if (result.isConfirmed) {
        const response = await fetch(`https://3wzg6m6x-5000.asse.devtunnels.ms/api/bu_detail/delete/${id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `${token}`,
          },
        });

        if (!response.ok) throw new Error('Failed to delete post');

        // Logic after successful deletion
        Swal.fire({
          title: 'Deleted!',
          text: 'The post has been deleted.',
          icon: 'success',
        });

        // Optionally update the posts state to remove the deleted post
        setPosts(prevPosts => prevPosts.filter(post => post.id !== id));

      } else {
        // If not confirmed, you can show a cancellation message if needed
        Swal.fire({
          title: 'Cancelled',
          text: 'The post is safe :)',
          icon: 'info',
        });
      }
    } catch (error) {
      console.error('Error:', error);
      // SweetAlert error alert
      Swal.fire({
        title: 'Error!',
        text: `Error: ${error.message}`,
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  const handleFileChange = (e, section) => {
    const files = Array.from(e.target.files);
    setNewPostData((prevData) => ({
      ...prevData,
      [section]: files,
    }));
  };

  const handleEditFileChange = (e, section) => {
    const files = Array.from(e.target.files);
    setEditingPost((prevData) => ({
      ...prevData,
      [section]: files,
    }));
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleOpenAddModal}>
          Add Business Unit
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          {currentPosts.map((post) => (
            <Grid item xs={12} sm={6} md={4} key={post.id}>
              <Card>
                <CardHeader
                  title={post.title_banner}
                  action={
                    <div>
                      <IconButton onClick={() => handleOpenEditModal(post)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDeletePost(post.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  }
                />
                <Divider />
                <CardContent>
                  <img
                    src={post.images_banner}
                    style={{ width: '100%', height: '150px', objectFit: 'cover', marginBottom: '8px' }}
                  />
                  <Typography variant="body2"><strong>Bisnis Unit:</strong> {post.bu_master.name}</Typography>
                  <Typography variant="body2">{post.description_banner}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Pagination
          count={Math.ceil(posts.length / postsPerPage)}
          page={currentPage}
          onChange={(event, value) => setCurrentPage(value)}
          variant="outlined"
          shape="rounded"
          sx={{ mt: 2 }}
        />
      </Grid>

        {/* Add Modal */}
        <Modal
  open={isAddModalOpen}
  onClose={(event, reason) => {
    // Prevent closing when clicking outside
    if (reason === 'backdropClick') return;
    handleCloseAddModal();
  }}
  closeAfterTransition
>
  <Fade in={isAddModalOpen}>
    <Box sx={{ ...modalStyle, padding: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">Add Business Unit</Typography>
        <IconButton onClick={handleCloseAddModal}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Grid container spacing={2}>
        {/* Column 1: Banner Section and Gallery Section */}
        <Grid item xs={4}>
          <Typography variant="subtitle1" mb={1}>Banner Section</Typography>
          <TextField
            label="Title Banner"
            fullWidth
            value={newPostData.title_banner || ''}
            onChange={(e) => setNewPostData({ ...newPostData, title_banner: e.target.value })}
            sx={{ mb: 2, minWidth: 200 }} 
          />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Business Unit</InputLabel>
            <Select
              value={newPostData.id_bu_master || ''}
              onChange={(e) => setNewPostData({ ...newPostData, id_bu_master: e.target.value })}
            >
              {buMasters.map((bu) => (
                <MenuItem key={bu.id} value={bu.id}>{bu.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Description Banner"
            fullWidth
            multiline
            value={newPostData.description_banner || ''}
            onChange={(e) => setNewPostData({ ...newPostData, description_banner: e.target.value })}
            sx={{ mb: 2, minWidth: 200 }} 
          />
          <Typography variant="body1">Logo Banner Upload</Typography>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setNewPostData({ ...newPostData, logo_banner: e.target.files[0] })}
            style={{ marginBottom: '16px' }} 
          />
          <Typography variant="body1">Image Banner Upload</Typography>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => handleFileChange(e, 'images_banner')}
            style={{ marginBottom: '6px' }} 
          />
          <Typography variant="subtitle1" mb={2}>Gallery Section</Typography>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => handleFileChange(e, 'gallery')}
          />
        </Grid>

        {/* Column 2: App Section and About Section */}
        <Grid item xs={4}>
          <Typography variant="subtitle1" mb={1}>App Section</Typography>
          <TextField
            label="Title App"
            fullWidth
            value={newPostData.title_app || ''}
            onChange={(e) => setNewPostData({ ...newPostData, title_app: e.target.value })}
            sx={{ mb: 2, minWidth: 200 }}
          />
          <TextField
            label="Description App"
            fullWidth
            multiline
            value={newPostData.description_app || ''}
            onChange={(e) => setNewPostData({ ...newPostData, description_app: e.target.value })}
            sx={{ mb: 2, minWidth: 200 }}
          />
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => handleFileChange(e, 'images_app')}
          />
          <Typography variant="subtitle1" mt={2} mb={1}>About Section</Typography>
          <TextField
            label="Title About"
            fullWidth
            value={newPostData.title_sec || ''}
            onChange={(e) => setNewPostData({ ...newPostData, title_sec: e.target.value })}
            sx={{ mb: 2, minWidth: 200 }} 
          />
          <TextField
            label="Description About"
            fullWidth
            multiline
            value={newPostData.description_sec || ''}
            onChange={(e) => setNewPostData({ ...newPostData, description_sec: e.target.value })}
            sx={{ mb: 2, minWidth: 200 }}
          />
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => handleFileChange(e, 'images_sec')}
            style={{ marginBottom: '16px' }}
          />
        </Grid>

        {/* Column 3: Products Section */}
        <Grid item xs={4}>
          <Typography variant="subtitle1" mb={1}>Products Section</Typography>
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index}>
              <TextField
                label={`Title Product ${index + 1}`}
                fullWidth
                value={newPostData[`title_prod_${index + 1}`] || ''}
                onChange={(e) => setNewPostData({ ...newPostData, [`title_prod_${index + 1}`]: e.target.value })}
                sx={{ mb: 2, minWidth: 200 }} 
              />
              <TextField
                label={`Description Product ${index + 1}`}
                fullWidth
                multiline
                value={newPostData[`description_${index + 1}`] || ''}
                onChange={(e) => setNewPostData({ ...newPostData, [`description_${index + 1}`]: e.target.value })}
                sx={{ mb: 2, minWidth: 200 }} 
              />
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => handleFileChange(e, `images_${index + 1}`)}
                style={{ marginBottom: '16px' }} 
              />
            </div>
          ))}
        </Grid>
      </Grid>
      <Box mt={2}>
        <Button variant="contained" color="primary" onClick={handleAddPost}>Save</Button>
        <Button variant="outlined" color="secondary" onClick={handleCloseAddModal} style={{ marginLeft: '10px' }}>
          Cancel
        </Button>
      </Box>
    </Box>
  </Fade>
        </Modal>

        {/* Edit Modal */}
        <Modal open={isEditModalOpen} onClose={() => {}} closeAfterTransition>
  <Fade in={isEditModalOpen}>
    <Box sx={{ ...modalStyle, padding: 3 }}>
      <Typography variant="h6" mb={2}>Edit Business Unit</Typography>
      <Grid container spacing={2}>
        {/* Column 1: Banner Section and Gallery Section */}
        <Grid item xs={4}>
          <Typography variant="subtitle1" mb={1}>Banner Section</Typography>
          <TextField
            label="Title Banner"
            fullWidth
            value={editingPost?.title_banner || ''}
            onChange={(e) => setEditingPost({ ...editingPost, title_banner: e.target.value })}
            sx={{ mb: 2, minWidth: 200 }} 
          />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Business Unit</InputLabel>
            <Select
              value={editingPost?.id_bu_master || ''}
              onChange={(e) => setEditingPost({ ...editingPost, id_bu_master: e.target.value })}
            >
              {buMasters.map((bu) => (
                <MenuItem key={bu.id} value={bu.id}>{bu.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Description Banner"
            fullWidth
            multiline
            value={editingPost?.description_banner || ''}
            onChange={(e) => setEditingPost({ ...editingPost, description_banner: e.target.value })}
            sx={{ mb: 2, minWidth: 200 }} 
          />
          <Typography variant="body1">Logo Banner Upload</Typography>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setEditingPost({ ...editingPost, logo_banner: e.target.files[0] })}
            style={{ marginBottom: '16px' }} 
          />
          <Typography variant="body1">Image Banner Upload</Typography>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => setEditingPost({ ...editingPost, images_banner: Array.from(e.target.files) })}
          />

          <Typography variant="subtitle1" mt={3} mb={2}>Gallery Section</Typography>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => setEditingPost({ ...editingPost, gallery: Array.from(e.target.files) })}
            style={{ marginBottom: '16px' }} 
          />
        </Grid>

        {/* Column 2: App Section and About Section */}
        <Grid item xs={4}>
          <Typography variant="subtitle1" mb={1}>App Section</Typography>
          <TextField
            label="Title App"
            fullWidth
            value={editingPost?.title_app || ''}
            onChange={(e) => setEditingPost({ ...editingPost, title_app: e.target.value })}
            sx={{ mb: 2, minWidth: 200 }} 
          />
          <TextField
            label="Description App"
            fullWidth
            multiline
            value={editingPost?.description_app || ''}
            onChange={(e) => setEditingPost({ ...editingPost, description_app: e.target.value })}
            sx={{ mb: 2, minWidth: 200 }} 
          />
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => setEditingPost({ ...editingPost, images_app: Array.from(e.target.files) })}
          />

          <Typography variant="subtitle1" mt={1} mb={2}>About Section</Typography>
          <TextField
            label="Title About"
            fullWidth
            value={editingPost?.title_sec || ''}
            onChange={(e) => setEditingPost({ ...editingPost, title_sec: e.target.value })}
            sx={{ mb: 2, minWidth: 200 }} 
          />
          <TextField
            label="Description About"
            fullWidth
            multiline
            value={editingPost?.description_sec || ''}
            onChange={(e) => setEditingPost({ ...editingPost, description_sec: e.target.value })}
            sx={{ mb: 2, minWidth: 200 }} 
          />
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => setEditingPost({ ...editingPost, images_sec: Array.from(e.target.files) })}
            style={{ marginBottom: '16px' }} 
          />
        </Grid>

        {/* Column 3: Products Section */}
        <Grid item xs={4}>
          <Typography variant="subtitle1" mb={1}>Products Section</Typography>
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index}>
              <TextField
                label={`Title Product ${index + 1}`}
                fullWidth
                value={editingPost?.[`title_prod_${index + 1}`] || ''}
                onChange={(e) => setEditingPost({ ...editingPost, [`title_prod_${index + 1}`]: e.target.value })}
                sx={{ mb: 2, minWidth: 200 }} 
              />
              <TextField
                label={`Description Product ${index + 1}`}
                fullWidth
                multiline
                value={editingPost?.[`description_${index + 1}`] || ''}
                onChange={(e) => setEditingPost({ ...editingPost, [`description_${index + 1}`]: e.target.value })}
                sx={{ mb: 2, minWidth: 200 }} 
              />
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => setEditingPost({ ...editingPost, [`images_${index + 1}`]: Array.from(e.target.files) })}
                style={{ marginBottom: '16px' }} 
              />
            </div>
          ))}
        </Grid>
      </Grid>
      <Box mt={2}>
        <Button variant="contained" color="primary" onClick={handleEditPost}>Save</Button>
        <Button variant="outlined" color="secondary" onClick={handleCloseEditModal} style={{ marginLeft: '10px' }}>
          Cancel
        </Button>
      </Box>
      <IconButton
        onClick={handleCloseEditModal}
        sx={{ position: 'absolute', top: 8, right: 8 }}
      >
        <CloseIcon />
      </IconButton>
    </Box>
  </Fade>
        </Modal>

      {/* Notification Snackbar */}
      <Snackbar
        open={notificationOpen}
        autoHideDuration={6000}
        onClose={() => setNotificationOpen(false)}
        message={notificationMessage}
        action={
          <IconButton size="small" aria-label="close" color="inherit" onClick={() => setNotificationOpen(false)}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
      {/* Snackbar for error messages */}
      <Snackbar 
        open={snackbarOpen} 
        autoHideDuration={6000} 
        onClose={() => setSnackbarOpen(false)} 
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default BisnisUnitPage;
