import { PascalCase } from '../src';

describe('PascalCase', () => {
  it('fromKebabCase', () => {
    expect(PascalCase.fromKebabCase('kebab-case')).toEqual('KebabCase');
  });
});
