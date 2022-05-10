import cn from 'classnames';
import styles from './styles.module.css';

export interface IPanelProps {
  className?: string;
  vertical?: boolean;
  children: React.ReactNode;
}

export function Panel({ className, vertical, children }: IPanelProps): JSX.Element {
  return <div className={cn(className, styles.panel, { [styles.vertical]: vertical })}>{children}</div>;
}
