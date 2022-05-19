import { pipe, prop } from 'ramda';
import { map, shareReplay } from 'rxjs';

import type { StateObservable, MetaObservable } from './interfaces';
import { combineMeta } from './helpers';

export function createMetaObservable(state$: StateObservable): MetaObservable {
  return state$.pipe(map(pipe(prop('meta'), combineMeta)), shareReplay(1));
}
