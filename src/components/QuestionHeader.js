import React from 'react';
import PropTypes from 'prop-types';
import './QuestionHeader.scss';

const QuestionHeader = ({ round, numberOfRounds, score, question }) => {
  return (
    <>
      <header className="game-header">
        <p>
          Round {round + 1} of {numberOfRounds}
        </p>
        <p>Score {score}</p>
      </header>
      <h2 className="question">{question}</h2>
    </>
  );
};

QuestionHeader.propTypes = {
  round: PropTypes.number,
  numberOfRounds: PropTypes.number,
  score: PropTypes.number,
  question: PropTypes.string.isRequired
};

export default QuestionHeader;
