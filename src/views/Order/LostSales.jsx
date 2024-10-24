import React from 'react';

// material-ui
import { Card, CardHeader, CardContent, Divider, Grid, Typography } from '@mui/material';

// project import
import { gridSpacing } from 'config.js';

// ==============================|| LOST SALES PAGE ||============================== //

const LoseSalesPage = () => {
  return (
    <>
      <Grid container spacing={gridSpacing}>
        <Grid item>
          <Card>
            <CardHeader title={<Typography component="div" className="card-header">Lose Sales Page</Typography>} />
            <Divider />
            <CardContent>
              <Typography variant="body2">This is the Lose Sales section. Add your content here.</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default LoseSalesPage;
