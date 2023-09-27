import React from "react";
import {SummaryBoxSpecialEconomique, SummaryBoxNotesEco  } from "../summary-box/SummaryBox";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEuroSign } from '@fortawesome/free-solid-svg-icons'

import "./economique.scss";

const EcoNomiqueSmallCard = ({ currentData, visible }) => {
  // Render the component's content.
  return (
    <div className="economique">
      {/* Render a FontAwesomeIcon with the Euro sign */}
      <FontAwesomeIcon icon={faEuroSign}/>
      <h3>Aspect économique</h3>
      <div className="row">
        <h3>Bilan Global</h3>
        <div className="col-12 col-md-12">
          <div className="row">
            <div className="col-6 hide-md">
              {/* Render the SummaryBoxNotesEco component */}
              <SummaryBoxNotesEco item={currentData.indicateurs_economiques} visible={visible} /> 
            </div>
            <div className="col-6 hide-md">
              {/* Render the SummaryBoxSpecialEconomique component */}
              <SummaryBoxSpecialEconomique item={currentData.indicateurs_economiques} widthGiven={"350px"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Export the EcoNomiqueSmallCard component as the default export.
export default EcoNomiqueSmallCard;


