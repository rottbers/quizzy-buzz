import React from 'react';
import PropTypes from 'prop-types';
import './AnswerButtons.scss';

const AnswerButtons = ({
  shuffled_answers,
  correct_answer,
  userAnswer,
  handleAnswer
}) => {
  // returns appropriate css class
  const highlightButtons = answer => {
    if (answer === correct_answer) {
      return 'correct';
    }
    if (userAnswer === answer) {
      return 'incorrect';
    }
  };

  const buttons = shuffled_answers.map(answer => (
    <button
      value={answer}
      key={answer}
      onClick={handleAnswer}
      className={userAnswer ? highlightButtons(answer) : null}
      disabled={userAnswer ? true : false}
    >
      {answer}
    </button>
  ));

  return <div className="answer-buttons">{buttons}</div>;
};

AnswerButtons.propTypes = {
  shuffled_answers: PropTypes.array.isRequired,
  correct_answer: PropTypes.string,
  userAnswer: PropTypes.string,
  handleAnswer: PropTypes.func.isRequired
};

export default AnswerButtons;
