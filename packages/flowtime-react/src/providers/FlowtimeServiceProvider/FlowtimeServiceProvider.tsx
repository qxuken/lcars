import { createContext, useMemo } from 'react';
import { Maybe } from 'monet';
import { always } from 'ramda';
import { Flowtime, ICreateServiceProps } from '@qxuken/flowtime';

const FlowtimeServiceContext = createContext<Maybe<Flowtime>>(Maybe.None());

export interface IFlowtimeServiceProviderProps extends ICreateServiceProps {
  children: React.ReactNode;
}
export function FlowtimeServiceProvider({ children, ...props }: IFlowtimeServiceProviderProps): JSX.Element {
  const service = useMemo(always(Maybe.Some(new Flowtime(props))), [props]);
  return <FlowtimeServiceContext.Provider value={service}>{children}</FlowtimeServiceContext.Provider>;
}
