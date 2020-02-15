import React from 'react';
import PropTypes from 'prop-types';
import './AnswerMessage.scss';

const AnswerMessage = ({ correct_answer, userAnswer, difficulty }) => {
  let message = '';
  let sips = '';

  switch (difficulty) {
    case 'easy':
      sips = '1 sip 🍹';
      break;
    case 'medium':
      sips = '2 sips 🍹🍹';
      break;
    case 'hard':
      sips = '3 sips 🍹🍹🍹';
      break;
  }

  if (userAnswer) {
    if (userAnswer === correct_answer) {
      message = `🎊 hiya! ${sips} to give away`;
    } else {
      message = `🙈 oops... drink ${sips}`;
    }
  }
  return <p className="answer-message">{message}</p>;
};

AnswerMessage.propTypes = {
  correct_answer: PropTypes.string.isRequired,
  userAnswer: PropTypes.string,
  difficulty: PropTypes.string.isRequired
};

export default AnswerMessage;
