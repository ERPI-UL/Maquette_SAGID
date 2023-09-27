import React from "react";
import { SummaryBoxIndicateurs, SummaryBoxSpecialEcosystemique}  from "../summary-box/SummaryBox";
import Box from "../box/Box";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLeaf } from '@fortawesome/free-solid-svg-icons'

import "./ecosystemique.scss";


const EcoSystSmallCard = ({ currentData }) => {
  return (
    <div className="ecosystemique">
      <FontAwesomeIcon icon={faLeaf} />
      <h1 className="ecosystemique__title">Aspect Ecosystémique</h1>
      <div className="col-12 col-md-12">
        <div className="row">
          <div className="col-6 hide-md">
            <h3>Bilan Global</h3>
            <Box>
              <div className="row">
              {currentData.notes_ecosysteme.map((item, index) => (
                <div key={`summary-${index}`}
                  className="col-6 col-md-6 col-sm-12"
                >
                  <SummaryBoxIndicateurs item={item} />
                </div>
              ))}
              </div>
            </Box>
          </div>
          <div className="col-6 hide-md">
            <h3>Impacts sur les services écosystémiques des bords de route</h3>
            <SummaryBoxSpecialEcosystemique item={currentData.indicateurs_ecosysteme} widthGiven={"250px"}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EcoSystSmallCard;
