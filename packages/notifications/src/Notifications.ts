import type { PartialDeep } from 'type-fest';

import type { Dispatch, ICreateServiceProps, Service, State } from './service';
import type {
  StateObservable,
  ContextObservable,
  StateObservableValue,
  ContextObservableValue,
} from './state';
import { createService } from './service';
import { createStateObservable, createContextObservable } from './state';
import { Maybe } from 'monet';
import autoBind from 'auto-bind';
import { INotificationEventPayload } from './machine';

export class Notifications {
  public readonly service: Service;

  readonly #dispatch: Dispatch;

  public readonly state$: StateObservable;

  #state: Maybe<StateObservableValue> = Maybe.None();

  public readonly context$: ContextObservable;

  #context: Maybe<ContextObservableValue> = Maybe.None();

  public readonly destroy: () => void;

  public constructor(props: PartialDeep<ICreateServiceProps>) {
    this.service = createService(props);
    this.#dispatch = this.service.send;
    this.state$ = createStateObservable(this.service);
    this.context$ = createContextObservable(this.state$);

    const stateSub = this.state$.subscribe((state) => {
      this.#state = Maybe.Some(state);
    });
    const contextSub = this.context$.subscribe((context) => {
      this.#context = Maybe.Some(context);
    });

    this.destroy = () => {
      stateSub.unsubscribe();
      contextSub.unsubscribe();
    };

    autoBind(this, {
      exclude: ['destroy', 'new'],
    });
  }

  public static new(props: PartialDeep<ICreateServiceProps>): Notifications {
    return new Notifications(props);
  }

  public get state(): Maybe<StateObservableValue> {
    return this.#state;
  }

  public get context(): Maybe<ContextObservableValue> {
    return this.#context;
  }

  public notify(notification: INotificationEventPayload): State {
    return this.#dispatch({
      type: 'NOTIFY',
      payload: notification,
    });
  }

  public notifyImmediate(notification: INotificationEventPayload, skipCurrentNotification?: boolean): State {
    return this.#dispatch({
      type: 'NOTIFY_IMMEDIATE',
      payload: notification,
      skipCurrentNotification,
    });
  }

  public clear(): State {
    return this.#dispatch({
      type: 'CLEAR',
    });
  }
}
