import { Maybe } from 'monet';
import { useMemo } from 'react';
import { enums } from '../utils';

export function useEnumPropValue<K extends string, V extends string>(
  base: Record<K, V>,
  defaultValue: V,
  value?: string
): V {
  const res: V = useMemo(
    () =>
      Maybe.fromEmpty(value)
        .map((val) => enums.getValueFromKeyOrValue(base, val as K | V))
        .orSome(defaultValue),
    [base, value, defaultValue]
  );

  return res;
}
