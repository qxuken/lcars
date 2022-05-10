import { useMemo } from 'react';
import cn from 'classnames';
import { useEnumPropValue } from '@qxuken/react-utils';
import { BgColor, BgColorValue, Color, BgModifications } from '../../global';
import { TextWeight } from '../Text';
import { ButtonSize, ButtonWidth, IDefaultButtonProps, ButtonAccentSide } from './interfaces';
import { useContent, useAccentLines } from './hooks';
import styles from './styles.module.css';

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
  const bgColor: BgColorValue = useEnumPropValue(BgColor, BgColor.color6, bgColorProp);
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
        BgModifications.hoverable,
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