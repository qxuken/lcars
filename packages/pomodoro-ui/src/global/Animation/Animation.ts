import { styles } from '../../utils';
import animations from './animations.module.css';

const an = styles.getClassNameFromModule(animations);

export const AnimationClass: {
  readonly bounceX: string;
  readonly blink: string;
} = {
  bounceX: an('bounce-x'),
  blink: an('blink'),
};

export const AfterAnimationClass: {
  readonly bounceX: string;
} = {
  bounceX: an('bounce-x_after'),
};

export const PredefinedAnimationClass: {
  readonly blink: string;
} = {
  blink: an('blink-predefined'),
};
