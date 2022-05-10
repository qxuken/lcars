import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';
import type { BgColor } from '../global';
import type { EnumProp } from '../../types';
import { TextWeight } from '../Text';

export enum ButtonSize {
  small = 'size-small',
  default = 'size-default',
}

export enum ButtonWidth {
  full = 'width-full',
  fixed4 = 'width-fixed4',
  fixed5 = 'width-fixed5',
  min10 = 'width-min10',
}

export enum ButtonAccentSide {
  none = 'accent-none',
  both = 'accent-both',
  left = 'accent-left',
  right = 'accent-right',
}

export interface IDefaultButtonProps
  extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  left?: ReactNode;
  bgColor?: EnumProp<typeof BgColor>;
  size?: EnumProp<typeof ButtonSize>;
  width?: EnumProp<typeof ButtonWidth>;
  weight?: EnumProp<typeof TextWeight>;
  accentSide?: EnumProp<typeof ButtonAccentSide>;
  center?: boolean;
  withAccentLine?: boolean;
}

export interface IButtonWithCounterProps extends IDefaultButtonProps {
  left: undefined;
  counter: number;
}

export type IButtonProps = IButtonWithCounterProps | IDefaultButtonProps;

export function isButtonWithCounter(props: IButtonProps): props is IButtonWithCounterProps {
  return 'counter' in props;
}
