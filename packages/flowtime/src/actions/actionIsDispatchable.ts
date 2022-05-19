import type { IterableElement } from 'type-fest';

import type { ActionType } from '../machine';
import type { Service } from '../service';
import { ActionTypes } from '../machine';

export function actionIsDispatchable(
  action: IterableElement<Service['state']['nextEvents']>
): action is ActionType {
  return ActionTypes.includes(action as ActionType);
}
