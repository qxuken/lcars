import type { Maybe } from 'monet';
import { map, Observable, shareReplay, withLatestFrom } from 'rxjs';

import type { MetaObservable } from './createMetaObservable';
import type { StateObservable } from './createStateObservable';
import { getTimeRecommendation } from './helpers';

export type TimeRecommendationObservable = Observable<Maybe<number>>;

export function createTimeRecommendationObservable(
  state$: StateObservable,
  meta$: MetaObservable
): TimeRecommendationObservable {
  return meta$.pipe(
    withLatestFrom(state$),
    map(([meta, state]) => {
      return getTimeRecommendation(
        state.context.config,
        meta.recommendationType,
        meta.recommendationModifier
      );
    }),
    shareReplay(1)
  );
}
