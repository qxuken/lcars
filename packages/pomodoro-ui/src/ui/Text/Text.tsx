import cn from 'classnames';
import { ITextProps, TextSize } from './interfaces';
import styles from './styles.module.css';

export function Text({ className, as = 'span', size = TextSize.medium, ...props }: ITextProps): JSX.Element {
  const Tag = as;
  console.log(styles);
  console.log(size);
  console.log(cn(className, styles.text, styles[size]));
  return <Tag {...props} className={cn(className, styles.text, styles[size])} />;
}
