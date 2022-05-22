import cn from 'classnames';
import { AfterAnimationClass } from '../../global';
import styles from './styles.module.css';

export interface IAnimatedProps {
  className?: string;
  wide?: boolean;
  if?: boolean;
}

// eslint-disable-next-line @rushstack/no-new-null
export function Animated({ className, wide, if: ifProp }: IAnimatedProps): JSX.Element | null {
  if (!ifProp) {
    return null;
  }
  return (
    <div className={cn(className, styles.animated, { [styles.wide]: wide }, AfterAnimationClass.bounceX)} />
  );
}
