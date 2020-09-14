import React, { useContext } from 'react';
import { StateContext } from './contexts/StateContext';

import LoadingPage from './pages/LoadingPage';
import ErrorPage from './pages/ErrorPage';
import GamePage from './pages/GamePage';
import GameSummaryPage from './pages/GameSummaryPage';
import StartPage from './pages/StartPage';

import { getQuestions } from './utilities';

import './styles/tailwind.css';

function App(): JSX.Element {
  const { state, updateState } = useContext(StateContext);
  const {
    isLoading,
    isError,
    isPlaying,
    isGameOver,
    difficulty,
    type,
    rounds,
  } = state;

  async function handlePlay() {
    updateState({ isLoading: true, isError: false, isGameOver: false });

    try {
      const url = `https://opentdb.com/api.php?difficulty=${difficulty}&type=${type}&amount=${rounds}`;
      const questions = await getQuestions(url);
      updateState({
        questions,
        isLoading: false,
        isPlaying: true,
        score: 0,
        round: 0,
        userAnswers: [],
      });
    } catch {
      updateState({ isError: true, isLoading: false });
    }
  }

  const isNotStarted = !isLoading && !isError && !isPlaying && !isGameOver;

  return (
    <>
      {isLoading && <LoadingPage />}
      {isError && <ErrorPage handleTryAgain={handlePlay} />}
      {isPlaying && <GamePage />}
      {isGameOver && <GameSummaryPage />}
      {isNotStarted && <StartPage handlePlay={handlePlay} />}
    </>
  );
}

export default App;
