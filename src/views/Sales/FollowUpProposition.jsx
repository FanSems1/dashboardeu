import React from 'react';

// material-ui
import { Card, CardHeader, CardContent, Divider, Grid, Typography } from '@mui/material';

// project import
import { gridSpacing } from 'config.js';

// ==============================|| NEW FOLLOW UP PAGE ||============================== //

const PropositionFollowUpPage = () => {
  return (
    <>
      <Grid container spacing={gridSpacing}>
        <Grid item>
          <Card>
            <CardHeader title={<Typography component="div" className="card-header">Follow Up Proposition Page</Typography>} />
            <Divider />
            <CardContent>
              <Typography variant="body2">This is the Follow Up Proposition section. Add your content here.</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default PropositionFollowUpPage;
