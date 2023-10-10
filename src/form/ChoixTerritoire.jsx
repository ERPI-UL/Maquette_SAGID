import React, { useState } from 'react';
import { Select, Box, FormControl, FormGroup, MenuItem, InputLabel, Button, Paper, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import GeoData from '../services/geoData'
import Typography from '@mui/material/Typography';

const UNDEF_TERRITOIRE = { region: '', departement: '' }

const ChoixTerritoire = ( {currentData, setCurrentData, redirect }) => {
  const [territoire, setTerritoire] = useState(UNDEF_TERRITOIRE);
  const navigate = useNavigate();

  const handleRegionChange = (event) => {
    setTerritoire({region: event.target.value, departement: ''})
  };
  
  const handleDepartementChange = (event) => {
    setTerritoire({...territoire, departement: event.target.value});
  };

  const filteredDepartements = () => {
    var res = [];
    if (territoire.region !== '') {
      res = GeoData.departements.list.filter((departement) => departement.REG === territoire.region.REG)
    }
    return res;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setCurrentData({...currentData, territoire: territoire});
    redirect && navigate(redirect);
  }

  return (
    <Paper elevation={4} sx={{ minWidth: 350, padding: 5 }} square={false}>
      <Box component="form" sx={{ width: '100%' }} onSubmit={handleSubmit}>
        <Grid container direction={"column"} spacing={2}>
        
          <Grid item>
            <Typography variant="h6">
              Je choisis mon territoire
            </Typography>
          </Grid>
        
          <Grid item>
            <FormControl fullWidth >
              <InputLabel id="region-select-label">Région</InputLabel>
              <Select
                labelId="region-select-label"
                id="region-select"
                value={territoire.region}
                label="Région"
                onChange={handleRegionChange}
              >
                {GeoData.regions.list.map((region) => {
                  return <MenuItem key={region.REG} value={region}>{region.LIBELLE}</MenuItem>
                })}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item>
            <FormControl fullWidth disabled={territoire.region === ''}>
              <InputLabel id="dept-select-label">Département</InputLabel>
              <Select
                labelId="dept-select-label"
                id="dept-select"
                value={territoire.departement}
                label="Département"
                onChange={handleDepartementChange}
              >
                {filteredDepartements().map((departement) => {
                  return <MenuItem key={departement.DEP} value={departement}>{departement.DEP} - {departement.LIBELLE}</MenuItem>
                })}
              </Select>
            </FormControl>
          </Grid>

          <Grid item>
            <FormControl fullWidth >
              <Button
                color="primary"
                type="submit"
                disabled={territoire.departement === ''}
                variant={territoire.departement === '' ? "outlined" : "contained"}
              >
                Sélectionner
              </Button>
            </FormControl>
          </Grid>

        
        </Grid>
      </Box>
    </Paper>
  );
}

export default ChoixTerritoire;
