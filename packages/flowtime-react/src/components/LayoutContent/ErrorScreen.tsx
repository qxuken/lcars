import { Panel, Text, PredefinedAnimationClass, Content, ITextProps } from '@qxuken/lcars-ui';
import { useMemo } from 'react';

import { ILayoutContentProps } from './interfaces';

export function ErrorScreen({ small }: ILayoutContentProps): JSX.Element {
  const systemStatusSize: ITextProps['size'] = useMemo(() => (small ? 'large' : undefined), [small]);
  return (
    <Content>
      <Panel vertical>
        <Text color="color4" size={systemStatusSize} className={PredefinedAnimationClass.blinkWhite}>
          System status • Error
        </Text>
        {!small && (
          <>
            <Text size="xlarge" weight="semibold" className={PredefinedAnimationClass.blink7}>
              Main process offline
            </Text>
            <Text size="small" color="color1" className={PredefinedAnimationClass.blinkWhite}>
              manual restart recommended
            </Text>
          </>
        )}
      </Panel>
    </Content>
  );
}
