import { map, Observable } from 'rxjs';

import type { IContext } from '../machine';

import type { StateObservable } from './createStateObservable';

export type ContextObservable = Observable<IContext>;

export function createContextObservable(state$: StateObservable): ContextObservable {
  return state$.pipe(map((state) => state.context));
}
