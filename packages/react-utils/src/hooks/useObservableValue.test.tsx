import { Maybe } from 'monet';
import * as React from 'react';
import { create, act, ReactTestRenderer } from 'react-test-renderer';
import { Observable, Subject } from 'rxjs';
import { useObservableValue } from './useObservableValue';

describe('useObservableValue', () => {
  function TestComponent({
    observable,
    defaultValue,
  }: {
    observable: Maybe<Observable<string>>;
    defaultValue?: Maybe<string> | (() => Maybe<string>);
  }): JSX.Element {
    const result = useObservableValue(observable, defaultValue);
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

  it('return default value if no value emitted', async () => {
    const observable = new Subject<string>();
    let testRenderer: Maybe<ReactTestRenderer> = Maybe.None();
    await act(() => {
      testRenderer = Maybe.Some(
        create(<TestComponent observable={Maybe.Some(observable)} defaultValue={Maybe.Some('value')} />)
      );
    });
    expect(testRenderer.some().root.findByType('div').children).toEqual(['value']);
  });

  it('return default lazy value if no value emitted', async () => {
    const observable = new Subject<string>();
    const defaultValue = (): Maybe<string> => Maybe.Some('lazy');
    let testRenderer: Maybe<ReactTestRenderer> = Maybe.None();
    await act(() => {
      testRenderer = Maybe.Some(
        // eslint-disable-next-line react/jsx-no-bind
        create(<TestComponent observable={Maybe.Some(observable)} defaultValue={defaultValue} />)
      );
    });
    expect(testRenderer.some().root.findByType('div').children).toEqual(['lazy']);
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
