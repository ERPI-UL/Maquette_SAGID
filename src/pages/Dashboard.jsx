// Import React and necessary components and libraries
import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import Box from "../components/box/Box";
import DashboardWrapper, {
  DashboardWrapperMain,
  DashboardWrapperRight,
} from "../components/dashboard-wrapper/DashboardWrapper";
import SummaryBox, {
  SummaryBoxSpecial,
} from "../components/summary-box/SummaryBox";
import { colors, data } from "../constants";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import EcoSystMainCard from "../components/ecosystemique/EcoSystMainCard";
import GESSmallCard from "../components/ges/GESSmallCard";
import EcoNomiqueSmallCard from "../components/economique/EcoNomiqueSmallCard";
import Sidebar from "./Sidebar";
import EcoNomiqueMainCard from "../components/economique/EcoNomiqueMainCard";
import { Button } from "@mui/material";
import EcoSystSmallCard from "../components/ecosystemique/EcoSystSmallCard";
import GESMainCard from "../components/ges/GESMainCard";

// Import FontAwesome icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeaf } from "@fortawesome/free-solid-svg-icons";
import { faEuroSign } from "@fortawesome/free-solid-svg-icons";
import { faSmog } from "@fortawesome/free-solid-svg-icons";

// Import CSS for styling
import "./dashboard.scss";

// Import Material UI components
import { Tabs } from "@material-ui/core";
import { Tab } from "@material-ui/core";

// Import Emotion styled components for custom styling
import styled from "@emotion/styled";

// Import JSON data
import jsonData from "../constants/data.json"; // Adjust the path if needed
import { useEffect } from "react";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Custom styles for the Tabs component
const StyledTabs = styled(Tabs)({
  backgroundColor: "#green", // Set the background color for Tabs
});

// Custom styles for the Tab component
const StyledTab = styled(Tab)(({ theme }) => ({
  "& .MuiTab-wrapper": {
    color: "black", // Set the text color for Tabs
  },
  "&.Mui-selected": {
    backgroundColor: "#green", // Set the background color for the selected Tab
  },
}));

const Dashboard = ({ currentData, setCurrentData }) => {
  // Define state variables using the useState hook
  const [visible, setVisible] = useState(false); // For controlling visibility
  //const [currentData, setCurrentData] = useState(jsonData); // For storing and updating data
  const [selectedTab, setSelectedTab] = useState("ecosystemique"); // For managing selected tab

  // Function to handle tab changes
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <div className="dashboardwrapper">
      <DashboardWrapper>
        <DashboardWrapperMain>
          <div className="row">
            {/* Render Tabs component for tab selection */}
            <StyledTabs
              value={selectedTab}
              onChange={handleTabChange}
              aria-label="My Tabs"
            >
              {/* Render individual Tabs */}
              <StyledTab
                label="Ecosystémique"
                value="ecosystemique"
                icon={<FontAwesomeIcon icon={faLeaf} />}
                onClick={() => setSelectedTab("ecosystemique")}
              />
              <StyledTab
                label="Économique"
                value="economique"
                icon={<FontAwesomeIcon icon={faEuroSign} />}
                onClick={() => setSelectedTab("economique")}
              />
              <StyledTab
                label="GES"
                value="ges"
                icon={<FontAwesomeIcon icon={faSmog} />}
                onClick={() => setSelectedTab("ges")}
              />
            </StyledTabs>
          </div>

          {/* Conditional rendering based on the selected tab */}
          {selectedTab === "ecosystemique" && (
            <div>
              {/* Render components related to the 'ecosystemique' tab */}
              <Box>
                <EcoSystMainCard currentData={currentData} visible={visible} />
              </Box>
              <div className="row">
                <div className="col-6">
                  <Box small>
                    <EcoNomiqueSmallCard
                      currentData={currentData}
                      visible={visible}
                    />
                  </Box>
                </div>
                <div className="col-6">
                  <Box small>
                    <GESSmallCard
                      currentData={currentData}
                      visible={visible}
                    />
                  </Box>
                </div>
              </div>
            </div>
          )}

          {/* Conditional rendering based on the selected tab */}
          {selectedTab === "economique" && (
            <div>
              {/* Render components related to the 'economique' tab */}
              <Box>
                <EcoNomiqueMainCard
                  currentData={currentData}
                  visible={visible}
                />
              </Box>
              <div className="row">
                <div className="col-6">
                  <Box small>
                    <EcoSystSmallCard
                      currentData={currentData}
                      visible={visible}
                    />
                  </Box>
                </div>
                <div className="col-6">
                  <Box small>
                    <GESSmallCard
                      currentData={currentData}
                      visible={visible}
                    />
                  </Box>
                </div>
              </div>
            </div>
          )}

          {/* Conditional rendering based on the selected tab */}
          {selectedTab === "ges" && (
            <div>
              {/* Render components related to the 'ges' tab */}
              <Box>
                <GESMainCard currentData={currentData} visible={visible} />
              </Box>
              <div className="row">
                <div className="col-6">
                  <Box small>
                    <EcoSystSmallCard
                      currentData={currentData}
                      visible={visible}
                    />
                  </Box>
                </div>
                <div className="col-6">
                  <Box small>
                    <EcoNomiqueSmallCard
                      currentData={currentData}
                      visible={visible}
                    />
                  </Box>
                </div>
              </div>
            </div>
          )}
        </DashboardWrapperMain>
        {/* Render Sidebar component */}
        <DashboardWrapperRight>
          <Sidebar
            currentData={currentData}
            setCurrentData={setCurrentData}
            setVisible={setVisible}
          />
        </DashboardWrapperRight>
      </DashboardWrapper>
    </div>
  );
};

export default Dashboard;
