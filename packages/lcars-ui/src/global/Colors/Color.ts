import { ValueOf } from 'type-fest';
import { styles } from '@qxuken/react-utils';
import colorStyles from './colors.module.css';

const colors: (style: string) => string = styles.getClassNameFromModule(colorStyles);

export const Color: {
  readonly white: string;
  readonly color1: string;
  readonly color2: string;
  readonly color3: string;
  readonly color4: string;
  readonly color5: string;
  readonly color6: string;
  readonly color7: string;
} = {
  white: colors('color-white'),
  color1: colors('color-1'),
  color2: colors('color-2'),
  color3: colors('color-3'),
  color4: colors('color-4'),
  color5: colors('color-5'),
  color6: colors('color-6'),
  color7: colors('color-7'),
};

export type ColorValue = ValueOf<typeof Color>;

export const BgColor: {
  readonly default: string;
  readonly color1: string;
  readonly color2: string;
  readonly color3: string;
  readonly color4: string;
  readonly color5: string;
  readonly color6: string;
  readonly color7: string;
} = {
  default: colors('bg-color-default'),
  color1: colors('bg-color-1'),
  color2: colors('bg-color-2'),
  color3: colors('bg-color-3'),
  color4: colors('bg-color-4'),
  color5: colors('bg-color-5'),
  color6: colors('bg-color-6'),
  color7: colors('bg-color-7'),
};

export type BgColorValue = ValueOf<typeof BgColor>;

export const BgModifications: {
  readonly hoverable: string;
} = {
  hoverable: colors('hoverable'),
};

export type BgModificationsValue = ValueOf<typeof BgModifications>;
