import { from, Observable, shareReplay } from 'rxjs';

import type { Service } from '../service';

export type StateObservable = Observable<Service['state']>;

export function createStateObservable(service: Service): StateObservable {
  return from(service).pipe(shareReplay(1));
}
