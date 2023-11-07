import React, { useState } from 'react';
import { FormControl, FormControlLabel, Radio, RadioGroup, Button, Typography, Paper } from '@mui/material';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import InfoIcon from '@mui/icons-material/Info';
import FormLabel from '@mui/material/FormLabel';

import './form.scss';
import SliderTextFieldForm from './SliderTextFieldForm';
import SliderTextFieldFormHauteurFauche from './SliderTextFieldFormHauteurFauche';
import _ from 'lodash';

import { styled } from '@mui/material/styles';
import Services from "../services/services.js"

const StyledRadioGroup = styled(RadioGroup)({
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '1rem',
});

const StyledFormControl = styled(FormControl)({
    margin: '1rem',
    minWidth: '120px',
    maxWidth: '300px',
    width: '100%',
    '& .MuiFormLabel-root': {
        marginBottom: '0.5rem',
    },
});

const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: '#f5f5f9',
      color: 'rgba(0, 0, 0, 0.87)',
      maxWidth: 400,
      fontSize: theme.typography.pxToRem(12),
      border: '6px solid rgba(97, 97, 97, 0.9)',
      boxShadow: '0px 8px 24px rgba(149, 157, 165, 0.2)',
      borderRadius: '8px'
    },
  }));

const Tip = ({children}) => {

    return (
        <HtmlTooltip placement="left"
            title={
                <React.Fragment>
                    <Typography align="justify"> { children } </Typography>
                </React.Fragment>
        }>
            <InfoIcon color="info" fontSize="small" sx={{ marginRight: '8px' }}/>
        </HtmlTooltip>
    )

}

