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
} from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import Swal from 'sweetalert2';

const SubdistrictPage = () => {
  const [subdistricts, setSubdistricts] = useState([]);
  const [newSubdistrict, setNewSubdistrict] = useState({ name: '' });
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);

  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchedSubdistricts = [
      { id: 1, name: 'Gambir' },
      { id: 2, name: 'Menteng' },
      { id: 3, name: 'Tanah Abang' },
      // Add more dummy data as needed
    ];
    setSubdistricts(fetchedSubdistricts);
  }, []);

  const handleOpen = (subdistrict) => {
    setEditMode(!!subdistrict);
    setNewSubdistrict(subdistrict || { name: '' });
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleSave = () => {
    if (editMode) {
      const updatedSubdistricts = subdistricts.map((subdistrict) =>
        subdistrict.id === newSubdistrict.id ? newSubdistrict : subdistrict
      );
      setSubdistricts(updatedSubdistricts);
      Swal.fire('Updated!', 'Subdistrict details have been updated.', 'success');
    } else {
      const newSubdistrictData = { ...newSubdistrict, id: subdistricts.length + 1 };
      setSubdistricts([...subdistricts, newSubdistrictData]);
      Swal.fire('Added!', 'Subdistrict has been added.', 'success');
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
        const updatedSubdistricts = subdistricts.filter(subdistrict => subdistrict.id !== id);
        setSubdistricts(updatedSubdistricts);
        Swal.fire('Deleted!', 'Subdistrict has been deleted.', 'success');
      }
    });
  };

  const filteredSubdistricts = subdistricts.filter(subdistrict =>
    subdistrict.name.toLowerCase().includes(searchTerm.toLowerCase())
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
                  <h1 style={{ color: '#2d3436', fontFamily: 'Poppins', fontSize: '28px', margin: 0 }}>Subdistrict Management</h1>
                  <TextField
                    placeholder="Search Subdistrict"
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
                    Add Subdistrict
                  </Button>
                </Grid>
              </Grid>
              <Table sx={{ marginTop: '20px' }}>
                <TableHead>
                  <TableRow sx={{ background: '#dfe6e9' }}>
                    <TableCell>Subdistrict Name</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredSubdistricts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((subdistrict) => (
                    <TableRow
                      key={subdistrict.id}
                      sx={{
                        '&:hover': {
                          backgroundColor: '#f5f6fa',
                          transform: 'scale(1.02)',
                          transition: 'all 0.3s ease-in-out',
                        },
                      }}
                    >
                      <TableCell>{subdistrict.name}</TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleOpen(subdistrict)} color="primary">
                          <Edit />
                        </IconButton>
                        <IconButton onClick={() => handleDelete(subdistrict.id)} color="secondary">
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
                count={filteredSubdistricts.length}
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
        <DialogTitle>{editMode ? 'Edit Subdistrict' : 'Add Subdistrict'}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Subdistrict Name"
            fullWidth
            variant="outlined"
            value={newSubdistrict.name}
            onChange={(e) => setNewSubdistrict({ ...newSubdistrict, name: e.target.value })}
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

export default SubdistrictPage;
