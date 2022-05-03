import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import type { StringKeyOf } from 'type-fest';
import type { Color } from '../global';

export enum ButtonSize {
  small = 'size-small',
  default = 'size-default',
}

export interface IDefaultButtonProps
  extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  size?: StringKeyOf<typeof ButtonSize> | ButtonSize;
  color?: StringKeyOf<typeof Color> | Color;
}

export interface IButtonWithCounterProps extends IDefaultButtonProps {
  counter: number;
}

export type IButtonProps = IButtonWithCounterProps | IDefaultButtonProps;

export function isButtonWithCounter(props: IButtonProps): props is IButtonWithCounterProps {
  return 'counter' in props;
}
