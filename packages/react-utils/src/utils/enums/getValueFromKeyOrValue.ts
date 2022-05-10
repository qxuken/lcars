import { Maybe } from 'monet';

export function getValueFromKeyOrValue<T extends string, V extends string>(
  base: { [key in T]: V },
  value: V | T
): Maybe<V> {
  const isKey = (value: string): value is T => Object.keys(base).includes(String(value));
  if (isKey(value)) {
    return Maybe.Some(base[value]);
  }
  const isValue = (value: string): value is V => Object.values(base).includes(String(value));
  if (isValue(value)) {
    return Maybe.Some(value);
  }
  return Maybe.None();
}
