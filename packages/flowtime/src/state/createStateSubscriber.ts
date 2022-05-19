import { from } from 'rxjs';

import type { FlowtimeService } from '../service';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function createStateSubscriber(service: FlowtimeService) {
  return from(service);
}

export type StateSubscription = ReturnType<typeof createStateSubscriber>;
