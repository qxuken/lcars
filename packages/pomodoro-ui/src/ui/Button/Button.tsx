import { ButtonWithCounter } from './WithCounter';
import { DefaultButton } from './Default';
import { IButtonProps, isButtonWithCounter } from './interfaces';

export function Button(props: IButtonProps): JSX.Element {
  if (isButtonWithCounter(props)) {
    return <ButtonWithCounter {...props} />;
  }
  return <DefaultButton {...props} />;
}
