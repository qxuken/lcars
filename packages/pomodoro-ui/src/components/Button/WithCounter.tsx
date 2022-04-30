import cn from 'classnames';
import { Text, useWrapIfText } from '../Text';
import { DefaultButton } from './Default';
import { IButtonWithCounterProps } from './interfaces';
import styles from './styles.module.css';

export function ButtonWithCounter({
  className,
  children,
  counter,
  ...props
}: IButtonWithCounterProps): JSX.Element {
  const content = useWrapIfText(children);
  return (
    <DefaultButton {...props} className={cn(className)}>
      <Text className={styles.counter}>{counter}</Text>
      {content}
    </DefaultButton>
  );
}
