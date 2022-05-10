import { ReactNode } from 'react';
import { Button, Animated, Filler, Panel } from '../../ui';
import { BaseLayout } from '../BaseLayout';

export interface IFullLayoutProps {
  className?: string;
  content?: ReactNode;
}

export function FullLayout({ className, content }: IFullLayoutProps): JSX.Element {
  return (
    <BaseLayout
      className={className}
      top={
        <Panel>
          <Button size="small" bgColor="color5" width="fixed5">
            pause
          </Button>
          <Filler />
          <Animated />
          <Button size="small" width="fixed5">
            pin
          </Button>
          <Filler />
          <Button size="small" bgColor="color5" width="fixed5">
            minimize
          </Button>
        </Panel>
      }
      bottom={
        <Panel>
          <Filler />
          <Animated wide />
          <Filler size="wide" bgColor="color7" />
          <Filler />
        </Panel>
      }
      left={
        <Panel vertical>
          <Button bgColor="color5">short</Button>
          <Button bgColor="color3">long</Button>
        </Panel>
      }
      right={
        <Panel vertical>
          <Button bgColor="color5">exit</Button>
        </Panel>
      }
      content={content}
    />
  );
}
