import { ReactNode } from 'react';

import { FlowtimeTopPanelContext } from './FlowtimeTopPanelContext';
import { IFlowtimeTopPanelContextValue } from './interfaces';

export interface IFlowtimeTopPanelControllerProps {
  children: ReactNode;
  config: IFlowtimeTopPanelContextValue;
}
export function FlowtimeTopPanelController({
  children,
  config,
}: IFlowtimeTopPanelControllerProps): JSX.Element {
  return <FlowtimeTopPanelContext.Provider value={config}>{children}</FlowtimeTopPanelContext.Provider>;
}
