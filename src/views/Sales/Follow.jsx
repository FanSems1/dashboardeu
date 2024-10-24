import React from 'react';

// material-ui
import { Card, CardHeader, CardContent, Divider, Grid, Typography } from '@mui/material';

// project import
import { gridSpacing } from 'config.js';

const FollowPage = () => {
  return (
    <>
      <Grid container spacing={gridSpacing}>
        <Grid item>
          <Card>
            <CardHeader
              title={
                <Typography component="div" className="card-header">
                  FollowUP Page
                </Typography>
              }
            />
            <Divider />
            <CardContent>
              <Typography variant="body2">
                This is the FollowUP section. You can add any content specific to FollowUP here.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default FollowPage;
