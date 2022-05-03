import cn from 'classnames';
import { useMemo } from 'react';
import { useEnumPropValue } from '../../hooks';
import { Text, TextSize } from '../Text';
import { DefaultButton } from './Default';
import { useContent } from './hooks';
import { ButtonSize, IButtonWithCounterProps } from './interfaces';
import { getCounterTextSize } from './utils';
import styles from './styles.module.css';

export function ButtonWithCounter({
  className,
  children,
  counter,
  ...props
}: IButtonWithCounterProps): JSX.Element {
  const size: ButtonSize = useEnumPropValue(ButtonSize, ButtonSize.default, props.size);
  const counterSize: TextSize = useMemo(() => getCounterTextSize(size), [size]);
  const content = useContent(children, size);
  return (
    <DefaultButton {...props} className={cn(className, styles['with-counter'])}>
      <Text className={styles.counter} size={counterSize}>
        {counter}
      </Text>
      {content}
    </DefaultButton>
  );
}
