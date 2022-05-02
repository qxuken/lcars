import cn from 'classnames';
import { Color } from '../global';
import { useWrapIfText } from '../Text';
import { IDefaultButtonProps } from './interfaces';
import styles from './styles.module.css';

export function DefaultButton({
  className,
  children,
  color = Color.color1,
  ...props
}: IDefaultButtonProps): JSX.Element {
  const content = useWrapIfText(children, styles.text);
  return (
    <button {...props} className={cn(className, styles.button, styles[color])}>
      {content}
    </button>
  );
}
