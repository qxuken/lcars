import { useMemo } from 'react';
import cn from 'classnames';
import { useEnumPropValue } from '../../hooks';
import { Text, TextSize } from '../Text';
import { DefaultButton } from './Default';
import { ButtonSize, IButtonWithCounterProps } from './interfaces';
import { getCounterTextSize } from './utils';
import styles from './styles.module.css';
import { BgColor, Color } from '../global';

export function ButtonWithCounter({ className, counter, ...props }: IButtonWithCounterProps): JSX.Element {
  const size: ButtonSize = useEnumPropValue(ButtonSize, ButtonSize.default, props.size);
  const counterSize: TextSize = useMemo(() => getCounterTextSize(size), [size]);

  return (
    <DefaultButton
      {...props}
      className={className}
      weight={Text.Weight.light}
      left={
        <Text className={cn(styles.counter, Color.white, BgColor.default)} size={counterSize}>
          {counter}
        </Text>
      }
    />
  );
}
