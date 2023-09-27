import React, { useState } from "react";
import { TextField, Slider, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import FormControl from "@mui/material/FormControl";

import _, { set } from 'lodash';


import {data } from '../constants'

const StyledSlider = styled(Slider)({
  marginLeft: "1rem",
  color: "primary",
  "& .MuiSlider-track": {
    display: "none",
  },
});

const StyledNumberInput = styled(TextField)(({ theme }) => ({
  width: "100px",
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
  minWidth: "120px",
});

const SliderTextFieldForm = ({ id, onChange, currentData }) => {

    let initialSliderValue1, initialSliderValue2, initialSliderValue3, initialSliderValue4, initialSliderValue5  = 0;
    let initialTextFieldValue = "0";

    const [sliderValues, setSliderValues] = useState({
        slider1: currentData.planEntretien[4].parametres[0],
        slider2: currentData.planEntretien[4].parametres[1],
        slider3: currentData.planEntretien[4].parametres[2],
    });
    
    if (id === "slider1") {
        initialSliderValue1 = currentData.planEntretien[4].parametres[0];
        initialTextFieldValue = initialSliderValue1.toString();
    } else if (id === "slider2") {
        initialSliderValue2 = currentData.planEntretien[4].parametres[1];;
        initialTextFieldValue = initialSliderValue2.toString();
    } else if (id === "slider3") {
        initialSliderValue3 = currentData.planEntretien[4].parametres[2];;
        initialTextFieldValue = initialSliderValue3.toString();
    } else if (id === "slider4") {
        initialSliderValue4 = currentData.planEntretien[4].parametres[5];;
        initialTextFieldValue = initialSliderValue4.toString();
    } else if (id === "slider5") {
        initialSliderValue5 = currentData.planEntretien[4].parametres[6];;
        initialTextFieldValue = initialSliderValue5.toString();
    }

    console.log(sliderValues);

    const [textFieldValue, setTextFieldValue] = useState(initialTextFieldValue);

    const handleSliderChange = _.debounce((id, newValue) => {

        // Copiez les valeurs actuelles
        const updatedValues = { ...sliderValues };
        let slider1Value, slider2Value, slider3Value = 0;

        const newCurrentData = { ...currentData };

        if (id === "slider1") {

            slider1Value = newValue;
            slider2Value = updatedValues.slider2;
            slider3Value = updatedValues.slider3;
            console.log(slider1Value, slider2Value, slider3Value);
            if (slider2Value > slider3Value) {
                console.log("slider2>slider3");
                slider2Value = 100 - slider1Value - slider3Value;
            } else {
                console.log("slider3>slider2");
               slider3Value = 100 - slider1Value - slider2Value;
            }
            updatedValues.slider1 = slider1Value;
            updatedValues.slider2 = slider2Value;
            updatedValues.slider3 = slider3Value;
            

            newCurrentData.planEntretien[4].parametres[0] = updatedValues.slider1;
            newCurrentData.planEntretien[4].parametres[1] = updatedValues.slider2;
            newCurrentData.planEntretien[4].parametres[2] = updatedValues.slider3;
        }  else if (id === "slider2") {

            slider2Value = newValue;
            slider1Value = updatedValues.slider1;
            slider3Value = updatedValues.slider3;

            if (slider1Value > slider3Value) {
                slider1Value = 100 - slider2Value - slider3Value;
            } else if (slider3Value > slider2Value - 1) {
                slider3Value = 100 - slider1Value - slider2Value;
            }
            updatedValues.slider1 = slider1Value;
            updatedValues.slider2 = slider2Value;
            updatedValues.slider3 = slider3Value;
            console.log(updatedValues.slider1, updatedValues.slider2, updatedValues.slider3);

            newCurrentData.planEntretien[4].parametres[0] = updatedValues.slider1;
            newCurrentData.planEntretien[4].parametres[1] = updatedValues.slider2;
            newCurrentData.planEntretien[4].parametres[2] = updatedValues.slider3;
        } else if (id === "slider3") {
            console.log("PROBLEME");
            slider3Value = newValue;
            slider1Value = updatedValues.slider1;
            slider2Value = updatedValues.slider2;

            if (slider1Value > slider2Value) {
                slider1Value = 100 - slider3Value - slider2Value;
            } else if (slider2Value > slider1Value - 1) {
                slider2Value = 100 - slider1Value - slider3Value;
            }
            updatedValues.slider1 = slider1Value;
            updatedValues.slider2 = slider2Value;
            updatedValues.slider3 = slider3Value;
            console.log(updatedValues.slider1, updatedValues.slider2, updatedValues.slider3);

            newCurrentData.planEntretien[4].parametres[0] = updatedValues.slider1;
            newCurrentData.planEntretien[4].parametres[1] = updatedValues.slider2;
            newCurrentData.planEntretien[4].parametres[2] = updatedValues.slider3;
        }
        
        // Mettez � jour les valeurs des sliders
        sliderValues.slider1 = updatedValues.slider1;
        sliderValues.slider2 = updatedValues.slider2;
        sliderValues.slider3 = updatedValues.slider3
        console.log("Slider : ")
        console.log(sliderValues)
        
        //const updatedValues = { ...sliderValues };
        setTextFieldValue(newValue);
        // Appelez la fonction de rappel pour informer le composant parent des changements
        onChange(id, newValue);
        }, 100);
 

  const handleTextFieldChange = (event) => {
    setTextFieldValue(event.target.value);
    const parsedValue = parseInt(event.target.value);
    if (!isNaN(parsedValue)) {
      setSliderValues(parsedValue);
      onChange(id, parsedValue);
    }
  };

  return (
      <div className="row">
        <div className="col-6">
          <StyledFormControl>
            <StyledNumberInput
              type="number"
              value={textFieldValue}
              onChange={handleTextFieldChange}
              variant="outlined"
            />
          </StyledFormControl>
        </div>
        <div className="col-6">
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


