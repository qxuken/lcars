import { ReactNode } from 'react';
import cn from 'classnames';
import { Box, Text, PredefinedAnimationClass } from '@qxuken/lcars-ui';

import { BaseLayout } from '../BaseLayout';
import { LeftPanel } from '../LeftPanel';
import { RightPanel } from '../RightPanel';
import { TopPanel } from '../TopPanel';

import { LayoutContent } from './LayoutContent';
import styles from './styles.module.css';

export interface IPinnedLayoutProps {
  className?: string;
  content?: ReactNode;
}

export function PinnedLayout({ className, content }: IPinnedLayoutProps): JSX.Element {
  return (
    <BaseLayout
      className={cn(className, styles.wrapper)}
      top={<TopPanel small />}
      left={<LeftPanel small />}
      right={<RightPanel small />}
      content={<LayoutContent />}
    />
  );
}
