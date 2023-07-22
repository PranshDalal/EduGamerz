import React from 'react';
import { Link } from 'react-router-dom'; 
import './MainMenu.css';

function MainMenu() {
  return (
    <div className="main-menu">
      <h1>Main Menu</h1>
      <ul>
        <li>
          <Link to="/tic-tac-toe">Tic Tac Toe</Link>
        </li>
        {}
      </ul>
    </div>
  );
}

export default MainMenu;
