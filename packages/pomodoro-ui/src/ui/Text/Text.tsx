import cn from 'classnames';
import { useEnumPropValue } from '../../hooks';
import { Color } from '../global';
import { ITextProps, TextSize, TextWeight } from './interfaces';
import styles from './styles.module.css';

export function Text({
  className,
  as = 'span',
  color: colorProp,
  weight: weightProp,
  size: sizeProp,
  ...props
}: ITextProps): JSX.Element {
  const Tag = as;
  const color: Color = useEnumPropValue(Color, Color.white, colorProp);
  const size: TextSize = useEnumPropValue(TextSize, TextSize.medium, sizeProp);
  const weight: TextWeight = useEnumPropValue(TextWeight, TextWeight.regular, weightProp);

  return <Tag {...props} className={cn(className, color, styles.text, styles[size], styles[weight])} />;
}

Text.Size = TextSize;
Text.Weight = TextWeight;
