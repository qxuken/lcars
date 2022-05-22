import { ButtonWithCounter } from './WithCounter';
import { DefaultButton } from './Default';
import { IButtonProps, isButtonWithCounter, ButtonSize, ButtonWidth, ButtonAccentSide } from './interfaces';

// eslint-disable-next-line @rushstack/no-new-null
export function Button(props: IButtonProps): JSX.Element | null {
  if (isButtonWithCounter(props)) {
    return <ButtonWithCounter {...props} />;
  }
  return <DefaultButton {...props} />;
}

Button.Size = ButtonSize;
Button.Width = ButtonWidth;
Button.AccentSide = ButtonAccentSide;
