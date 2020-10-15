import React, { Fragment } from 'react';
import { useStateContext } from '../contexts/StateContext';
// @ts-expect-error due to parcel import format
import reactSvg from 'url:../assets/react.svg';

import { Type, Difficulty } from '../types';
import { capitalizeString } from '../utilities';

const StartPage: React.FC<{ handlePlay: () => void }> = ({ handlePlay }) => {
  const { state, dispatch } = useStateContext();
  const { type, difficulty, rounds, status } = state;

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch({
      type: 'UPDATE_SETTINGS',
      data: { [e.target.name]: e.target.value },
    });
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    handlePlay();
  }

  const typeOptions: Type[] = ['boolean', 'multiple'];
  const difficultyOptions: Difficulty[] = ['easy', 'medium', 'hard'];

  return (
    <div className="container mx-auto p-4 min-h-screen flex flex-col items-center md:justify-center">
      <h1 className="text-4xl md:text-5xl font-black italic underline">
        Quizzy <span className="text-yellow-300 flicker">buzz</span>
      </h1>
      <p>
        A quiz game built with{' '}
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
      <form className="flex flex-col items-center mt-4" onSubmit={onSubmit}>
        <label className="font-semibold mt-6" htmlFor="type" id="type">
          Type of answers:
        </label>
        <div className="radio-container">
          {typeOptions.map((value) => (
            <Fragment key={value}>
              <input
                key={value}
                type="radio"
                name="type"
                id={`type${value}`}
                value={value}
                checked={type === value}
                onChange={onChange}
              />
              <label htmlFor={`type${value}`}>{capitalizeString(value)}</label>
            </Fragment>
          ))}
        </div>
        <label className="font-semibold mt-6" htmlFor="difficulty">
          Difficulty of questions:
        </label>
        <div className="radio-container">
          {difficultyOptions.map((value) => (
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
              <label htmlFor={`difficulty${value}`}>
                {capitalizeString(value)}
              </label>
            </Fragment>
          ))}
        </div>

        <label className="font-semibold mt-6" htmlFor="rounds">
          Number ( <span className="font-bold underline">{rounds}</span> ) of
          questions:
        </label>
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
        <button className="mt-6" type="submit" disabled={status === 'loading'}>
          Play
        </button>
      </form>
    </div>
  );
};

export default StartPage;
