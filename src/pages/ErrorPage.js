import React from 'react';

const ErrorPage = ({ handleTryAgain }) => (
  <div className="container mx-auto p-4 min-h-screen flex flex-col justify-center">
    <h1 className="font-mono text-xl text-center mb-6">
      Whoops! Something went wrong fetching questions from{' '}
      <a
        className="underline"
        href="https://opentdb.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Open Trivia DB
      </a>
      ...{' '}
      <span role="img" aria-label="pensive face">
        😔
      </span>
    </h1>
    <button className="button self-center" onClick={handleTryAgain}>
      try again?
    </button>
  </div>
);

export default ErrorPage;
