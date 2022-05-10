import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import type { BgColor } from '../global';
import type { EnumProp } from '../../types';

export enum ButtonSize {
  small = 'size-small',
  default = 'size-default',
}

export enum ButtonWidth {
  full = 'width-full',
  fixed4 = 'width-fixed4',
  fixed5 = 'width-fixed5',
}

export interface IDefaultButtonProps
  extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  size?: EnumProp<typeof ButtonSize>;
  width?: EnumProp<typeof ButtonWidth>;
  bgColor?: EnumProp<typeof BgColor>;
}

export interface IButtonWithCounterProps extends IDefaultButtonProps {
  counter: number;
}

export type IButtonProps = IButtonWithCounterProps | IDefaultButtonProps;

export function isButtonWithCounter(props: IButtonProps): props is IButtonWithCounterProps {
  return 'counter' in props;
}
