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
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import Swal from 'sweetalert2';
import { gridSpacing } from 'config.js';

const employeesData = [
  { id: 1, name: 'Alice Johnson', phone: '081234567890', businessUnit: 'Logistics', status: 'Active' },
  { id: 2, name: 'Bob Smith', phone: '082345678901', businessUnit: 'Katarasa', status: 'Active' },
  { id: 3, name: 'Charlie Brown', phone: '083456789012', businessUnit: 'Master Diskon', status: 'Inactive' },
  { id: 4, name: 'Diana Prince', phone: '084567890123', businessUnit: 'Raja Cepat', status: 'Active' },
  { id: 5, name: 'Edward Elric', phone: '085678901234', businessUnit: 'Jaja', status: 'Active' },
  { id: 6, name: 'Fiona Apple', phone: '086789012345', businessUnit: 'Bookhouse', status: 'Inactive' },
  { id: 7, name: 'George Orwell', phone: '087890123456', businessUnit: 'Logistics', status: 'Active' },
  { id: 8, name: 'Hannah Arendt', phone: '088901234567', businessUnit: 'Katarasa', status: 'Active' },
];

const EmployeeLocationPage = () => {
  const [employees, setEmployees] = useState(employeesData);
  const [selectedUnit, setSelectedUnit] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmployees, setSelectedEmployees] = useState([]); // New state for selected employees
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5); 

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedUnit ? employee.businessUnit === selectedUnit : true)
  );

  const handleSelectEmployee = (id) => {
    setSelectedEmployees((prev) => 
      prev.includes(id) ? prev.filter((employeeId) => employeeId !== id) : [...prev, id]
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
        setEmployees(employees.filter((employee) => !selectedEmployees.includes(employee.id)));
        setSelectedEmployees([]); // Clear selected employees after deletion
        Swal.fire('Deleted!', 'Selected employees have been deleted.', 'success');
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

  const handleAddEmployee = () => {
    Swal.fire({
      title: 'Add Employee',
      html: `
        <input id="employee-name" class="swal2-input" placeholder="Employee Name" />
        <input id="employee-phone" class="swal2-input" placeholder="Phone" />
        <select id="business-unit" class="swal2-input">
          <option value="" disabled selected>Select Business Unit</option>
          <option value="Logistics">Logistics</option>
          <option value="Katarasa">Katarasa</option>
          <option value="Master Diskon">Master Diskon</option>
          <option value="Raja Cepat">Raja Cepat</option>
          <option value="Jaja">Jaja</option>
          <option value="Bookhouse">Bookhouse</option>
        </select>
      `,
      focusConfirm: false,
      preConfirm: () => {
        const name = document.getElementById('employee-name').value;
        const phone = document.getElementById('employee-phone').value;
        const businessUnit = document.getElementById('business-unit').value;
        if (!name || !phone || !businessUnit) {
          Swal.showValidationMessage('Please fill in all fields');
          return false;
        }
        return { name, phone, businessUnit };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const newEmployee = {
          id: employees.length + 1,
          name: result.value.name,
          phone: result.value.phone,
          businessUnit: result.value.businessUnit,
          status: 'Active',
        };
        setEmployees((prev) => [...prev, newEmployee]);
        Swal.fire('Success', 'Employee added successfully', 'success');
      }
    });
  };

  const handleEditEmployee = (employee) => {
    Swal.fire({
      title: 'Edit Employee',
      html: `
        <input id="employee-name" class="swal2-input" placeholder="Employee Name" value="${employee.name}" />
        <input id="employee-phone" class="swal2-input" placeholder="Phone" value="${employee.phone}" />
        <select id="business-unit" class="swal2-input">
          <option value="${employee.businessUnit}" selected>${employee.businessUnit}</option>
          <option value="Logistics">Logistics</option>
          <option value="Katarasa">Katarasa</option>
          <option value="Master Diskon">Master Diskon</option>
          <option value="Raja Cepat">Raja Cepat</option>
          <option value="Jaja">Jaja</option>
          <option value="Bookhouse">Bookhouse</option>
        </select>
      `,
      focusConfirm: false,
      preConfirm: () => {
        const name = document.getElementById('employee-name').value;
        const phone = document.getElementById('employee-phone').value;
        const businessUnit = document.getElementById('business-unit').value;
        if (!name || !phone || !businessUnit) {
          Swal.showValidationMessage('Please fill in all fields');
          return false;
        }
        return { id: employee.id, name, phone, businessUnit };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedEmployees = employees.map((e) =>
          e.id === employee.id ? { ...e, name: result.value.name, phone: result.value.phone, businessUnit: result.value.businessUnit } : e
        );
        setEmployees(updatedEmployees);
        Swal.fire('Success', 'Employee updated successfully', 'success');
      }
    });
  };

  const handleDeleteEmployee = (id) => {
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
        setEmployees(employees.filter((employee) => employee.id !== id));
        Swal.fire('Deleted!', 'Employee has been deleted.', 'success');
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
            title={<h1 style={{ color: '#2d3436', fontFamily: 'Poppins', fontSize: '20px' }}>Employee Position List</h1>}
            action={
              <Box display="flex" alignItems="center">
                <TextField
                  variant="outlined"
                  size="small"
                  placeholder="Search Employee Name"
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
                <Button variant="contained" onClick={handleAddEmployee}>Add Employee</Button>
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
                        checked={selectedEmployees.length === filteredEmployees.length}
                        onChange={() => {
                          if (selectedEmployees.length === filteredEmployees.length) {
                            setSelectedEmployees([]);
                          } else {
                            setSelectedEmployees(filteredEmployees.map(emp => emp.id));
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>Business Unit</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredEmployees
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((employee) => (
                      <TableRow key={employee.id}>
                        <TableCell padding="checkbox">
                          <input
                            type="checkbox"
                            checked={selectedEmployees.includes(employee.id)}
                            onChange={() => handleSelectEmployee(employee.id)}
                          />
                        </TableCell>
                        <TableCell>{employee.name}</TableCell>
                        <TableCell>{employee.phone}</TableCell>
                        <TableCell>{employee.businessUnit}</TableCell>
                        <TableCell>{employee.status}</TableCell>
                        <TableCell>
                          <IconButton onClick={() => handleEditEmployee(employee)}>
                            <Edit color="primary" />
                          </IconButton>
                          <IconButton onClick={() => handleDeleteEmployee(employee.id)}>
                            <Delete sx={{ color: '#f44336' }} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
              <Box>
                {selectedEmployees.length > 0 && (
                  <Button
                    variant="contained"
                    color="error"
                    onClick={handleBatchDelete}
                    style={{ marginBottom: '10px' }}
                  >
                    Delete Selected
                  </Button>
                )}
              </Box>
              <Box>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={filteredEmployees.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handlePageChange}
                  onRowsPerPageChange={handleRowsPerPageChange}
                />
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default EmployeeLocationPage;
