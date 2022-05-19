import type { PartialDeep } from 'type-fest';
import autoBind from 'auto-bind';

import type { ICreateServiceProps, Service } from './service';
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

  public readonly dispatch: Service['send'];

  public readonly state$: StateObservable;

  public constructor(props: PartialDeep<ICreateServiceProps>) {
    this.service = createService(props);
    this.dispatch = this.service.send;
    this.state$ = createStateObservable(this.service);

    autoBind(this, {
      exclude: ['can', 'new'],
    });
  }

  public static new(props: PartialDeep<ICreateServiceProps>): Flowtime {
    return new Flowtime(props);
  }

  public get availableActions$(): AvailableActionObservable {
    return createAvailableActionObservable(this.state$);
  }

  public get meta$(): MetaObservable {
    return createMetaObservable(this.state$);
  }

  public get timeRecommendation$(): TimeRecommendationObservable {
    return createTimeRecommendationObservable(this.state$, this.meta$);
  }

  public get context$(): ContextObservable {
    return createContextObservable(this.state$);
  }
}
