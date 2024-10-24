import React, { useState } from 'react';
import {
  Button,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Tooltip,
  InputAdornment,
  TableSortLabel,
  Checkbox,
  Box,
} from '@mui/material';
import { Add, Edit, Delete, GetApp } from '@mui/icons-material';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

// Dummy data for customer legality
const initialLegalities = [
  { id: 1, customerName: 'John Doe', documentName: 'Contract Agreement', status: 'Active', issueDate: '2023-01-01', expiryDate: '2024-01-01', uploadedBy: 'Admin', file: null },
  { id: 2, customerName: 'Jane Smith', documentName: 'Non-disclosure Agreement', status: 'Pending', issueDate: '2022-06-01', expiryDate: '2023-06-01', uploadedBy: 'Admin', file: null },
  { id: 3, customerName: 'Mike Johnson', documentName: 'Service Level Agreement', status: 'Active', issueDate: '2023-05-01', expiryDate: '2024-05-01', uploadedBy: 'Admin', file: null },
  { id: 4, customerName: 'Emily Davis', documentName: 'KYC Compliance', status: 'Active', issueDate: '2023-03-15', expiryDate: '2025-03-15', uploadedBy: 'Admin', file: null },
  { id: 5, customerName: 'Chris Brown', documentName: 'Privacy Policy Agreement', status: 'Pending', issueDate: '2023-02-20', expiryDate: '2024-02-20', uploadedBy: 'Admin', file: null },
];

// ==============================|| CUSTOMER LEGALITY PAGE WITH CRUD ||============================== //

