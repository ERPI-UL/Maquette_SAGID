import React, { useEffect } from 'react';
import './infocard.scss';
import Typography from '@material-ui/core/Typography';

const InfoCard = ({ title, text, list, advice, onClose }) => {
  // Function to handle keyboard events
  const handleKeyPress = (event) => {
    if (event.key === 'Escape' ) {
      onClose();
    }
  };

  // Add event listener when the component mounts
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [onClose]);

  return (
    <div className="external-popup">
      <div className="external-popup__content">
        <button className="external-popup__close-button" onClick={onClose}>
          &times;
        </button>
        <div className="external-popup__text">
          <h2>{title}</h2>
          <Typography>{text}</Typography>
        </div>
        <div className="external-popup__list">
          <h3>Comment analyser la valeur ?</h3>
          <ul>
            <li> - Score 4 ou 5 : {list["good"]}</li>
            <li> - Score de 3 : {list["medium"]}</li>
            <li> - Score de 1 ou 2 : {list["bad"]}</li>
          </ul>
        </div>
        <div className="external-popup__list">
          <h3>Comment améliorer la valeur ?</h3>
          <ul>
            <li> - {advice["positifs"]}</li>
            <li> - {advice["negatifs"]}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
