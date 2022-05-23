import { prop } from 'ramda';
import { Content, Panel, PredefinedAnimationClass, Text } from '@qxuken/lcars-ui';

import { useFlowtimeContext } from '../../services';

import { Stopwatch } from '../Stopwatch';

import { ILayoutContentProps } from './interfaces';

export function PauseScreen({ small }: ILayoutContentProps): JSX.Element {
  const context = useFlowtimeContext();
  return (
    <Content>
      <Panel vertical>
        {!small && (
          <Text color="color7" className={PredefinedAnimationClass.blinkWhite}>
            On Pause
          </Text>
        )}
        <Text size="xlarge" weight="semibold">
          <Stopwatch from={context.chain(prop('pauseStartTime'))} />
        </Text>
        {!small && (
          <Text size="small" color="color1" className={PredefinedAnimationClass.blinkWhite}>
            Remember to resume when you are ready
          </Text>
        )}
      </Panel>
    </Content>
  );
}
