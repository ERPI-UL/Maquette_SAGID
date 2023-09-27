import React from "react";
import SummaryBox, { SummaryBoxIndicateurs, SummaryBoxSpecialGES, SummaryBoxNotesGes } from "../summary-box/SummaryBox";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSmog } from '@fortawesome/free-solid-svg-icons'

import "./ges.scss";

const GESMainCard = ( {currentData, visible} ) => {

  return (
    <div className="ges">
      <FontAwesomeIcon icon={faSmog} />
      <h1>Aspect émission de GES</h1>
        <h3>Bilan Global</h3>
        <div className="col-12 col-md-12">
          <div className="row">
            <div className="col-6 hide-md">
            <SummaryBoxNotesGes item={currentData.indicateurs_ges} visible={visible}/> 
            </div>
            <div className="col-6 hide-md">
            <SummaryBoxSpecialGES item={currentData.indicateurs_ges} widthGiven={"500px"}/>
            </div>
          </div>
        </div>
    </div>
  );
};

export default GESMainCard;
