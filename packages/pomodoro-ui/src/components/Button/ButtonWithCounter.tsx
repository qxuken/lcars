import { DetailedHTMLProps, ButtonHTMLAttributes } from 'react';
import cn from 'classnames';
import style from './styles.module.css';

export interface ButtonProps
  extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  value: number;
}

export function ButtonWithCounter(props: ButtonProps) {
  return <button {...props} className={cn(props.className, style.button)} />;
}
