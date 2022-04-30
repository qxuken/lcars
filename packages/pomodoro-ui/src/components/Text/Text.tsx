import cn from 'classnames';
import { ITextProps } from './interfaces';
import styles from './styles.module.css';

export function Text({ className, as = 'span', ...props }: ITextProps): JSX.Element {
  const Tag = as;
  return <Tag {...props} className={cn(className, styles.text)} />;
}
