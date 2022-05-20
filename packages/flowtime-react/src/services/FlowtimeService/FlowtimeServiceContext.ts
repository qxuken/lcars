import { createContext, Context } from 'react';
import { Maybe } from 'monet';
import { Flowtime } from '@qxuken/flowtime';

export const FlowtimeServiceContext: Context<Maybe<Flowtime>> = createContext(Maybe.None());
