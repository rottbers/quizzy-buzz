import React, { createContext, useReducer } from 'react';

import { State } from '../types';

const initialState: State = {
  questions: [],
  difficulty: 'medium',
  type: 'multiple',
  rounds: 4,
  round: 0,
  score: 0,
  userAnswers: [],
  isLoading: false,
  isError: false,
  isPlaying: false,
  isGameOver: false,
};

interface Context {
  state: State;
  updateState: React.Dispatch<Partial<State>>;
}

const StateContext = createContext<Context>({
  state: initialState,
  updateState: () => null,
});

interface Props {
  children: React.ReactNode;
}

function StateProvider({ children }: Props): JSX.Element {
  function reducer(state: State, newState: Partial<State>) {
    return { ...state, ...newState };
  }

  const [state, updateState] = useReducer(reducer, initialState);

  return (
    <StateContext.Provider value={{ state, updateState }}>
      {children}
    </StateContext.Provider>
  );
}

export { StateContext, StateProvider };
