import { ReactNode } from 'react';
import cn from 'classnames';
import { Box, Text } from '../../ui';
import styles from './styles.module.css';
import { PredefinedAnimationClass } from '../../ui/global';

export interface IBaseLayoutProps {
  className?: string;
  top?: ReactNode;
  bottom?: ReactNode;
  left?: ReactNode;
  right?: ReactNode;
  content?: ReactNode;
}

export function BaseLayout({ className, top, bottom, left, right, content }: IBaseLayoutProps): JSX.Element {
  return (
    <div className={cn(className, styles.wrapper)}>
      <div className={styles.container}>
        {top && <div className={cn(styles.panel, styles.horizontal, styles.top)}>{top}</div>}
        {bottom && <div className={cn(styles.panel, styles.horizontal, styles.bottom)}>{bottom}</div>}
        {left && <div className={cn(styles.panel, styles.vertical, styles.left)}>{left}</div>}
        {right && <div className={cn(styles.panel, styles.vertical, styles.right)}>{right}</div>}
        <div className={styles.content}>
          {content ?? (
            <Box center>
              <Text as="h1" size="xxlarge" weight="semibold" className={PredefinedAnimationClass.blink}>
                stand by
              </Text>
            </Box>
          )}
        </div>
      </div>
    </div>
  );
}
