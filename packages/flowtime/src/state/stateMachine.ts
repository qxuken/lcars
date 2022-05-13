import { createMachine } from 'xstate';

const stateMachine = createMachine({
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
          after: {
            '1500000': {
              actions: 'proposeBreak',
              description: 'after 25min propose a break',
            },
            '3000000': {
              actions: 'proposeBreak',
              description: 'after 50min propose a break second time',
            },
            '5400000': {
              actions: 'proposeBreak',
              description: 'after 90min propose a break third time',
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
          initial: 'start',
          states: {
            start: {
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
