import React, { useState } from 'react';
import StartInfo from './components/StartInfo';
import StartForm from './components/StartForm';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import QuestionHeader from './components/QuestionHeader';
import AnswerButtons from './components/AnswerButtons';
import AnswerMessage from './components/AnswerMessage';
import { getQuestions, formatQuestions } from './utilities/questions';
import './App.scss';

const App = () => {
  const [questions, setQuestions] = useState(null);
  const [numberOfRounds, setNumberOfRounds] = useState(4);
  const [difficulty, setDifficulty] = useState('medium');
  const [round, setRound] = useState(0);
  const [score, setscore] = useState(0);
  const [userAnswer, setUserAnswer] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const setupQuestions = () => {
    setIsLoading(true);

    const type = 'multiple'; // 'multiple' = 4 answer alternatives, 'boolean' = 2
    const URL = `https://opentdb.com/api.php?amount=${numberOfRounds}&type=${type}&difficulty=${difficulty}`;

    getQuestions(URL)
      .then(questions => {
        setQuestions(formatQuestions(questions));
        setIsLoading(false);
      })
      .catch(error => {
        setIsError(true);
        setIsLoading(false);
        throw new Error(error);
      });
  };

  // destructure question variables based on round
  // intentional var instead of const/let due to scope (block vs function)
  if (questions) {
    var { question, correct_answer, shuffled_answers } = questions[round];
  }

  // #########
  // Handlers
  // #########

  const handleFormChange = e => {
    if (e.target.name === 'difficulty') {
      setDifficulty(e.target.value);
    }

    if (e.target.id === 'increment-round') {
      if (numberOfRounds < 50) {
        setNumberOfRounds(numberOfRounds + 1);
      }
    }

    if (e.target.id === 'decrement-round') {
      if (numberOfRounds > 1) {
        setNumberOfRounds(numberOfRounds - 1);
      }
    }
  };

  const handlePlay = e => {
    // prevent default form submit behavior
    e.preventDefault();

    // get questions
    setupQuestions();

    // reset score and round
    setscore(0);
    setRound(0);

    // update playing state
    setIsPlaying(true);
  };

  const handleAnswer = e => {
    const clickedAnswer = e.target.value;

    // update user answer
    setUserAnswer(clickedAnswer);

    // update score
    if (clickedAnswer === correct_answer) {
      setscore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    // reset user answer
    setUserAnswer(null);

    // increment round or end game
    if (round <= numberOfRounds - 2) {
      setRound(round + 1);
    } else {
      setIsPlaying(false);
    }
  };

  return (
    <div className="app">
      {!isPlaying ? (
        <>
          <StartInfo />
          <StartForm
            {...{ numberOfRounds, difficulty, handleFormChange, handlePlay }}
          />
        </>
      ) : isLoading ? (
        <LoadingSpinner />
      ) : isError ? (
        <ErrorMessage tryAgainHandler={handlePlay} />
      ) : (
        <>
          <QuestionHeader {...{ question, round, numberOfRounds, score }} />
          <AnswerButtons
            {...{ shuffled_answers, correct_answer, handleAnswer, userAnswer }}
          />
          <AnswerMessage {...{ correct_answer, userAnswer, difficulty }} />
          <button
            className={!userAnswer ? 'hidden' : null}
            onClick={handleNextQuestion}
          >
            {round < numberOfRounds - 1 ? 'Next question' : 'Play again'}
          </button>
        </>
      )}
    </div>
  );
};

export default App;
