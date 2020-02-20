import React from 'react';
import PropTypes from 'prop-types';
import './StartForm.scss';

const StartForm = ({
  numberOfRounds,
  difficulty,
  handleFormChange,
  handlePlay
}) => {
  return (
    <form className="form" onSubmit={handlePlay}>
      <label htmlFor="difficulty">Difficulty</label>
      <div className="form-radio-container">
        <input
          type="radio"
          name="difficulty"
          id="difficultyEasy"
          value="easy"
          checked={difficulty === 'easy'}
          onChange={handleFormChange}
        />
        <label htmlFor="difficultyEasy">Easy</label>
        <input
          type="radio"
          name="difficulty"
          id="difficultyMedium"
          value="medium"
          checked={difficulty === 'medium'}
          onChange={handleFormChange}
        />
        <label htmlFor="difficultyMedium">Medium</label>
        <input
          type="radio"
          name="difficulty"
          id="difficultyHard"
          value="hard"
          checked={difficulty === 'hard'}
          onChange={handleFormChange}
        />
        <label htmlFor="difficultyHard">Hard</label>
      </div>
      <label htmlFor="rounds">Rounds</label>
      <div className="form-number-container">
        <button
          type="button"
          id="decrement-round"
          disabled={numberOfRounds > 1 ? false : true}
          onClick={handleFormChange}
        >
          -
        </button>
        <input
          type="number"
          min="1"
          max="50"
          value={numberOfRounds}
          id="rounds"
          name="rounds"
          readOnly
        ></input>
        <button
          type="button"
          id="increment-round"
          disabled={numberOfRounds < 50 ? false : true}
          onClick={handleFormChange}
        >
          +
        </button>
      </div>
      <button type="submit">Play</button>
    </form>
  );
};

StartForm.propTypes = {
  numberOfRounds: PropTypes.number.isRequired,
  difficulty: PropTypes.string.isRequired,
  handleFormChange: PropTypes.func.isRequired,
  handlePlay: PropTypes.func.isRequired
};

export default StartForm;
