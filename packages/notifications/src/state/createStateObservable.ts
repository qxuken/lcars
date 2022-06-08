import { from, shareReplay } from 'rxjs';

import type { Service } from '../service';

import type { StateObservable } from './interfaces';

export function createStateObservable(service: Service): StateObservable {
  return from(service).pipe(shareReplay(1));
}
