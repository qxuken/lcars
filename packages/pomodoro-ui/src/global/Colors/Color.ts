import { ValueOf } from 'type-fest';
import { styles } from '../../utils';
import colors from './colors.module.css';
import bgColors from './bgColors.module.css';

const main = styles.getClassNameFromModule(colors);
const bg = styles.getClassNameFromModule(bgColors);

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
  white: main('color-white'),
  color1: main('color-1'),
  color2: main('color-2'),
  color3: main('color-3'),
  color4: main('color-4'),
  color5: main('color-5'),
  color6: main('color-6'),
  color7: main('color-7'),
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
  default: bg('bg-color-default'),
  color1: bg('bg-color-1'),
  color2: bg('bg-color-2'),
  color3: bg('bg-color-3'),
  color4: bg('bg-color-4'),
  color5: bg('bg-color-5'),
  color6: bg('bg-color-6'),
  color7: bg('bg-color-7'),
};

export type BgColorValue = ValueOf<typeof BgColor>;
