import { Maybe } from 'monet';
import { assign } from '@xstate/immer';
import { createMachine } from 'xstate';

import { IContext, Action } from './interfaces';

//* based on: https://stately.ai/registry/editor/share/5b81d81d-8fec-4616-b372-791174a9c735
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const createStateMachine = (initialContext: IContext) =>
  createMachine(
    {
      tsTypes: {} as import('./machine.typegen').Typegen0,
      schema: { context: {} as IContext, events: {} as Action },
      context: initialContext,
      id: 'notifications',
      initial: 'notificationWorker',
      states: {
        notificationWorker: {
          initial: 'idle',
          states: {
            idle: {
              always: {
                actions: 'moveFirstPendingToCurrentNotification',
                cond: 'hasPendingNotification',
                target: 'notify',
              },
            },
            notify: {
              exit: 'removeCurrentNotification',
              after: {
                NOTIFICATION_DELAY: {
                  target: 'idle',
                },
              },
            },
          },
          on: {
            NOTIFY: {
              actions: 'addPendingNotification',
            },
            NOTIFY_IMMEDIATE: {
              actions: 'addImmediateNotification',
              target: '.notify',
            },
            CLEAR: {
              actions: 'clearPendingNotifications',
            },
          },
        },
      },
    },
    {
      actions: {
        addPendingNotification: assign((context, event) => context.pendingNotifications.push(event.payload)),
        addImmediateNotification: assign((context, event) => {
          if (!event.skipCurrentNotification && context.currentNotification.isSome()) {
            context.pendingNotifications.unshift(context.currentNotification.some());
          }
          context.currentNotification = Maybe.Some(event.payload);
        }),
        moveFirstPendingToCurrentNotification: assign((context) => {
          const firstPending = context.pendingNotifications.shift();
          context.currentNotification = Maybe.fromUndefined(firstPending);
        }),
        removeCurrentNotification: assign((context) => (context.currentNotification = Maybe.None())),
        clearPendingNotifications: assign((context) => (context.pendingNotifications = [])),
      },
      guards: {
        hasPendingNotification: (context) => context.pendingNotifications[0] !== undefined,
      },
      delays: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        NOTIFICATION_DELAY: (context) => context.config.notificationDelay,
      },
    }
  );

export type StateMachine = ReturnType<typeof createStateMachine>;
