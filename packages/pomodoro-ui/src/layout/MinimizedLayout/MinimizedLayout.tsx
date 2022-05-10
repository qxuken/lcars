import { ReactNode } from 'react';
import cn from 'classnames';
import { Box, Button, Filler, Panel, Text, PredefinedAnimationClass } from '@qxuken/lcars-ui';
import { BaseLayout } from '../BaseLayout';
import styles from './styles.module.css';

export interface IMinimizedLayoutProps {
  className?: string;
  content?: ReactNode;
}

export function MinimizedLayout({ className, content }: IMinimizedLayoutProps): JSX.Element {
  return (
    <BaseLayout
      className={cn(className, styles.wrapper)}
      top={
        <Panel>
          <Button size="small" bgColor="color6" width="fixed5" weight="light">
            pomodoro
          </Button>
          <Filler size="small" />
          <Button size="small" bgColor="color5" width="fixed4">
            unpin
          </Button>
          <Filler size="small" />
          <Button size="small" bgColor="color2" width="fixed4">
            maximize
          </Button>
        </Panel>
      }
      bottom={
        <Panel>
          <Button size="small" bgColor="color4" width="fixed5">
            start
          </Button>
          <Filler size="small" />
          <Button size="small" bgColor="color3" width="fixed4">
            pause
          </Button>
          <Filler size="small" />
          <Button size="small" bgColor="color6" width="fixed4">
            skip
          </Button>
        </Panel>
      }
      left={
        <Panel vertical>
          <Button size="small" bgColor="color5">
            short
          </Button>
          <Button size="small" bgColor="color3">
            long
          </Button>
        </Panel>
      }
      right={
        <Panel vertical>
          <Button bgColor="color5">exit</Button>
        </Panel>
      }
      content={
        content ?? (
          <Box center>
            <Text as="h1" size="xlarge" weight="semibold" className={PredefinedAnimationClass.blink7}>
              stand by
            </Text>
          </Box>
        )
      }
    />
  );
}
