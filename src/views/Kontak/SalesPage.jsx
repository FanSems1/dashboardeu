import React, { useState, useEffect } from 'react';
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
  TableHead,
  TableRow,
  IconButton,
  MenuItem,
  Select,
  Button,
  Modal,
  TextField,
} from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { createTheme, ThemeProvider } from '@mui/material/styles';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const salesData = [
  { id: 1, company: 'Katarasa', date: '2024-10', amount: 15000000, status: 'Completed' },
  { id: 2, company: 'Master Diskon', date: '2024-10', amount: 10000000, status: 'Pending' },
  { id: 3, company: 'Jaja', date: '2024-10', amount: 12000000, status: 'Completed' },
  { id: 4, company: 'Bookhouse', date: '2024-10', amount: 8000000, status: 'Failed' },
  { id: 5, company: 'Logistics', date: '2024-10', amount: 9500000, status: 'Completed' },
  { id: 6, company: 'Raja Cepat', date: '2024-10', amount: 10500000, status: 'Completed' },
];

const SalesPage = () => {
  const [sales, setSales] = useState(salesData);
  const [filteredSales, setFilteredSales] = useState(salesData);
  const [selectedMonth, setSelectedMonth] = useState('2024-10');
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [currentSale, setCurrentSale] = useState(null);
  const [newSale, setNewSale] = useState({ company: '', amount: '', status: '' });

  useEffect(() => {
    const filtered = sales.filter(sale => sale.date === selectedMonth);
    setFilteredSales(filtered);
  }, [selectedMonth, sales]);

  const handleAddSale = (newSale) => {
    const newId = sales.length ? Math.max(sales.map(sale => sale.id)) + 1 : 1;
    setSales([...sales, { ...newSale, id: newId }]);
    setOpenAddModal(false);
    setNewSale({ company: '', amount: '', status: '' });
  };

  const handleEditSale = (updatedSale) => {
    setSales(sales.map(sale => (sale.id === updatedSale.id ? updatedSale : sale)));
    setOpenEditModal(false);
    setCurrentSale(null);
  };

  const handleDelete = (id) => {
    setSales(sales.filter(sale => sale.id !== id));
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text('Sales Data', 14, 16);
    
    const tableColumn = ['Company', 'Month', 'Amount (Rp)', 'Status'];
    const tableRows = filteredSales.map(sale => [
      sale.company,
      sale.date,
      sale.amount.toLocaleString(),
      sale.status,
    ]);

    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.save('sales_data.pdf');
  };

  const chartData = {
    labels: filteredSales.map(sale => sale.company),
    datasets: [
      {
        label: 'Sales Amount (Rp)',
        data: filteredSales.map(sale => sale.amount),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Theme customization
  const theme = createTheme({
    palette: {
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#dc004e',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card sx={{ boxShadow: 3, borderRadius: 4 }}>
            <CardHeader 
              title={
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h5" color="primary" style={{ fontWeight: '600' }}>Sales Overview</Typography>
                  <Typography variant="h6" component="div" style={{ fontWeight: 'bold', color: '#1976d2' }}>
                    Total Sales: Rp {sales.reduce((acc, sale) => acc + sale.amount, 0).toLocaleString()} | Total Companies: {sales.length}
                  </Typography>
                </div>
              }
            />
            <Divider />
            <CardContent>
              <div style={{ position: 'relative', height: '300px', width: '100%' }}>
                <Bar
                  data={chartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      y: {
                        beginAtZero: true,
                        ticks: {
                          callback: (value) => `Rp ${value.toLocaleString()}`,
                        },
                      },
                    },
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card sx={{ boxShadow: 3, borderRadius: 4 }}>
            <CardHeader 
              title={
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h6">Sales Data by Company</Typography>
                  <div>
                    <Button 
                      variant="contained" 
                      color="primary" 
                      startIcon={<Add />} 
                      onClick={() => setOpenAddModal(true)}
                      sx={{ marginRight: 2 }}
                    >
                      Add Sales
                    </Button>
                    <Button 
                      variant="contained" 
                      color="secondary" 
                      onClick={handleDownloadPDF}
                      sx={{ marginRight: 2 }}
                    >
                      Download PDF
                    </Button>
                    <Select
                      value={selectedMonth}
                      onChange={(e) => setSelectedMonth(e.target.value)}
                      displayEmpty
                      style={{ marginRight: '16px', minWidth: 110, fontSize: 14 }}
                    >
            <MenuItem value="2024-10">October 2024</MenuItem>
            <MenuItem value="2024-09">September 2024</MenuItem>
          </Select>
                  </div>
                </div>
              } 
            />
            <Divider />
            <CardContent>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Company</TableCell>
                    <TableCell>Month</TableCell>
                    <TableCell>Amount (Rp)</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredSales.map((sale, index) => (
                    <TableRow key={sale.id} style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#fff', cursor: 'pointer' }} hover>
                      <TableCell>{sale.company}</TableCell>
                      <TableCell>{sale.date}</TableCell>
                      <TableCell>Rp {sale.amount.toLocaleString()}</TableCell>
                      <TableCell>
                        <Typography color={sale.status === 'Completed' ? 'green' : sale.status === 'Pending' ? 'orange' : 'red'}>
                          {sale.status}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <IconButton onClick={() => { setCurrentSale(sale); setOpenEditModal(true); }} style={{ transition: 'transform 0.2s' }} onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'} onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'} >
                          <Edit color="primary" />
                        </IconButton>
                        <IconButton onClick={() => handleDelete(sale.id)} style={{ transition: 'transform 0.2s' }} onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'} onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'} >
                          <Delete color="error" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Add Sale Modal */}
      <Modal open={openAddModal} onClose={() => setOpenAddModal(false)}>
        <div style={{
          padding: '24px',
          maxWidth: '400px',
          margin: 'auto',
          marginTop: '100px',
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.3s ease-in-out'
        }}>
          <Typography variant="h6" gutterBottom>Add New Sale</Typography>
          <TextField
            label="Company"
            value={newSale.company}
            onChange={(e) => setNewSale({ ...newSale, company: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Amount"
            type="number"
            value={newSale.amount}
            onChange={(e) => setNewSale({ ...newSale, amount: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Status"
            value={newSale.status}
            onChange={(e) => setNewSale({ ...newSale, status: e.target.value })}
            fullWidth
            margin="normal"
          />
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => handleAddSale(newSale)}
            style={{ marginTop: '16px' }}
          >
            Add
          </Button>
        </div>
      </Modal>

      {/* Edit Sale Modal */}
      <Modal open={openEditModal} onClose={() => setOpenEditModal(false)}>
        <div style={{
          padding: '24px',
          maxWidth: '400px',
          margin: 'auto',
          marginTop: '100px',
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.3s ease-in-out'
        }}>
          <Typography variant="h6" gutterBottom>Edit Sale</Typography>
          {currentSale && (
            <>
              <TextField
                label="Company"
                value={currentSale.company}
                onChange={(e) => setCurrentSale({ ...currentSale, company: e.target.value })}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Amount"
                type="number"
                value={currentSale.amount}
                onChange={(e) => setCurrentSale({ ...currentSale, amount: e.target.value })}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Status"
                value={currentSale.status}
                onChange={(e) => setCurrentSale({ ...currentSale, status: e.target.value })}
                fullWidth
                margin="normal"
              />
              <Button 
                variant="contained" 
                color="primary" 
                onClick={() => handleEditSale(currentSale)}
                style={{ marginTop: '16px' }}
              >
                Update
              </Button>
            </>
          )}
        </div>
      </Modal>
    </ThemeProvider>
  );
};

export default SalesPage;