const CustomerLegalityPage = () => {
  const [legalities, setLegalities] = useState(initialLegalities);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedLegality, setSelectedLegality] = useState(null);
  const [newLegality, setNewLegality] = useState({ id: null, documentName: '', customerName: '', status: '', issueDate: '', expiryDate: '', uploadedBy: '', file: null });
  const [searchTerm, setSearchTerm] = useState('');
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('documentName');
  const [selectedIds, setSelectedIds] = useState([]);
  const [privacyOpen, setPrivacyOpen] = useState(false);

  // Handle opening modal for adding or editing
  const handleOpen = (legality = null) => {
    setEditMode(!!legality);
    setSelectedLegality(legality);
    setNewLegality(legality ? legality : { id: null, documentName: '', customerName: '', status: '', issueDate: '', expiryDate: '', uploadedBy: '', file: null });
    setOpen(true);
  };

  // Handle closing modal
  const handleClose = () => {
    setOpen(false);
  };

  // Handle adding or editing legality
  const handleSave = () => {
    if (editMode) {
      setLegalities(legalities.map((item) => (item.id === selectedLegality.id ? newLegality : item)));
    } else {
      setLegalities([...legalities, { ...newLegality, id: legalities.length + 1 }]);
    }
    handleClose();
  };

  // Handle deleting legality
  const handleDelete = (id) => {
    setLegalities(legalities.filter((legality) => legality.id !== id));
    setSelectedIds(selectedIds.filter(selectedId => selectedId !== id)); // Clear the selection if deleted
  };

  // Handle bulk delete
  const handleBulkDelete = () => {
    setLegalities(legalities.filter((legality) => !selectedIds.includes(legality.id)));
    setSelectedIds([]);
  };

  // Handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle sorting
  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedLegalities = legalities
    .filter((legality) =>
      legality.documentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      legality.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      legality.status.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (orderBy === 'documentName') {
        return (order === 'asc' ? a.documentName.localeCompare(b.documentName) : b.documentName.localeCompare(a.documentName));
      } else if (orderBy === 'customerName') {
        return (order === 'asc' ? a.customerName.localeCompare(b.customerName) : b.customerName.localeCompare(a.customerName));
      } else if (orderBy === 'status') {
        return (order === 'asc' ? a.status.localeCompare(b.status) : b.status.localeCompare(a.status));
      } else if (orderBy === 'expiryDate') {
        return (order === 'asc' ? new Date(a.expiryDate) - new Date(b.expiryDate) : new Date(b.expiryDate) - new Date(a.expiryDate));
      } else if (orderBy === 'id') {
        return (order === 'asc' ? a.id - b.id : b.id - a.id); // Sort by ID
      }
      return 0; // Default case
    });

  // Toggle selection
  const handleSelect = (id) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((selectedId) => selectedId !== id);
      }
      return [...prev, id];
    });
  };

  // Handle PDF download
  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    // Add title with spacing
    doc.setFontSize(16); // Set font size for the title
    doc.text('Customer Legalities Report', 14, 16);
    doc.setFontSize(12); // Reset font size for the table

    // Add some vertical spacing before the table
    doc.text('', 14, 24); // Add an empty line to create space (y=24 is lower than y=16)

    // Generate table
    autoTable(doc, {
      head: [['Number', 'Document Name', 'Customer Name', 'Status', 'Issue Date', 'Expiry Date', 'Uploaded By']],
      body: legalities.map(legality => [
        legality.id, 
        legality.documentName, 
        legality.customerName, 
        legality.status, 
        legality.issueDate, 
        legality.expiryDate, 
        legality.uploadedBy
      ]),
      startY: 30, // Start drawing the table from a specific Y position to ensure it is lower on the page
    });

    // Save the PDF
    doc.save('customer_legalities_report.pdf');
  };

  // Handle file change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setNewLegality({ ...newLegality, file });
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card>
            <CardHeader
              title={
                <Typography component="div" className="card-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>Customer Legality Management</span>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleOpen()}
                    style={{ marginLeft: '16px' }} // Add margin for spacing
                  >
                    <Add /> Add Legality
                  </Button>
                </Typography>
              }
            />
            <Divider />
            <CardContent>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs>
                  <TextField
                    placeholder="Search legalities"
                    variant="outlined"
                    size="small"
                    onChange={handleSearch}
                    value={searchTerm}
                    style={{ marginBottom: '8px', marginTop: '8px' }} // Adjust margin to reduce spacing
                  />
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="primary" onClick={() => setPrivacyOpen(true)}>
                    Privacy Policy
                  </Button>
                  <Dialog open={privacyOpen} onClose={() => setPrivacyOpen(false)}>
                    <DialogTitle>Privacy Policy</DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        Your privacy is important to us. Please read our privacy policy carefully.
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={() => setPrivacyOpen(false)} color="primary">
                        Close
                      </Button>
                    </DialogActions>
                  </Dialog>
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="primary" onClick={handleDownloadPDF}>
                    <GetApp /> Download
                  </Button>
                </Grid>
              </Grid>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedIds.length === legalities.length}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedIds(legalities.map((legality) => legality.id));
                          } else {
                            setSelectedIds([]);
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <TableSortLabel
                        active={orderBy === 'documentName'}
                        direction={orderBy === 'documentName' ? order : 'asc'}
                        onClick={() => handleRequestSort('documentName')}
                      >
                        Document Name
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>
                      <TableSortLabel
                        active={orderBy === 'customerName'}
                        direction={orderBy === 'customerName' ? order : 'asc'}
                        onClick={() => handleRequestSort('customerName')}
                      >
                        Customer Name
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>
                      <TableSortLabel
                        active={orderBy === 'status'}
                        direction={orderBy === 'status' ? order : 'asc'}
                        onClick={() => handleRequestSort('status')}
                      >
                        Status
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>
                      <TableSortLabel
                        active={orderBy === 'issueDate'}
                        direction={orderBy === 'issueDate' ? order : 'asc'}
                        onClick={() => handleRequestSort('issueDate')}
                      >
                        Issue Date
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>
                      <TableSortLabel
                        active={orderBy === 'expiryDate'}
                        direction={orderBy === 'expiryDate' ? order : 'asc'}
                        onClick={() => handleRequestSort('expiryDate')}
                      >
                        Expiry Date
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>Uploaded By</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sortedLegalities.map((legality) => (
                    <TableRow key={legality.id}>
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedIds.includes(legality.id)}
                          onChange={() => handleSelect(legality.id)}
                        />
                      </TableCell>
                      <TableCell>{legality.documentName}</TableCell>
                      <TableCell>{legality.customerName}</TableCell>
                      <TableCell>{legality.status}</TableCell>
                      <TableCell>{legality.issueDate}</TableCell>
                      <TableCell>{legality.expiryDate}</TableCell>
                      <TableCell>{legality.uploadedBy}</TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleOpen(legality)}>
                          <Edit />
                        </IconButton>
                        <IconButton onClick={() => handleDelete(legality.id)}>
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {selectedIds.length > 0 && (
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleBulkDelete}
                  style={{ marginTop: '16px' }} // Add margin for spacing
                >
                  Delete Selected
                </Button>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editMode ? 'Edit Legality' : 'Add Legality'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {editMode ? 'Edit the legality details below.' : 'Fill in the legality details below.'}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Document Name"
            type="text"
            fullWidth
            variant="outlined"
            value={newLegality.documentName}
            onChange={(e) => setNewLegality({ ...newLegality, documentName: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Customer Name"
            type="text"
            fullWidth
            variant="outlined"
            value={newLegality.customerName}
            onChange={(e) => setNewLegality({ ...newLegality, customerName: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Status"
            type="text"
            fullWidth
            variant="outlined"
            value={newLegality.status}
            onChange={(e) => setNewLegality({ ...newLegality, status: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Issue Date"
            type="date"
            fullWidth
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            value={newLegality.issueDate}
            onChange={(e) => setNewLegality({ ...newLegality, issueDate: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Expiry Date"
            type="date"
            fullWidth
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            value={newLegality.expiryDate}
            onChange={(e) => setNewLegality({ ...newLegality, expiryDate: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Uploaded By"
            type="text"
            fullWidth
            variant="outlined"
            value={newLegality.uploadedBy}
            onChange={(e) => setNewLegality({ ...newLegality, uploadedBy: e.target.value })}
          />
          <input
            type="file"
            onChange={handleFileChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CustomerLegalityPage;
