import { pipe, prop } from 'ramda';
import { map, Observable, shareReplay } from 'rxjs';

import type { IMeta } from '../machine';

import type { StateObservable } from './createStateObservable';
import { combineMeta } from './helpers';

export type MetaObservable = Observable<IMeta>;

export function createMetaObservable(state$: StateObservable): MetaObservable {
  return state$.pipe(map(pipe(prop('meta'), combineMeta)), shareReplay(1));
}
