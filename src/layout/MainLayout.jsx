import React  from 'react';

import { Box, AppBar, Toolbar, Typography } from '@mui/material';
import './main-layout.scss';
import { Outlet, useNavigate, Link } from 'react-router-dom';


const MainLayout = ({currentData}) => {

  let navigate = useNavigate();

  const changeTerritory = () =>{ 
    navigate('/', {replace:true});
  }
  
  const changePlan = () =>{ 
    navigate('/plan-entretien');
  }

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link to="/" replace reloadDocument>SAGID</Link> 
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