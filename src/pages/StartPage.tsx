import React from 'react';
import { DiReact as ReactLogo } from 'react-icons/di';
import { useStateContext } from '../contexts/StateContext';

import Layout from '../components/Layout';
import RadioGroup from '../components/RadioGroup';

import { Type, Difficulty } from '../types';

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
    <Layout className="justify-center">
      <h1 className="text-5xl mb-1 md:text-6xl md:mb-2 font-black italic">
        Quizzy{' '}
        <span className="motion-safe:animate-pulse text-yellow-300">buzz</span>
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
        <ReactLogo className="inline-block align-middle h-8 w-8 motion-safe:animate-spin-4" />
      </p>
      <form
        className="flex flex-col items-center w-full max-w-md"
        onSubmit={onSubmit}
      >
        <label className="font-semibold mt-6" htmlFor="type">
          Type of answers:
        </label>
        <RadioGroup
          name="type"
          options={typeOptions}
          selectedOption={type}
          onChange={onChange}
        />

        <label className="font-semibold mt-6" htmlFor="difficulty">
          Difficulty of questions:
        </label>
        <RadioGroup
          name="difficulty"
          options={difficultyOptions}
          selectedOption={difficulty}
          onChange={onChange}
        />

        <label className="font-semibold mt-6" htmlFor="rounds">
          Number ( <span className="font-bold underline">{rounds}</span> ) of
          questions:
        </label>
        <input
          className="w-full bg-transparent cursor-pointer"
          id="rounds"
          name="rounds"
          type="range"
          value={rounds}
          onChange={onChange}
          step={1}
          min={1}
          max={50}
        />
        <button
          className="button hover:text-gray-900 focus:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 mt-8"
          type="submit"
          disabled={status === 'loading'}
        >
          Play
        </button>
      </form>
    </Layout>
  );
};

export default StartPage;
