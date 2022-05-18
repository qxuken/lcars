import { Maybe } from 'monet';
import { assign } from '@xstate/immer';
import { createMachine } from 'xstate';
import type { IContext, IActions } from './model';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const StateMachine = (initialContext: IContext) =>
  createMachine(
    {
      tsTypes: {} as import('./stateMachine.typegen').Typegen0,
      schema: { context: {} as IContext, events: {} as IActions },
      context: initialContext,
      id: 'flowtime',
      initial: 'idle',
      states: {
        idle: {
          on: {
            START: {
              target: 'focus',
            },
            RESET: [
              {
                actions: 'resetToInitial',
                cond: 'hasRecordedActivity',
              },
              {},
            ],
          },
        },
        focus: {
          entry: 'clearPauseStartTime',
          initial: 'work',
          states: {
            work: {
              initial: 'init',
              description: 'Work Cycle. ',
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
                      description: 'Will change WorkStartTime by adding difference by PauseStartTime',
                    },
                    new: {
                      type: 'final',
                      entry: ['increaseActivityCounter', 'recordWorkStartTime'],
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
                    meta: {
                      proposalType: 'break',
                    },
                  },
                  description: "meta: { proposalType: 'break' }",
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
                BREAK: {
                  target: 'break',
                },
                PAUSE: {
                  target: 'pause',
                },
              },
            },
            break: {
              type: 'parallel',
              description:
                'Should provide information for break duration by merging metas of the inner states',
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
                      meta: {
                        breakType: 'underTwentyFiveMinutes',
                      },
                    },
                    underFiftyMinutes: {
                      type: 'final',
                      meta: {
                        breakType: 'underFiftyMinutes',
                      },
                    },
                    underNinetyMinutes: {
                      type: 'final',
                      meta: {
                        breakType: 'underNinetyMinutes',
                      },
                    },
                    pastNinetyMinutes: {
                      type: 'final',
                      meta: {
                        breakType: 'pastNinetyMinutes',
                      },
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
                      meta: {
                        breakModifier: 'plain',
                      },
                    },
                    extra: {
                      type: 'final',
                      meta: {
                        breakModifier: 'extra',
                      },
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
                    meta: {
                      proposalType: 'stop',
                    },
                  },
                  description: "meta: { proposalType: 'stop' }",
                },
              },
              on: {
                RESUME: {
                  target: 'work',
                },
              },
            },
          },
          on: {
            STOP: {
              target: 'idle',
            },
          },
        },
      },
    },
    {
      actions: {
        resetToInitial: assign(() => {
          return initialContext;
        }),
        clearPauseStartTime: assign((context) => {
          context.pauseStartTime = Maybe.None();
        }),
        recordPauseStartTime: assign((context) => {
          context.pauseStartTime = Maybe.Some(new Date());
        }),
        recordWorkStartTime: assign((context) => {
          context.workStartTime = Maybe.Some(new Date());
        }),
        correctWorkTimer: assign((context) => {
          const workStartTime = context.workStartTime.getOrElse(new Date());
          const pauseStartTime = context.pauseStartTime.getOrElse(new Date());
          const diff = pauseStartTime.getTime() - workStartTime.getTime();
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
        fourthActivityPointFinished: (context) => {
          return context.activityCounter % context.config.activityStreak === 0;
        },
      },
      services: {
        // eslint-disable-next-line @typescript-eslint/typedef, @typescript-eslint/naming-convention
        async proposal(_context, _event, meta) {
          const propose: Maybe<string> = Maybe.fromEmpty(meta.meta).map((m) => m.proposalType);
          console.log('proposal', propose.orSome('none'));
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

export type IStateMachine = ReturnType<typeof StateMachine>;
