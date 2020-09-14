export type Difficulty = 'easy' | 'medium' | 'hard';

export type Type = 'boolean' | 'multiple';

export interface Question {
  category: string;
  type: Type;
  difficulty: Difficulty;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  all_answers: string[];
}

export interface State {
  questions: Question[];
  difficulty: Difficulty;
  type: Type;
  rounds: number;
  round: number;
  score: number;
  userAnswers: string[];
  isLoading: boolean;
  isError: boolean;
  isPlaying: boolean;
  isGameOver: boolean;
}
