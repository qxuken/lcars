import { interval, map, Observable, shareReplay, switchMap, merge, of } from 'rxjs';

import type { StateObservable } from '../state';

import type { AvailableActionObservable } from './interfaces';
import { actionIsDispatchable } from './actionIsDispatchable';

const interval$: Observable<number> = merge(of(0), interval(10000));

export function createAvailableActionObservable(state$: StateObservable): AvailableActionObservable {
  return merge(interval$, state$).pipe(
    switchMap(() => state$),
    map((state) => state.nextEvents.filter(actionIsDispatchable).filter(state.can.bind(state))),
    shareReplay(1)
  );
}
