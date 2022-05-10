import cn from 'classnames';
import { AfterAnimationClass } from '../../global';
import styles from './styles.module.css';

export interface IAnimatedProps {
  className?: string;
  wide?: boolean;
}

export function Animated({ className, wide }: IAnimatedProps): JSX.Element {
  return (
    <div className={cn(className, styles.animated, { [styles.wide]: wide }, AfterAnimationClass.bounceX)} />
  );
}
