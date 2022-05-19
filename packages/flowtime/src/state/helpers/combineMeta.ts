import type { Primitive } from 'type-fest';
import { Maybe } from 'monet';
import { mergeRight } from 'ramda';

import type { IMeta } from '../../machine';

export function combineMeta(meta: Record<string, Record<string, Primitive>>): IMeta {
  const combinedMeta = Object.values(meta).reduce(
    (acc: Record<string, Primitive>, meta: Record<string, Primitive>) => mergeRight(acc, meta),
    {}
  );

  return {
    recommendationType: Maybe.fromUndefined(combinedMeta.recommendationType).map(String).filter(Boolean),
    recommendationModifier: Maybe.fromUndefined(combinedMeta.recommendationModifier)
      .map(String)
      .filter(Boolean),
  };
}
