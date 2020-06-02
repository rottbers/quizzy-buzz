import React, { useContext } from 'react';
import { StateContext } from '../contexts/StateContext';

const GamePage = () => {
  const { state, updateState } = useContext(StateContext);
  const { difficulty, round, rounds, score, questions, userAnswers } = state;

  const { question, shuffled_answers, correct_answer } = questions[round];
  const userAnswer = userAnswers[round];

  const handleAnswer = (e) => {
    const selectedAnswer = e.target.value;

    selectedAnswer === correct_answer
      ? updateState({
          userAnswers: [...userAnswers, selectedAnswer],
          score: score + 1,
        })
      : updateState({ userAnswers: [...userAnswers, selectedAnswer] });
  };

  const handleNextRound = () =>
    round < rounds - 1
      ? updateState({ round: round + 1 })
      : updateState({ isPlaying: false });

  const showAnswer = !!userAnswer;

  const handleButtonHighlight = (answer) => {
    if (!showAnswer) return '';
    if (answer === correct_answer) return 'bg-green-600 border-green-600';
    if (answer === userAnswer) return 'bg-red-700 border-red-700';
  };

  const sips = (() => {
    switch (difficulty) {
      case 'easy':
        return '1 sip 🍹';
      case 'medium':
        return '2 sips 🍹🍹';
      case 'hard':
        return '3 sips 🍹🍹🍹';
    }
  })();

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
        {shuffled_answers.map((answer) => (
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
          {userAnswer === correct_answer
            ? `🎊 hiya! ${sips} to give away`
            : `🙈 nope... drink ${sips}`}
        </p>
        <button onClick={handleNextRound}>
          {round < rounds - 1 ? 'Next question' : 'Back home'}
        </button>
      </div>
    </div>
  );
};

export default GamePage;
