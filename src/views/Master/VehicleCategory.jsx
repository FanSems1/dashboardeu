import React, { useState } from 'react';
import { Card, CardHeader, CardContent, Divider, Grid, Typography, TextField, Button, MenuItem, Select } from '@mui/material';
import { gridSpacing } from 'config.js';

const businessUnits = [
  { name: 'Master Diskon' },
  { name: 'Katarasa' },
  { name: 'Raja Cepat' },
  { name: 'Jaja' },
  { name: 'Bookhouse' },
  { name: 'Logistics' },
];

const VehicleCategoryPage = () => {
  const [selectedUnit, setSelectedUnit] = useState('');
  const [vehicleName, setVehicleName] = useState('');
  const [vehicleType, setVehicleType] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Vehicle Added:', { vehicleName, vehicleType, selectedUnit });
    setVehicleName('');
    setVehicleType('');
    setSelectedUnit('');
  };

  return (
    <>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title={<Typography component="div" className="card-header">Add New Vehicle Category</Typography>} />
            <Divider />
            <CardContent>
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <TextField
                  label="Vehicle Name"
                  variant="outlined"
                  value={vehicleName}
                  onChange={(e) => setVehicleName(e.target.value)}
                  fullWidth
                  required
                  sx={{ backgroundColor: '#f9f9f9', borderRadius: '5px' }}
                />
                <TextField
                  label="Vehicle Type"
                  variant="outlined"
                  value={vehicleType}
                  onChange={(e) => setVehicleType(e.target.value)}
                  fullWidth
                  required
                  sx={{ backgroundColor: '#f9f9f9', borderRadius: '5px' }}
                />
                <Select
                  value={selectedUnit}
                  onChange={(e) => setSelectedUnit(e.target.value)}
                  displayEmpty
                  fullWidth
                  required
                  sx={{ backgroundColor: '#f9f9f9', borderRadius: '5px' }}
                >
                  <MenuItem value="">
                    <em>Select Business Unit</em>
                  </MenuItem>
                  {businessUnits.map((unit, index) => (
                    <MenuItem key={index} value={unit.name}>
                      {unit.name}
                    </MenuItem>
                  ))}
                </Select>
                <Button variant="contained" type="submit" sx={{ backgroundColor: '#007bff', color: 'white', '&:hover': { backgroundColor: '#0056b3' } }}>
                  Add Vehicle
                </Button>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default VehicleCategoryPage;
