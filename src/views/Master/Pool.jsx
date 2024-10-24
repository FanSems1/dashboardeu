import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  Grid,
  Typography,
  IconButton,
  TextField,
  Select,
  MenuItem,
  Button,
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

const poolData = [
  { id: 1, name: 'Pool A', businessUnit: 'Logistics', status: 'Active' },
  { id: 2, name: 'Pool B', businessUnit: 'Katarasa', status: 'Active' },
  { id: 3, name: 'Pool C', businessUnit: 'Master Diskon', status: 'Inactive' },
  { id: 4, name: 'Pool D', businessUnit: 'Raja Cepat', status: 'Active' },
  { id: 5, name: 'Pool E', businessUnit: 'Jaja', status: 'Active' },
  { id: 6, name: 'Pool F', businessUnit: 'Bookhouse', status: 'Inactive' },
  { id: 7, name: 'Pool G', businessUnit: 'Logistics', status: 'Active' },
  { id: 8, name: 'Pool H', businessUnit: 'Katarasa', status: 'Active' },
];

const PoolPage = () => {
  const [pools, setPools] = useState(poolData);
  const [selectedUnit, setSelectedUnit] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPools, setSelectedPools] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // State for dialog
  const [openDialog, setOpenDialog] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentPool, setCurrentPool] = useState({ name: '', businessUnit: '' });

  const filteredPools = pools.filter(
    (pool) =>
      pool.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedUnit ? pool.businessUnit === selectedUnit : true)
  );

  const handleSelectPool = (id) => {
    setSelectedPools((prev) =>
      prev.includes(id) ? prev.filter((poolId) => poolId !== id) : [...prev, id]
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
        setPools(pools.filter((pool) => !selectedPools.includes(pool.id)));
        setSelectedPools([]); // Clear selected pools after deletion
        Swal.fire('Deleted!', 'Selected pools have been deleted.', 'success');
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

  const handleOpenDialog = (pool = null) => {
    setIsEditMode(!!pool);
    setCurrentPool(pool ? { name: pool.name, businessUnit: pool.businessUnit } : { name: '', businessUnit: '' });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSavePool = () => {
    if (isEditMode) {
      const updatedPools = pools.map((p) =>
        p.id === selectedPools[0] ? { ...p, name: currentPool.name, businessUnit: currentPool.businessUnit } : p
      );
      setPools(updatedPools);
      Swal.fire('Success', 'Pool updated successfully', 'success');
    } else {
      const newPool = {
        id: pools.length + 1,
        name: currentPool.name,
        businessUnit: currentPool.businessUnit,
        status: 'Active',
      };
      setPools((prev) => [...prev, newPool]);
      Swal.fire('Success', 'Pool added successfully', 'success');
    }
    handleCloseDialog();
  };

  const handleDeletePool = (id) => {
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
        setPools(pools.filter((pool) => pool.id !== id));
        Swal.fire('Deleted!', 'Pool has been deleted.', 'success');
      }
    });
  };

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Card
          style={{
            borderRadius: '8px',
            boxShadow: '0px 4px 6px rgba(0,0,0,0.2)',
          }}
        >
          <CardHeader
            title={<h1 style={{ color: '#2d3436', fontFamily: 'Poppins', fontSize: '20px' }}>Pool Management</h1>}
            action={
              <Box display="flex" alignItems="center">
                <TextField
                  variant="outlined"
                  size="small"
                  placeholder="Search Pool Name"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ width: '250px', marginRight: 4 }}
                />
                <Select
                  value={selectedUnit}
                  onChange={(e) => setSelectedUnit(e.target.value)}
                  displayEmpty
                  variant="outlined"
                  size="small"
                  style={{ height: '40px', marginRight: 4 }}
                >
                  <MenuItem value="">
                    <em>All Units</em>
                  </MenuItem>
                  <MenuItem value="Logistics">Logistics</MenuItem>
                  <MenuItem value="Katarasa">Katarasa</MenuItem>
                  <MenuItem value="Master Diskon">Master Diskon</MenuItem>
                  <MenuItem value="Raja Cepat">Raja Cepat</MenuItem>
                  <MenuItem value="Jaja">Jaja</MenuItem>
                  <MenuItem value="Bookhouse">Bookhouse</MenuItem>
                </Select>
                <Button variant="contained" onClick={() => handleOpenDialog()}>
                  Add Pool
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
                          if (selectedPools.length === filteredPools.length) {
                            setSelectedPools([]);
                          } else {
                            setSelectedPools(filteredPools.map(pool => pool.id));
                          }
                        }}
                        checked={selectedPools.length === filteredPools.length}
                      />
                    </TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Business Unit</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredPools
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((pool) => (
                      <TableRow key={pool.id}>
                        <TableCell padding="checkbox">
                          <input
                            type="checkbox"
                            checked={selectedPools.includes(pool.id)}
                            onChange={() => handleSelectPool(pool.id)}
                          />
                        </TableCell>
                        <TableCell>{pool.name}</TableCell>
                        <TableCell>{pool.businessUnit}</TableCell>
                        <TableCell>{pool.status}</TableCell>
                        <TableCell align="right">
                          <IconButton onClick={() => handleOpenDialog(pool)}>
                            <Edit color="primary" />
                          </IconButton>
                          <IconButton onClick={() => handleDeletePool(pool.id)}>
                            <Delete sx={{ color: '#f44336' }}/>
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              {selectedPools.length > 0 && (
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleBatchDelete}
                  style={{ marginTop: '16px' }}
                >
                  Delete Selected
                </Button>
              )}
              <Box flexGrow={1} />
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={filteredPools.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                style={{ marginTop: '16px' }}
              />
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Dialog for Add/Edit Pool */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{isEditMode ? 'Edit Pool' : 'Add Pool'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Pool Name"
            type="text"
            fullWidth
            variant="outlined"
            value={currentPool.name}
            onChange={(e) => setCurrentPool({ ...currentPool, name: e.target.value })}
          />
          <Select
            value={currentPool.businessUnit}
            onChange={(e) => setCurrentPool({ ...currentPool, businessUnit: e.target.value })}
            fullWidth
            variant="outlined"
            style={{ marginTop: '16px' }}
          >
            <MenuItem value="">
              <em>Select Business Unit</em>
            </MenuItem>
            <MenuItem value="Logistics">Logistics</MenuItem>
            <MenuItem value="Katarasa">Katarasa</MenuItem>
            <MenuItem value="Master Diskon">Master Diskon</MenuItem>
            <MenuItem value="Raja Cepat">Raja Cepat</MenuItem>
            <MenuItem value="Jaja">Jaja</MenuItem>
            <MenuItem value="Bookhouse">Bookhouse</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSavePool} color="primary">
            {isEditMode ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default PoolPage;
