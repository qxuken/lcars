import { useContext } from 'react';

import { FlowtimeTopPanelContext } from '../FlowtimeTopPanelContext';
import { IFlowtimeTopPanelContextValue } from '../interfaces';

export function useFlowTimeTopPanel(): IFlowtimeTopPanelContextValue {
  const context = useContext(FlowtimeTopPanelContext);

  return context;
}
