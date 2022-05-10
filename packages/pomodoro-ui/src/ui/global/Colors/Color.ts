import { ValueOf } from 'type-fest';
import { styles } from '../../../utils';
import colors from './colors.module.css';
import bgColors from './bgColors.module.css';

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
  white: styles.getClassNameFromModule(colors, 'color-white'),
  color1: styles.getClassNameFromModule(colors, 'color-1'),
  color2: styles.getClassNameFromModule(colors, 'color-2'),
  color3: styles.getClassNameFromModule(colors, 'color-3'),
  color4: styles.getClassNameFromModule(colors, 'color-4'),
  color5: styles.getClassNameFromModule(colors, 'color-5'),
  color6: styles.getClassNameFromModule(colors, 'color-6'),
  color7: styles.getClassNameFromModule(colors, 'color-7'),
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
  default: styles.getClassNameFromModule(bgColors, 'bg-color-default'),
  color1: styles.getClassNameFromModule(bgColors, 'bg-color-1'),
  color2: styles.getClassNameFromModule(bgColors, 'bg-color-2'),
  color3: styles.getClassNameFromModule(bgColors, 'bg-color-3'),
  color4: styles.getClassNameFromModule(bgColors, 'bg-color-4'),
  color5: styles.getClassNameFromModule(bgColors, 'bg-color-5'),
  color6: styles.getClassNameFromModule(bgColors, 'bg-color-6'),
  color7: styles.getClassNameFromModule(bgColors, 'bg-color-7'),
};

export type BgColorValue = ValueOf<typeof BgColor>;
