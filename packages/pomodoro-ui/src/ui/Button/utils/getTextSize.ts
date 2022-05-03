import { TextSize } from '../../Text';
import { ButtonSize } from '../interfaces';

export function getTextSize(size: ButtonSize): TextSize {
  switch (size) {
    case ButtonSize.small:
      return TextSize.small;
    case ButtonSize.default:
      return TextSize.medium;
  }
}
