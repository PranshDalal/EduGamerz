import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom if using routing
import './MainMenu.css'; // Add the CSS file for the Main Menu

function MainMenu() {
  return (
    <div className="main-menu">
      <h1>Main Menu</h1>
      <ul>
        <li>
          <Link to="/tic-tac-toe">Tic Tac Toe</Link>
        </li>
        {/* Add more menu items for other games */}
      </ul>
    </div>
  );
}

export default MainMenu;
