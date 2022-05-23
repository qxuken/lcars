import type { Maybe } from 'monet';
import type { Observable } from 'rxjs';

import type { State } from '../service';
import type { IMeta, IContext } from '../machine';

export type TimeRecommendation = Maybe<number>;

export type StateObservableValue = State;
export type StateObservable = Observable<StateObservableValue>;

export type ContextObservableValue = IContext;
export type ContextObservable = Observable<ContextObservableValue>;

export type MetaObservableValue = IMeta;
export type MetaObservable = Observable<MetaObservableValue>;

export type TimeRecommendationObservableValue = TimeRecommendation;
export type TimeRecommendationObservable = Observable<TimeRecommendationObservableValue>;
