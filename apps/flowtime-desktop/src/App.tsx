import React from 'react';
import { Maybe } from 'monet';
import ReactDom from 'react-dom/client';
import {
  FlowtimeUI,
  FlowtimeServiceController,
  FlowtimeTopPanelController,
  IFlowtimeTopPanelContextValue,
} from '@qxuken/flowtime-react';
import './index.css';

const topPanelConfig: IFlowtimeTopPanelContextValue = {
  onPin: Maybe.Some(window.electronAPI.setPin),
  onMinimize: Maybe.Some(async (compact) => {
    if (compact) {
      await window.electronAPI.setSize(440, 163);
    } else {
      await window.electronAPI.setSize(747, 226);
    }
  }),
  onExit: Maybe.Some(() => window.electronAPI.closeWindow()),
};

export let App = () => (
  <FlowtimeServiceController>
    <FlowtimeTopPanelController config={topPanelConfig}>
      <FlowtimeUI />
    </FlowtimeTopPanelController>
  </FlowtimeServiceController>
);

const root = Maybe.fromNull(document.getElementById('app')).orLazy(() => {
  const root = document.createElement('div');
  root.id = 'app';
  document.body.appendChild(root);
  return root;
});
ReactDom.createRoot(root).render(<App />);
