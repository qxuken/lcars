import { ReactNode } from 'react';
import cn from 'classnames';
import { BgColor } from '@qxuken/lcars-ui';
import styles from './styles.module.css';

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
    <div className={cn(className, styles.wrapper, BgColor.default)}>
      <div className={cn(styles.container, BgColor.color7)}>
        {top && <div className={cn(styles.panel, styles.horizontal, styles.top, BgColor.default)}>{top}</div>}
        {bottom && (
          <div className={cn(styles.panel, styles.horizontal, styles.bottom, BgColor.default)}>{bottom}</div>
        )}
        {left && (
          <div className={cn(styles.panel, styles.vertical, styles.left, BgColor.default)}>{left}</div>
        )}
        {right && (
          <div className={cn(styles.panel, styles.vertical, styles.right, BgColor.default)}>{right}</div>
        )}
        <div className={cn(styles.content, BgColor.default)}>{content}</div>
      </div>
    </div>
  );
}
