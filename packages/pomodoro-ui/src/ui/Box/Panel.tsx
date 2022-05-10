import cn from 'classnames';
import styles from './styles.module.css';

export interface IBoxProps {
  className?: string;
  center?: boolean;
  children: React.ReactNode;
}

export function Box({ className, center, children }: IBoxProps): JSX.Element {
  return <div className={cn(className, styles.box, { [styles.center]: center })}>{children}</div>;
}
