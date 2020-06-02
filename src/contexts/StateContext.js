import React, { createContext, useReducer } from 'react';

const StateContext = createContext(null);

const StateProvider = ({ children }) => {
  const initialState = {
    questions: null,
    difficulty: 'medium',
    type: 'multiple',
    rounds: 4,
    round: 0,
    score: 0,
    userAnswers: [],
    isLoading: false,
    isError: false,
    isPlaying: false,
  };

  const [state, updateState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    initialState
  );

  return (
    <StateContext.Provider value={{ state, updateState }}>
      {children}
    </StateContext.Provider>
  );
};

export { StateContext, StateProvider };
