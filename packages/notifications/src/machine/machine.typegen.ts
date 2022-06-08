// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true;
  eventsCausingActions: {
    addImmediateNotification: 'NOTIFY_IMMEDIATE';
    clearPendingNotifications: 'CLEAR';
    addPendingNotification: 'NOTIFY';
    removeCurrentNotification: 'xstate.init';
    moveFirstPendingToCurrentNotification: 'NOTIFY_IMMEDIATE' | 'NOTIFY' | '';
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
    NOTIFICATION_DURATION: 'xstate.init';
  };
  matchesStates: 'idle' | 'notify';
  tags: never;
}
