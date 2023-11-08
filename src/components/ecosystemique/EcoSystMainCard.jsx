import React from "react";
import {
  SummaryBoxSpecialEcosystemique,
  SummaryBoxIndicateursLogo,
} from "../summary-box/SummaryBox";
import Box from "../box/Box";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeaf } from "@fortawesome/free-solid-svg-icons";
import { Tip } from "../../form/Entretien.jsx"

import "./ecosystemique.scss";

const EcoSystMainCard = ({ currentData, visible }) => {
  let indicators = currentData.indicateurs_ecosysteme.filter((item, index) => (item.display_on_charts));
  let notes = currentData.notes_ecosysteme.filter((item, index) => (item.display_on_charts));
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
              {notes.map((item, index) => (
                <div key={`summary-${index}`}
                  className="col-6 col-md-6 col-sm-12"
                >
                    <SummaryBoxIndicateursLogo item={item} currentData={currentData} index={index} visible={visible}/>
                </div>
              ))}
              </div>
            </Box>
            <h3><Tip>Cliquer sur chaque indicateur pour obtenir plus d'informations !</Tip>Indicateurs écosystémiques</h3>
            <Box>
              <div className="row">
                {indicators.map((item, index) => (
                  <div
                    key={`summary-${index}`}
                    className="col-3 col-md-6 col-sm-12"
                  >
                    <SummaryBoxIndicateursLogo item={item} currentData={currentData} index={index} visible={visible}/>
                  </div>
                ))}
              </div>
            </Box>
          </div>
          <div className="col-6 hide-md">
            <h3>Impacts sur les services écosystémiques des bords de route</h3>
            <SummaryBoxSpecialEcosystemique item={currentData.indicateurs_ecosysteme} widthGiven={"500px"}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EcoSystMainCard;
