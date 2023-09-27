import React from 'react';
import { Grid, Box, FormControl, TextField, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { FormLabel, Select, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Custom styling for the form container
const StyledFormContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
});

const StyledFormControl = styled(FormControl)({
  marginBottom: '1rem',
});

const StyledButton = styled(Button)({
  marginTop: '1rem',
});

const StyledTextField = styled(TextField)({
  marginBottom: '1rem',
});

const StyledGridContainer = styled(Grid)({
  width: '100%',
});

const UserRegistrationForm = () => {
  const [organisme, setOrganisme] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [selectedSecteur, setSelectedSecteur] = useState("recherche");

  const handleSecteurChange = (event) => {
    setSelectedSecteur(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setOrganisme("");
    setPostalCode("");
    setSelectedSecteur("Recherche");
  };

  const navigate = useNavigate();
  const redirectToTerritoire = () => {    
    navigate("/territoire"); // Replace '/other-page' with the desired URL or path
}

  return (
    <StyledFormContainer>
      <form onSubmit={handleSubmit}>
        <StyledGridContainer container justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <StyledFormControl fullWidth>
              <StyledTextField label="Organisme" fullWidth value={organisme} />
            </StyledFormControl>
            <StyledFormControl fullWidth>
              <StyledTextField label="Code Postal" fullWidth value={postalCode} />
            </StyledFormControl>
            <StyledFormControl fullWidth>
            <FormLabel>Secteur</FormLabel>
            <Select value={selectedSecteur} onChange={handleSecteurChange}>
            <MenuItem value="recherche">Recherche</MenuItem>
            <MenuItem value="collectivite">Collectivité</MenuItem>
            <MenuItem value="entreprise">Entreprise privée</MenuItem>
            <MenuItem value="particulier">Particulier</MenuItem>
            <MenuItem value="autre">Autre</MenuItem>
          </Select>
            </StyledFormControl>
            <StyledButton type="submit" variant="contained" color="primary" fullWidth onClick={redirectToTerritoire}>
            Continuer
            </StyledButton>
          </Grid>
        </StyledGridContainer>
      </form>
    </StyledFormContainer>
  );
};

export default UserRegistrationForm;
