import type { Observable } from 'rxjs';
import type { ActionType } from '../machine';

export type AvailableActionObservableValue = Array<ActionType>;
export type AvailableActionObservable = Observable<AvailableActionObservableValue>;
