import React from 'react';
import ReactDOM from 'react-dom';
import { StateProvider } from './contexts/StateContext';
import App from './App';

import './styles/tailwind.css';

ReactDOM.render(
  <StateProvider>
    <App />
  </StateProvider>,
  document.getElementById('root')
);
