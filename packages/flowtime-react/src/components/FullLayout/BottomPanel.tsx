import { Animated, Filler, Panel } from '@qxuken/lcars-ui';

export function BottomPanel(): JSX.Element {
  return (
    <Panel>
      <Filler />
      <Animated wide />
      <Filler size="wide" bgColor="color7" />
      <Filler />
    </Panel>
  );
}
