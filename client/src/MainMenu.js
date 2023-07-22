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
          <Link to="/crossword">Crossword Puzzle</Link>
          <Link to="/hangman">Hangman</Link>
        </li>
        {}
      </ul>
    </div>
  );
}

export default MainMenu;
