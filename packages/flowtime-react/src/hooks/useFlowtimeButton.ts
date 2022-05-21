import { ActionType } from '@qxuken/flowtime';
import { equals } from 'ramda';
import { useCallback, useMemo } from 'react';
import { Opaque } from 'type-fest';
import { useFlowtimeAvailableActions, useFlowtimeDispatch } from '../services';

type ButtonIsDisabled = Opaque<boolean, 'ButtonIsDisabled'>;
type ButtonHandler = Opaque<() => void, 'ButtonHandler'>;

export function useFlowtimeButton(action: ActionType): [ButtonHandler, ButtonIsDisabled] {
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

  return [pauseClickHandler as ButtonHandler, pauseIsDisabled as ButtonIsDisabled];
}
