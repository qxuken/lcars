import cn from 'classnames';
import { useEnumPropValue } from '../../hooks';
import { Color } from '../global';
import { ButtonSize, IDefaultButtonProps } from './interfaces';
import { useContent } from './hooks';
import styles from './styles.module.css';

export function DefaultButton({
  className,
  children,
  color: colorProp,
  size: sizeProp,
  ...props
}: IDefaultButtonProps): JSX.Element {
  const color: Color = useEnumPropValue(Color, Color.color6, colorProp);
  const size: ButtonSize = useEnumPropValue(ButtonSize, ButtonSize.default, sizeProp);
  const content = useContent(children, size);
  return (
    <button {...props} className={cn(className, styles.button, styles[color], styles[size])}>
      {content}
    </button>
  );
}
