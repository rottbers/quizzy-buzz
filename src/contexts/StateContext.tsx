import React, { createContext, useContext, useReducer } from 'react';

import { State, Questions, Difficulty, Type } from '../types';

// prettier-ignore
type Event =
  | { type: 'IDLE' | 'LOADING' | 'ERROR' | 'NEXT_ROUND' }
  | { type: 'PLAY'; data: { questions: Questions } }
  | { type: 'UPDATE_SETTINGS', data: { difficulty?: Difficulty, type?: Type, rounds?: number } }
  | { type: 'SUBMIT_ANSWER', data: { answer: string } };

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
      return { ...state, questions, round: 0, score: 0, userAnswers: [], status: 'playing' }; // prettier-ignore
    }
    case 'UPDATE_SETTINGS':
      return { ...state, ...event.data };
    case 'SUBMIT_ANSWER': {
      const { answer } = event.data;
      const correctAnswer = state.questions[state.round].correct_answer;
      const userAnswers = [...state.userAnswers, answer];
      const score = answer === correctAnswer ? state.score + 1 : state.score; // prettier-ignore
      return { ...state, score, userAnswers };
    }
    case 'NEXT_ROUND': {
      const { round, rounds } = state;
      return round < rounds - 1
        ? { ...state, round: round + 1 }
        : { ...state, status: 'gameover' };
    }
    default:
      return state;
  }
}

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
