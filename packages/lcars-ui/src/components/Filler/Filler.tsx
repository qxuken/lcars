import cn from 'classnames';
import { useEnumPropValue, EnumProp } from '@qxuken/react-utils';
import { BgColor, BgColorValue } from '../../global';
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
  if?: boolean;
}

export function Filler({
  className,
  size: sizeProp,
  bgColor: bgColorProp,
  if: ifProp = true,
}: // eslint-disable-next-line @rushstack/no-new-null
IFillerProps): JSX.Element | null {
  const bgColor: BgColorValue = useEnumPropValue(BgColor, BgColor.color1, bgColorProp);
  const size: FillerSize = useEnumPropValue(FillerSize, FillerSize.normal, sizeProp);
  if (!ifProp) {
    return null;
  }
  return <div className={cn(className, bgColor, styles.filler, styles[size])} />;
}
