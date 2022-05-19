import type { Observable } from 'rxjs';
import { map } from 'rxjs';

import type { ActionType } from '../machine';
import type { StateObservable } from '../state';
import { actionIsDispatchable } from './actionIsDispatchable';

export function createAvailableActionObservable(state$: StateObservable): Observable<Array<ActionType>> {
  return state$.pipe(map((state) => state.nextEvents.filter(actionIsDispatchable)));
}

export type AvailableActionObservable = ReturnType<typeof createAvailableActionObservable>;
