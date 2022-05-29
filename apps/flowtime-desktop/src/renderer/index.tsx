import React from 'react';
import ReactDOM from 'react-dom/client';
import { Maybe } from 'monet';

import { App } from './App';
import './index.css';

const root = Maybe.fromNull(document.getElementById('app')).orLazy(() => {
  const root = document.createElement('div');
  root.id = 'app';
  document.body.appendChild(root);
  return root;
});
ReactDOM.createRoot(root).render(<App />);
