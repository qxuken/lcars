import { from, shareReplay } from 'rxjs';

import type { Service } from '../service';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function createStateObservable(service: Service) {
  return from(service).pipe(shareReplay(1));
}

export type StateObservable = ReturnType<typeof createStateObservable>;
