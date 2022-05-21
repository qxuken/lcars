import { useMemo } from 'react';
import { Maybe } from 'monet';
import { always } from 'ramda';
import { Flowtime, ICreateServiceProps } from '@qxuken/flowtime';

import { FlowtimeServiceContext } from './FlowtimeServiceContext';
import { PartialDeep } from 'type-fest';

export interface IFlowtimeServiceControllerProps extends PartialDeep<ICreateServiceProps> {
  children: React.ReactNode;
}
export function FlowtimeServiceController({
  children,
  ...props
}: IFlowtimeServiceControllerProps): JSX.Element {
  const service = useMemo(always(Maybe.Some(new Flowtime(props))), [props]);
  return <FlowtimeServiceContext.Provider value={service}>{children}</FlowtimeServiceContext.Provider>;
}
