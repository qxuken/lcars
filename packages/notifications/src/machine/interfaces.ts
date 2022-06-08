import type { EventObject } from 'xstate';
import type { Maybe } from 'monet';

import type { IConfiguration } from '../configuration';

export interface INotification {
  message: string;
  meta?: Record<string, unknown>;
}

export interface INotifyAction extends EventObject {
  type: 'NOTIFY';
  payload: INotification;
}

export interface INotifyImmediateAction extends EventObject {
  type: 'NOTIFY_IMMEDIATE';
  payload: INotification;
  skipCurrentNotification?: boolean;
}

export interface IClearAction extends EventObject {
  type: 'CLEAR';
}

export type Action = INotifyAction | INotifyImmediateAction | IClearAction;

export type ActionType = Action['type'];

export interface IContext {
  currentNotification: Maybe<INotification>;
  pendingNotifications: Array<INotification>;
  config: IConfiguration;
}