const Entretien = ({ currentData, setCurrentData, setVisible }) => {
    // Initialisation des options d'entretien en fonction du plan d'entretien choisi par l'utilisateur
    const [selectedOption1, setSelectedOption1] = useState(currentData.planEntretien.parametres[7].value);
    const [selectedOption2, setSelectedOption2] = useState(currentData.planEntretien.parametres[8].value);

    // OPTIONS D'ENTRETIEN
    // Modification de l'utilisateur du paramètre "Fauchage différencié"
    const handleOption1Change = _.debounce((event) => {
        // Mise à jour de la sélection
        setSelectedOption1(event.target.value);
        // clone the current data
        const newCurrentData = { ...currentData };
        // Update the changed value
        newCurrentData.planEntretien.parametres[7].value = event.target.value;
        // Update the currentData with up to date info
        setCurrentData(Services.compute_kpi(newCurrentData));
    }, 100);

    // Modification par l'utilisateur du paramètre "Lutte contre les plantes invasives
    const handleOption2Change = _.debounce((event) => {
        // Mise à jour de la sélection
        setSelectedOption2(event.target.value);
        // clone the current data
        const newCurrentData = { ...currentData };
        // Update the changed value
        newCurrentData.planEntretien.parametres[8].value = event.target.value;
        // Update the currentData with up to date info
        setCurrentData(Services.compute_kpi(newCurrentData));
    }, 100);

    // Modification de l'utilisateur du paramètre "Hauteur de fauche"
    const modifHauteurFauche = _.debounce((id, newValue) => {
        // clone the current data
        const newCurrentData = { ...currentData };
        // Update the changed value
        newCurrentData.planEntretien.parametres[4].value = newValue;
        // Update the currentData with up to date info
        setCurrentData(Services.compute_kpi(newCurrentData));
    }, 100);

    //TYPE DE FAUCHAGE ET VALORISATION
    // Modification de l'utilisateur du paramètre "Fauchage classique"
    const handleSliderChange = (updatedValues) => {
        // clone the current data
        const newCurrentData = { ...currentData };

        newCurrentData.planEntretien.parametres[0].value = updatedValues['slider1']
        newCurrentData.planEntretien.parametres[1].value = updatedValues['slider2']
        newCurrentData.planEntretien.parametres[2].value = updatedValues['slider3']
        newCurrentData.planEntretien.parametres[5].value = updatedValues['slider4']
        newCurrentData.planEntretien.parametres[6].value = updatedValues['slider5']

        // Update the currentData with up to date info
        setCurrentData(Services.compute_kpi(newCurrentData));
    }

    // COMPARAISON
    // Comparaison lancée par l'utilisateur
    function handleButtonClick() {
        setCurrentData(Services.save_currentData({ ...currentData }));
        setVisible(true);
    }

    // Comparaison arrêtée par l'utilisateur
    function handleButtonClickStop() {
        setVisible(false);
    };

    return (
        <div className='entretien'>
            <h1>Entretien</h1>

            <h3>Options d'entretien</h3>
            <StyledFormControl component="fieldset">
                <FormLabel component="legend">
                    <Tip>
                        Le <strong>fauchage différencié</strong> consiste à ne pas faucher de manière systématique l’ensemble de la végétation mais de s’adapter aux besoins du terrain en termes de sécurité.
                    </Tip>
                    Fauchage différencié
                </FormLabel>
                <StyledRadioGroup
                    aria-label="Options"
                    name="fauchage_differencie"
                    value={selectedOption1}
                    onChange={handleOption1Change}
                >
                    <FormControlLabel value="oui" control={<Radio />} label="Oui" />
                    <FormControlLabel value="non" control={<Radio />} label="Non" />
                </StyledRadioGroup>

                <FormLabel component="legend">
                    <Tip>
                        La <strong>lutte contre les plantes invasives</strong> consiste en la réalisation d’actions spécifiques visant à limiter la propagation ou à éradiquer certaines espèces végétales envahissantes comme la renouée du Japon ou l’ambroisie.
                    </Tip>
                    Lutte contre les plantes invasives
                </FormLabel>
                <StyledRadioGroup
                    aria-label="Options"
                    name="lutte_plantes_invasives"
                    value={selectedOption2}
                    onChange={handleOption2Change}
                >
                    <FormControlLabel value="oui" control={<Radio />} label="Oui" />
                    <FormControlLabel value="non" control={<Radio />} label="Non" />
                </StyledRadioGroup>

                <FormLabel component="legend">
                    <Tip>
                    La <strong>hauteur de fauche</strong> correspond à la hauteur à laquelle sont réglés les outils de fauchage et donc à la hauteur de la végétation une fois la fauche réalisée.
                    </Tip>
                    Hauteur de fauche (cm)
                </FormLabel>
                <SliderTextFieldFormHauteurFauche id="slider6" onChange={modifHauteurFauche} currentData={currentData} />

            </StyledFormControl>

            <h3 component="legend">Type de fauchage</h3>
            <StyledFormControl component="fieldset">
                <FormLabel component="legend">
                    <Tip>
                        Le <strong>fauchage classique</strong> correspond à un fauchage réalisé avec des outils standards qui broient la végétation et la laisse sur place.
                    </Tip>
                    Fauchage classique (en %)
                </FormLabel>
                <SliderTextFieldForm id="slider1" onChange={handleSliderChange} currentData={currentData} />
                <FormLabel component="legend">
                    <Tip>
                        Le <strong>fauchage avec collecte</strong> correspond à un fauchage réalisé avec des outils dédiés à la collecte, la végétation est broyée et aspirée. La végétation aspirée est stockée dans un caisson à l’arrière du véhicule porteur.
                    </Tip>
                    Fauchage avec collecte (en %)
                </FormLabel>
                <SliderTextFieldForm id="slider2" onChange={handleSliderChange} currentData={currentData} />
                <FormLabel component="legend">
                    <Tip>
                    Le <strong>fauchage en damier</strong> correspond à un fauchage réalisé avec des outils standards qui broient la végétation et la laisse sur place. La différence avec le fauchage classique réside dans l’alternance entre des zones fauchées et des zones non fauchées.
                    </Tip>
                    Fauchage en damier (en %)
                </FormLabel>
                <SliderTextFieldForm id="slider3" onChange={handleSliderChange} currentData={currentData} />
            </StyledFormControl>

            <h3>Valorisation de l'herbe</h3>
            <StyledFormControl component="fieldset">
                <FormLabel component="legend">
                    <Tip>
                        La biomasse collectée peut être utilisée en <strong>méthanisation</strong> afin de produire du biogaz.
                    </Tip>
                    Méthanisation (en %)
                </FormLabel>
                <SliderTextFieldForm id="slider4" onChange={handleSliderChange} currentData={currentData} />
                <FormLabel component="legend">
                    <Tip>
                        La biomasse collectée peut être utilisée en <strong>compostage</strong> afin de produire du compost.
                    </Tip>
                    Compostage (en %)
                </FormLabel>
                <SliderTextFieldForm id="slider5" onChange={handleSliderChange} currentData={currentData} />
            </StyledFormControl>

            <Button
                variant="contained"
                color="primary"
                onClick={() => handleButtonClick()}
            >
                Effectuer une comparaison
            </Button>
            <Button
                variant="contained"
                color="primary"
                onClick={() => handleButtonClickStop()}
            >
                Arrêter la comparaison
            </Button>

        </div>

    );
};

export { Tip };
export default Entretien;
