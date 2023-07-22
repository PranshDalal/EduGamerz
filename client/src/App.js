import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainMenu from './MainMenu';
import TicTacToeGame from './TicTacToeGame'; 
import CrosswordGame from './CrosswordGame';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<MainMenu />} />
          <Route path="/tic-tac-toe" element={<TicTacToeGame />} />
          <Route path="/crossword" element={<CrosswordGame />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
