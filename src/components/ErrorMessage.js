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
  </div>
);

ErrorMessage.propTypes = {
  tryAgainHandler: PropTypes.func.isRequired
};

export default ErrorMessage;
