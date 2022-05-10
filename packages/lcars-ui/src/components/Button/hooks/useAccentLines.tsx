import { useMemo } from 'react';
import { ButtonAccentSide } from '../interfaces';

export interface IAccentLines {
  left: boolean;
  right: boolean;
}

export function useAccentLines(accentSide: ButtonAccentSide, withAccentLine?: boolean): IAccentLines {
  const accentLines = useMemo(() => {
    if (!withAccentLine) {
      return { left: false, right: false };
    }
    switch (accentSide) {
      case ButtonAccentSide.left:
        return { left: true, right: false };
      case ButtonAccentSide.right:
        return { left: false, right: true };
      case ButtonAccentSide.both:
      case ButtonAccentSide.none:
      default:
        return { left: true, right: true };
    }
  }, [accentSide, withAccentLine]);

  return accentLines;
}
