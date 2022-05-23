import { Maybe } from 'monet';
import { createContext, Context } from 'react';

import { FlowtimeCompactContextValue } from './interfaces';

const initialValue: FlowtimeCompactContextValue = Maybe.None();

export const FlowtimeCompactContext: Context<FlowtimeCompactContextValue> = createContext(initialValue);
