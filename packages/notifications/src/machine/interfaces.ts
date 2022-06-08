import type { EventObject } from 'xstate';
import type { Maybe } from 'monet';

import type { IConfiguration } from '../configuration';
import { SetRequired } from 'type-fest';
import { Dictionary } from 'ramda';

export interface INotification {
  id: string;
  message: string;
  duration: Maybe<number>;
  meta: Maybe<Dictionary<unknown>>;
}

export type INotificationEventPayload = SetRequired<Partial<Omit<INotification, 'id'>>, 'message'>;

export interface INotifyAction extends EventObject {
  type: 'NOTIFY';
  payload: INotificationEventPayload;
}

export interface INotifyImmediateAction extends EventObject {
  type: 'NOTIFY_IMMEDIATE';
  payload: INotificationEventPayload;
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
