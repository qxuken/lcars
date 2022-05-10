import cn from 'classnames';
import { useEnumPropValue } from '../../hooks';
import { BgColor, Color } from '../global';
import { ButtonSize, ButtonWidth, IDefaultButtonProps, ButtonAccentSide } from './interfaces';
import { useContent, useAccentLines } from './hooks';
import styles from './styles.module.css';
import { TextWeight } from '../Text';
import { useMemo } from 'react';

export function DefaultButton({
  className,
  children,
  bgColor: bgColorProp,
  width: widthProp,
  size: sizeProp,
  accentSide: accentSideProp,
  weight = TextWeight.regular,
  withAccentLine,
  left,
  ...props
}: IDefaultButtonProps): JSX.Element {
  const bgColor: BgColor = useEnumPropValue(BgColor, BgColor.color6, bgColorProp);
  const size: ButtonSize = useEnumPropValue(ButtonSize, ButtonSize.default, sizeProp);
  const width: ButtonWidth = useEnumPropValue(ButtonWidth, ButtonWidth.full, widthProp);
  const accentSide: ButtonAccentSide = useEnumPropValue(
    ButtonAccentSide,
    ButtonAccentSide.both,
    accentSideProp
  );
  const accentLines = useAccentLines(accentSide, withAccentLine);
  const textProps = useMemo(() => ({ weight }), [weight]);
  const content = useContent(children, size, textProps);
  return (
    <button
      {...props}
      className={cn(
        className,
        Color.white,
        bgColor,
        styles.button,
        styles[size],
        styles[width],
        styles[accentSide]
      )}
    >
      {accentLines.left && <div className={cn(styles['accent-line'], BgColor.default)} />}
      {left}
      <div className={styles.content}>{content}</div>
      {accentLines.right && <div className={cn(styles['accent-line'], BgColor.default)} />}
    </button>
  );
}
