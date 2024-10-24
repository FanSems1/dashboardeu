import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { Card, CardHeader, CardContent, Divider, Grid, Typography, TextField, Button, MenuItem, CardMedia, Pagination } from '@mui/material';

// project import
import Breadcrumb from 'component/Breadcrumb';
import { gridSpacing } from 'config.js';

// Promo Data
const promoData = [
  {
    title: 'Master Diskon Super Sale',
    description: 'Get up to 50% off on all items in the Master Diskon collection. Limited time only!',
    discount: '50',
    BisnisUnit: 'Master Diskon',
    startDate: '2024-09-01',
    endDate: '2024-09-30',
    image: 'https://source.unsplash.com/random/200x200?promo1'
  },
  {
    title: 'Bookhouse September Deals',
    description: 'Enjoy 20% off on all books in Bookhouse this September!',
    discount: '20',
    BisnisUnit: 'Bookhouse',
    startDate: '2024-09-05',
    endDate: '2024-09-25',
    image: 'https://source.unsplash.com/random/200x200?promo2'
  },
  {
    title: 'Katarasa Culinary Extravaganza',
    description: 'Savor delicious dishes with a 30% discount at Katarasa. Dine-in only!',
    discount: '30',
    BisnisUnit: 'Katarasa',
    startDate: '2024-09-10',
    endDate: '2024-09-20',
    image: 'https://source.unsplash.com/random/200x200?promo3'
  },
  {
    title: 'Jaja Summer Specials',
    description: 'Cool off with Jaja’s summer drinks – now 15% off!',
    discount: '15',
    BisnisUnit: 'Jaja',
    startDate: '2024-09-01',
    endDate: '2024-09-15',
    image: 'https://source.unsplash.com/random/200x200?promo4'
  },
  {
    title: 'Logistics Shipping Discount',
    description: 'Ship your products with Logistics and save 25% on shipping fees!',
    discount: '25',
    BisnisUnit: 'Logistics',
    startDate: '2024-09-10',
    endDate: '2024-09-30',
    image: 'https://source.unsplash.com/random/200x200?promo5'
  },
  {
    title: 'Raja Cepat Express Delivery',
    description: 'Get 40% off on all express deliveries made through Raja Cepat this week!',
    discount: '40',
    BisnisUnit: 'Raja Cepat',
    startDate: '2024-09-18',
    endDate: '2024-09-25',
    image: 'https://source.unsplash.com/random/200x200?promo6'
  },
  {
    title: 'Master Diskon Flash Sale',
    description: 'Limited-time flash sale! Grab items from Master Diskon at 60% off!',
    discount: '60',
    BisnisUnit: 'Master Diskon',
    startDate: '2024-09-20',
    endDate: '2024-09-22',
    image: 'https://source.unsplash.com/random/200x200?promo7'
  }
];

// Items per page
const itemsPerPage = 3;

// ==============================|| PROMO PAGE ||============================== //

const PromoPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [promoForm, setPromoForm] = useState({
    title: '',
    description: '',
    discount: '',
    BisnisUnit: '',
    startDate: '',
    endDate: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPromoForm({
      ...promoForm,
      [name]: value
    });
  };

  const handleSubmit = () => {
    console.log('Promo Submitted:', promoForm);
    // Handle submitting promo form
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // Paginated Promo Data
  const paginatedPromoData = promoData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <Grid container spacing={gridSpacing}>
        {/* Promo Cards */}
        <Grid item xs={12}>
          <Grid container spacing={gridSpacing}>
            {paginatedPromoData.map((promo, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card>
                  <CardMedia
                    component="img"
                    height="140"
                    image={promo.image}
                    alt={promo.title}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {promo.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {promo.description}
                    </Typography>
                    <Typography variant="h6" color="primary">
                      {promo.discount}% OFF
                    </Typography>
                    <Typography variant="body2">
                      Valid from {promo.startDate} to {promo.endDate}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Pagination */}
        <Grid item xs={12}>
          <Pagination
            count={Math.ceil(promoData.length / itemsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </Grid>

        {/* Form Section */}
        <Grid item xs={12}>
          <Card>
            <CardHeader title={<Typography component="div" className="card-header">Add or Edit Promo</Typography>} />
            <Divider />
            <CardContent>
              <form noValidate autoComplete="off">
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Promo Title"
                      name="title"
                      value={promoForm.title}
                      onChange={handleChange}
                      variant="outlined"
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Discount (%)"
                      name="discount"
                      type="number"
                      value={promoForm.discount}
                      onChange={handleChange}
                      variant="outlined"
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Description"
                      name="description"
                      multiline
                      rows={4}
                      value={promoForm.description}
                      onChange={handleChange}
                      variant="outlined"
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Bisnis Unit"
                      name="Bisnis Unit"
                      select
                      value={promoForm.BisnisUnit}
                      onChange={handleChange}
                      variant="outlined"
                      required
                    >
                      {['Master Diskon', 'Logistics', 'Bookhouse', 'Katarasa', 'Jaja', 'Raja Cepat'].map((BisnisUnit, index) => (
                        <MenuItem key={index} value={BisnisUnit}>
                          {BisnisUnit}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Start Date"
                      name="startDate"
                      type="date"
                      value={promoForm.startDate}
                      onChange={handleChange}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="outlined"
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="End Date"
                      name="endDate"
                      type="date"
                      value={promoForm.endDate}
                      onChange={handleChange}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="outlined"
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                      Submit Promo
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default PromoPage;
