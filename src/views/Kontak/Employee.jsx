import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
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
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import SortIcon from '@mui/icons-material/Sort';
import Swal from 'sweetalert2';

// Project import
import { gridSpacing } from 'config.js';

// Import Employee Data
import initialData from '../../Data/Kontak/Employee';

const EmployeePage = () => {
  const [data, setData] = useState(initialData);
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [successPopup, setSuccessPopup] = useState(false);
  const [message, setMessage] = useState('');

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

  const handleEditClick = (employee) => {
    Swal.fire({
      title: 'Edit Employee',
      html: `
        <input id="name" class="swal2-input" placeholder="Name" value="${employee.name}">
        <input id="department" class="swal2-input" placeholder="Department" value="${employee.department}">
        <input id="location" class="swal2-input" placeholder="Location" value="${employee.location}">
        <input id="status" class="swal2-input" placeholder="Status" value="${employee.status}">
      `,
      focusConfirm: false,
      preConfirm: () => {
        const name = Swal.getInput('name').value;
        const department = Swal.getInput('department').value;
        const location = Swal.getInput('location').value;
        const status = Swal.getInput('status').value;

        if (!name || !department || !location || !status) {
          Swal.showValidationMessage('Please fill out all fields');
        }

        return { id: employee.id, name, department, location, status };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        handleAddEditEmployee(result.value);
      }
    });
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
        setData(data.filter(employee => employee.id !== id));
        setMessage('Employee deleted successfully');
        setSuccessPopup(true);
      }
    });
  };

  const handleBatchDelete = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete selected!',
    }).then((result) => {
      if (result.isConfirmed) {
        setData(data.filter(employee => !selectedEmployees.includes(employee.id)));
        setMessage('Selected employees deleted successfully');
        setSuccessPopup(true);
        setSelectedEmployees([]);
      }
    });
  };

  const handleAddEditEmployee = (employee) => {
    if (data.some(emp => emp.id === employee.id)) {
      setData(data.map(emp => (emp.id === employee.id ? { ...emp, ...employee } : emp)));
      setMessage('Employee updated successfully');
    } else {
      const newEmployee = { ...employee, id: data.length + 1 }; 
      setData([...data, newEmployee]);
      setMessage('Employee added successfully');
    }
    setSuccessPopup(true);
  };

  const handleSort = (field) => {
    const sortedData = [...data].sort((a, b) => {
      if (field === 'name') {
        const aNumber = parseInt(a.name.split(' ')[1]);
        const bNumber = parseInt(b.name.split(' ')[1]);
        return aNumber - bNumber;
      }
      if (a[field] < b[field]) return -1;
      if (a[field] > b[field]) return 1;
      return 0;
    });
    setData(sortedData);
  };

  const filteredData = data.filter(employee =>
    employee.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <Card sx={{ borderRadius: '12px', boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.1)' }}>
            <CardHeader
              title={
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <h1 style={{ color: '#2d3436', fontFamily: 'Poppins', fontSize: '20px' }}>
                    Employee Management
                  </h1>
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
                      onClick={() => {
                        Swal.fire({
                          title: 'Add Employee',
                          html: `
                            <input id="name" class="swal2-input" placeholder="Name">
                            <input id="department" class="swal2-input" placeholder="Department">
                            <input id="location" class="swal2-input" placeholder="Location">
                            <input id="status" class="swal2-input" placeholder="Status">
                          `,
                          focusConfirm: false,
                          preConfirm: () => {
                            const name = Swal.getInput('name').value;
                            const department = Swal.getInput('department').value;
                            const location = Swal.getInput('location').value;
                            const status = Swal.getInput('status').value;

                            if (!name || !department || !location || !status) {
                              Swal.showValidationMessage('Please fill out all fields');
                            }

                            return { name, department, location, status };
                          },
                        }).then((result) => {
                          if (result.isConfirmed) {
                            handleAddEditEmployee(result.value);
                          }
                        });
                      }}
                      sx={{
                        background: '#3f51b5',
                        color: 'white',
                        borderRadius: '20px',
                        '&:hover': { background: 'linear-gradient(45deg, #0984e3, #00b894)' },
                        padding: '10px 20px',
                      }}
                    >
                      Add Employee
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      component={Link}
                      to="/kontak/employee-sales"
                      sx={{
                        background: '#f50057',
                        color: 'white',
                        borderRadius: '20px',
                        marginLeft: '15px',
                        '&:hover': { background: 'linear-gradient(45deg, #e17055, #fdcb6e)' },
                        padding: '10px 20px',
                      }}
                    >
                      Employee Sales
                    </Button>
                  </Box>
                </Box>
              }
            />
            <CardContent>
              <TableContainer sx={{ marginTop: '-30px', overflow: 'visible' }}>
                <Table>
                  <TableHead>
                    <TableRow sx={{ background: '#dfe6e9' }}>
                      <TableCell padding="none" align="left" sx={{ paddingY: '8px' }}>
                        <Box display="flex" alignItems="center">
                          <Checkbox 
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedEmployees(data.map(emp => emp.id));
                              } else {
                                setSelectedEmployees([]);
                              }
                            }}
                          />
                          Name
                          <IconButton size="small" onClick={() => handleSort('name')}>
                            <SortIcon />
                          </IconButton>
                        </Box>
                      </TableCell>
                      <TableCell padding="none" align="left" sx={{ paddingY: '8px' }}>
                        <Box display="flex" alignItems="center">
                          Department
                          <IconButton size="small" onClick={() => handleSort('department')}>
                            <SortIcon />
                          </IconButton>
                        </Box>
                      </TableCell>
                      <TableCell padding="none" align="left" sx={{ paddingY: '8px' }}>
                        <Box display="flex" alignItems="center">
                          Location
                          <IconButton size="small" onClick={() => handleSort('location')}>
                            <SortIcon />
                          </IconButton>
                        </Box>
                      </TableCell>
                      <TableCell padding="none" align="left" sx={{ paddingY: '8px' }}>
                        <Box display="flex" alignItems="center">
                          Status
                          <IconButton size="small" onClick={() => handleSort('status')}>
                            <SortIcon />
                          </IconButton>
                        </Box>
                      </TableCell>
                      <TableCell padding="none" align="right" sx={{ paddingY: '8px' }}>
                        Actions
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredData
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((employee) => (
                        <TableRow key={employee.id}>
                          <TableCell padding="none" align="left">
                            <Checkbox 
                              checked={selectedEmployees.includes(employee.id)} 
                              onChange={() => {
                                if (selectedEmployees.includes(employee.id)) {
                                  setSelectedEmployees(selectedEmployees.filter(id => id !== employee.id));
                                } else {
                                  setSelectedEmployees([...selectedEmployees, employee.id]);
                                }
                              }}
                            />
                            {employee.name}
                          </TableCell>
                          <TableCell padding="none" align="left">{employee.department}</TableCell>
                          <TableCell padding="none" align="left">{employee.location}</TableCell>
                          <TableCell padding="none" align="left">{employee.status}</TableCell>
                          <TableCell align="right">
                            <IconButton onClick={() => handleEditClick(employee)}>
                              <EditIcon color="primary" />
                            </IconButton>
                            <IconButton onClick={() => handleDeleteClick(employee.id)}>
                              <DeleteIcon sx={{ color: '#f44336' }} />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ marginTop: 2 }}>
                <Button 
                  variant="outlined" 
                  color="secondary" 
                  onClick={handleBatchDelete} 
                  disabled={selectedEmployees.length === 0}
                  sx={{ color: '#f50057', borderColor: '#f50057' }}
                >
                  Delete Selected
                </Button>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  count={filteredData.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  sx={{ color: '#3f51b5' }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Snackbar for Success Message */}
      <Snackbar
        open={successPopup}
        autoHideDuration={6000}
        onClose={() => setSuccessPopup(false)}
        message={message}
      />
    </>
  );
};

export default EmployeePage;
