import type { IActionType } from '../machine';
import { ActionTypes } from '../machine';

export function actionIsDispatchable(action: string): action is IActionType {
  return ActionTypes.includes(action as IActionType);
}
