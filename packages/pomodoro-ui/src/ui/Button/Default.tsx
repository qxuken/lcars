import cn from 'classnames';
import { useEnumPropValue } from '../../hooks';
import { BgColor } from '../global';
import { ButtonSize, ButtonWidth, IDefaultButtonProps } from './interfaces';
import { useContent } from './hooks';
import styles from './styles.module.css';

export function DefaultButton({
  className,
  children,
  bgColor: bgColorProp,
  width: widthProp,
  size: sizeProp,
  ...props
}: IDefaultButtonProps): JSX.Element {
  const bgColor: BgColor = useEnumPropValue(BgColor, BgColor.color6, bgColorProp);
  const size: ButtonSize = useEnumPropValue(ButtonSize, ButtonSize.default, sizeProp);
  const width: ButtonWidth = useEnumPropValue(ButtonWidth, ButtonWidth.full, widthProp);
  const content = useContent(children, size);
  return (
    <button {...props} className={cn(className, bgColor, styles.button, styles[size], styles[width])}>
      {content}
    </button>
  );
}
