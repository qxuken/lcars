import { Maybe } from 'monet';

export type FlowtimeCompactContextValue = Maybe<{
  value: boolean;
  toggle: () => void;
}>;
