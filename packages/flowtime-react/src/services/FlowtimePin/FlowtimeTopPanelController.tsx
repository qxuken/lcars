import { ReactNode } from 'react';

import { FlowtimePinContext } from './FlowtimePinContext';
import { FlowtimePinContextValue } from './interfaces';

export interface IFlowtimeTopPanelControllerProps {
  children: ReactNode;
  value: FlowtimePinContextValue;
}
export function FlowtimePinController({ children, value }: IFlowtimeTopPanelControllerProps): JSX.Element {
  return <FlowtimePinContext.Provider value={value}>{children}</FlowtimePinContext.Provider>;
}
