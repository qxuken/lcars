import type { Maybe } from 'monet';
import type { Observable } from 'rxjs';

import type { State } from '../service';
import type { IMeta, IContext } from '../machine';

export type TimeRecommendation = Maybe<number>;

export type StateObservable = Observable<State>;

export type ContextObservable = Observable<IContext>;

export type MetaObservable = Observable<IMeta>;

export type TimeRecommendationObservable = Observable<TimeRecommendation>;
