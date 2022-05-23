import { Maybe } from 'monet';

export interface IFlowtimeTopPanelContextValue {
  onPin: Maybe<(val: boolean) => void>;
  onMinimize: Maybe<(val: boolean) => void>;
  onExit: Maybe<() => void>;
}
