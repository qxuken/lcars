import cn from 'classnames';
import styles from './styles.module.css';

export interface IBoxProps {
  className?: string;
  center?: boolean;
  minFlex?: boolean;
  children: React.ReactNode;
}

export function Box({ className, center, minFlex, children }: IBoxProps): JSX.Element {
  return (
    <div className={cn(className, styles.box, { [styles.center]: center, [styles['min-flex']]: minFlex })}>
      {children}
    </div>
  );
}
