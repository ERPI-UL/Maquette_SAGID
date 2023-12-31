import React from "react";
import "./summary-box.scss";
import Box from "../box/Box";

import {Bar, Doughnut, Radar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  RadarController,
  RadialLinearScale,
  ArcElement,
} from "chart.js";

import CircleBox from "./CircleBox";
import { Button, Modal } from "@mui/material";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faArrowDown, faArrowUpLong} from "@fortawesome/free-solid-svg-icons";

import { useState } from 'react';

import { Typography, Paper } from "@mui/material";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  RadarController,
  RadialLinearScale,
  ArcElement
);

const datasetColors = [
  '#8624DB',
  '#FF9066',
  '#3F51B5',
  '#fff',
  '#4CAF50',
  '#DB190C',
  '#FFEB3B',];

const SummaryBox = ({ item }) => {
  return (
    <Box>
      <div className="summary-box">
        <div className="summary-box__info">
          <div className="summary-box__info__title">
            <div>{item.title}</div>
          </div>
          <div className="summary-box__info__value">{item.value}</div>
        </div>
      </div>
    </Box>
  );
};

export const SummaryBoxIndicateurs = ({ item }) => {
  return (
    <div className="summary-box">
      <div className="summary-box__info__indicateur">
        <div className="summary-box__info__indicateur__title">
          <CircleBox item={item} />
        </div>
        <div className="summary-box__info__indicateur__value">{item.title}</div>
      </div>
    </div>
  );
};

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  p: 4,
  border: '6px solid rgba(97, 97, 97, 0.9)',
  boxShadow: '0px 8px 24px rgba(149, 157, 165, 0.2)',
  borderRadius: '8px',
  bgcolor: '#f5f5f9',
  color: 'rgba(0, 0, 0, 0.87)'
};

export const SummaryBoxIndicateursLogo = ({ item, currentData, index, visible, displayModal}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div>
      <div className="summary-box">
        <div className="summary-box__info__indicateur">
          <div className="summary-box__info__indicateur__value" key={index} onClick={toggleModal}>
              <CircleBox item={item} />
              { visible && item.value < item.value_saved &&
                <div className="summary-box__info__indicateur__value__indicator">
                  <FontAwesomeIcon icon={faArrowDown} bounce style={{ color: "#ff0000" }} />
                  <sup> - {item.value_saved - item.value} </sup>
                </div>
              }
              { visible && item.value > item.value_saved &&
                <div className="summary-box__info__indicateur__value__indicator">
                  <FontAwesomeIcon icon={faArrowUpLong} bounce style={{ color: "#00ff00" }} />
                  <sup> + {item.value - item.value_saved} </sup>
                </div>
              }
              { visible && item.value === item.value_saved &&
                <div className="summary-box__info__indicateur__value__indicator">
                  =
                </div>
              }
          </div>
          <span className="hover-text">{item.title}</span>
        </div>
      </div>
      { displayModal && (
        <Modal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        >
          <Paper sx={modalStyle}>
            <Typography variant="h3">{item.title}</Typography>
            <Typography align="justify" gutterBottom={true}>{item.text}</Typography>
            <Typography variant="h4">Comment analyser la valeur ?</Typography>
            <ul>
              <li> <Typography align="justify">- <strong>Score 4 ou 5 :</strong> {item.analyse["good"]}</Typography></li>
              <li> <Typography align="justify">- <strong>Score de 3 :</strong> {item.analyse["medium"]}</Typography></li>
              <li> <Typography align="justify" gutterBottom={true}>- <strong>Score de 1 ou 2 :</strong> {item.analyse["bad"]}</Typography></li>
            </ul>
            <Typography variant="h4">Comment améliorer la valeur ?</Typography>
            <Typography align="justify">{item.advices}</Typography>
          </Paper>
        </Modal>
      )}
    </div>
  );
  
};    

