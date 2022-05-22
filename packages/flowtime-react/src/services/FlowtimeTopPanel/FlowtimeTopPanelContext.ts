import { createContext, Context } from 'react';
import { Maybe } from 'monet';

import { IFlowtimeTopPanelContextValue } from './interfaces';

const initialValue: IFlowtimeTopPanelContextValue = {
  onPin: Maybe.None(),
  onMinimize: Maybe.None(),
  onExit: Maybe.None(),
};

export const FlowtimeTopPanelContext: Context<IFlowtimeTopPanelContextValue> = createContext(initialValue);
