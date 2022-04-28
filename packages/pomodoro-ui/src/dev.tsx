import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './demo';

const rootEl: HTMLElement = document.getElementById('root')!;

ReactDOM.createRoot(rootEl).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
