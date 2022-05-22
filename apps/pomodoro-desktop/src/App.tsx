import React from 'react';
import { Maybe } from 'monet';
import ReactDom from 'react-dom/client';
import { FlowtimeUI, FlowtimeServiceController } from '@qxuken/flowtime-react';
import './index.css';

export let App = () => (
  <FlowtimeServiceController>
    <FlowtimeUI />
  </FlowtimeServiceController>
);

const root = Maybe.fromNull(document.getElementById('app')).orLazy(() => {
  const root = document.createElement('div');
  root.id = 'app';
  document.body.appendChild(root);
  return root;
});
ReactDom.createRoot(root).render(<App />);
