// src/App.jsx
import React from 'react';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from 'themes';
import Routes from 'routes/index';
import NavigationScroll from '../layout/NavigationScroll';

const App = () => {
  return (
    <NavigationScroll>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme()}>
          <CssBaseline />
          <Routes />
        </ThemeProvider>
      </StyledEngineProvider>
    </NavigationScroll>
  );
};

export default App;
