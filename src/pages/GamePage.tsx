import React from 'react';
import { useStateContext } from '../contexts/StateContext';

const GamePage: React.FC = () => {
  const { state, dispatch } = useStateContext();
  const { round, rounds, score, questions, userAnswers } = state;

  const { question, all_answers, correct_answer } = questions[round];
  const userAnswer = userAnswers[round];

  function handleAnswer(e: React.MouseEvent<HTMLButtonElement>) {
    const selectedAnswer = e.target.value; // TODO: look into type error
    dispatch({
      type: 'UPDATE_SCORE',
      data: {
        correctAnswer: correct_answer,
        selectedAnswer,
      },
    });
  }

  function handleNextRound() {
    dispatch({ type: 'NEXT_ROUND' });
  }

  const showAnswer = !!userAnswer;

  function handleButtonHighlight(answer: string) {
    if (!showAnswer) return '';
    if (answer === correct_answer) return 'bg-green-600 border-green-600';
    if (answer === userAnswer) return 'bg-red-700 border-red-700';
  }

  return (
    <div className="container mx-auto p-2 md:p-4 min-h-screen flex flex-col md:justify-center">
      <header className="font-mono flex justify-between mb-2">
        <p>
          Round {round + 1} of {rounds}
        </p>
        <p>Score {score}</p>
      </header>
      <h1 className="self-center text-xl font-semibold md:text-2xl m-2 md:m-6">
        {question}
      </h1>
      <div className="flex flex-wrap justify-center my-2 md:my-4">
        {all_answers.map((answer: string) => (
          <button
            value={answer}
            key={answer}
            onClick={handleAnswer}
            className={`m-2 w-full ${handleButtonHighlight(answer)}`}
            disabled={showAnswer}
          >
            {answer}
          </button>
        ))}
      </div>
      <div className={`self-center text-center ${!showAnswer && 'invisible'}`}>
        <p className={'self-center mb-4 text-xl font-semibold'}>
          {userAnswer === correct_answer ? `🎊 Correct!` : `🙈 Wrong answer..`}
        </p>
        <button onClick={handleNextRound}>
          {round < rounds - 1 ? 'Next question' : 'See summary'}
        </button>
      </div>
    </div>
  );
};

export default GamePage;
