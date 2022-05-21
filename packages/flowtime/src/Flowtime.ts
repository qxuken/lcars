import type { PartialDeep } from 'type-fest';
import autoBind from 'auto-bind';

import type { Dispatch, ICreateServiceProps, Service } from './service';
import type {
  StateObservable,
  MetaObservable,
  TimeRecommendationObservable,
  ContextObservable,
} from './state';
import type { AvailableActionObservable } from './actions';
import { createService } from './service';
import {
  createStateObservable,
  createTimeRecommendationObservable,
  createContextObservable,
  createMetaObservable,
} from './state';
import { createAvailableActionObservable } from './actions';

export class Flowtime {
  public readonly service: Service;

  public readonly dispatch: Dispatch;

  public readonly state$: StateObservable;

  public readonly availableActions$: AvailableActionObservable;

  public readonly meta$: MetaObservable;

  public readonly timeRecommendation$: TimeRecommendationObservable;

  public readonly context$: ContextObservable;

  public constructor(props: PartialDeep<ICreateServiceProps>) {
    this.service = createService(props);
    this.dispatch = this.service.send;
    this.state$ = createStateObservable(this.service);
    this.availableActions$ = createAvailableActionObservable(this.state$);
    this.meta$ = createMetaObservable(this.state$);
    this.timeRecommendation$ = createTimeRecommendationObservable(this.state$, this.meta$);
    this.context$ = createContextObservable(this.state$);

    autoBind(this, {
      exclude: ['new'],
    });
  }

  public static new(props: PartialDeep<ICreateServiceProps>): Flowtime {
    return new Flowtime(props);
  }
}
