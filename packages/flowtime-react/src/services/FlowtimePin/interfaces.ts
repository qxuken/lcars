import { Maybe } from 'monet';

export type FlowtimePinContextValue = Maybe<{
  value: boolean;
  toggle: () => void;
}>;
