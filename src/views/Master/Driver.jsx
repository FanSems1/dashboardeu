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
  Pagination,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import Swal from 'sweetalert2';
import { gridSpacing } from 'config.js';

const driversData = [
  {
    id: 1,
    name: 'John Doe',
    phone: '123-456-7890',
    businessUnit: 'Logistics',
    image: 'https://via.placeholder.com/100',
  },
  {
    id: 2,
    name: 'Jane Smith',
    phone: '234-567-8901',
    businessUnit: 'Katarasa',
    image: 'https://via.placeholder.com/100',
  },
  {
    id: 3,
    name: 'Mike Johnson',
    phone: '345-678-9012',
    businessUnit: 'Master Diskon',
    image: 'https://via.placeholder.com/100',
  },
  {
    id: 4,
    name: 'Emily Davis',
    phone: '456-789-0123',
    businessUnit: 'Raja Cepat',
    image: 'https://via.placeholder.com/100',
  },
  {
    id: 5,
    name: 'Chris Brown',
    phone: '567-890-1234',
    businessUnit: 'Jaja',
    image: 'https://via.placeholder.com/100',
  },
  {
    id: 6,
    name: 'Lisa White',
    phone: '678-901-2345',
    businessUnit: 'Bookhouse',
    image: 'https://via.placeholder.com/100',
  },
];

const DriverPage = () => {
  const [drivers, setDrivers] = useState(driversData);
  const [selectedUnit, setSelectedUnit] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const rowsPerPage = 6;
  const filteredDrivers = drivers.filter(
    (driver) =>
      driver.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedUnit ? driver.businessUnit === selectedUnit : true)
  );

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleAddDriver = () => {
    Swal.fire({
      title: 'Add Driver',
      html: `
        <div style="text-align: center;">
          <img src="https://via.placeholder.com/100" alt="Add Driver" style="width: 100px; height: 100px; border-radius: 50%;" />
          <input id="driver-name" class="swal2-input" placeholder="Driver Name" />
          <input id="driver-phone" class="swal2-input" placeholder="Phone" />
          <select id="business-unit" class="swal2-input">
            <option value="" disabled selected>Select Business Unit</option>
            <option value="Logistics">Logistics</option>
            <option value="Katarasa">Katarasa</option>
            <option value="Master Diskon">Master Diskon</option>
            <option value="Raja Cepat">Raja Cepat</option>
            <option value="Jaja">Jaja</option>
            <option value="Bookhouse">Bookhouse</option>
          </select>
        </div>
      `,
      focusConfirm: false,
      preConfirm: () => {
        const name = document.getElementById('driver-name').value;
        const phone = document.getElementById('driver-phone').value;
        const businessUnit = document.getElementById('business-unit').value;
        if (!name || !phone || !businessUnit) {
          Swal.showValidationMessage('Please fill in all fields');
          return false;
        }
        return { name, phone, businessUnit };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const newDriver = {
          id: drivers.length + 1,
          name: result.value.name,
          phone: result.value.phone,
          businessUnit: result.value.businessUnit,
          image: 'https://via.placeholder.com/100',
        };
        setDrivers((prev) => [...prev, newDriver]);
        Swal.fire('Success', 'Driver added successfully', 'success');
      }
    });
  };

  const handleEditDriver = (driver) => {
    Swal.fire({
      title: 'Edit Driver',
      html: `
        <div style="text-align: center;">
          <img src="${driver.image}" alt="${driver.name}" style="width: 100px; height: 100px; border-radius: 50%;" />
          <input id="driver-name" class="swal2-input" placeholder="Driver Name" value="${driver.name}" />
          <input id="driver-phone" class="swal2-input" placeholder="Phone" value="${driver.phone}" />
          <select id="business-unit" class="swal2-input">
            <option value="${driver.businessUnit}" selected>${driver.businessUnit}</option>
            <option value="Logistics">Logistics</option>
            <option value="Katarasa">Katarasa</option>
            <option value="Master Diskon">Master Diskon</option>
            <option value="Raja Cepat">Raja Cepat</option>
            <option value="Jaja">Jaja</option>
            <option value="Bookhouse">Bookhouse</option>
          </select>
        </div>
      `,
      focusConfirm: false,
      preConfirm: () => {
        const name = document.getElementById('driver-name').value;
        const phone = document.getElementById('driver-phone').value;
        const businessUnit = document.getElementById('business-unit').value;
        if (!name || !phone || !businessUnit) {
          Swal.showValidationMessage('Please fill in all fields');
          return false;
        }
        return { id: driver.id, name, phone, businessUnit };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedDrivers = drivers.map((d) =>
          d.id === driver.id ? { ...d, name: result.value.name, phone: result.value.phone, businessUnit: result.value.businessUnit } : d
        );
        setDrivers(updatedDrivers);
        Swal.fire('Success', 'Driver updated successfully', 'success');
      }
    });
  };

  const handleDeleteDriver = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        setDrivers(drivers.filter((driver) => driver.id !== id));
        Swal.fire('Deleted!', 'Driver has been deleted.', 'success');
      }
    });
  };

  return (
    <>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <Grid container alignItems="center" justifyContent="space-between" style={{ marginBottom: '16px' }}>
            <TextField
              variant="outlined"
              size="small"
              placeholder="Search Driver Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '250px' }}
            />
            <Grid container spacing={1} alignItems="center" style={{ justifyContent: 'flex-end' }}>
              <Select
                value={selectedUnit}
                onChange={(e) => setSelectedUnit(e.target.value)}
                displayEmpty
                variant="outlined"
                size="small"
                style={{ height: '40px', marginRight: '8px' }}
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
              <Button variant="contained" color="primary" onClick={handleAddDriver}>
                Add Driver
              </Button>
            </Grid>
          </Grid>
        </Grid>

        {filteredDrivers.slice((page - 1) * rowsPerPage, page * rowsPerPage).map((driver) => (
          <Grid item xs={12} sm={6} md={4} key={driver.id}>
            <Card style={{ backgroundColor: '#A9DEF9' }}>
              <CardHeader
                avatar={<img src={driver.image} alt={driver.name} style={{ width: '50px', height: '50px', borderRadius: '50%' }} />}
                title={driver.name}
                action={
                  <>
                    <IconButton onClick={() => handleEditDriver(driver)}>
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteDriver(driver.id)}>
                      <Delete />
                    </IconButton>
                  </>
                }
              />
              <Divider />
              <CardContent>
                <Typography variant="body2" color="textSecondary">
                  Phone: {driver.phone}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Business Unit: {driver.businessUnit}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}

        <Grid item xs={12}>
        <Grid container justifyContent="flex-end">
          <Pagination
            count={Math.ceil(filteredDrivers.length / rowsPerPage)}
            page={page}
            onChange={handlePageChange}
            variant="outlined"
            color="primary"
          />
        </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default DriverPage;
