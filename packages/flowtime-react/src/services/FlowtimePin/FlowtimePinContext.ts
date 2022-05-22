import { Maybe } from 'monet';
import { createContext, Context } from 'react';

import { FlowtimePinContextValue } from './interfaces';

const initialValue: FlowtimePinContextValue = Maybe.None();

export const FlowtimePinContext: Context<FlowtimePinContextValue> = createContext(initialValue);
