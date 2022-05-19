import type { PartialDeep } from 'type-fest';
import type { Observable } from 'rxjs';
import type { Maybe } from 'monet';
import autoBind from 'auto-bind';

import type { ICreateServiceProps, Service } from './service';
import type { StateObservable } from './state';
import type { AvailableActionObservable } from './actions';
import type { IContext } from './machine';
import { createService } from './service';
import { createStateObservable, createTimeRecommendationObservable, createContextObservable } from './state';
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

  public get timeRecommendation$(): Observable<Maybe<number>> {
    return createTimeRecommendationObservable(this.state$);
  }

  public get context$(): Observable<IContext> {
    return createContextObservable(this.state$);
  }
}
