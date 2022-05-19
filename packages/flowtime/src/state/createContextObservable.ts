import { map } from 'rxjs';

import type { StateObservable, ContextObservable } from './interfaces';

export function createContextObservable(state$: StateObservable): ContextObservable {
  return state$.pipe(map((state) => state.context));
}
