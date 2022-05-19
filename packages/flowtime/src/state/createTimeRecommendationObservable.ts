import type { Maybe } from 'monet';
import { map, Observable } from 'rxjs';

import type { StateObservable } from './createStateObservable';
import { combineMeta, getTimeRecommendation } from './helpers';

export function createTimeRecommendationObservable(state$: StateObservable): Observable<Maybe<number>> {
  return state$.pipe(
    map((state) => {
      const combinedMeta = combineMeta(state.meta);
      return getTimeRecommendation(
        state.context.config,
        combinedMeta.recommendationType,
        combinedMeta.recommendationModifier
      );
    })
  );
}