export const SummaryBoxNotesEco = ({ item, visible }) => {
  let value_sum_saved = 0;
  let value_sum = 0;
  let percent = 0;

  for (let i = 1; i < item.length; i++) {
    value_sum_saved += item[i].value_saved;
    value_sum += item[i].value;
  }

  percent = Math.round((value_sum - value_sum_saved) / value_sum_saved * 100);

  return (
    <Box>
      <div className="summary-box">
        <div className="summary-box__info__indicateur">
          <div className="summary-box__info__indicateur__title">
            {item[0].value} {item[0].unit} <br />
            {value_sum_saved < value_sum ? ( visible &&  
          <>
            <FontAwesomeIcon icon={faArrowUpLong} bounce style={{ color: "#ff0000" }} />
            <sup> + {percent} % </sup>
          </>
        ) : value_sum_saved > value_sum ? ( visible &&
          <>
            <FontAwesomeIcon icon={faArrowDown} bounce style={{ color: "#00ff00" }} />
            <sup>  {percent} % </sup>
          </>
        ) : ( visible &&
          // Display an arrow to the right when item.value_after equals item.value
          <>
            {/* <FontAwesomeIcon icon={faArrowRight} bounce style={{ color: "#0000ff" }} />
            <sup> 0 % </sup> */}
          </>
        )}

          </div>
          <div className="summary-box__info__indicateur__value">
            {item[0].title} 
          </div>
        </div>
      </div>
    </Box>
  );
};

export const SummaryBoxNotesGes = ({ item, visible }) => {
  let value_sum_saved = 0;
  let value_sum = 0;
  let percent = 0;

  for (let i = 1; i < item.length; i++) {
    value_sum_saved += item[i].value_saved;
    value_sum += item[i].value;
  }

  percent = Math.round((value_sum - value_sum_saved) / value_sum_saved * 100);

  return (
    <Box>
      <div className="summary-box">
        <div className="summary-box__info__indicateur">
          <div className="summary-box__info__indicateur__title">
            {item[1].value} {item[1].unit} <br />
            {value_sum_saved < value_sum ? ( visible &&
              <>
                <FontAwesomeIcon icon={faArrowUpLong} bounce style={{ color: "#ff0000" }} />
                <sup> + {percent} % </sup>
              </>
            ) : value_sum_saved > value_sum ? ( visible &&
              <>
                <FontAwesomeIcon icon={faArrowDown} bounce style={{ color: "#00ff00" }} />
                <sup> {percent} % </sup>
              </>
            ) : ( visible &&
              // Display an arrow to the right when item.value_after equals item.value
              <>
                {/* <FontAwesomeIcon icon={faArrowRight} bounce style={{ color: "#0000ff" }} />
                <sup> 0 %</sup> */}
              </>
            )}
            <Typography variant="h6" gutterBottom> 
            {item[0].title} 
            </Typography>
            <Typography variant="body2" gutterBottom> 
            {item[0].subtitle} <strong>{item[0].value} {item[0].subtitle_2}</strong>
            </Typography>
          </div>
        </div>
      </div>
    </Box>
  );
};

export const SummaryBoxNotesBtn = ({ item }) => {
  let value_sum_saved = 0;

  for (let i = 1; i < item.length; i++) {
    value_sum_saved += item[i].value_saved;
  }

  return (
    <Box>
      <div className="summary-box">
        <div className="summary-box__info__indicateur">
          <div className="summary-box__info__indicateur__title">
            {value_sum_saved} {item[0].unit} <br />
          </div>
          <div className="summary-box__info__indicateur__value">
            {item.title}
          </div>
        </div>
        <Button variant="outlined">
          En savoir plus
        </Button>
      </div>
    </Box>
  );
};

