import React, { useState } from 'react';
import { styled, Card, CardContent, Typography } from '@mui/material';
import roadImage1 from '../assets/images/Arbres-bord-de-route.jpg';
import roadImage2 from '../assets/images/81731-fosse-02.jpeg';
import roadImage3 from '../assets/images/bord-de-route-gestion-differenciee-prairie-2.jpg';

const StyledContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '1rem',
});

const StyledCard = styled(Card)({
  maxWidth: 150,
  margin: '1rem',
});

const ChoixBord = () => {
  const [percentage1, setPercentage1] = useState(0);
  const [percentage2, setPercentage2] = useState(0);
  const [percentage3, setPercentage3] = useState(0);

  const handlePercentageChange = (event, imageIndex) => {
    const percentage = parseInt(event.target.value, 10);
    let newPercentage1 = percentage1;
    let newPercentage2 = percentage2;
    let newPercentage3 = percentage3;
  
    if (imageIndex === 1) {
      newPercentage1 = percentage;
    } else if (imageIndex === 2) {
      newPercentage2 = percentage;
    } else if (imageIndex === 3) {
      newPercentage3 = percentage;
    }
  
    const sum = newPercentage1 + newPercentage2 + newPercentage3;
  
    // Adjust values if the sum exceeds 100
    if (sum > 100) {
      const diff = sum - 100;
      if (newPercentage1 !== 0) {
        newPercentage1 = Math.max(newPercentage1 - diff, 0);
      } else if (newPercentage2 !== 0) {
        newPercentage2 = Math.max(newPercentage2 - diff, 0);
      } else if (newPercentage3 !== 0) {
        newPercentage3 = Math.max(newPercentage3 - diff, 0);
      }
    }
  
    setPercentage1(newPercentage1);
    setPercentage2(newPercentage2);
    setPercentage3(newPercentage3);
  };
  

  return (
    <StyledContainer>
      <StyledCard>
        <img src={roadImage1} alt="Road 1" width="100%" />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            Lisière : {percentage1}%
          </Typography>
          <input
            type="range"
            min={0}
            max={100}
            value={percentage1}
            onChange={(event) => handlePercentageChange(event, 1)}
          />
        </CardContent>
      </StyledCard>

      <StyledCard>
        <img src={roadImage2} alt="Road 2" width="100%" />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            Fossé : {percentage2}%
          </Typography>
          <input
            type="range"
            min={0}
            max={100}
            value={percentage2}
            onChange={(event) => handlePercentageChange(event, 2)}
          />
        </CardContent>
      </StyledCard>

      <StyledCard>
        <img src={roadImage3} alt="Road 3" width="100%" />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            Fleuri : {percentage3}%
          </Typography>
          <input
            type="range"
            min={0}
            max={100}
            value={percentage3}
            onChange={(event) => handlePercentageChange(event, 3)}
          />
        </CardContent>
      </StyledCard>
    </StyledContainer>
  );
};

export default ChoixBord;
