import React from 'react';
import { Maybe } from 'monet';
import ReactDom from 'react-dom/client';
import { FullLayout, FlowtimeServiceController } from '@qxuken/flowtime-react';
import { Root } from '@qxuken/lcars-ui';
import './index.css';

export let App = () => (
  <div>
    <FlowtimeServiceController>
      <FullLayout className={Root.root} />
    </FlowtimeServiceController>
  </div>
);

const root = Maybe.fromNull(document.getElementById('app')).orLazy(() => {
  const root = document.createElement('div');
  root.id = 'app';
  document.body.appendChild(root);
  return root;
});
ReactDom.createRoot(root).render(<App />);
