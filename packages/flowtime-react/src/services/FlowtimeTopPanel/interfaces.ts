import { Maybe } from 'monet';

export interface IFlowtimeTopPanelContextValue {
  onPin: Maybe<(val: boolean) => void>;
  onMinimize: Maybe<() => void>;
  onExit: Maybe<() => void>;
}
