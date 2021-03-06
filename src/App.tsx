import React from 'react';
import { useStateContext } from './contexts/StateContext';

import LoadingPage from './pages/LoadingPage';
import ErrorPage from './pages/ErrorPage';
import GamePage from './pages/GamePage';
import GameSummaryPage from './pages/GameSummaryPage';
import StartPage from './pages/StartPage';

const App: React.FC = () => {
  const { state: { status } } = useStateContext(); // prettier-ignore

  switch (status) {
    case 'loading':
      return <LoadingPage />;
    case 'error':
      return <ErrorPage />;
    case 'playing':
      return <GamePage />;
    case 'gameover':
      return <GameSummaryPage />;
    case 'idle':
      return <StartPage />;
  }
};

export default App;
