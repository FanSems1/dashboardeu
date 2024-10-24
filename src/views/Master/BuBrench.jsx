import React, { useState } from 'react';
import jsPDF from 'jspdf';
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  TextField,
  Modal,
  Box,
  Pagination,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';

const companyData = [
  {
    name: "MASTER DISKON",
    details: [
      { location: "Jakarta", phone: "021-1234567", email: "contact@masterdiskon.com" },
      { location: "Surabaya", phone: "031-9876543", email: "info@masterdiskon.com" },
      { location: "Bandung", phone: "022-7654321", email: "support@masterdiskon.com" },
    ],
  },
  {
    name: "JAJA",
    details: [
      { location: "Jakarta", phone: "021-1122334", email: "info@jaja.com" },
      { location: "Medan", phone: "061-2233445", email: "contact@jaja.com" },
    ],
  },
  {
    name: "BOOKHOUSE",
    details: [
      { location: "Bali", phone: "0361-334455", email: "support@bookhouse.com" },
      { location: "Bandung", phone: "022-5566778", email: "contact@bookhouse.com" },
    ],
  },
  {
    name: "LOGISTICS",
    details: [
      { location: "Jakarta", phone: "021-889900", email: "info@logistics.com" },
      { location: "Surabaya", phone: "031-998877", email: "contact@logistics.com" },
      { location: "Makassar", phone: "0411-665544", email: "support@logistics.com" },
    ],
  },
  {
    name: "KATARASA",
    details: [
      { location: "Malang", phone: "0341-223344", email: "info@katarasa.com" },
      { location: "Bali", phone: "0361-556677", email: "contact@katarasa.com" },
    ],
  },
  {
    name: "RAJA CEPAT",
    details: [
      { location: "Jakarta", phone: "021-445566", email: "support@rajacepat.com" },
      { location: "Bandung", phone: "022-889900", email: "info@rajacepat.com" },
      { location: "Medan", phone: "061-334455", email: "contact@rajacepat.com" },
    ],
  },
];

