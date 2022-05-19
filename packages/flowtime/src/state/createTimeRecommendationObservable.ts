import { map, shareReplay, withLatestFrom } from 'rxjs';

import type { StateObservable, MetaObservable, TimeRecommendationObservable } from './interfaces';
import { getTimeRecommendation } from './helpers';

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
