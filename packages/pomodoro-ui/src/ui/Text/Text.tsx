import cn from 'classnames';
import { useEnumPropValue } from '../../hooks';
import { ITextProps, TextSize, TextWeight } from './interfaces';
import styles from './styles.module.css';

export function Text({
  className,
  as = 'span',
  weight: weightProp,
  size: sizeProp,
  ...props
}: ITextProps): JSX.Element {
  const Tag = as;
  const size: TextSize = useEnumPropValue(TextSize, TextSize.medium, sizeProp);
  const weight: TextWeight = useEnumPropValue(TextWeight, TextWeight.regular, weightProp);

  return <Tag {...props} className={cn(className, styles.text, styles[size], styles[weight])} />;
}

Text.Size = TextSize;
Text.Weight = TextWeight;
