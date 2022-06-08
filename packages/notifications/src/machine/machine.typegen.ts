// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true;
  eventsCausingActions: {
    addPendingNotification: 'NOTIFY';
    addImmediateNotification: 'NOTIFY_IMMEDIATE';
    clearPendingNotifications: 'CLEAR';
    moveFirstPendingToCurrentNotification: '';
    removeCurrentNotification: 'xstate.init';
  };
  internalEvents: {
    '': { type: '' };
    'xstate.init': { type: 'xstate.init' };
  };
  invokeSrcNameMap: {};
  missingImplementations: {
    actions: never;
    services: never;
    guards: never;
    delays: never;
  };
  eventsCausingServices: {};
  eventsCausingGuards: {
    hasPendingNotification: '';
  };
  eventsCausingDelays: {
    NOTIFICATION_DELAY: 'xstate.init';
  };
  matchesStates:
    | 'notificationWorker'
    | 'notificationWorker.idle'
    | 'notificationWorker.notify'
    | { notificationWorker?: 'idle' | 'notify' };
  tags: never;
}
