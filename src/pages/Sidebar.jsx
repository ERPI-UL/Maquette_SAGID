import React, { useState } from 'react';
import { Tabs, Tab, Typography } from '@mui/material';
import Entretien from '../form/Entretien';
import Territoire from '../form/Territoire';

import styled from '@emotion/styled';

  // Custom styles for the Tabs component
  const StyledTabs = styled(Tabs)({
    backgroundColor: '#green',
  });
  
  // Custom styles for the Tab component
  const StyledTab = styled(Tab)(({ theme }) => ({
    '& .MuiTab-wrapper': {
      color: "green",
    },
    '&.Mui-selected': {
      backgroundColor: '#green',
    },
  }));

const Sidebar = ( {currentData, setCurrentData, setVisible} ) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };



  return (
    <div>
      <StyledTabs value={activeTab} onChange={handleTabChange}>
        <StyledTab label="Plan d'entretien"  />
        <StyledTab label="Territoire" />
      </StyledTabs>
      {activeTab === 0 && (
        <Typography variant="h6" component="div" mt={2}>
          <Entretien currentData={currentData} setCurrentData={setCurrentData} setVisible={setVisible}/>
        </Typography>
      )}
      {activeTab === 1 && (
        <Typography variant="h6" component="div" mt={2}>
          <Territoire currentData={currentData} setCurrentData={setCurrentData} />
        </Typography>
      )}
    </div>
  );
};

export default Sidebar;