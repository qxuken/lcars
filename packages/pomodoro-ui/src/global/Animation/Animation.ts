import { ValueOf } from 'type-fest';
import { styles } from '@qxuken/react-utils';
import animations from './animations.module.css';

const an: (style: string) => string = styles.getClassNameFromModule(animations);

export const AnimationClass: {
  readonly bounceX: string;
  readonly blink7: string;
  readonly blinkWhite: string;
} = {
  bounceX: an('bounce-x'),
  blink7: an('blink-7'),
  blinkWhite: an('blink-white'),
};
export type AnimationClassValue = ValueOf<typeof AnimationClass>;

export const AfterAnimationClass: {
  readonly bounceX: string;
} = {
  bounceX: an('bounce-x_after'),
};
export type AfterAnimationClassValue = ValueOf<typeof AfterAnimationClass>;

export const PredefinedAnimationClass: {
  readonly blink7: string;
  readonly blinkWhite: string;
} = {
  blink7: an('blink-7-predefined'),
  blinkWhite: an('blink-white-predefined'),
};
export type PredefinedAnimationClassValue = ValueOf<typeof PredefinedAnimationClass>;
