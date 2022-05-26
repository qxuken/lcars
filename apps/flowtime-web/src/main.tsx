import { Maybe } from 'monet';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';

const root = Maybe.fromNull(document.getElementById('app')).orLazy(() => {
  const root = document.createElement('div');
  root.id = 'app';
  document.body.appendChild(root);
  return root;
});
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
