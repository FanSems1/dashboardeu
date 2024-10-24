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
  Checkbox,
  TableSortLabel,
} from '@mui/material';
import { Add, Edit, Delete, GetApp } from '@mui/icons-material';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

// Dummy data for vendor legality
const initialLegalities = [
  { id: 1, vendorName: 'Vendor A', documentName: 'Contract Agreement', status: 'Active', issueDate: '2023-01-01', expiryDate: '2024-01-01', uploadedBy: 'Admin' },
  { id: 2, vendorName: 'Vendor B', documentName: 'Non-disclosure Agreement', status: 'Pending', issueDate: '2022-06-01', expiryDate: '2023-06-01', uploadedBy: 'Admin' },
];

// ==============================|| VENDOR LEGALITY PAGE WITH CRUD ||============================== //


const VendorLegalityPage = () => {
  const [legalities, setLegalities] = useState(initialLegalities);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedLegality, setSelectedLegality] = useState(null);
  const [newLegality, setNewLegality] = useState({ id: null, documentName: '', vendorName: '', status: '', issueDate: '', expiryDate: '', uploadedBy: '', file: null });
  const [searchTerm, setSearchTerm] = useState('');
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('documentName');
  const [selectedIds, setSelectedIds] = useState([]);
  const [privacyOpen, setPrivacyOpen] = useState(false);

  // Handle opening modal for adding or editing
  const handleOpen = (legality = null) => {
    setEditMode(!!legality);
    setSelectedLegality(legality);
    setNewLegality(legality ? legality : { id: null, documentName: '', vendorName: '', status: '', issueDate: '', expiryDate: '', uploadedBy: '', file: null });
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
      legality.vendorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      legality.status.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (orderBy === 'documentName') {
        return (order === 'asc' ? a.documentName.localeCompare(b.documentName) : b.documentName.localeCompare(a.documentName));
      } else if (orderBy === 'vendorName') {
        return (order === 'asc' ? a.vendorName.localeCompare(b.vendorName) : b.vendorName.localeCompare(a.vendorName));
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
    doc.setFontSize(16);
    doc.text('Vendor Legalities Report', 14, 16);
    doc.setFontSize(12);
    doc.text('', 14, 24);
    autoTable(doc, {
      head: [['Number', 'Document Name', 'Vendor Name', 'Status', 'Issue Date', 'Expiry Date', 'Uploaded By']],
      body: legalities.map(legality => [
        legality.id, 
        legality.documentName, 
        legality.vendorName, 
        legality.status, 
        legality.issueDate, 
        legality.expiryDate, 
        legality.uploadedBy
      ]),
      startY: 30,
    });
    doc.save('vendor_legalities_report.pdf');
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card>
            <CardHeader
              title={
                <Typography component="div" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography variant="h6">Vendor Legality Management</Typography>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <TextField
                      placeholder="Search legalities"
                      variant="outlined"
                      size="small"
                      onChange={handleSearch}
                      value={searchTerm}
                      style={{ marginRight: '16px' }}
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleOpen()}
                      style={{ marginRight: '16px' }}
                    >
                      <Add /> Add Legality
                    </Button>
                    <Button variant="outlined" color="primary" onClick={() => setPrivacyOpen(true)}>
                      Privacy Policy
                    </Button>
                  </div>
                </Typography>
              }
            />
            <Divider />
            <CardContent>
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
                        active={orderBy === 'vendorName'}
                        direction={orderBy === 'vendorName' ? order : 'asc'}
                        onClick={() => handleRequestSort('vendorName')}
                      >
                        Vendor Name
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
                    <TableCell>
                      <TableSortLabel
                        active={orderBy === 'uploadedBy'}
                        direction={orderBy === 'uploadedBy' ? order : 'asc'}
                        onClick={() => handleRequestSort('uploadedBy')}
                      >
                        Uploaded By
                      </TableSortLabel>
                    </TableCell>
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
                      <TableCell>{legality.vendorName}</TableCell>
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
                  variant="outlined"
                  color="secondary"
                  onClick={handleBulkDelete}
                  style={{ marginTop: '8px' }} // Added margin to separate from the table
                >
                  Delete Selected
                </Button>
              )}
              <Button
                variant="outlined"
                color="primary"
                onClick={handleDownloadPDF}
                style={{ marginTop: '8px', marginLeft: '16px' }} // Added margin to separate from the table
              >
                <GetApp /> Download PDF
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Add/Edit Modal */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editMode ? 'Edit Legality' : 'Add Legality'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {editMode ? 'Edit the details of the legality.' : 'Fill in the details of the new legality.'}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Document Name"
            type="text"
            fullWidth
            value={newLegality.documentName}
            onChange={(e) => setNewLegality({ ...newLegality, documentName: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Vendor Name"
            type="text"
            fullWidth
            value={newLegality.vendorName}
            onChange={(e) => setNewLegality({ ...newLegality, vendorName: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Status"
            type="text"
            fullWidth
            value={newLegality.status}
            onChange={(e) => setNewLegality({ ...newLegality, status: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Issue Date"
            type="date"
            fullWidth
            value={newLegality.issueDate}
            onChange={(e) => setNewLegality({ ...newLegality, issueDate: e.target.value })}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            margin="dense"
            label="Expiry Date"
            type="date"
            fullWidth
            value={newLegality.expiryDate}
            onChange={(e) => setNewLegality({ ...newLegality, expiryDate: e.target.value })}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            margin="dense"
            label="Uploaded By"
            type="text"
            fullWidth
            value={newLegality.uploadedBy}
            onChange={(e) => setNewLegality({ ...newLegality, uploadedBy: e.target.value })}
          />
          <input
            type="file"
            onChange={(e) => setNewLegality({ ...newLegality, file: e.target.files[0] })}
            style={{ marginTop: '16px' }}
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

      {/* Privacy Policy Dialog */}
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
    </>
  );
};

export default VendorLegalityPage;
