import type { PartialDeep } from 'type-fest';

import type { Dispatch, ICreateServiceProps, Service } from './service';
import type {
  StateObservable,
  MetaObservable,
  TimeRecommendationObservable,
  ContextObservable,
  StateObservableValue,
  MetaObservableValue,
  TimeRecommendationObservableValue,
  ContextObservableValue,
} from './state';
import type { AvailableActionObservable, AvailableActionObservableValue } from './actions';
import { createService } from './service';
import {
  createStateObservable,
  createTimeRecommendationObservable,
  createContextObservable,
  createMetaObservable,
} from './state';
import { createAvailableActionObservable } from './actions';
import { Maybe } from 'monet';
import autoBind from 'auto-bind';

export class Flowtime {
  public readonly service: Service;

  public readonly dispatch: Dispatch;

  public readonly state$: StateObservable;

  #state: Maybe<StateObservableValue> = Maybe.None();

  public readonly availableActions$: AvailableActionObservable;

  #availableActions: Maybe<AvailableActionObservableValue> = Maybe.None();

  public readonly meta$: MetaObservable;

  #meta: Maybe<MetaObservableValue> = Maybe.None();

  public readonly timeRecommendation$: TimeRecommendationObservable;

  #timeRecommendation: Maybe<TimeRecommendationObservableValue> = Maybe.None();

  public readonly context$: ContextObservable;

  #context: Maybe<ContextObservableValue> = Maybe.None();

  public readonly destroy: () => void;

  public constructor(props: PartialDeep<ICreateServiceProps>) {
    this.service = createService(props);
    this.dispatch = this.service.send;
    this.state$ = createStateObservable(this.service);
    this.availableActions$ = createAvailableActionObservable(this.state$);
    this.meta$ = createMetaObservable(this.state$);
    this.timeRecommendation$ = createTimeRecommendationObservable(this.state$, this.meta$);
    this.context$ = createContextObservable(this.state$);

    const stateSub = this.state$.subscribe((state) => {
      this.#state = Maybe.Some(state);
    });
    const availableActionsSub = this.availableActions$.subscribe((availableActions) => {
      this.#availableActions = Maybe.Some(availableActions);
    });
    const metaSub = this.meta$.subscribe((meta) => {
      this.#meta = Maybe.Some(meta);
    });
    const timeRecommendationSub = this.timeRecommendation$.subscribe((timeRecommendation) => {
      this.#timeRecommendation = Maybe.Some(timeRecommendation);
    });
    const contextSub = this.context$.subscribe((context) => {
      this.#context = Maybe.Some(context);
    });

    this.destroy = () => {
      stateSub.unsubscribe();
      availableActionsSub.unsubscribe();
      metaSub.unsubscribe();
      timeRecommendationSub.unsubscribe();
      contextSub.unsubscribe();
    };

    autoBind(this, {
      exclude: ['destroy', 'new'],
    });
  }

  public static new(props: PartialDeep<ICreateServiceProps>): Flowtime {
    return new Flowtime(props);
  }

  public get state(): Maybe<StateObservableValue> {
    return this.#state;
  }

  public get availableActions(): Maybe<AvailableActionObservableValue> {
    return this.#availableActions;
  }

  public get meta(): Maybe<MetaObservableValue> {
    return this.#meta;
  }

  public get timeRecommendation(): Maybe<TimeRecommendationObservableValue> {
    return this.#timeRecommendation;
  }

  public get context(): Maybe<ContextObservableValue> {
    return this.#context;
  }
}
