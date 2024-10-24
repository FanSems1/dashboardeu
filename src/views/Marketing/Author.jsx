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
  Alert,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  TablePagination,
  Snackbar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
} from '@mui/material';
import { Edit, Delete, Visibility, VisibilityOff } from '@mui/icons-material'; // Import the eye icons
import Swal from 'sweetalert2';
import axios from 'axios';

const AuthorPage = () => {
  const [authors, setAuthors] = useState([]);
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('error');
  
  // State for dialog
  const [openDialog, setOpenDialog] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentAuthor, setCurrentAuthor] = useState({ id: '', username: '', email: '', password: '' }); // Added password field
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility

  // Fetch authors on component mount
  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('http://192.168.1.170:5000/api/users', {
        headers: {
          Authorization: `${token}`,
        },
      });
      console.log('Fetched authors:', response.data);

      if (Array.isArray(response.data.authors)) {
        setAuthors(response.data.authors);
      } else if (Array.isArray(response.data.data)) {
        setAuthors(response.data.data);
      } else {
        console.error('Expected an array but received:', response.data);
        setAuthors([]);
      }
    } catch (error) {
      console.error('Error fetching authors:', error);
      setAuthors([]);
    }
  };

  const handleSelectAuthor = (id) => {
    setSelectedAuthors((prev) =>
      prev.includes(id) ? prev.filter((authorId) => authorId !== id) : [...prev, id]
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
            selectedAuthors.map((id) =>
              axios.delete(`http://192.168.1.170:5000/api/users/delete/${id}`, {
                headers: {
                  Authorization: token,
                },
              })
            )
          );
          fetchAuthors();
          setSelectedAuthors([]);
          Swal.fire('Deleted!', 'Selected authors have been deleted.', 'success');
        } catch (error) {
          console.error('Error deleting authors:', error);
          Swal.fire('Error!', 'There was an error deleting the authors.', 'error');
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

  const handleOpenDialog = (author = null) => {
    setIsEditMode(!!author);
    setCurrentAuthor(author ? { id: author.id, username: author.username, email: author.email, password: '' } : { id: '', username: '', email: '', password: '' });
    setShowPassword(false); 
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSaveAuthor = async () => {
    const token = localStorage.getItem('token');
    try {
      if (isEditMode) {
        await axios.put('http://192.168.1.170:5000/api/users/edit', {
          id: currentAuthor.id,
          username: currentAuthor.username,
          email: currentAuthor.email,
          password: currentAuthor.password, 
        }, {
          headers: {
            Authorization: token,
          },
        });
        Swal.fire('Success', 'Author updated successfully', 'success');
      } else {
        await axios.post('http://192.168.1.170:5000/api/users/add', {
          username: currentAuthor.username,
          email: currentAuthor.email,
          password: currentAuthor.password,
        }, {
          headers: {
            Authorization: token,
          },
        });
        Swal.fire('Success', 'Author added successfully', 'success');
      }
      fetchAuthors();
      handleCloseDialog();
    } catch (error) {
      console.error('Error saving author:', error);
  
      // Set error message for Snackbar
      setSnackbarMessage('Failed to save author: ' + (error.response?.data?.message || ''));
      setSnackbarSeverity('error');
      setSnackbarOpen(true); // Open Snackbar
    }
  };

  const handleDeleteAuthor = async (id) => {
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
          await axios.delete(`http://192.168.1.170:5000/api/users/delete/${id}`, {
            headers: {
              Authorization: token,
            },
          });
          fetchAuthors();
          Swal.fire('Deleted!', 'Author has been deleted.', 'success');
        } catch (error) {
          console.error('Error deleting author:', error);
          Swal.fire('Error!', 'There was an error deleting the author.', 'error');
        }
      }
    });
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Card style={{ borderRadius: '8px' }}>
          <CardHeader
            title={<h1 style={{ color: '#2d3436', fontFamily: 'Poppins', fontSize: '16px' }}>Author Management</h1>}
            action={
              <Button variant="contained" onClick={() => handleOpenDialog()}>
                Add
              </Button>
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
                          if (selectedAuthors.length === authors.length) {
                            setSelectedAuthors([]);
                          } else {
                            setSelectedAuthors(authors.map(author => author.id));
                          }
                        }}
                        checked={selectedAuthors.length === authors.length}
                      />
                    </TableCell>
                    <TableCell>ID</TableCell>
                    <TableCell>Username</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Array.isArray(authors) && authors 
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((author) => (
                      <TableRow key={author.id}>
                        <TableCell padding="checkbox">
                          <input
                            type="checkbox"
                            checked={selectedAuthors.includes(author.id)}
                            onChange={() => handleSelectAuthor(author.id)}
                          />
                        </TableCell>
                        <TableCell>{author.id}</TableCell>
                        <TableCell>{author.username}</TableCell>
                        <TableCell>{author.email}</TableCell>
                        <TableCell align="right">
                          <IconButton onClick={() => handleOpenDialog(author)}>
                            <Edit color="primary" />
                          </IconButton>
                          <IconButton onClick={() => handleDeleteAuthor(author.id)}>
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
              count={authors.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
            />
            <Button
              variant="contained"
              color="error"
              onClick={handleBatchDelete}
              disabled={selectedAuthors.length === 0}
              style={{ marginTop: '16px' }}
            >
              Delete Selected
            </Button>
          </CardContent>
        </Card>
      </Grid>

      {/* Dialog for Add/Edit Author */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{isEditMode ? 'Edit Author' : 'Add Author'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Username"
                variant="outlined"
                fullWidth
                value={currentAuthor.username}
                onChange={(e) => setCurrentAuthor({ ...currentAuthor, username: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                value={currentAuthor.email}
                onChange={(e) => setCurrentAuthor({ ...currentAuthor, email: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                type={showPassword ? 'text' : 'password'} // Toggle password visibility
                variant="outlined"
                fullWidth
                value={currentAuthor.password}
                onChange={(e) => setCurrentAuthor({ ...currentAuthor, password: e.target.value })}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />} {/* Eye icon */}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveAuthor} color="primary">
            {isEditMode ? 'Save Changes' : 'Add Author'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for error messages */}
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default AuthorPage;
