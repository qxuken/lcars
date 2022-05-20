import { Maybe } from 'monet';
import * as React from 'react';
import { create, act, ReactTestRenderer } from 'react-test-renderer';
import { Observable, Subject } from 'rxjs';
import { useObservableValue } from './useObservableValue';

describe('useObservableValue', () => {
  function TestComponent({ observable }: { observable: Maybe<Observable<string>> }): JSX.Element {
    const result = useObservableValue(observable);
    return <div>{result.orSome('none')}</div>;
  }

  it('return none if no value emitted ', async () => {
    const observable = new Subject<string>();
    let testRenderer: Maybe<ReactTestRenderer> = Maybe.None();
    await act(() => {
      testRenderer = Maybe.Some(create(<TestComponent observable={Maybe.Some(observable)} />));
    });

    expect(testRenderer.some().root.findByType('div').children).toEqual(['none']);
  });

  it('return value when observable emits', async () => {
    const observable = new Subject<string>();
    let testRenderer: Maybe<ReactTestRenderer> = Maybe.None();
    await act(() => {
      testRenderer = Maybe.Some(create(<TestComponent observable={Maybe.Some(observable)} />));
    });
    await act(() => {
      observable.next('value');
    });
    expect(testRenderer.some().root.findByType('div').children).toEqual(['value']);
    await act(() => {
      observable.next('value2');
    });
    expect(testRenderer.some().root.findByType('div').children).toEqual(['value2']);
  });
});
