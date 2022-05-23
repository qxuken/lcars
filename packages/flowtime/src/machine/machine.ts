import { differenceInMinutes } from 'date-fns';
import { Maybe } from 'monet';
import { assign } from '@xstate/immer';
import { createMachine, assign as plainAssign, InvokeMeta } from 'xstate';

import { IContext, Action, IMachineServiceProp, isProposalType } from './interfaces';

//* based on: https://stately.ai/registry/editor/share/eb9558c6-d263-44c0-ba52-a926faa742b3
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
          description:
            'suggested interface IContext {\n  activityCounter: number;\n  workStartTime: Maybe<Date>;\n  pauseStartTime: Maybe<Date>;\n  breakStartTime: Maybe<Date>;\n  config: IConfiguration;\n}',
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
          entry: ['clearPauseStartTime', 'clearBreakStartTime'],
          initial: 'work',
          states: {
            work: {
              initial: 'init',
              description: "meta: { recommendationType:  'focus' }",
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
                BREAK: {
                  actions: 'createActivityWithWorkDuration',
                  cond: 'pastMinimumActivityDuration',
                  target: 'break',
                },
                PAUSE: {
                  target: 'pause',
                },
              },
            },
            break: {
              exit: 'addBreakDurationToLastActivity',
              type: 'parallel',
              entry: 'recordBreakStartTime',
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
                  actions: 'clearBreakStartTime',
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
                  actions: 'createActivityWithWorkDuration',
                  cond: 'pastMinimumActivityDurationMinusPause',
                  target: 'break',
                },
              },
            },
          },
          on: {
            STOP: [
              {
                actions: 'createActivityWithWorkDuration',
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
        createActivityWithWorkDuration: assign((context) => {
          const now = new Date();
          const workStartTime = context.workStartTime.getOrElse(new Date());
          context.activities.push({
            workDurationMinutes: differenceInMinutes(now, workStartTime),
            breakDurationMinutes: Maybe.None(),
          });
        }),

        addBreakDurationToLastActivity: assign((context) => {
          const lastItem = context.activities.at(-1);
          if (!lastItem) {
            return;
          }
          const now = new Date();
          const breakStartTime = context.breakStartTime.getOrElse(new Date());
          lastItem.breakDurationMinutes = Maybe.fromFalsy(differenceInMinutes(now, breakStartTime));
        }),
      },
      guards: {
        hasRecordedActivity: (context) => {
          return context.activities.length > 0;
        },
        hasPauseStartTime: (context) => {
          return context.pauseStartTime.isSome();
        },
        underTwentyFiveMinutes: (context) => {
          const now = new Date();
          const workStartTime = context.workStartTime.getOrElse(new Date());
          return differenceInMinutes(now, workStartTime) < 25;
        },
        underFiftyMinutes: (context) => {
          const now = new Date();
          const workStartTime = context.workStartTime.getOrElse(new Date());
          return differenceInMinutes(now, workStartTime) < 50;
        },
        underNinetyMinutes: (context) => {
          const now = new Date();
          const workStartTime = context.workStartTime.getOrElse(new Date());
          return differenceInMinutes(now, workStartTime) < 90;
        },
        pastMinimumActivityDuration: (context) => {
          const now = new Date();
          const workStartTime = context.workStartTime.getOrElse(new Date());
          return differenceInMinutes(now, workStartTime) >= context.config.minimumActivityDurationMinutes;
        },
        pastMinimumActivityDurationMinusPause: (context) => {
          const now = new Date();
          const workStartTime = context.workStartTime.getOrElse(new Date());
          const pauseStartTime = context.pauseStartTime.getOrElse(new Date());
          return (
            differenceInMinutes(now, workStartTime) - differenceInMinutes(now, pauseStartTime) >=
            context.config.minimumActivityDurationMinutes
          );
        },
        fourthActivityPointFinished: (context) => {
          return context.activities.length % context.config.activityStreak === 0;
        },
      },
      services: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        async proposal(_context: IContext, _event: Record<'type', string>, meta: InvokeMeta) {
          return Maybe.fromUndefined(meta.meta)
            .flatMap((m) => Maybe.fromUndefined(m.proposalType))
            .filter(isProposalType)
            .cata<void | Promise<void>>(Promise.resolve, externalService.propose);
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
