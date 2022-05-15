// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true;
  eventsCausingActions: {
    resetToInitial: 'RESET';
    clearPauseStartTime: 'START';
    correctWorkTimer: '';
    increaseActivityCounter: '';
    recordWorkStartTime: '';
    recordPauseStartTime: 'PAUSE';
  };
  internalEvents: {
    '': { type: '' };
    'done.invoke.break': {
      type: 'done.invoke.break';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'error.platform.break': { type: 'error.platform.break'; data: unknown };
    'done.invoke.stop': {
      type: 'done.invoke.stop';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'error.platform.stop': { type: 'error.platform.stop'; data: unknown };
    'xstate.after(1500000)#flowtime.focus.work.online': {
      type: 'xstate.after(1500000)#flowtime.focus.work.online';
    };
    'xstate.after(900000)#flowtime.focus.pause.online': {
      type: 'xstate.after(900000)#flowtime.focus.pause.online';
    };
    'xstate.init': { type: 'xstate.init' };
  };
  invokeSrcNameMap: {
    proposals: 'done.invoke.break' | 'done.invoke.stop';
  };
  missingImplementations: {
    actions: never;
    services: never;
    guards: never;
    delays: never;
  };
  eventsCausingServices: {
    proposals:
      | 'xstate.after(1500000)#flowtime.focus.work.online'
      | 'xstate.after(900000)#flowtime.focus.pause.online';
  };
  eventsCausingGuards: {
    hasRecordedActivity: 'RESET';
    hasPauseStartTime: '';
    underTwentyFiveMinutes: '';
    underFiftyMinutes: '';
    underNinetyMinutes: '';
    fourthActivityPointFinished: '';
  };
  eventsCausingDelays: {};
  matchesStates:
    | 'idle'
    | 'focus'
    | 'focus.work'
    | 'focus.work.init'
    | 'focus.work.init.init'
    | 'focus.work.init.resume'
    | 'focus.work.init.new'
    | 'focus.work.breakProposal'
    | 'focus.work.online'
    | 'focus.break'
    | 'focus.break.timer'
    | 'focus.break.timer.init'
    | 'focus.break.timer.underTwentyFiveMinutes'
    | 'focus.break.timer.underFiftyMinutes'
    | 'focus.break.timer.underNinetyMinutes'
    | 'focus.break.timer.pastNinetyMinutes'
    | 'focus.break.additionalTime'
    | 'focus.break.additionalTime.init'
    | 'focus.break.additionalTime.plain'
    | 'focus.break.additionalTime.extra'
    | 'focus.pause'
    | 'focus.pause.online'
    | 'focus.pause.stopProposal'
    | {
        focus?:
          | 'work'
          | 'break'
          | 'pause'
          | {
              work?: 'init' | 'breakProposal' | 'online' | { init?: 'init' | 'resume' | 'new' };
              break?:
                | 'timer'
                | 'additionalTime'
                | {
                    timer?:
                      | 'init'
                      | 'underTwentyFiveMinutes'
                      | 'underFiftyMinutes'
                      | 'underNinetyMinutes'
                      | 'pastNinetyMinutes';
                    additionalTime?: 'init' | 'plain' | 'extra';
                  };
              pause?: 'online' | 'stopProposal';
            };
      };
  tags: never;
}
