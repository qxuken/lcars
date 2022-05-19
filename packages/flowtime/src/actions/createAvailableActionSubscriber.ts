import type { Observable } from 'rxjs';
import { map } from 'rxjs';

import type { IActionType } from '../machine';
import type { StateSubscription } from '../state';
import { actionIsDispatchable } from './actionIsDispatchable';

export function createAvailableActionSubscriber(state$: StateSubscription): Observable<Array<IActionType>> {
  return state$.pipe(map((state) => state.nextEvents.filter(actionIsDispatchable)));
}

export type AvailableActionSubscriber = ReturnType<typeof createAvailableActionSubscriber>;
