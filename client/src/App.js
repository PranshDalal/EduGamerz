import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainMenu from './MainMenu';
import TicTacToeGame from './TicTacToeGame'; // Import the Tic Tac Toe game component

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<MainMenu />} />
          <Route path="/tic-tac-toe" element={<TicTacToeGame />} />
          {/* Add more routes for other games */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
