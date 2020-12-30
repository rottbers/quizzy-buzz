import React from 'react';
import Layout from '../components/Layout';

// prettier-ignore
const ErrorPage: React.FC<{ handleTryAgain: () => void }> = ({ handleTryAgain }) => (
  <Layout className="justify-center">
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
    <button
      className="self-center button hover:text-gray-900 focus:text-gray-900 hover:bg-gray-100 focus:bg-gray-100"
      onClick={handleTryAgain}
    >
      Try again?
    </button>
  </Layout>
);

export default ErrorPage;
