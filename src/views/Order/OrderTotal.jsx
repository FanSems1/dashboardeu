import React from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { Card, CardHeader, CardContent, Divider, Grid, Typography } from '@mui/material';

// project import
import Breadcrumb from 'component/Breadcrumb';
import { gridSpacing } from 'config.js';

// ==============================|| ORDER TOTAL PAGE ||============================== //

const OrderTotalPage = () => {
  return (
    <>
      <Breadcrumb title="Order Total">
        <Typography component={Link} to="/" variant="subtitle2" color="inherit" className="link-breadcrumb">
          Home
        </Typography>
        <Typography variant="subtitle2" color="primary" className="link-breadcrumb">
          Order Total
        </Typography>
      </Breadcrumb>
      <Grid container spacing={gridSpacing}>
        <Grid item>
          <Card>
            <CardHeader title={<Typography component="div" className="card-header">Order Total Page</Typography>} />
            <Divider />
            <CardContent>
              <Typography variant="body2">This is the Order Total section. Add your content here.</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default OrderTotalPage;
