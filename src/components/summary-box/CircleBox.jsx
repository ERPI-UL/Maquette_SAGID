import React from 'react';
import { styled, Box } from '@mui/material';

const CircleBox = styled(Box)(({ theme, value }) => ({
  width: '50px',
  height: '50px',
  borderRadius: '50%',
  backgroundColor: getColorForValue(value),
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: theme.palette.primary.contrastText,
  fontSize: '24px',
}));

const getColorForValue = (value) => {
  const colorScale = [
    "#FF5733", // Red (for values < 5)
    "#FF8833", // Orange (for values 5-20)
    "#FFB833", // Yellow (for values 20-40)
    "#6D800D", // Light Yellow (for values 40-60)
    "#AFFF33", // Light Green (for values 60-80)
    "#2E804E", // Green (for values >= 80)
  ];

  if (value ===1) {
    return colorScale[0]; // Red
  }
  else if (value === 2){
    return colorScale[1]; // Orange
  }
  else if (value === 3){
    return colorScale[2]; // Yellow
  }
  else if (value === 4){
    return colorScale[4]; // Light Yellow
  }
  else if (value === 5){
    return colorScale[5]; // Light Green
  }
 else if (value > 5 && value < 20) {
    return colorScale[1]; // Orange
  } else if (value >= 20 && value < 40) {
    return colorScale[2]; // Yellow
  } else if (value >= 40 && value < 60) {
    return colorScale[3]; // Light Yellow
  } else if (value >= 60 && value < 80) {
    return colorScale[4]; // Light Green
  } else {
    return colorScale[5]; // Green (for values >= 80)
  }
};

const MyComponent = ({item}) => {
  return (
    <Box>
        <CircleBox value={item.value}> {item.value} </CircleBox>
    </Box>
    );
};

export default MyComponent;
