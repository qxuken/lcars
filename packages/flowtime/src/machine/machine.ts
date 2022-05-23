import { Maybe } from 'monet';
import { assign } from '@xstate/immer';
import { createMachine, assign as plainAssign } from 'xstate';

import type { IContext, Action, IMachineServiceProp } from './interfaces';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const StateMachine = (initialContext: IContext, externalService: IMachineServiceProp) =>
  createMachine(
    {
      tsTypes: {} as import('./machine.typegen').Typegen0,
      schema: { context: {} as IContext, events: {} as Action },
      context: initialContext,
      id: 'flowtime',
      initial: 'idle',
      states: {
        idle: {
          on: {
            START: {
              target: 'focus',
            },
            RESET: {
              actions: 'resetToInitial',
              cond: 'hasRecordedActivity',
            },
          },
        },
        focus: {
          entry: 'clearPauseStartTime',
          initial: 'work',
          states: {
            work: {
              initial: 'init',
              description: "meta: { recommendationType:  'focus' },",
              meta: { recommendationType: 'focus' },
              states: {
                init: {
                  exit: 'clearPauseStartTime',
                  initial: 'init',
                  description: 'Decides whether it is new activity or pause resume',
                  states: {
                    init: {
                      always: [
                        {
                          cond: 'hasPauseStartTime',
                          target: 'resume',
                        },
                        {
                          target: 'new',
                        },
                      ],
                    },
                    resume: {
                      type: 'final',
                      entry: 'correctWorkTimer',
                      description: 'Will change WorkStartTime by adding difference  by PauseStartTime',
                    },
                    new: {
                      type: 'final',
                      entry: 'recordWorkStartTime',
                    },
                  },
                  onDone: {
                    target: 'online',
                  },
                },
                breakProposal: {
                  invoke: {
                    src: 'proposal',
                    id: 'break',
                    onDone: [
                      {
                        target: 'online',
                      },
                    ],
                    onError: [
                      {
                        target: 'online',
                      },
                    ],
                    meta: { proposalType: 'break' },
                  },
                  description: "invoke meta: { proposalType: 'break' }",
                },
                online: {
                  after: {
                    BREAK_PROPOSAL: {
                      description: ' 25min',
                      target: 'breakProposal',
                    },
                  },
                },
              },
              on: {
                BREAK: [
                  {
                    actions: 'increaseActivityCounter',
                    cond: 'pastMinimumActivityDuration',
                    target: 'break',
                  },
                  {
                    target: 'break',
                  },
                ],
                PAUSE: {
                  target: 'pause',
                },
              },
            },
            break: {
              type: 'parallel',
              description:
                'Should provide information for break duration by merging metas of the inner states',
              entry: 'recordBreakStartTime',
              exit: 'clearBreakStartTime',
              states: {
                timer: {
                  initial: 'init',
                  states: {
                    init: {
                      always: [
                        {
                          cond: 'underTwentyFiveMinutes',
                          target: 'underTwentyFiveMinutes',
                        },
                        {
                          cond: 'underFiftyMinutes',
                          target: 'underFiftyMinutes',
                        },
                        {
                          cond: 'underNinetyMinutes',
                          target: 'underNinetyMinutes',
                        },
                        {
                          target: 'pastNinetyMinutes',
                        },
                      ],
                    },
                    underTwentyFiveMinutes: {
                      type: 'final',
                      description: "meta: { recommendationType: 'underTwentyFiveMinutes' }",
                      meta: { recommendationType: 'underTwentyFiveMinutes' },
                    },
                    underFiftyMinutes: {
                      type: 'final',
                      description: "meta: { recommendationType: 'underFiftyMinutes' }",
                      meta: { recommendationType: 'underFiftyMinutes' },
                    },
                    underNinetyMinutes: {
                      type: 'final',
                      description: "meta: { recommendationType: 'underNinetyMinutes  }",
                      meta: { recommendationType: 'underNinetyMinutes' },
                    },
                    pastNinetyMinutes: {
                      type: 'final',
                      description: "meta: { recommendationType: 'pastNinetyMinutes' }",
                      meta: { recommendationType: 'pastNinetyMinutes' },
                    },
                  },
                },
                additionalTime: {
                  initial: 'init',
                  states: {
                    init: {
                      always: [
                        {
                          cond: 'fourthActivityPointFinished',
                          target: 'extra',
                        },
                        {
                          target: 'plain',
                        },
                      ],
                    },
                    plain: {
                      type: 'final',
                      description: "meta: { recommendationModifier: 'plain' }",
                      meta: { recommendationModifier: 'plain' },
                    },
                    extra: {
                      type: 'final',
                      description: "meta: { recommendationModifier: 'extra' }",
                      meta: { recommendationModifier: 'extra' },
                    },
                  },
                },
              },
              on: {
                FOCUS: {
                  target: 'work',
                },
              },
            },
            pause: {
              entry: 'recordPauseStartTime',
              initial: 'online',
              description: 'You can take pause, but system should notify every 15min to continue',
              states: {
                online: {
                  after: {
                    STOP_PROPOSAL: {
                      description: '15min',
                      target: 'stopProposal',
                    },
                  },
                },
                stopProposal: {
                  invoke: {
                    src: 'proposal',
                    id: 'stop',
                    onDone: [
                      {
                        target: 'online',
                      },
                    ],
                    onError: [
                      {
                        target: 'online',
                      },
                    ],
                    meta: { proposalType: 'stop' },
                  },
                  description: "invoke meta: { proposalType: 'stop' }",
                },
              },
              on: {
                RESUME: {
                  target: 'work',
                },
                BREAK: {
                  actions: 'increaseActivityCounter',
                  cond: 'pastMinimumActivityDuration',
                  target: 'break',
                },
              },
            },
          },
          on: {
            STOP: [
              {
                actions: 'increaseActivityCounter',
                cond: 'pastMinimumActivityDuration',
                target: 'idle',
              },
              {
                target: 'idle',
              },
            ],
          },
        },
      },
    },
    {
      actions: {
        resetToInitial: plainAssign(() => initialContext),
        recordWorkStartTime: assign((context) => {
          context.workStartTime = Maybe.Some(new Date());
        }),
        recordBreakStartTime: assign((context) => {
          context.breakStartTime = Maybe.Some(new Date());
        }),
        clearBreakStartTime: assign((context) => {
          context.breakStartTime = Maybe.None();
        }),
        recordPauseStartTime: assign((context) => {
          context.pauseStartTime = Maybe.Some(new Date());
        }),
        clearPauseStartTime: assign((context) => {
          context.pauseStartTime = Maybe.None();
        }),
        correctWorkTimer: assign((context) => {
          const now = new Date();
          const workStartTime = context.workStartTime.getOrElse(new Date());
          const pauseStartTime = context.pauseStartTime.getOrElse(new Date());
          const diff = now.getTime() - pauseStartTime.getTime();
          context.workStartTime = Maybe.Some(new Date(workStartTime.getTime() + diff));
        }),
        increaseActivityCounter: assign((context) => {
          context.activityCounter += 1;
        }),
      },
      guards: {
        hasRecordedActivity: (context) => {
          return context.activityCounter > 0;
        },
        hasPauseStartTime: (context) => {
          return context.pauseStartTime.isSome();
        },
        underTwentyFiveMinutes: (context) => {
          const now = new Date();
          const workStartTime = context.workStartTime.getOrElse(new Date());
          return now.getTime() - workStartTime.getTime() < 25 * 60 * 1000;
        },
        underFiftyMinutes: (context) => {
          const now = new Date();
          const workStartTime = context.workStartTime.getOrElse(new Date());
          return now.getTime() - workStartTime.getTime() < 50 * 60 * 1000;
        },
        underNinetyMinutes: (context) => {
          const now = new Date();
          const workStartTime = context.workStartTime.getOrElse(new Date());
          return now.getTime() - workStartTime.getTime() < 90 * 60 * 1000;
        },
        pastMinimumActivityDuration: (context) => {
          const now = new Date();
          const workStartTime = context.workStartTime.getOrElse(new Date());
          return (
            now.getTime() - workStartTime.getTime() >= context.config.minimumActivityDuration * 60 * 1000
          );
        },
        fourthActivityPointFinished: (context) => {
          return context.activityCounter % context.config.activityStreak === 0;
        },
      },
      services: {
        // eslint-disable-next-line @typescript-eslint/typedef, @typescript-eslint/naming-convention
        async proposal(_context, _event, meta) {
          const isProposalType = (type: string): type is 'break' | 'stop' => ['break', 'stop'].includes(type);
          const propose = Maybe.fromUndefined(meta.meta)
            .flatMap((m) => Maybe.fromUndefined(m.proposalType))
            .filter(isProposalType);
          if (propose.isSome()) {
            await externalService.propose(propose.some());
          }
        },
      },
      delays: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        BREAK_PROPOSAL: (ctx: IContext) => ctx.config.proposalDelays.break,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        STOP_PROPOSAL: (ctx: IContext) => ctx.config.proposalDelays.stop,
      },
    }
  );

export type StateMachine = ReturnType<typeof StateMachine>;
