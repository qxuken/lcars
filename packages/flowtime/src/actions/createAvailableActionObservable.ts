import { map } from 'rxjs';

import type { StateObservable } from '../state';

import type { AvailableActionObservable } from './interfaces';
import { actionIsDispatchable } from './actionIsDispatchable';

export function createAvailableActionObservable(state$: StateObservable): AvailableActionObservable {
  return state$.pipe(
    map((state) => state.nextEvents.filter(actionIsDispatchable).filter(state.can.bind(state)))
  );
}
