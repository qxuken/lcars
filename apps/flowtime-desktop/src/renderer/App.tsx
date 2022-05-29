import React from 'react';
import { Maybe } from 'monet';
import {
  FlowtimeUI,
  FlowtimeServiceController,
  FlowtimeTopPanelController,
  IFlowtimeTopPanelContextValue,
} from '@qxuken/flowtime-react';

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

export function App(): JSX.Element {
  return (
    <FlowtimeServiceController>
      <FlowtimeTopPanelController config={topPanelConfig}>
        <FlowtimeUI />
      </FlowtimeTopPanelController>
    </FlowtimeServiceController>
  );
}
