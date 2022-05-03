import cn from 'classnames';
import { Text, useWrapIfText, TextSize } from '../Text';
import { DefaultButton } from './Default';
import { IButtonWithCounterProps } from './interfaces';
import styles from './styles.module.css';

export function ButtonWithCounter({
  className,
  children,
  counter,
  ...props
}: IButtonWithCounterProps): JSX.Element {
  const content = useWrapIfText(children, styles.text);
  return (
    <DefaultButton {...props} className={cn(className, styles['with-counter'])}>
      <Text className={styles.counter} size={TextSize.large}>
        {counter}
      </Text>
      {content}
    </DefaultButton>
  );
}
