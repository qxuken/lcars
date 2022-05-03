import cn from 'classnames';
import { useEnumPropValue } from '../../hooks';
import { ITextProps, TextSize } from './interfaces';
import styles from './styles.module.css';

export function Text({ className, as = 'span', size: sizeProp, ...props }: ITextProps): JSX.Element {
  const Tag = as;
  const size: TextSize = useEnumPropValue(TextSize, TextSize.medium, sizeProp);

  return <Tag {...props} className={cn(className, styles.text, styles[size])} />;
}
