import React, { useState, useEffect } from 'react';
import { 
  Alert,
  Card, 
  CardHeader, 
  CardContent, 
  Box ,
  Divider, 
  Grid, 
  Typography, 
  IconButton, 
  Button, 
  Modal, 
  Fade, 
  TextField, 
  InputLabel,
  FormControl,
  Snackbar, 
  Pagination, 
  Select, 
  MenuItem 
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import Swal from 'sweetalert2';

const UploadButton = styled('label')({
  display: 'inline-block',
  padding: '10px 20px',
  backgroundColor: '#3f51b5',
  color: '#fff',
  borderRadius: '4px',
  cursor: 'pointer',
  textAlign: 'center',
  marginTop: 16,
});

const ModalContent = styled(CardContent)({
  maxHeight: '450px',
  maxWidth: '700px',
  overflowY: 'auto',
});

const BlogPostPage = () => {
  const [posts, setPosts] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);  
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newPostData, setNewPostData] = useState({ title: '', bu_master: '', description: '', category: '', author: '', image: '' });
  const [editingPost, setEditingPost] = useState({ title: '', bu_master: '', description: '', category: '', author: '', image: '' });
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('error');
  const [currentPage, setCurrentPage] = useState(1);
  const [imagePreview, setImagePreview] = useState('');
  const [imageFile, setImageFile] = useState('');
  const [buMasters, setBuMasters] = useState([]); 
  const postsPerPage = 6;

  useEffect(() => {
    fetchPosts();
    fetchBuMasters();
  }, []);

  const truncateDescription = (description, limit = 100) => {
    if (description.length > limit) {
      return description.substring(0, limit) + '...'; // Tambahkan '...' di akhir
    }
    return description;
  };

  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('https://3wzg6m6x-5000.asse.devtunnels.ms/api/blog', {
        headers: {
          Authorization: `${token}`
        }
      });
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
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
      setBuMasters(response.data); 
    } catch (error) {
      console.error("Error fetching BU Masters:", error);
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

  const handleOpenAddModal = () => {
    const { id, username } = getUserDetailsFromLocalStorage(); // Get username and id from local storage
    console.log("LocalStorage before retrieval:", localStorage.getItem('user'));
    console.log("Adding post - Author ID:", id); 
    setNewPostData({ title: '', bu_master: '', description: '', category: '', author: username, image: '' });
    setImagePreview('');
    setIsAddModalOpen(true);
  };

  const handleOpenEditModal = (post) => {
    const { id, username } = getUserDetailsFromLocalStorage();
    console.log("Editing post - Author ID:", id);
    setEditingPost({ ...post, author: username }); 
    setImagePreview(post.image);
    setIsEditModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
    setNewPostData({ title: '', bu_master: '', description: '', author: '', image: '' });
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setImagePreview('');
  };

  const handleDeletePost = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you really want to delete this blog post?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const token = localStorage.getItem('token');
          await axios.delete(`https://3wzg6m6x-5000.asse.devtunnels.ms/api/blog/delete/${id}`, {
            headers: {
              Authorization: `${token}`,
            }
          });
          setPosts(posts.filter((post) => post.id !== id));
  
          // SweetAlert for success message
          Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            text: 'Blog post deleted successfully!',
          });
        } catch (error) {
          console.error("Error deleting post:", error);
  
          // Set error message for Snackbar
    setSnackbarMessage('Failed to add blog post: ' + (error.response?.data?.message || ''));
    setSnackbarSeverity('error');
    setSnackbarOpen(true); // Open Snackbar
  }
      }
    });
  };
  

  const handleAddPost = async () => {
    const formDatas = new FormData();
    const { id } = getUserDetailsFromLocalStorage();
    formDatas.append('author', id );
    formDatas.append('id_bu_master', newPostData.bu_master);
    formDatas.append('description', newPostData.description);
    formDatas.append('category', newPostData.category);
    formDatas.append('image', imageFile);
    formDatas.append('title', newPostData.title);
    formDatas.append('editor', newPostData.editor);
    
    try {
      const token = localStorage.getItem('token');
      await axios.post('https://3wzg6m6x-5000.asse.devtunnels.ms/api/blog/add', formDatas, {
        headers: {
          Authorization: `${token}`,
        }
      });
      fetchPosts();

      // SweetAlert for success message
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Blog post added successfully!',
      });

      handleCloseAddModal();
    } catch (error) {
      console.error("Error adding post:", error);

      // Set error message for Snackbar
    setSnackbarMessage('Failed to add blog post: ' + (error.response?.data?.message || ''));
    setSnackbarSeverity('error');
    setSnackbarOpen(true); // Open Snackbar
  }
  };

  const handleEditPost = async () => {
    const { id } = getUserDetailsFromLocalStorage(); 
    console.log("Editing post - Author ID:", id);
    try {
      const formDatas = new FormData();
      formDatas.append('author', id); 
      formDatas.append('id_bu_master', editingPost.bu_master); 
      formDatas.append('description', editingPost.description);
      formDatas.append('category', editingPost.category);
      formDatas.append('image', imageFile);
      formDatas.append('title', editingPost.title);
      formDatas.append('id', editingPost.id); 
      formDatas.append('editor', editingPost.editor); 
  
      const token = localStorage.getItem('token');
      await axios.put('https://3wzg6m6x-5000.asse.devtunnels.ms/api/blog/edit', formDatas, {
        headers: {
          Authorization: `${token}`,
        },
      });
  
      // Update state posts langsung tanpa fetch ulang seluruh data
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === editingPost.id
            ? { ...post, ...editingPost, image: imageFile ? URL.createObjectURL(imageFile) : post.image }
            : post
        )
      );
  
      // SweetAlert untuk pesan sukses
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Blog post updated successfully!',
      });
  
      // Tutup modal setelah update sukses
      handleCloseEditModal();
    } catch (error) {
      console.error("Error editing post:", error);
  
        // Set error message for Snackbar
        setSnackbarMessage('Failed to edit blog post: ' + (error.response?.data?.message || ''));
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
        if (editingPost) {
          setEditingPost({ ...editingPost, image: reader.result });
        } else {
          setNewPostData({ ...newPostData, image: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

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
            Add Blog Post
          </Button>
          <Grid container spacing={2}>
            {currentPosts.map((post) => (
              <Grid item xs={12} sm={6} md={4} key={post.id}>
                <Card sx={{ height: '100%' }}>
                  <CardHeader
                    title={<Typography variant="h6">{post.title}</Typography>}
                    subheader={<Typography variant="body2" color="textSecondary">{`By ${post.user.username}`}</Typography>}
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
                      src={post.image} 
                      alt={post.title} 
                      style={{ 
                        width: '100%', 
                        height: '150px',
                        objectFit: 'cover'
                      }} 
                    />
                    <Typography variant="body2"><strong>Bisnis Unit:</strong> {post.bu_master.name}</Typography>
                    <Typography variant="body2"><strong>Category:</strong> {post.category}</Typography>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                    {truncateDescription(post.description, 100)} 
                  </Typography>
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
      </Grid>

      {/* Add Modal */}
      <Modal
        open={isAddModalOpen}
        onClose={handleCloseAddModal}
        closeAfterTransition
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Fade in={isAddModalOpen}>
          <Card>
            <CardHeader title="Add Blog Post" />
            <Divider />
            <ModalContent>
              <TextField
                label="Title"
                variant="outlined"
                fullWidth
                margin="normal"
                value={newPostData.title}
                onChange={(e) => setNewPostData({ ...newPostData, title: e.target.value })}
              />
              <TextField
                label="Author"
                variant="outlined"
                fullWidth
                margin="normal"
                value={newPostData.author}
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                label="Category"
                variant="outlined"
                fullWidth
                margin="normal"
                value={newPostData.category}
                onChange={(e) => setNewPostData({ ...newPostData, category: e.target.value })}
              />
                <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
                  <InputLabel>Business Unit</InputLabel>
                  <Select
                    value={newPostData.bu_master}
                    onChange={(e) => setNewPostData({ ...newPostData, bu_master: e.target.value })}
                    label="Business Unit"
                  >
                    {buMasters.map((bu) => (
                      <MenuItem key={bu.id} value={bu.id}>{bu.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
                <InputLabel>Pilihan Editor</InputLabel>
                <Select
                  value={newPostData.editor}
                  onChange={(e) => setNewPostData({ ...newPostData, editor: e.target.value })}
                  label="Editor"
                >
                  <MenuItem value={1}>true</MenuItem>
                  <MenuItem value={0}>false</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="Description"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                margin="normal"
                value={newPostData.description}
                onChange={(e) => setNewPostData({ ...newPostData, description: e.target.value })}
              />
              <UploadButton>
                <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
                Upload Image
              </UploadButton>
              {imagePreview && <img src={imagePreview} alt="Preview" style={{ marginTop: 3, width: '100%', height: '200px', objectFit: 'cover' }} />}
            </ModalContent>
            <Divider />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
              <Button onClick={handleAddPost} variant="contained" color="primary" sx={{ ml: 1 }}>
                Save
              </Button>
            </Box>
          </Card>
        </Fade>
      </Modal>

      {/* Edit Modal */}
      <Modal
        open={isEditModalOpen}
        onClose={handleCloseEditModal}
        closeAfterTransition
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Fade in={isEditModalOpen}>
          <Card>
            <CardHeader title="Edit Blog Post" />
            <Divider />
            <ModalContent>
              <TextField
                label="Title"
                variant="outlined"
                fullWidth
                margin="normal"
                value={editingPost?.title || ''}
                onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
              />
              <TextField
                label="Category"
                variant="outlined"
                fullWidth
                margin="normal"
                value={editingPost.category}
                onChange={(e) => setEditingPost({ ...editingPost, category: e.target.value })}
              />
              <TextField
                label="Author"
                variant="outlined"
                fullWidth
                margin="normal"
                value={editingPost?.author || ''}
                InputProps={{
                  readOnly: true,
                }}
                sx={{
                  fontWeight: 'bold', 
                }}
              />
                <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
                  <InputLabel>Business Unit</InputLabel>
                  <Select
                    value={editingPost.id_bu_master}
                    onChange={(e) => setEditingPost({ ...editingPost, bu_master: e.target.value })}
                    label="Business Unit"
                  >
                    {buMasters.map((bu) => (
                      <MenuItem key={bu.id} value={bu.id}>{bu.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              <TextField
                label="Description"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                margin="normal"
                value={editingPost?.description || ''}
                onChange={(e) => setEditingPost({ ...editingPost, description: e.target.value })}
              />
              <UploadButton>
                <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
                Edit Image
              </UploadButton>
              {imagePreview && <img src={imagePreview} alt="Preview" style={{ width: '100%', height: '150px', objectFit: 'cover' }} />}
            </ModalContent>
            <Divider />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
              <Button onClick={handleEditPost} variant="contained" color="primary" sx={{ ml: 1 }}>
                Update
              </Button>
            </Box>
          </Card>
        </Fade>
      </Modal>

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

export default BlogPostPage;
