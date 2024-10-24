import value from 'assets/scss/_themes-vars.module.scss';
// eslint-disable-next-line
export default {
  height: 328,
  type: 'donut',
  options: {
    dataLabels: {
      enabled: true, 
      style: {
        fontSize: '12px', 
        colors: ['#ffffff'] 
      }
    },
    yaxis: {
      min: 0,
      max: 1500 
    },
    labels: ['Logistics', 'Master Diskon', 'Katarasa', 'Bookhouse', 'Jaja', 'Raja Cepat'],
    legend: {
      show: true,
      position: 'bottom',
      fontFamily: 'inherit',
      fontSize: '12px', 
      labels: {
        colors: 'inherit'
      }
    },
    itemMargin: {
      horizontal: 10,
      vertical: 10
    },
    colors: [value.error, value.primary, value.info, value.warning, value.success] // Add more colors if necessary
  },
  series: [1258, 975, 500, 250, 300, 400] 
};
