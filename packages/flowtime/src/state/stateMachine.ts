import { createMachine } from 'xstate';

export const stateMachine = createMachine({
  id: 'flowtime',
  initial: 'idle',
  states: {
    idle: {
      on: {
        START: {
          actions: ['increaseActivityCounter', 'recordStartTime'],
          target: 'focus',
        },
        RESET: {
          actions: 'resetToInitial',
          cond: 'hasRecordedActivity',
        },
      },
    },
    focus: {
      initial: 'work',
      states: {
        work: {
          initial: 'online',
          states: {
            online: {
              after: {
                '1500000': {
                  description: 'after 25min propose a break',
                  target: 'breakProposal',
                },
              },
            },
            breakProposal: {
              invoke: {
                src: 'proposals',
                id: 'break',
              },
              always: {
                target: 'online',
              },
            },
          },
          on: {
            BREAK: {
              target: 'break',
            },
            PAUSE: {
              actions: 'recordPauseStart',
              target: 'pause',
            },
          },
        },
        break: {
          exit: 'clearBreakState',
          initial: 'init',
          states: {
            init: {
              always: [
                {
                  actions: 'setShouldIcreaseBreak',
                  cond: 'fourthActivityPointFinished',
                  target: 'transition',
                },
                {
                  actions: 'setShouldNotIcreaseBreak',
                  target: 'transition',
                },
              ],
            },
            underTwentyFiveMinutes: {
              type: 'final',
            },
            underFiftyMinutes: {
              type: 'final',
            },
            underNinetyMinutes: {
              type: 'final',
            },
            pastNinetyMinutes: {
              type: 'final',
            },
            transition: {
              always: [
                {
                  cond: 'focusUnderTwentyFiveMinutes',
                  target: 'underTwentyFiveMinutes',
                },
                {
                  cond: 'focusUnderFiftyMinutes',
                  target: 'underFiftyMinutes',
                },
                {
                  cond: 'focusUnderNinetyMinutes',
                  target: 'underNinetyMinutes',
                },
                {
                  target: 'pastNinetyMinutes',
                },
              ],
            },
          },
          on: {
            FOCUS: {
              actions: ['setDefaultRecommendedTimeDuration', 'increaseActivityCounter', 'recordStartTime'],
              target: 'work',
            },
          },
        },
        pause: {
          initial: 'online',
          after: {
            '1500000': {
              description: 'after 25min force stop',
              target: '#flowtime.idle',
            },
          },
          states: {
            online: {
              after: {
                '900000': {
                  description: 'after 15min propose a stop',
                  target: 'stopProposal',
                },
              },
            },
            stopProposal: {
              invoke: {
                src: 'proposals',
                id: 'stop',
              },
              always: {
                target: 'online',
              },
            },
          },
          on: {
            RESUME: {
              actions: 'decreaseRecommendedTimeDurationByPause',
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
});
