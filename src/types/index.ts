export type Difficulty = 'easy' | 'medium' | 'hard';

export type Type = 'boolean' | 'multiple';

interface UnformattedQuestion {
  category: string;
  type: Type;
  difficulty: Difficulty;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export type UnformattedQuestions = UnformattedQuestion[];

interface Question extends UnformattedQuestion {
  all_answers: string[];
}

export type Questions = Question[];

export interface Settings {
  difficulty: Difficulty;
  type: Type;
  rounds: number;
}

export type Status = 'idle' | 'loading' | 'playing' | 'gameover' | 'error';
export interface State {
  questions: Questions;
  difficulty: Difficulty;
  type: Type;
  rounds: number;
  round: number;
  score: number;
  userAnswers: string[];
  status: Status;
}
