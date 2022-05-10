import cn from 'classnames';
import { useEnumPropValue } from '@qxuken/react-utils';
import { Color, ColorValue } from '../../global';
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
  const color: ColorValue = useEnumPropValue(Color, Color.white, colorProp);
  const size: TextSize = useEnumPropValue(TextSize, TextSize.medium, sizeProp);
  const weight: TextWeight = useEnumPropValue(TextWeight, TextWeight.regular, weightProp);

  return <Tag {...props} className={cn(className, color, styles.text, styles[size], styles[weight])} />;
}

Text.Size = TextSize;
Text.Weight = TextWeight;
