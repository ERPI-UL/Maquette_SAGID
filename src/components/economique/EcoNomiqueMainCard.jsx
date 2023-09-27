import React, { useState } from "react";
import { SummaryBoxSpecialEconomique,  SummaryBoxSpecialEconomique_2} from "../summary-box/SummaryBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEuroSign } from "@fortawesome/free-solid-svg-icons";
import { Tabs, Tab } from "@mui/material";
import styled from "@emotion/styled";

import "./economique.scss";

const StyledTab = styled(Tab)(({ theme }) => ({
  fontSize: "18px",
  fontWeight: "bold",
  paddingBottom: "10px",
  color: "#333333",
  "&.Mui-selected": {
    color: "#ff0000",
  },
}));

const EcoSystMainCard = ({ currentData, visible }) => {
  // Declare and initialize a state variable 'activeTab' using the 'useState' hook.
  // 'activeTab' keeps track of the currently selected tab.
  const [activeTab, setActiveTab] = useState(0);

  // Define a function 'handleTabChange' that updates the 'activeTab' state variable
  // when a new tab is selected.
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Render the component's content.
  return (
    <div className="economique eco-main">
      {/* Render a FontAwesomeIcon with the Euro sign */}
      <FontAwesomeIcon icon={faEuroSign} />
      <h1>Aspect économique</h1>
      <h3>Bilan Global</h3>
      <div className="col-12 col-md-12">
        <div className="row">
          <div className="col-3">
            {/* Render vertical tabs with 'activeTab' controlled by 'value' prop */}
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={activeTab}
              onChange={handleTabChange} // Handle tab changes with 'handleTabChange' function
            >
              <StyledTab
                label={
                  "Evolution des coûts d'entretien" // Label for the first tab
                }
              />
              <StyledTab
                label={
                  "Détail des coûts d'entretien" // Label for the second tab
                }
              />
            </Tabs>
          </div>
          <div className="col-9">
            {/* Render content based on the selected tab */}
            {activeTab === 0 && (
              // Render SummaryBoxSpecialEconomique if the first tab is active
              <SummaryBoxSpecialEconomique
                item={currentData.indicateurs_economiques}
                widthGiven={"500px"}
              />
            )}
            {activeTab === 1 && (
              // Render SummaryBoxSpecialEconomique_2 if the second tab is active
              <SummaryBoxSpecialEconomique_2
                item={currentData.indicateurs_economiques}
                widthGiven={"500px"}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Export the EcoSystMainCard component as the default export.
export default EcoSystMainCard;