const BuBranchPage = () => {
  const [selectedBusinessUnit, setSelectedBusinessUnit] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [currentDetail, setCurrentDetail] = useState(null);
  const [formData, setFormData] = useState({ name: '', location: '', phone: '', email: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const handleDownloadPDF = (company, detail) => {
    const doc = new jsPDF();
    const title = `${company.name} - ${detail.location} Details`;
    doc.setFontSize(18);
    doc.text(title, 14, 22);
    doc.setFontSize(12);
    doc.text(`Location: ${detail.location}`, 14, 40);
    doc.text(`Phone: ${detail.phone}`, 14, 50);
    doc.text(`Email: ${detail.email}`, 14, 60);
    doc.save(`${company.name}_${detail.location}_details.pdf`);
  };

  const handleEditOpen = (company, detail) => {
    setFormData(detail);
    setCurrentDetail({ company, detail });
    setOpenEditModal(true);
  };

  const handleEditClose = () => {
    setOpenEditModal(false);
    setCurrentDetail(null);
  };

  const handleAddOpen = () => {
    setFormData({ name: '', location: '', phone: '', email: '' });
    setOpenAddModal(true);
  };

  const handleAddClose = () => {
    setOpenAddModal(false);
  };

  const handleDeleteOpen = (company, detail) => {
    setCurrentDetail({ company, detail });
    setOpenDeleteModal(true);
  };

  const handleDeleteClose = () => {
    setOpenDeleteModal(false);
    setCurrentDetail(null);
  };

  const handleFormSubmit = () => {
    handleEditClose();
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const businessUnits = [...new Set(companyData.map(company => company.name))];
  const locations = [...new Set(companyData.flatMap(company => company.details.map(detail => detail.location)))];

  const filteredData = companyData.flatMap(company => 
    company.details.filter(detail => 
      (selectedBusinessUnit === '' || selectedBusinessUnit === company.name) &&
      (selectedLocation === '' || selectedLocation === detail.location) &&
      (detail.location.toLowerCase().includes(searchTerm.toLowerCase()) || company.name.toLowerCase().includes(searchTerm.toLowerCase()))
    ).map(detail => ({ company: company.name, ...detail }))
  );

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  return (
    <Grid container spacing={2} style={{ padding: '20px', background: '#f9f9f9' }}>
      <Grid item xs={12} container justifyContent="space-between" alignItems="center">
        <Typography component="h2" variant="h4" style={{ color: '#3f51b5', fontWeight: 'bold' }}>
          BU Branch Company Group
        </Typography>
        <Grid item>
          <Button variant="contained" color="primary" onClick={handleAddOpen} style={{ marginRight: '10px', borderRadius: '25px' }}>
            Add
          </Button>
          <FormControl variant="outlined" size="small" style={{ minWidth: 140, marginLeft: '10px' }}>
            <InputLabel id="business-unit-label">Business Unit</InputLabel>
            <Select
              labelId="business-unit-label"
              value={selectedBusinessUnit}
              onChange={(e) => setSelectedBusinessUnit(e.target.value)}
              label="Business Unit"
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              {businessUnits.map((unit, index) => (
                <MenuItem key={index} value={unit}>
                  {unit}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl variant="outlined" size="small" style={{ minWidth: 110, marginLeft: '10px' }}>
            <InputLabel id="location-label">Location</InputLabel>
            <Select
              labelId="location-label"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              label="Location"
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              {locations.map((location, index) => (
                <MenuItem key={index} value={location}>
                  {location}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            size="small"
            variant="outlined"
            placeholder="Search"
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ marginLeft: '10px' }}
          />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <TableContainer component={Paper} style={{ borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: 'bold', backgroundColor: '#3f51b5', color: 'white' }}>Company</TableCell>
                <TableCell style={{ fontWeight: 'bold', backgroundColor: '#3f51b5', color: 'white' }}>Location</TableCell>
                <TableCell style={{ fontWeight: 'bold', backgroundColor: '#3f51b5', color: 'white' }}>Phone</TableCell>
                <TableCell style={{ fontWeight: 'bold', backgroundColor: '#3f51b5', color: 'white' }}>Email</TableCell>
                <TableCell style={{ fontWeight: 'bold', backgroundColor: '#3f51b5', color: 'white' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.company}</TableCell>
                  <TableCell>{row.location}</TableCell>
                  <TableCell>{row.phone}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleEditOpen(row.company, row)}><EditIcon /></Button>
                    <Button onClick={() => handleDeleteOpen(row.company, row)}><DeleteIcon /></Button>
                    <Button onClick={() => handleDownloadPDF(row, row)}><DownloadIcon /></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          variant="outlined"
          color="primary"
          style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}
        />
      </Grid>
      <Modal open={openAddModal} onClose={handleAddClose}>
        <Box sx={{ p: 4, bgcolor: 'white', borderRadius: '8px', width: 400, margin: 'auto', marginTop: '100px' }}>
          <Typography variant="h6">Add Business Unit</Typography>
          <TextField label="Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} fullWidth margin="normal" />
          <TextField label="Location" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} fullWidth margin="normal" />
          <TextField label="Phone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} fullWidth margin="normal" />
          <TextField label="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} fullWidth margin="normal" />
          <Button variant="contained" color="primary" onClick={handleFormSubmit} style={{ marginTop: '10px' }}>Save</Button>
        </Box>
      </Modal>
      <Modal open={openEditModal} onClose={handleEditClose}>
        <Box sx={{ p: 4, bgcolor: 'white', borderRadius: '8px', width: 400, margin: 'auto', marginTop: '100px' }}>
          <Typography variant="h6">Edit Business Unit</Typography>
          <TextField label="Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} fullWidth margin="normal" />
          <TextField label="Location" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} fullWidth margin="normal" />
          <TextField label="Phone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} fullWidth margin="normal" />
          <TextField label="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} fullWidth margin="normal" />
          <Button variant="contained" color="primary" onClick={handleFormSubmit} style={{ marginTop: '10px' }}>Update</Button>
        </Box>
      </Modal>
      <Modal open={openDeleteModal} onClose={handleDeleteClose}>
        <Box sx={{ p: 4, bgcolor: 'white', borderRadius: '8px', width: 300, margin: 'auto', marginTop: '100px' }}>
          <Typography variant="h6">Confirm Delete</Typography>
          <Typography>Are you sure you want to delete this record?</Typography>
          <Button variant="contained" color="secondary" onClick={handleDeleteClose} style={{ marginTop: '10px' }}>Delete</Button>
        </Box>
      </Modal>
    </Grid>
  );
};

export default BuBranchPage;
