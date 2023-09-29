import React, { useState } from "react";
import { TextField, Slider, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import FormControl from "@mui/material/FormControl";

import _, { set } from 'lodash';


import {data } from '../constants'

const StyledSlider = styled(Slider)({
  marginLeft: "1rem",
  minWidth: "150px",
  paddingTop: "33px",
  color: "primary",
  "& .MuiSlider-track": {
    display: "none",
  },
});

const StyledNumberInput = styled(TextField)(({ theme }) => ({
  width: "70px",
  height: "56px",
  "& .MuiInputBase-input": {
    textAlign: "center",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: theme.palette.primary.main,
    },
    "&:hover fieldset": {
      borderColor: theme.palette.primary.dark,
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary.dark,
    },
  },
}));

const StyledFormControl = styled(FormControl)({
  margin: "1rem",
});

const SliderTextFieldForm = ({ id, onChange, currentData }) => {

    let initialSliderValue1, initialSliderValue2, initialSliderValue3, initialSliderValue4, initialSliderValue5  = 0;
    let initialTextFieldValue = "0";

    const [sliderValues, setSliderValues] = useState({
        slider1: currentData.planEntretien[4].parametres[0].value,
        slider2: currentData.planEntretien[4].parametres[1].value,
        slider3: currentData.planEntretien[4].parametres[2].value,
        slider4: currentData.planEntretien[4].parametres[5].value,
        slider5: currentData.planEntretien[4].parametres[6].value,
    });
    
    if (id === "slider1") {
        initialSliderValue1 = currentData.planEntretien[4].parametres[0].value;
        initialTextFieldValue = initialSliderValue1.toString();
    } else if (id === "slider2") {
        initialSliderValue2 = currentData.planEntretien[4].parametres[1].value;
        initialTextFieldValue = initialSliderValue2.toString();
    } else if (id === "slider3") {
        initialSliderValue3 = currentData.planEntretien[4].parametres[2].value;
        initialTextFieldValue = initialSliderValue3.toString();
    } else if (id === "slider4") {
        initialSliderValue4 = currentData.planEntretien[4].parametres[5].value;
        initialTextFieldValue = initialSliderValue4.toString();
    } else if (id === "slider5") {
        initialSliderValue5 = currentData.planEntretien[4].parametres[6].value;
        initialTextFieldValue = initialSliderValue5.toString();
    }

    const [textFieldValue, setTextFieldValue] = useState(initialTextFieldValue);

    const handleSliderChange = _.debounce((id, newValue) => {

        // Copiez les valeurs actuelles
        const updatedValues = { ...sliderValues };
        updatedValues[id] = newValue;

        // let slider1Value, slider2Value, slider3Value, slider4Value, slider5Value = 0;
        // const newCurrentData = { ...currentData };

        // currentData.planEntretien[4].parametres[0].value = updatedValues.slider1;
        // currentData.planEntretien[4].parametres[1].value = updatedValues.slider2;
        // currentData.planEntretien[4].parametres[2].value = updatedValues.slider3;
        // currentData.planEntretien[4].parametres[5].value = updatedValues.slider4;
        // currentData.planEntretien[4].parametres[6].value = updatedValues.slider5;
        // console.log("   --> handleSliderChange newCurrentData",newCurrentData);
        // console.log("   --> handleSliderChange currentData",currentData);

        // if (id === "slider1") {

        //     slider1Value = newValue;
        //     slider2Value = updatedValues.slider2;
        //     slider3Value = updatedValues.slider3;
        //     console.log(slider1Value, slider2Value, slider3Value);
        //     if (slider2Value > slider3Value) {
        //         console.log("slider2>slider3");
        //         slider2Value = 100 - slider1Value - slider3Value;
        //     } else {
        //         console.log("slider3>slider2");
        //        slider3Value = 100 - slider1Value - slider2Value;
        //     }
        //     updatedValues.slider1 = slider1Value;
        //     updatedValues.slider2 = slider2Value;
        //     updatedValues.slider3 = slider3Value;
            

        //     newCurrentData.planEntretien[4].parametres[0].value = updatedValues.slider1;
        //     newCurrentData.planEntretien[4].parametres[1].value = updatedValues.slider2;
        //     newCurrentData.planEntretien[4].parametres[2].value = updatedValues.slider3;
        //     newCurrentData.planEntretien[4].parametres[5].value = updatedValues.slider4;
        //     newCurrentData.planEntretien[4].parametres[6].value = updatedValues.slider5;
        // }  else if (id === "slider2") {

        //     slider2Value = newValue;
        //     slider1Value = updatedValues.slider1;
        //     slider3Value = updatedValues.slider3;

        //     if (slider1Value > slider3Value) {
        //         slider1Value = 100 - slider2Value - slider3Value;
        //     } else if (slider3Value > slider2Value - 1) {
        //         slider3Value = 100 - slider1Value - slider2Value;
        //     }
        //     updatedValues.slider1 = slider1Value;
        //     updatedValues.slider2 = slider2Value;
        //     updatedValues.slider3 = slider3Value;
        //     console.log(updatedValues.slider1, updatedValues.slider2, updatedValues.slider3);

        //     newCurrentData.planEntretien[4].parametres[0].value = updatedValues.slider1;
        //     newCurrentData.planEntretien[4].parametres[1].value = updatedValues.slider2;
        //     newCurrentData.planEntretien[4].parametres[2].value = updatedValues.slider3;
        //     newCurrentData.planEntretien[4].parametres[5].value = updatedValues.slider4;
        //     newCurrentData.planEntretien[4].parametres[6].value = updatedValues.slider5;
        // } else if (id === "slider3") {
        //     console.log("PROBLEME");
        //     slider3Value = newValue;
        //     slider1Value = updatedValues.slider1;
        //     slider2Value = updatedValues.slider2;

        //     if (slider1Value > slider2Value) {
        //         slider1Value = 100 - slider3Value - slider2Value;
        //     } else if (slider2Value > slider1Value - 1) {
        //         slider2Value = 100 - slider1Value - slider3Value;
        //     }
        //     updatedValues.slider1 = slider1Value;
        //     updatedValues.slider2 = slider2Value;
        //     updatedValues.slider3 = slider3Value;
        //     console.log(updatedValues.slider1, updatedValues.slider2, updatedValues.slider3);

        //     newCurrentData.planEntretien[4].parametres[0].value = updatedValues.slider1;
        //     newCurrentData.planEntretien[4].parametres[1].value = updatedValues.slider2;
        //     newCurrentData.planEntretien[4].parametres[2].value = updatedValues.slider3;
        //     newCurrentData.planEntretien[4].parametres[5].value = updatedValues.slider4;
        //     newCurrentData.planEntretien[4].parametres[6].value = updatedValues.slider5;
        // } else if (id === "slider4") {
        //   newCurrentData.planEntretien[4].parametres[5].value = newValue;
        // } else if (id === "slider5") {
        //   newCurrentData.planEntretien[4].parametres[6].value = newValue;
        // }
        
        // Mise à jour des sliders
        setSliderValues(updatedValues);
        // Mise à jour du champ texte
        setTextFieldValue(newValue);
        // Appelez la fonction de rappel pour informer le composant parent des changements
        onChange(id, newValue);
        }, 10);
 

  const handleTextFieldChange = (event) => {
    console.log("event", event);
    let parsedValue = parseInt(event.target.value);
    parsedValue = parsedValue < 0 ? 0 : parsedValue;
    setTextFieldValue(parsedValue);
    let newValues = sliderValues;
    newValues[id] = parsedValue;
    if (!isNaN(parsedValue)) {
      setSliderValues(newValues);
      onChange(id, parsedValue);
    }
  };

  return (
      <div className="row">
        <div className="col-3">
          <StyledFormControl >
            <StyledNumberInput
              type="number"
              value={textFieldValue}
              onChange={handleTextFieldChange}
              variant="outlined"
            />
          </StyledFormControl>
        </div>
        <div className="col-9">
          <StyledFormControl>
            <StyledSlider
              value={sliderValues[id]}  
              onChange={(event, newValue) => handleSliderChange(id, newValue)}  
              min={0}
              max={100}
              step={1}
            />
          </StyledFormControl>
        </div>
      </div>
  );
  };

export default SliderTextFieldForm;



