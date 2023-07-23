import React, { useState, useEffect } from 'react';
import './CrosswordGame.css';
import BackButton from './BackButton';

function CrosswordGame() {
  const [data, setData] = useState(null);
  const [responseMessage, setResponseMessage] = useState('');
  const [showInstructions, setShowInstructions] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch("http://localhost:5000/api/crossword/game")
      .then(res => res.json())
      .then(data => {
        setData(data);
        setResponseMessage('');
      })
      .catch(error => console.error('Error fetching data:', error));
  };

  const handleInputChange = (event, rowIndex, colIndex) => {
    const updatedGrid = data.grid.map((row, i) =>
      row.map((cell, j) =>
        i === rowIndex && j === colIndex ? event.target.value : cell
      )
    );

    setData({
      ...data,
      grid: updatedGrid,
    });
  };

  const handleAnswerSubmit = (event, clue) => {
    event.preventDefault();
    const answer = event.target.value;
    if (answer.trim() !== '') {
      fetch("http://localhost:5000/api/crossword/game", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          clue: clue,
          answer: answer.toUpperCase()
        })
      })
        .then(res => res.json())
        .then(data => {
          setResponseMessage(data.message);
          fetchData();
        })
        .catch(error => console.error('Error submitting answer:', error));
    }
  };

  const toggleInstructions = () => {
    setShowInstructions(prevState => !prevState);
  };

  return (
    <div className="crossword-container">
      <h1 className="header">Crossword Puzzle</h1>
      <BackButton />
      {data ? (
        <div className="crossword-game">
          <button className="how-to-play-btn" onClick={toggleInstructions}>How to Play</button>
        {showInstructions && (
          <div className="instructions">
            <h3>How to Play</h3>
            <p>Answer the question to place your X or O.</p>
            <p>After answering a question, an X will be randomly placed on the board.</p>
            <p>The computer (O) will take its turn automatically.</p>
            <p>The first player to get three Xs or Os in a row (horizontally, vertically, or diagonally) wins the game.</p>
          </div>
        )}
          <div className="crossword-grid">
            {data.grid.map((row, rowIndex) => (
              <div key={rowIndex} className="grid-row">
                {row.map((cell, colIndex) =>
                  cell === ' ' ? (
                    <input
                      key={colIndex}
                      type="text"
                      className="grid-cell input-cell"
                      defaultValue={data.grid[rowIndex][colIndex]}
                      onChange={(event) => handleInputChange(event, rowIndex, colIndex)}
                      onBlur={(event) => handleAnswerSubmit(event, data.clues[`${rowIndex + 1} Down`] || data.clues[`${colIndex + 1} Across`])}
                    />
                  ) : (
                    <div key={colIndex} className="grid-cell filled-cell">
                      {cell}
                    </div>
                  )
                )}
              </div>
            ))}
          </div>
          <div className="clues">
            <h2>Clues</h2>
            <ul>
              {Object.entries(data.clues).map(([clue, clueText]) => (
                <li key={clue}>
                  <strong>{clue}</strong>: {clueText}
                  {data.answers[clue] && ` - Answer: ${data.answers[clue]}`}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <p>Loading data...</p>
      )}
      {responseMessage && <p className="response-message">{responseMessage}</p>}
    </div>
  );
}

export default CrosswordGame;
