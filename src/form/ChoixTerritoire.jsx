import React, { useState } from 'react';
import { Select, Box, FormControl, MenuItem, InputLabel, Button, Paper, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import GeoData from '../services/geoData'
import Typography from '@mui/material/Typography';
import Services from "../services/services.js"

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
    setCurrentData(Services.compute_kpi({...currentData, territoire: territoire}));
    redirect && navigate(redirect);
  }

  return (
    <Grid className='choixEntretienPage' container direction={"row"} justifyContent="center" alignItems="center" sx={{
      backgroundImage: `url(${process.env.PUBLIC_URL + '/images/route_departementale.jpg'})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height:'100vh'
    }}>
      
      <Paper elevation={4} sx={{ minWidth: 700, maxWidth: 1000, width: '70%', padding: 5 }} square={false}>
        <Grid item container direction="row" alignItems="center" justifyContent="center" spacing={5}>
          <Grid item sx={{ width: '50%' }}>
            <Typography variant="h3">
              SAGID
            </Typography>
            <Typography paragraph={true} align="justify">
              Découvrez l’influence de l’entretien des bords de route sur votre territoire et comment valoriser le patrimoine naturel présent sur vos dépendances vertes.
              L’application SAGID permet d’obtenir des évaluations au niveau économique, au niveau des émissions de gaz à effet de serre et au niveau des services écosystémiques fournis par les bords de route.
            </Typography>
          </Grid>
          <Grid item sx={{ width: '50%' }}>
            <Box component="form" onSubmit={handleSubmit}>
              <Grid container direction={"column"} spacing={2}>

                <Grid item>
                  <Typography variant="h6">
                    Je choisis mon territoire
                  </Typography>
                </Grid>

                <Grid item>
                  <FormControl fullWidth size={"small"}>
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
                  <FormControl
                    fullWidth
                    disabled={territoire.region === ''}
                    size={"small"}
                    sx={territoire.region === '' ? {opacity: 0} : {opacity: 1}}
                  >
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
                  <FormControl fullWidth  size={"small"}>
                    <Button
                      color="primary"
                      type="submit"
                      disabled={territoire.departement === ''}
                      variant={territoire.departement === '' ? "outlined" : "contained"}
                      sx={territoire.departement === '' ? {opacity: 0} : {opacity: 1}}
                    >
                      Sélectionner
                    </Button>
                  </FormControl>
                </Grid>

              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Paper>

    </Grid>
  );
}

export default ChoixTerritoire;
