import { ValueOf, StringKeyOf } from 'type-fest';
import { getValueFromKeyOrValue } from './getValueFromKeyOrValue';

describe('useEnumPropValue', () => {
  enum TestEnum {
    default = 'default',
    value1 = 'value-1',
  }

  it('return some value if value provided', () => {
    const result = getValueFromKeyOrValue<StringKeyOf<typeof TestEnum>, ValueOf<typeof TestEnum>>(
      TestEnum,
      TestEnum.value1
    );

    expect(result.some()).toEqual(TestEnum.value1);
  });

  it('return some value if key provided', () => {
    const result = getValueFromKeyOrValue(TestEnum, 'value1');

    expect(result.some()).toEqual(TestEnum.value1);
  });

  it('return none value if key or value not found', () => {
    // @ts-ignore
    const result = getValueFromKeyOrValue(TestEnum, 'value2');

    expect(result.isNone()).toBeTruthy();
  });
});
