import { ReactNode } from 'react';

import { FlowtimeCompactContext } from './FlowtimeCompactContext';
import { FlowtimeCompactContextValue } from './interfaces';

export interface IFlowtimeTopPanelControllerProps {
  children: ReactNode;
  value: FlowtimeCompactContextValue;
}
export function FlowtimeCompactController({
  children,
  value,
}: IFlowtimeTopPanelControllerProps): JSX.Element {
  return <FlowtimeCompactContext.Provider value={value}>{children}</FlowtimeCompactContext.Provider>;
}
