import { TextSize } from '../../Text';
import { ButtonSize } from '../interfaces';

export function getCounterTextSize(size: ButtonSize): TextSize {
  switch (size) {
    case ButtonSize.small:
      return TextSize.medium;
    case ButtonSize.default:
      return TextSize.large;
  }
}
