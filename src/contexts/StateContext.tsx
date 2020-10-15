import React, { createContext, useContext, useReducer } from 'react';

import { State, Questions, Difficulty, Type } from '../types';

const initialState: State = {
  questions: [],
  difficulty: 'medium',
  type: 'multiple',
  rounds: 4,
  round: 0,
  score: 0,
  userAnswers: [],
  status: 'idle',
};

// prettier-ignore
type Event =
  | { type: 'IDLE' | 'LOADING' | 'ERROR' | 'NEXT_ROUND' }
  | { type: 'PLAY'; data: { questions: Questions } }
  | { type: 'UPDATE_SETTINGS', data: { difficulty?: Difficulty, type?: Type, rounds?: number } }
  | { type: 'UPDATE_SCORE', data: { correctAnswer: string; selectedAnswer: string } };

function reducer(state: State, event: Event): State {
  switch (event.type) {
    case 'IDLE':
      return { ...state, status: 'idle' };
    case 'LOADING':
      return { ...state, status: 'loading' };
    case 'ERROR':
      return { ...state, status: 'error' };
    case 'PLAY': {
      const { questions } = event.data;
      return {
        ...state,
        questions,
        round: 0,
        score: 0,
        userAnswers: [],
        status: 'playing',
      };
    }
    case 'UPDATE_SETTINGS':
      return { ...state, ...event.data };
    case 'UPDATE_SCORE': {
      const { correctAnswer, selectedAnswer } = event.data;
      let score = state.score;
      if (selectedAnswer === correctAnswer) score = score + 1;
      const userAnswers = [...state.userAnswers, selectedAnswer];
      return { ...state, score, userAnswers };
    }
    case 'NEXT_ROUND': {
      const { round, rounds } = state;
      if (round < rounds - 1) return { ...state, round: round + 1 };
      return { ...state, status: 'gameover' };
    }
    default:
      return state;
  }
}

interface Context {
  state: State;
  dispatch: React.Dispatch<Event>;
}

const StateContext = createContext<Context>({
  state: initialState,
  dispatch: () => null,
});

// prettier-ignore
export const StateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = (): Context => useContext(StateContext);
