import type { FlowtimeService } from '../service';
import type { IAction, IActionType } from '../machine';

// eslint-disable-next-line @rushstack/typedef-var, @typescript-eslint/explicit-function-return-type
export const createDispatcher = (service: FlowtimeService) => (action: IAction | IActionType) =>
  service.send(action);

export type Dispatch = ReturnType<typeof createDispatcher>;
