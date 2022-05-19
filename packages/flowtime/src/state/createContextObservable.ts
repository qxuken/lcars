import { map, Observable } from 'rxjs';

import type { IContext } from '../machine';

import type { StateObservable } from './createStateObservable';

export function createContextObservable(state$: StateObservable): Observable<IContext> {
  return state$.pipe(map((state) => state.context));
}
