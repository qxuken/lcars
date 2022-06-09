import { Maybe } from 'monet';
import { v4 } from 'uuid';
import { createMachine, assign } from 'xstate';

import { IContext, Action, INotification } from './interfaces';

//* based on: https://stately.ai/registry/editor/share/5b81d81d-8fec-4616-b372-791174a9c735
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const createStateMachine = (initialContext: IContext) =>
  createMachine(
    {
      tsTypes: {} as import('./machine.typegen').Typegen0,
      schema: { context: {} as IContext, events: {} as Action },
      context: initialContext,
      id: 'notifications',
      initial: 'idle',
      states: {
        idle: {
          always: {
            cond: 'hasPendingNotification',
            target: 'notify',
          },
        },
        notify: {
          exit: 'removeCurrentNotification',
          entry: 'moveFirstPendingToCurrentNotification',
          after: {
            NOTIFICATION_DURATION: {
              target: 'idle',
            },
          },
        },
      },
      on: {
        NOTIFY_IMMEDIATE: {
          actions: 'addImmediateNotification',
          target: '.notify',
        },
        CLEAR: {
          actions: 'clearPendingNotifications',
          target: '.idle',
        },
        NOTIFY: {
          actions: 'addPendingNotification',
          target: '.notify',
        },
      },
    },
    {
      actions: {
        addPendingNotification: assign((context, event) => ({
          ...context,
          pendingNotifications: [
            ...context.pendingNotifications,
            {
              id: v4(),
              duration: Maybe.None(),
              meta: Maybe.None(),
              ...event.payload,
            } as INotification,
          ],
        })),
        addImmediateNotification: assign((context, event) => {
          const notification: INotification = {
            id: v4(),
            duration: Maybe.None(),
            meta: Maybe.None(),
            ...event.payload,
          };
          if (event.skipCurrentNotification) {
            return {
              ...context,
              currentNotification: Maybe.Some(notification),
            };
          }
          return {
            ...context,
            pendingNotifications: [notification, ...context.pendingNotifications],
          };
        }),
        moveFirstPendingToCurrentNotification: assign((context) => ({
          ...context,
          currentNotification: Maybe.fromUndefined(context.pendingNotifications[0]),
          pendingNotifications: context.pendingNotifications.slice(1),
        })),
        removeCurrentNotification: assign((context) => ({
          ...context,
          currentNotification: Maybe.None(),
        })),
        clearPendingNotifications: assign((context) => ({
          ...context,
          pendingNotifications: [],
        })),
      },
      guards: {
        hasPendingNotification: (context) => context.pendingNotifications.length > 0,
      },
      delays: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        NOTIFICATION_DURATION: (context) =>
          context.currentNotification
            .chain((notification) => notification.duration)
            .orSome(context.config.notificationDuration),
      },
    }
  );

export type StateMachine = ReturnType<typeof createStateMachine>;
