import React  from 'react';

import { Box, AppBar, Toolbar, Typography } from '@mui/material';
import './main-layout.scss';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Démo SAGID
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <div className="main">
        <div className="main__content">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default MainLayout;