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
    <button className="button self-center" onClick={handleTryAgain}>
      Try again?
    </button>
  </Layout>
);

export default ErrorPage;
