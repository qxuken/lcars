import { DetailedHTMLProps, ButtonHTMLAttributes } from 'react';
import cn from 'classnames';
import style from './styles.module.css';

export interface IButtonProps
  extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {}

export function Button(props: IButtonProps): JSX.Element {
  return <button {...props} className={cn(props.className, style.button)} />;
}
