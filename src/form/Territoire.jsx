import React from 'react';
import SliderTextFieldForm from './SliderTextFieldForm';
import ChoixBord from './ChoixBord';

import _ from 'lodash';


import "./form.scss";
import { FormLabel } from '@mui/material';

const Territoire = ({currentData, setCurrentData }) => {

  const handleSliderChange = _.debounce((id, newValue) => {
    const newCurrentData = {...currentData};

    //Calcul pour les indicateurs

    newCurrentData.notes_ecosysteme[0].value = newCurrentData.notes_ecosysteme[0].value_after;
    newCurrentData.notes_ecosysteme[1].value = newCurrentData.notes_ecosysteme[1].value_after;
    newCurrentData.notes_ecosysteme[0].value_after = newValue;
    newCurrentData.notes_ecosysteme[1].value_after = newValue;

    newCurrentData.indicateurs_ecosysteme.forEach(e => {
      const randomValue = Math.floor(Math.random() * 5) + 1;
      e.value = e.value_after;
      e.value_after = randomValue;
    });

    newCurrentData.indicateurs_economiques.forEach(e => {
      const randomValue = Math.floor(Math.random() * 1000) + 1;
      e.value = e.value_after;
      e.value_after = randomValue;
    });

    newCurrentData.indicateurs_ges.forEach(e => {
      const randomValue = Math.floor(Math.random() * 1000) + 1;
      e.value = e.value_after;
      e.value_after = randomValue;
    });

    setCurrentData(newCurrentData);
  }, 400);


  return (
    <div className="territoire">
      <h1>Territoire</h1>
        <h3>Réseau routier</h3>
        <FormLabel component="legend">Longueur de réseau routier (en km)</FormLabel>
          <SliderTextFieldForm id="slider2" onChange={(event, newValue) => handleSliderChange("slider2", newValue)} currentData={currentData} />
        <h3>Type de Bord de Route</h3>
        <ChoixBord />
      </div>
  );
};

export default Territoire;
