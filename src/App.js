import React, { useContext } from 'react';
import { StateContext } from './contexts/StateContext';

import LoadingPage from './pages/LoadingPage';
import ErrorPage from './pages/ErrorPage';
import GamePage from './pages/GamePage';
import StartPage from './pages/StartPage';

import { getQuestions } from './utilities';

import './styles/tailwind.css';

const App = () => {
  const { state, updateState } = useContext(StateContext);
  const { isLoading, isError, isPlaying, difficulty, type, rounds } = state;

  const handlePlay = () => {
    updateState({ isLoading: true, isError: false });

    const url = `https://opentdb.com/api.php?difficulty=${difficulty}&type=${type}&amount=${rounds}`;

    getQuestions(url)
      .then((questions) => updateState({ questions, isLoading: false }))
      .catch(() => updateState({ isError: true, isLoading: false }));

    updateState({ score: 0, round: 0, userAnswers: [], isPlaying: true });
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  if (isError) {
    return <ErrorPage handleTryAgain={handlePlay} />;
  }

  if (isPlaying) {
    return <GamePage />;
  }

  return <StartPage handlePlay={handlePlay} />;
};

export default App;
