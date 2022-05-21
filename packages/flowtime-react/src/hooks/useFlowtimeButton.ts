import { ActionType } from '@qxuken/flowtime';
import { equals } from 'ramda';
import { useCallback, useMemo } from 'react';
import { useFlowtimeAvailableActions, useFlowtimeDispatch } from '../services';

export function useFlowtimeButton(action: ActionType): [() => void, boolean] {
  const dispatch = useFlowtimeDispatch();
  const availableActions = useFlowtimeAvailableActions();
  const pauseClickHandler = useCallback(
    () =>
      dispatch.cata(
        () => console.error('dispatch is not available'),
        (dispatch) => dispatch(action)
      ),
    [dispatch]
  );

  const pauseIsDisabled = useMemo(
    () => availableActions.filter((a) => a.some(equals(action))).isNone(),
    [availableActions]
  );

  return [pauseClickHandler, pauseIsDisabled];
}
