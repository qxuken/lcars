import type { Observable } from 'rxjs';

import type { State } from '../service';
import type { IContext } from '../machine';

export type StateObservableValue = State;
export type StateObservable = Observable<StateObservableValue>;

export type ContextObservableValue = IContext;
export type ContextObservable = Observable<ContextObservableValue>;
