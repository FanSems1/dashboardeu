import React, { useState } from 'react';
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
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { gridSpacing } from 'config.js';

const initialLocations = [
  {
    id: 1,
    name: 'Warehouse A',
    address: '123 Main St',
    contact: '123-456-7890',
    email: 'managerA@example.com',
    businessUnit: 'Logistics',
    vehiclesAvailable: 'Trucks (5), Vans (3)',
    deliveryAreas: 'Area 1, Area 2',
    position: { lat: -6.200, lng: 106.845 },
  },
  {
    id: 2,
    name: 'Warehouse B',
    address: '456 Market St',
    contact: '987-654-3210',
    email: 'managerB@example.com',
    businessUnit: 'Sales',
    vehiclesAvailable: 'Bikes (10)',
    deliveryAreas: 'Area 3',
    position: { lat: -6.215, lng: 106.846 },
  },
  // Add more initial locations as needed...
];

const VehicleLocationPage = () => {
  const [locations, setLocations] = useState(initialLocations);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentLocation, setCurrentLocation] = useState({
    id: null,
    name: '',
    address: '',
    contact: '',
    businessUnit: '',
    vehiclesAvailable: '',
    deliveryAreas: '',
    position: { lat: -6.200, lng: 106.845 },
  });
  const [filterBusinessUnit, setFilterBusinessUnit] = useState('');

  const handleOpenDialog = (location = null) => {
    if (location) {
      setCurrentLocation(location);
      setEditMode(true);
    } else {
      setCurrentLocation({
        id: null,
        name: '',
        address: '',
        contact: '',
        businessUnit: '',
        vehiclesAvailable: '',
        deliveryAreas: '',
        position: { lat: -6.200, lng: 106.845 },
      });
      setEditMode(false);
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleSave = () => {
    if (editMode) {
      setLocations(locations.map((location) => (location.id === currentLocation.id ? currentLocation : location)));
    } else {
      setLocations([...locations, { ...currentLocation, id: locations.length + 1 }]);
    }
    handleCloseDialog();
  };

  const handleDelete = (id) => {
    setLocations(locations.filter((location) => location.id !== id));
  };

  // Filter locations by business unit
  const filteredLocations = filterBusinessUnit
    ? locations.filter((loc) => loc.businessUnit === filterBusinessUnit)
    : locations;

  return (
    <>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <Card>
            <CardHeader
              title={
                <Grid container alignItems="center" justifyContent="space-between">
                  <Grid item>
                    <Typography component="div" className="card-header">Vehicle Location Management</Typography>
                  </Grid>
                  <Grid item>
                    <FormControl variant="outlined" size="small" style={{ minWidth: 120 }}>
                      <InputLabel>Business Unit</InputLabel>
                      <Select
                        value={filterBusinessUnit}
                        onChange={(e) => setFilterBusinessUnit(e.target.value)}
                        label="Business Unit"
                      >
                        <MenuItem value=""><em>All</em></MenuItem>
                        <MenuItem value="Logistics">Logistics</MenuItem>
                        <MenuItem value="Sales">Sales</MenuItem>
                        <MenuItem value="Service">Service</MenuItem>
                      </Select>
                    </FormControl>
                    <Button variant="contained" startIcon={<Add />} onClick={() => handleOpenDialog()} style={{ marginLeft: '10px' }}>
                      Add New Location
                    </Button>
                  </Grid>
                </Grid>
              }
            />
            <Divider />
            <CardContent>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Location Name</TableCell>
                      <TableCell>Address</TableCell>
                      <TableCell>Contact Number</TableCell>
                      <TableCell>Business Unit</TableCell>
                      <TableCell>Vehicles Available</TableCell>
                      <TableCell>Delivery Areas</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredLocations.map((location) => (
                      <TableRow key={location.id}>
                        <TableCell>{location.name}</TableCell>
                        <TableCell>{location.address}</TableCell>
                        <TableCell>{location.contact}</TableCell>
                        <TableCell>{location.businessUnit}</TableCell>
                        <TableCell>{location.vehiclesAvailable}</TableCell>
                        <TableCell>{location.deliveryAreas}</TableCell>
                        <TableCell>
                          <IconButton color="primary" onClick={() => handleOpenDialog(location)}>
                            <Edit />
                          </IconButton>
                          <IconButton color="secondary" onClick={() => handleDelete(location.id)}>
                            <Delete />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} style={{ height: '400px' }}>
          <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
            <GoogleMap
              mapContainerStyle={{ height: '100%', width: '100%' }}
              center={{ lat: -6.200, lng: 106.845 }}
              zoom={12}
            >
              {filteredLocations.map(location => (
                <Marker key={location.id} position={location.position} title={location.name} />
              ))}
            </GoogleMap>
          </LoadScript>
        </Grid>
      </Grid>

      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>{editMode ? 'Edit Location' : 'Add New Location'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Location Name"
            fullWidth
            variant="outlined"
            value={currentLocation.name}
            onChange={(e) => setCurrentLocation({ ...currentLocation, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Address"
            fullWidth
            variant="outlined"
            value={currentLocation.address}
            onChange={(e) => setCurrentLocation({ ...currentLocation, address: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Contact Phone"
            fullWidth
            variant="outlined"
            value={currentLocation.contact}
            onChange={(e) => setCurrentLocation({ ...currentLocation, contact: e.target.value })}
          />
          <FormControl fullWidth margin="dense" variant="outlined">
            <InputLabel>Business Unit</InputLabel>
            <Select
              value={currentLocation.businessUnit}
              onChange={(e) => setCurrentLocation({ ...currentLocation, businessUnit: e.target.value })}
              label="Business Unit"
            >
              <MenuItem value="Logistics">Logistics</MenuItem>
              <MenuItem value="Sales">Sales</MenuItem>
              <MenuItem value="Service">Service</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            label="Vehicles Available"
            fullWidth
            variant="outlined"
            value={currentLocation.vehiclesAvailable}
            onChange={(e) => setCurrentLocation({ ...currentLocation, vehiclesAvailable: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Delivery Areas"
            fullWidth
            variant="outlined"
            value={currentLocation.deliveryAreas}
            onChange={(e) => setCurrentLocation({ ...currentLocation, deliveryAreas: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
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

export default VehicleLocationPage;
