import React from 'react';
import { useStateContext } from './contexts/StateContext';

import LoadingPage from './pages/LoadingPage';
import ErrorPage from './pages/ErrorPage';
import GamePage from './pages/GamePage';
import GameSummaryPage from './pages/GameSummaryPage';
import StartPage from './pages/StartPage';

import { getQuestions } from './utilities';

const App: React.FC = () => {
  const { state, dispatch } = useStateContext();
  const { status, difficulty, type, rounds } = state;

  async function handlePlay() {
    dispatch({ type: 'LOADING' });

    try {
      const url = `https://opentdb.com/api.php?difficulty=${difficulty}&type=${type}&amount=${rounds}`;
      const questions = await getQuestions(url);
      dispatch({ type: 'PLAY', data: { questions } });
    } catch {
      dispatch({ type: 'ERROR' });
    }
  }

  switch (status) {
    case 'loading':
      return <LoadingPage />;
    case 'error':
      return <ErrorPage handleTryAgain={handlePlay} />;
    case 'playing':
      return <GamePage />;
    case 'gameover':
      return <GameSummaryPage />;
    case 'idle':
      return <StartPage handlePlay={handlePlay} />;
  }
};

export default App;
