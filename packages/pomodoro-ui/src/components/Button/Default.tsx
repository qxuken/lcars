import cn from 'classnames';
import { useWrapIfText } from '../Text';
import { IDefaultButtonProps } from './interfaces';
import style from './styles.module.css';

export function DefaultButton({ className, children, ...props }: IDefaultButtonProps): JSX.Element {
  const content = useWrapIfText(children);
  return (
    <button {...props} className={cn(className, style.button)}>
      {content}
    </button>
  );
}
