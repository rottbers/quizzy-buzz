import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useStateContext } from '../contexts/StateContext';
import Layout from '../components/Layout';

const GamePage: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
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

  const showAnswer = !!userAnswer;

  function handleButtonHighlight(answer: string) {
    if (answer === correct_answer) return 'bg-green-600 border-green-600';
    if (answer === userAnswer) return 'bg-red-700 border-red-700';
    return 'border-gray-500 text-gray-500';
  }

  const isLastRound = round === rounds - 1;

  return (
    <Layout className="sm:justify-center">
      <header className="font-mono flex justify-between mb-2 w-full">
        <p>
          Round {round + 1} of {rounds}
        </p>
        <p>Score {score}</p>
      </header>
      <h1 className="self-center text-xl font-semibold break-words max-w-full md:text-2xl my-4 mx-2 md:m-6 italic">
        {question}
      </h1>
      <div className="flex flex-wrap justify-center my-2 md:my-4">
        {all_answers.map((answer: string, index) => (
          <motion.button
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : -50 * index }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { delay: shouldReduceMotion ? 0 : 0.05 * index },
            }}
            value={answer}
            key={answer}
            onClick={handleAnswer}
            className={`button m-2 w-full ${
              showAnswer
                ? handleButtonHighlight(answer)
                : 'hover:text-gray-900 focus:text-gray-900 hover:bg-gray-100 focus:bg-gray-100'
            }`}
            disabled={showAnswer}
          >
            {answer}
          </motion.button>
        ))}
      </div>
      <div
        className={`self-center text-center ${showAnswer ? '' : 'invisible'}`}
      >
        <p className={'self-center mb-4 text-xl font-semibold'} role="status">
          {userAnswer === correct_answer ? `Correct! 🎊` : `Wrong answer.. 🙈`}
        </p>
        <button
          className="button hover:text-gray-900 focus:text-gray-900 hover:bg-gray-100 focus:bg-gray-100"
          onClick={() => dispatch({ type: 'NEXT_ROUND' })}
        >
          {isLastRound ? 'See summary' : 'Next question'}
        </button>
      </div>
    </Layout>
  );
};

export default GamePage;
