import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  Grid,
  Typography,
  Button,
  Box,
  Paper,
  Modal,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts'; 
import { gridSpacing } from 'config.js';

const businessUnits = [
  {
    name: 'Master Diskon',
    revenue: 'Rp 5 Billion',
    established: '2015',
    employees: 120,
    contact: 'contact@masterdiskon.com',
    management: 'John Doe, CEO',
    dailyRevenue: [1200, 1500, 1300, 1600, 1700], // Sample daily revenue data
  },
  {
    name: 'Katarasa',
    revenue: 'Rp 3 Billion',
    established: '2018',
    employees: 75,
    contact: 'contact@katarasa.com',
    management: 'Jane Smith, CEO',
    dailyRevenue: [800, 900, 700, 950, 850], // Sample daily revenue data
  },
  {
    name: 'Jaja',
    revenue: 'Rp 1 Billion',
    established: '2019',
    employees: 50,
    contact: 'contact@jaja.com',
    management: 'Mark Lee, CEO',
    dailyRevenue: [500, 600, 550, 650, 700], // Sample daily revenue data
  },
  {
    name: 'Bookhouse',
    revenue: 'Rp 2 Billion',
    established: '2010',
    employees: 90,
    contact: 'contact@bookhouse.com',
    management: 'Sarah Johnson, CEO',
    dailyRevenue: [900, 1000, 950, 1100, 1050], // Sample daily revenue data
  },
  {
    name: 'Logistics',
    revenue: 'Rp 4 Billion',
    established: '2013',
    employees: 150,
    contact: 'contact@logistics.com',
    management: 'David Brown, CEO',
    dailyRevenue: [1400, 1600, 1500, 1700, 1800], // Sample daily revenue data
  },
  {
    name: 'Raja Cepat',
    revenue: 'Rp 6 Billion',
    established: '2020',
    employees: 200,
    contact: 'contact@rajacepat.com',
    management: 'Emily Davis, CEO',
    dailyRevenue: [2000, 2200, 2100, 2400, 2300], // Sample daily revenue data
  },
];

const BuPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [currentUnit, setCurrentUnit] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    revenue: '',
    established: '',
    employees: '',
    contact: '',
    management: '',
  });
  const [selectedUnit, setSelectedUnit] = useState(businessUnits[0]);

  const rowsPerPage = 1;
  const totalPages = Math.ceil(businessUnits.length / rowsPerPage);
  const paginatedData = businessUnits.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)[0];

  const handleAddOpen = () => {
    setFormData({ name: '', revenue: '', established: '', employees: '', contact: '', management: '' });
    setOpenAddModal(true);
  };

  const handleEditOpen = (unit) => {
    setCurrentUnit(unit);
    setFormData(unit);
    setOpenEditModal(true);
  };

  const handleDeleteOpen = (unit) => {
    setCurrentUnit(unit);
    setOpenDeleteModal(true);
  };

  const handleModalClose = () => {
    setOpenAddModal(false);
    setOpenEditModal(false);
    setOpenDeleteModal(false);
    setCurrentUnit(null);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleUnitChange = (event) => {
    const selectedUnit = businessUnits.find(unit => unit.name === event.target.value);
    setSelectedUnit(selectedUnit);
  };

  return (
    <>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <div elevation={5} style={{ borderRadius: '12px' }}>
            <CardHeader
              title={
                <Typography variant="h4" className="card-header" style={{ fontWeight: 'bold', color: '#6200ea' }}>
                  Business Units
                </Typography>
              }
              action={
                <Box display="flex" alignItems="center">
                  <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to="/master/bu-brench"
                    style={{ marginRight: '8px', backgroundColor: '#6200ea', color: '#fff' }}
                  >
                    Go to Business Unit Branch
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleAddOpen}
                    style={{ backgroundColor: '#03dac5', color: '#000' }}
                  >
                    Add Business Unit
                  </Button>
                </Box>
              }
            />
            <CardContent>
              {paginatedData && (
                <Paper elevation={2} style={{ marginBottom: '16px', padding: '16px', borderRadius: '12px', backgroundColor: '#e3f2fd' }}>
                  <CardHeader title={<Typography variant="h6" style={{ color: '#1976d2', fontWeight: 'bold' }}>{paginatedData.name}</Typography>} />
                  <Divider />
                  <CardContent>
                    <Typography variant="body2" paragraph>
                      <strong>Revenue:</strong> {paginatedData.revenue}
                    </Typography>
                    <Typography variant="body2" paragraph>
                      <strong>Established:</strong> {paginatedData.established}
                    </Typography>
                    <Typography variant="body2" paragraph>
                      <strong>Employees:</strong> {paginatedData.employees}
                    </Typography>
                    <Typography variant="body2" paragraph>
                      <strong>Contact:</strong> {paginatedData.contact}
                    </Typography>
                    <Typography variant="body2" paragraph>
                      <strong>Management:</strong> {paginatedData.management}
                    </Typography>
                    <Box display="flex" justifyContent="flex-end" marginTop={2}>
                      <Button variant="outlined" color="primary" onClick={() => handleEditOpen(paginatedData)} style={{ marginRight: '8px', borderColor: '#6200ea', color: '#6200ea' }}>
                        Edit
                      </Button>
                      <Button variant="outlined" color="secondary" onClick={() => handleDeleteOpen(paginatedData)} style={{ marginRight: '8px', borderColor: '#03dac5', color: '#03dac5' }}>
                        Delete
                      </Button>
                    </Box>
                  </CardContent>
                </Paper>
              )}
              <Box display="flex" justifyContent="space-between" marginTop={2}>
                <Button variant="outlined" disabled={currentPage === 1} onClick={handlePrevPage}>
                  Previous
                </Button>
                <Button variant="outlined" disabled={currentPage === totalPages} onClick={handleNextPage}>
                  Next
                </Button>
              </Box>
            </CardContent>
          </div>
        </Grid>
        
        {/* Chart Section */}
        <Grid item xs={12}>
          <Box sx={{ marginTop: 4 }}>
            <FormControl fullWidth>
              <InputLabel id="unit-select-label">Select Business Unit</InputLabel>
              <Select
                labelId="unit-select-label"
                value={selectedUnit.name}
                onChange={handleUnitChange}
              >
                {businessUnits.map((unit, index) => (
                  <MenuItem key={index} value={unit.name}>
                    {unit.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Typography variant="h6" style={{ marginTop: '20px', marginBottom: '10px' }}>
              Daily Revenue Chart for {selectedUnit.name}
            </Typography>
            <BarChart
              width={600}
              height={300}
              data={selectedUnit.dailyRevenue.map((revenue, index) => ({ name: `Day ${index + 1}`, revenue }))}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" fill="#6200ea" />
            </BarChart>
          </Box>
        </Grid>
      </Grid>

      {/* Add Business Unit Modal */}
      <Modal open={openAddModal} onClose={handleModalClose}>
        <Box sx={{ width: 400, padding: 2, margin: 'auto', backgroundColor: '#fff', borderRadius: '8px' }}>
          <Typography variant="h6" component="h2">Add Business Unit</Typography>
          <TextField label="Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} fullWidth margin="normal" />
          <TextField label="Revenue" value={formData.revenue} onChange={(e) => setFormData({ ...formData, revenue: e.target.value })} fullWidth margin="normal" />
          <TextField label="Established" value={formData.established} onChange={(e) => setFormData({ ...formData, established: e.target.value })} fullWidth margin="normal" />
          <TextField label="Employees" value={formData.employees} onChange={(e) => setFormData({ ...formData, employees: e.target.value })} fullWidth margin="normal" />
          <TextField label="Contact" value={formData.contact} onChange={(e) => setFormData({ ...formData, contact: e.target.value })} fullWidth margin="normal" />
          <TextField label="Management" value={formData.management} onChange={(e) => setFormData({ ...formData, management: e.target.value })} fullWidth margin="normal" />
          <Button variant="contained" color="primary" onClick={handleModalClose}>Add</Button>
        </Box>
      </Modal>

      {/* Edit Business Unit Modal */}
      <Modal open={openEditModal} onClose={handleModalClose}>
        <Box sx={{ width: 400, padding: 2, margin: 'auto', backgroundColor: '#fff', borderRadius: '8px' }}>
          <Typography variant="h6" component="h2">Edit Business Unit</Typography>
          <TextField label="Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} fullWidth margin="normal" />
          <TextField label="Revenue" value={formData.revenue} onChange={(e) => setFormData({ ...formData, revenue: e.target.value })} fullWidth margin="normal" />
          <TextField label="Established" value={formData.established} onChange={(e) => setFormData({ ...formData, established: e.target.value })} fullWidth margin="normal" />
          <TextField label="Employees" value={formData.employees} onChange={(e) => setFormData({ ...formData, employees: e.target.value })} fullWidth margin="normal" />
          <TextField label="Contact" value={formData.contact} onChange={(e) => setFormData({ ...formData, contact: e.target.value })} fullWidth margin="normal" />
          <TextField label="Management" value={formData.management} onChange={(e) => setFormData({ ...formData, management: e.target.value })} fullWidth margin="normal" />
          <Button variant="contained" color="primary" onClick={handleModalClose}>Save Changes</Button>
        </Box>
      </Modal>

      {/* Delete Business Unit Confirmation Modal */}
      <Modal open={openDeleteModal} onClose={handleModalClose}>
        <Box sx={{ width: 400, padding: 2, margin: 'auto', backgroundColor: '#fff', borderRadius: '8px' }}>
          <Typography variant="h6" component="h2">Are you sure you want to delete this business unit?</Typography>
          <Button variant="contained" color="secondary" onClick={handleModalClose}>Delete</Button>
          <Button variant="outlined" onClick={handleModalClose}>Cancel</Button>
        </Box>
      </Modal>
    </>
  );
};

export default BuPage;
