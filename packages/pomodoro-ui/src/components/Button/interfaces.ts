import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import { Color } from '../global';

export interface IDefaultButtonProps
  extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {}

export interface IButtonWithCounterProps extends IDefaultButtonProps {
  counter: number;
  color?: Color;
}

export type IButtonProps = IButtonWithCounterProps | IDefaultButtonProps;

export function isButtonWithCounter(props: IButtonProps): props is IButtonWithCounterProps {
  return 'counter' in props;
}
