import React from "react";
import { TextField, Slider } from "@mui/material";
import { styled } from "@mui/material/styles";
import FormControl from "@mui/material/FormControl";

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

  const parametres = currentData.planEntretien.parametres;

  const values = {
    slider1: parametres[0].value,
    slider2: parametres[1].value,
    slider3: parametres[2].value,
    slider4: parametres[5].value,
    slider5: parametres[6].value,
  }

  const maxValue = 100;
  const minValue = 0;
  const stepValue = 1;

  const forceConsistency = (id, newValue) => {
    const updatedValues = { ...values };
    if (['slider1', 'slider2', 'slider3'].includes(id)) {
      if(id === 'slider1') {
        
      }
      if(id === 'slider2' || id === 'slider3') {
        var diff = newValue - updatedValues[id];
        if (diff < 0) {
          updatedValues['slider1'] -= diff
          updatedValues[id] = newValue 
        }
        if (diff > 0) {
          var rest = updatedValues['slider1'] - diff
          if (rest < 0) {
            updatedValues['slider1'] = 0
            updatedValues[id] = newValue
            var other = id === 'slider2' ? 'slider3' : 'slider2'
            updatedValues[other] += rest
          } else {
            updatedValues[id] = newValue
            updatedValues['slider1'] = rest
          }
        } 
      }
    }
    return updatedValues
  }

  const handleChange = (id, newValue) => {
    // Copiez les valeurs actuelles
    newValue = newValue < minValue ? minValue : newValue;
    newValue = newValue > maxValue ? maxValue : newValue;
    if(newValue === values[id]) { return }
    const updatedValues = forceConsistency(id, newValue);
    // Appelez la fonction de rappel pour informer le composant parent des changements
    onChange(updatedValues);
  }

  return (
    <div className="row">
      <div className="col-3">
        <StyledFormControl >
          <StyledNumberInput
            type="number"
            value={values[id]}
            onChange={(event) => handleChange(id, parseInt(event.target.value))}
            variant="outlined"
          />
        </StyledFormControl>
      </div>
      <div className="col-9">
        <StyledFormControl>
          <StyledSlider
            value={values[id]}
            onChange={(event, newValue) => handleChange(id, newValue)}
            min={minValue}
            max={maxValue}
            step={stepValue}
          />
        </StyledFormControl>
      </div>
    </div>
  );
};

export default SliderTextFieldForm;



