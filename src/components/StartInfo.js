import React from 'react';
import reactSvg from '../assets/react.svg';
import './StartInfo.scss';

const StartInfo = () => (
  <section className="information">
    <h1>
      Quizzy <span className="flicker">buzz</span>
    </h1>
    <p>
      A quiz drinking game{' '}
      <span role="img" aria-label="clinking beer mugs">
        🍻
      </span>{' '}
      built with{' '}
      <a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer">
        react
      </a>{' '}
      <img src={reactSvg} alt="react.js logo"></img>
    </p>
    <h2>
      <span role="img" aria-label="dice">
        🎲
      </span>{' '}
      How does it work?{' '}
      <span role="img" aria-label="thinking face">
        🤔
      </span>
    </h2>
    <ul>
      <li>Random category of questions</li>
      <li>Each question have 4 possible answers</li>
      <li>Incorrect answer = you drink</li>
      <li>Correct answer = someone else drink</li>
      <li>Upping the difficulty = more sips</li>
    </ul>
    <h2>
      <span role="img" aria-label="bottle with popping cork">
        🍾
      </span>{' '}
      Ready?{' '}
      <span role="img" aria-label="woozy face">
        🥴
      </span>
    </h2>
  </section>
);

export default StartInfo;
