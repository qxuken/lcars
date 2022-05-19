import type { Observable } from 'rxjs';
import type { ActionType } from '../machine';

export type AvailableActionObservable = Observable<Array<ActionType>>;
