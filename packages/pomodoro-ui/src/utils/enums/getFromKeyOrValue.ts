export function getValueFromKeyOrValue<T extends string, V extends string>(
  base: Record<T, V>,
  value: V | T
): V {
  const isKey = (value: string): value is T => Object.keys(base).includes(String(value));
  if (isKey(value)) {
    return base[value];
  }
  return value;
}
