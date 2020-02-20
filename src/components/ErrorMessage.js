import React from 'react';
import PropTypes from 'prop-types';
import './ErrorMessage.scss';

const ErrorMessage = ({ tryAgainHandler }) => (
  <div className="error">
    <p>
      Whoops! Something went wrong fetching questions from{' '}
      <a href="https://opentdb.com/" target="_blank" rel="noopener noreferrer">
        Open Trivia DB
      </a>
      ...{' '}
      <span role="img" aria-label="pensive face">
        😔
      </span>
    </p>
    <button onClick={tryAgainHandler}>try again?</button>
    <p>
      Know what&apos;s wrong? Feel free to{' '}
      <a
        href="https://github.com/rottbers/quizzy-buzz"
        target="_blank"
        rel="noopener noreferrer"
      >
        open an issue on Github
      </a>
      .
    </p>
  </div>
);

ErrorMessage.propTypes = {
  tryAgainHandler: PropTypes.func.isRequired
};

export default ErrorMessage;
