import { styles } from '../../../utils';
import animations from './animations.module.css';

export const AnimationClass: {
  readonly bounceX: string;
  readonly blink: string;
} = {
  bounceX: styles.getClassNameFromModule('bounce-x', animations),
  blink: styles.getClassNameFromModule('blink', animations),
};

export const AfterAnimationClass: {
  readonly bounceX: string;
} = {
  bounceX: styles.getClassNameFromModule('bounce-x_after', animations),
};

export const PredefinedAnimationClass: {
  readonly blink: string;
} = {
  blink: styles.getClassNameFromModule('blink-predefined', animations),
};
