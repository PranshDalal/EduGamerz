import React, { useState, useEffect } from 'react';
import './HangmanGame.css';
import BackButton from './BackButton';

function HangmanGame() {
  const [hangmanWordState, setHangmanWordState] = useState([]);
  const [hangmanFigure, setHangmanFigure] = useState([]);
  const [incorrectGuesses, setIncorrectGuesses] = useState(0);
  const [guess, setGuess] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [question, setQuestion] = useState('');
  const [showInstructions, setShowInstructions] = useState(false);

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    setHangmanWordState([]);
    setHangmanFigure([]);
    setIncorrectGuesses(0);
    setGuess('');
    setResponseMessage('');
    setQuestion('');

    fetch("http://localhost:5000/api/hangman/start")
      .then(res => res.json())
      .then(data => {
        setHangmanWordState(data.hangman_word_state);
      })
      .catch(error => console.error('Error starting new game:', error));

    fetch("http://localhost:5000/api/hangman/start_with_question")
      .then(res => res.json())
      .then(data => {
        setQuestion(data.question);
      })
  };

  const toggleInstructions = () => {
    setShowInstructions(prevState => !prevState);
  };

  const handleGuess = () => {
    if (!guess.trim().match(/^[A-Za-z]$/)) {
      setResponseMessage('Invalid guess. Please enter a single letter.');
      return;
    }

    fetch("http://localhost:5000/api/hangman/guess", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        guess: guess.toUpperCase()
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.message === 'You already guessed that letter.') {
          setResponseMessage(data.message);
        } else if (data.message === 'Correct guess!') {
          setResponseMessage(data.message);
          setHangmanWordState(data.hangman_word_state);
        } else if (data.message === 'Congratulations! You won!') {
          setResponseMessage(data.message);
          setHangmanWordState(data.hangman_word_state);
        } else if (data.message === 'Game over. You lost!') {
          setResponseMessage(data.message);
          setHangmanWordState(data.hangman_word_state);
          setHangmanFigure(data.hangman_figure);
        } else if (data.message === 'Incorrect guess!') {
          setResponseMessage(data.message);
          setHangmanWordState(data.hangman_word_state);
          setHangmanFigure(data.hangman_figure);
          setIncorrectGuesses(prev => prev + 1);
        }

        setGuess('');
      })
      .catch(error => console.error('Error making guess:', error));
  };

  return (
    <div className="hangman-container">
      <h1 className="header">Hangman</h1>
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
      <BackButton />
      <div className="hangman-question">
        <p>{question}</p>
      </div>
      <div className="hangman-figure">
        {hangmanFigure.map((line, index) => (
          <div key={index}>{line}</div>
        ))}
      </div>
      <div className="hangman-word">
        {hangmanWordState.map((letter, index) => (
          <span key={index} className="hangman-letter">
            {letter === '_' ? ' ' : letter}
          </span>
        ))}
      </div>
      <div className="hangman-input">
        <input
          type="text"
          value={guess}
          onChange={(e) => setGuess(e.target.value.toUpperCase())}
          placeholder="Enter your guess..."
        />
        <button className="submit-btn" onClick={handleGuess}>Guess</button>
      </div>
      <p className="response-message">{responseMessage}</p>
      <div className="hangman-guess-count">
        <p>Incorrect Guesses: {incorrectGuesses}</p>
      </div>
      {incorrectGuesses >= 6 && (
        <button className="new-game-btn" onClick={startNewGame}>Start New Game</button>
      )}
    </div>
  );
}

export default HangmanGame;
