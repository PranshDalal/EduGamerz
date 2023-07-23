import React from 'react';
import './BackButton.css';

function BackButton() {
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <button className="back-button" onClick={handleGoBack}>
      Back
    </button>
  );
}

export default BackButton;
