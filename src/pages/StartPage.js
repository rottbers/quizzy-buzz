import React, { Fragment, useContext } from 'react';
import { StateContext } from '../contexts/StateContext';
// eslint-disable-next-line import/no-unresolved
import reactSvg from 'url:../assets/react.svg';

const StartPage = ({ handlePlay }) => {
  const { state, updateState } = useContext(StateContext);
  const { difficulty, rounds } = state;

  const onChange = (e) => updateState({ [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    handlePlay();
  };

  return (
    <div className="container mx-auto p-4 min-h-screen flex flex-col items-center md:justify-center">
      <h1 className="text-4xl md:text-5xl font-black italic underline">
        Quizzy <span className="text-yellow-300 flicker">buzz</span>
      </h1>
      <p>
        A quiz drinking game{' '}
        <span role="img" aria-label="clinking beer mugs">
          🍻
        </span>{' '}
        built with{' '}
        <a
          className="underline"
          href="https://reactjs.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          react
        </a>{' '}
        <img
          className="inline-block align-middle w-4 h-4"
          src={reactSvg}
          alt="react.js logo"
        ></img>
      </p>
      <h2 className="text-2xl mt-4 font-semibold">
        <span role="img" aria-label="dice">
          🎲
        </span>{' '}
        How does it work?{' '}
        <span role="img" aria-label="thinking face">
          🤔
        </span>
      </h2>
      <ul className="list-disc ml-10">
        <li>Random category of questions</li>
        <li>Each question have 4 possible answers</li>
        <li>Incorrect answer = you drink</li>
        <li>Correct answer = someone else drink</li>
        <li>Upping the difficulty = more sips</li>
      </ul>
      <h2 className="text-2xl mt-4 mb-2 font-semibold">
        <span role="img" aria-label="bottle with popping cork">
          🍾
        </span>{' '}
        Ready?{' '}
        <span role="img" aria-label="woozy face">
          🥴
        </span>
      </h2>
      <form className="flex flex-col items-center" onSubmit={onSubmit}>
        <label htmlFor="difficulty">Difficulty</label>
        <div className="radio-container">
          {['easy', 'medium', 'hard'].map((value) => (
            <Fragment key={value}>
              <input
                key={value}
                type="radio"
                name="difficulty"
                id={`difficulty${value}`}
                value={value}
                checked={difficulty === value}
                onChange={onChange}
              />
              <label htmlFor={`difficulty${value}`}>{value}</label>
            </Fragment>
          ))}
        </div>
        <label htmlFor="rounds">{rounds} rounds</label>
        <input
          className="slider"
          id="rounds"
          name="rounds"
          type="range"
          value={rounds}
          onChange={onChange}
          step={1}
          min={1}
          max={50}
        />
        <button className="button" type="submit">
          Play
        </button>
      </form>
    </div>
  );
};

export default StartPage;