export const SummaryBoxSpecialGES = ({ item }) => {
  const data_saved = []
  const data = []
  const data_labels = []

  for (let i = 0; i < item.length; i++) {
    if (item[i].display_on_charts) {
      data_saved.push(item[i].value_saved)
      data.push(item[i].value)
      data_labels.push(item[i].title)
    }
  }

  const chartOptions = {
    responsive: true,
    scales: {
      xAxis: {
        display: false,
      },
      yAxis: {
        display: false,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
    elements: {
      point: {
        radius: 0,
      },
    },
  };

  const chartData = {
    labels: data_labels,
    datasets: [
      {
        label: "Emission de GES avant ", 
        data: data_saved,
        tension: 0.5,
        backgroundColor: datasetColors,
        borderColor: "white",

      },
      {
        label: "Revenue After",
        data: data,
        tension: 0.5,
        backgroundColor: datasetColors,
        borderColor: "white",

      },
    ],
  };
  return (
    <Box>
      <div className="summary-box-special">
        <div className="summary-box-special__title">{item.title}</div>
        <div className="summary-box-special__value">{item.value}</div>
        <div className="summary-box-special__chart">
          <Doughnut options={chartOptions} data={chartData} width={`250px`} />
        </div>
      </div>
    </Box>
  );
};

export const SummaryBoxSpecialEconomique = ({ item, widthGiven }) => {

  const data_saved = []
  const data = []
  const data_labels = []

  for (let i = 0; i < item.length; i++) {
    if (item[i].display_on_charts) {
      data_saved.push(item[i].value_saved)
      data.push(item[i].value)
      data_labels.push(item[i].title)
    }
  }

  const chartOptions = {
    responsive: true,
    scales: {
      xAxis: {
        display: true,
      },
      yAxis: {
        display: true,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
    elements: {
      point: {
        radius: 1,
      },
    },
  };

  const chartData = {
    labels: data_labels,
    datasets: [
      {
        label: 'Avec les paramètres précédents',
        data: data_saved,
        borderColor: "white",
        tension: 0.5,
        backgroundColor: datasetColors[1],

      },
      {
        label: 'Avec les paramètres actuels',
        data: data,
         borderColor: "white",
         tension: 0.5,
         backgroundColor: datasetColors[2],

       }
    ],
  };
  return (
    <Box>
      <div className="summary-box-special">
        <div className="summary-box-special__title">{item.title}</div>
        <div className="summary-box-special__value">{item.value}</div>
        <div className="summary-box-special__chart">
          <Bar options={chartOptions} data={chartData} width={widthGiven} />
        </div>
      </div>
    </Box>
  );
};

export const SummaryBoxSpecialEcosystemique = ({ item, widthGiven }) => {

  const data_saved = []
  const data = []
  const data_labels = []

  for (let i = 0; i < item.length; i++) {
    if (item[i].display_on_charts) {
      data_saved.push(item[i].value_saved)
      data.push(item[i].value)
      data_labels.push(item[i].title)
    }
  }

  const chartData = {
    labels: data_labels,
    datasets: [{
      label: 'Avec les paramètres actuels ',
      data:data,
      fill: true,
      backgroundColor: datasetColors[2],
      borderColor: 'rgb(54, 162, 235)',
      pointBackgroundColor: 'rgb(54, 162, 235)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(54, 162, 235)'
    }, {
      label: 'Avec les paramètres précédents',
      data: data_saved,
      fill: true,
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: datasetColors[1],
      pointBackgroundColor: 'rgb(255, 99, 132)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(255, 99, 132)'
    }]}

    const chartOptions = {
      responsive: true,
      scales: {
        x: {
          display: false,
        },
        y: {
          display: false,
        },
        r: {
          min: 0,
          max: 5,
          pointLabels: {
            font: {
              size: 11,
            },
          },
        }
        
      },
      plugins: {
        legend: {
          display: true,
          labels: {
            color: 'rgb(255, 99, 132)',
            usePointStyle: true, // Use the point style (marker) for dataset labels
            font: {
              size: 16, // Adjust the font size for dataset labels
            },
          },
        },
      },
      elements: {
        point: {
          radius: 5,
        },
      },
    };

  return (
    <Box>
      <div className="summary-box-special">
        <div className="summary-box-special__chart">
          <Radar
            options={chartOptions}
            data={chartData}
            width={widthGiven}
          />
        </div>
      </div>
    </Box>
  );
};

export const SummaryBoxSpecialEconomique2 = ({ item, widthGiven }) => {

  const data = []
  const data_labels = []

  for (let i = 0; i < item.length; i++) {
    if (item[i].display_on_charts) {
      data.push(item[i].value)
      data_labels.push(item[i].title)
    }
  }

  const chartOptions = {
    responsive: true,
    scales: {
      xAxis: {
        display: true,
      },
      yAxis: {
        display: true,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
    elements: {
      point: {
        radius: 1,
      },
    },
  };

  const chartData = {
    labels: data_labels,
    datasets: [
      {
        label: 'Avec les paramètres actuels',
        data: data,
        borderColor: "white",
        tension: 0.5,
        backgroundColor: datasetColors,

      },

    ],
  };
  return (
    <Box>
      <div className="summary-box-special">
        <div className="summary-box-special__title">{item.title}</div>
        <div className="summary-box-special__value">{item.value}</div>
        <div className="summary-box-special__chart">
          <Pie options={chartOptions} data={chartData} width={widthGiven} />
        </div>
      </div>
    </Box>
  );
};

export default SummaryBox;
