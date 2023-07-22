import React from 'react';
import { Link } from 'react-router-dom';
import './BackButton.css';

function BackButton() {
  return (
    <Link to="/" className="back-button">Back</Link>
  );
}

export default BackButton;
