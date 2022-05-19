import { useMemo } from 'react';
import cn from 'classnames';
import { useEnumPropValue } from '@qxuken/react-utils';
import { BgColor, Color } from '../../global';
import { Text, TextSize } from '../Text';
import { ButtonSize, IButtonWithCounterProps } from './interfaces';
import { getCounterTextSize } from './utils';
import { DefaultButton } from './Default';
import styles from './styles.module.css';

export function ButtonWithCounter({ className, counter, ...props }: IButtonWithCounterProps): JSX.Element {
  const size: ButtonSize = useEnumPropValue(ButtonSize, ButtonSize.default, props.size);
  const counterSize: TextSize = useMemo(() => getCounterTextSize(size), [size]);

  return (
    <DefaultButton
      {...props}
      className={className}
      weight={Text.Weight.light}
      left={
        <Text
          className={cn(styles.counter, Color.white, {
            [BgColor.default]: !props.disabled,
          })}
          size={counterSize}
        >
          {counter}
        </Text>
      }
    />
  );
}
