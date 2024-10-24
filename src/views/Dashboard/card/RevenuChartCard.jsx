import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Typography,
  useMediaQuery,
} from '@mui/material';

// third-party
import Chart from 'react-apexcharts';

// ==============================|| REVENUE CHART CARD ||============================== //

const RevenuChartCard = ({ chartData }) => {
  const theme = useTheme();

  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
  const matchDownXs = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Card sx={{ maxWidth: 400, margin: '0 auto' }}> {/* Adjusted max width */}
      <CardHeader
        title={
          <Typography variant="h6" component="div" className="card-header"> {/* Changed to h6 */}
            Total Revenue
          </Typography>
        }
      />
      <Divider />
      <CardContent>
        <Grid container spacing={2} direction={matchDownMd && !matchDownXs ? 'row' : 'column'}>
          <Grid item xs={12} sm={7}>
            <Chart {...chartData} />
          </Grid>
          <Grid item sx={{ display: { md: 'block', sm: 'none' } }}>
            <Divider />
          </Grid>
          <Grid
            item
            container
            direction={matchDownMd && !matchDownXs ? 'column' : 'row'}
            justifyContent="space-around"
            alignItems="center"
            xs={12}
            sm={5}
          >
            {[
              { label: 'Logistics', value: '+16.85%', color: theme.palette.primary.main },
              { label: 'Masdis', value: '+45.36%', color: theme.palette.success.main },
              { label: 'Katarasa', value: '-8.69%', color: theme.palette.warning.main },
              { label: 'Bookhouse', value: '-10.69%', color: theme.palette.warning.main },
              { label: 'Jaja', value: '+20.69%', color: theme.palette.primary.main },
              { label: 'Raja Cepat', value: '+30.69%', color: theme.palette.success.main },
            ].map((item, index) => (
              <Grid item key={index}>
                <Grid container direction="column" alignItems="center">
                  <Typography variant="body1">{item.label}</Typography> {/* Changed to body1 for smaller size */}
                  <Box color={item.color}>
                    <Typography variant="caption" color="inherit"> {/* Changed to caption for smaller size */}
                      {item.value}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

RevenuChartCard.propTypes = {
  chartData: PropTypes.object.isRequired,
};

export default RevenuChartCard;
