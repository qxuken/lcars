import cn from 'classnames';
import type { ValueOf, StringKeyOf } from 'type-fest';
import { Color } from '../global';
import { useWrapIfText } from '../Text';
import { ButtonSize, IDefaultButtonProps } from './interfaces';
import styles from './styles.module.css';

function getValueOrDefault<T extends string, TEnumValue extends string, E = { [key in T]: TEnumValue }>(
  base: E,
  def: TEnumValue,
  value?: TEnumValue | T
): TEnumValue {
  if (!value) {
    return def;
  }
  const isKey = (value: TEnumValue | T): value is T => Object.keys(base).includes(String(value));
  if (isKey(value)) {
    return base[value] as TEnumValue;
  }
  return value;
}

export function DefaultButton({
  className,
  children,
  color: colorProp,
  size: sizeProp,
  ...props
}: IDefaultButtonProps): JSX.Element {
  const content = useWrapIfText(children, styles.text);
  const color = getValueOrDefault(Color, Color.color6, colorProp);
  const size = getValueOrDefault(ButtonSize, ButtonSize.default, sizeProp);
  return (
    <button {...props} className={cn(className, styles.button, styles[color], styles[size])}>
      {content}
    </button>
  );
}
