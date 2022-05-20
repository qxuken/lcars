import * as React from 'react';
import { create, act } from 'react-test-renderer';
import { Observable, Subject } from 'rxjs';
import { useObservableValue } from './useObservableValue';

describe('useObservableValue', () => {
  function TestComponent({ observable }: { observable: Observable<string> }) {
    const result = useObservableValue(observable);
    return <div>{result.orSome('none')}</div>;
  }

  it('return none if no value emitted ', () => {
    const observable = new Subject<string>();
    let testRenderer = create(<TestComponent observable={observable} />);
    act(() => {
      testRenderer = create(<TestComponent observable={observable} />);
    });

    expect(testRenderer.root.findByType('div').children).toEqual(['none']);
  });

  it('return value when observable emits', () => {
    const observable = new Subject<string>();
    let testRenderer = create(<TestComponent observable={observable} />);
    act(() => {
      testRenderer = create(<TestComponent observable={observable} />);
    });
    act(() => {
      observable.next('value');
    });
    expect(testRenderer.root.findByType('div').children).toEqual(['value']);
    act(() => {
      observable.next('value2');
    });
    expect(testRenderer.root.findByType('div').children).toEqual(['value2']);
  });
});
