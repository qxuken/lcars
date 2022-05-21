import * as React from 'react';
import { create } from 'react-test-renderer';
import { useEnumPropValue } from './useEnumPropValue';

describe('useEnumPropValue', () => {
  enum TestEnum {
    default = 'default',
    value1 = 'value-1',
  }

  function TestComponent({ value }: { value?: string }): JSX.Element {
    const result = useEnumPropValue(TestEnum, TestEnum.default, value);
    return <div>{result}</div>;
  }

  it('return default if value undefined', () => {
    const testRenderer = create(<TestComponent />);

    expect(testRenderer.root.findByType('div').children).toEqual([TestEnum.default]);
  });

  it('return value by value', () => {
    const testRenderer = create(<TestComponent value={TestEnum.value1} />);

    expect(testRenderer.root.findByType('div').children).toEqual([TestEnum.value1]);
  });

  it('return value by key', () => {
    const testRenderer = create(<TestComponent value="value1" />);

    expect(testRenderer.root.findByType('div').children).toEqual([TestEnum.value1]);
  });

  it('return default if key or value not present', () => {
    const testRenderer = create(<TestComponent value="value2" />);

    expect(testRenderer.root.findByType('div').children).toEqual([TestEnum.default]);
  });
});
