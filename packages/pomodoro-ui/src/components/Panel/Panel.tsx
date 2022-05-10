import cn from 'classnames';
import styles from './styles.module.css';

export interface IPanelProps {
  className?: string;
  vertical?: boolean;
  minWidth?: boolean;
  children: React.ReactNode;
}

export function Panel({ className, vertical, minWidth, children }: IPanelProps): JSX.Element {
  return (
    <div
      className={cn(className, styles.panel, {
        [styles.vertical]: vertical,
        [styles['min-width']]: minWidth,
      })}
    >
      {children}
    </div>
  );
}
