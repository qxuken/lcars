import cn from 'classnames';
import { useEnumPropValue } from '../../hooks';
import { EnumProp } from '../../types';
import { BgColor } from '../global';
import styles from './styles.module.css';

export enum FillerSize {
  small = 'small',
  normal = 'normal',
  wide = 'wide',
}

export interface IFillerProps {
  className?: string;
  size?: EnumProp<typeof FillerSize>;
  bgColor?: EnumProp<typeof BgColor>;
}

export function Filler({ className, size: sizeProp, bgColor: bgColorProp }: IFillerProps): JSX.Element {
  const bgColor: BgColor = useEnumPropValue(BgColor, BgColor.color1, bgColorProp);
  const size: FillerSize = useEnumPropValue(FillerSize, FillerSize.normal, sizeProp);
  return <div className={cn(className, bgColor, styles.filler, styles[size])} />;
}
