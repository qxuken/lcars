import { prop } from 'ramda';
import { Content, Panel, Text } from '@qxuken/lcars-ui';

import { useFlowtimeContext, useFlowtimeTimeRecommendation } from '../../services';

import { Stopwatch } from '../Stopwatch';

import { ILayoutContentProps } from './interfaces';

export function WorkScreen({ small }: ILayoutContentProps): JSX.Element {
  const context = useFlowtimeContext();
  const timeRecommendation = useFlowtimeTimeRecommendation();
  return (
    <Content>
      <Panel vertical>
        {!small && <Text color="color7">focus</Text>}
        <Text size="xlarge" weight="semibold">
          <Stopwatch from={context.chain(prop('workStartTime'))} />
        </Text>
        {!small && (
          <Text size="small" color="color1">
            recommended time: {timeRecommendation}
          </Text>
        )}
      </Panel>
    </Content>
  );
}
