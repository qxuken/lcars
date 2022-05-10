import { ReactNode } from 'react';
import cn from 'classnames';
import styles from './styles.module.css';
import { ITextProps, useWrapIfText } from '../Text';

const DEFAULT_TEXT_PROPS: ITextProps = {
  as: 'h1',
  size: 'xxlarge',
  weight: 'semibold',
};

export interface IContentProps {
  className?: string;
  children: ReactNode;
  left?: ReactNode;
  right?: ReactNode;
}
export function Content({ className, children, left, right }: IContentProps): JSX.Element {
  const content = useWrapIfText(children, DEFAULT_TEXT_PROPS);
  return (
    <div className={cn(className, styles['content-container'])}>
      <div className={styles.left}>{left}</div>
      <div className={styles.content}>{content}</div>
      <div className={styles.right}>{right}</div>
    </div>
  );
}
