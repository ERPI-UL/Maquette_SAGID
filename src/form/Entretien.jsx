import React, { useState } from 'react';
import { FormControl, FormControlLabel, Radio, RadioGroup, Button } from '@mui/material';
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

const Entretien = ({ currentData, setCurrentData, setVisible }) => {

    // Initialisation des options d'entretien en fonction du plan d'entretien choisi par l'utilisateur
    const [selectedOption1, setSelectedOption1] = useState(currentData.planEntretien[4].parametres[7].value);
    const [selectedOption2, setSelectedOption2] = useState(currentData.planEntretien[4].parametres[8].value);

    // OPTIONS D'ENTRETIEN
    // Modification de l'utilisateur du paramètre "Fauchage différencié"
    const handleOption1Change = _.debounce((event) => {
        // Mise à jour de la sélection
        setSelectedOption1(event.target.value);
        // clone the current data
        const newCurrentData = { ...currentData };
        // Update the changed value
        newCurrentData.planEntretien[4].parametres[7].value = event.target.value;
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
        newCurrentData.planEntretien[4].parametres[8].value = event.target.value;
        // Update the currentData with up to date info
        setCurrentData(Services.compute_kpi(newCurrentData));
    }, 100);

    // Modification de l'utilisateur du paramètre "Hauteur de fauche"
    const modifHauteurFauche = _.debounce((id, newValue) => {
        // clone the current data
        const newCurrentData = { ...currentData };
        // Update the changed value
        newCurrentData.planEntretien[4].parametres[4].value = newValue;
        // Update the currentData with up to date info
        setCurrentData(Services.compute_kpi(newCurrentData));
    }, 100);

    //TYPE DE FAUCHAGE ET VALORISATION
    // Modification de l'utilisateur du paramètre "Fauchage classique"
    const handleSliderChange = _.debounce((id, newValue) => {
        // clone the current data
        const newCurrentData = { ...currentData };
        // Update the changed value
        if (id === "slider1") {
            newCurrentData.planEntretien[4].parametres[0].value = newValue;
        } else if (id === "slider2") {
            newCurrentData.planEntretien[4].parametres[1].value = newValue;
        } else if (id === "slider3") {
            newCurrentData.planEntretien[4].parametres[2].value = newValue;
        } else if (id === "slider4") {
            newCurrentData.planEntretien[4].parametres[5].value = newValue;
        } else if (id === "slider5") {
            newCurrentData.planEntretien[4].parametres[6].value = newValue;
        }
        // Update the currentData with up to date info
        setCurrentData(Services.compute_kpi(newCurrentData));
    }, 100);

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
                <FormLabel component="legend">Fauchage différencié</FormLabel>
                <StyledRadioGroup
                    aria-label="Options"
                    name="fauchage_differencie"
                    value={selectedOption1}
                    onChange={handleOption1Change}
                >
                    <FormControlLabel value="oui" control={<Radio />} label="Oui" />
                    <FormControlLabel value="non" control={<Radio />} label="Non" />
                </StyledRadioGroup>

                <FormLabel component="legend">Lutte contre les plantes invasives</FormLabel>
                <StyledRadioGroup
                    aria-label="Options"
                    name="lutte_plantes_invasives"
                    value={selectedOption2}
                    onChange={handleOption2Change}
                >
                    <FormControlLabel value="oui" control={<Radio />} label="Oui" />
                    <FormControlLabel value="non" control={<Radio />} label="Non" />
                </StyledRadioGroup>

                <FormLabel component="legend">Hauteur de fauche (cm)</FormLabel>
                <SliderTextFieldFormHauteurFauche id="slider6" onChange={modifHauteurFauche} currentData={currentData} />

            </StyledFormControl>

            <h3 component="legend">Type de fauchage</h3>
            <StyledFormControl component="fieldset">
                <FormLabel component="legend">Fauchage classique (en %)</FormLabel>
                <SliderTextFieldForm id="slider1" onChange={(event, newValue) => handleSliderChange("slider1", newValue)} currentData={currentData} />
                <FormLabel component="legend">Fauchage avec collecte (en %)</FormLabel>
                <SliderTextFieldForm id="slider2" onChange={(event, newValue) => handleSliderChange("slider2", newValue)} currentData={currentData} />
                <FormLabel component="legend">Fauchage en damier (en %)</FormLabel>
                <SliderTextFieldForm id="slider3" onChange={(event, newValue) => handleSliderChange("slider3", newValue)} currentData={currentData} />
            </StyledFormControl>

            <h3>Valorisation de l'herbe</h3>
            <StyledFormControl component="fieldset">
                <FormLabel component="legend">Méthanisation (en %)</FormLabel>
                <SliderTextFieldForm id="slider4" onChange={(event, newValue) => handleSliderChange("slider4", newValue)} currentData={currentData} />
                <FormLabel component="legend">Compostage (en %)</FormLabel>
                <SliderTextFieldForm id="slider5" onChange={(event, newValue) => handleSliderChange("slider5", newValue)} currentData={currentData} />
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

export default Entretien;
