import { PascalCase } from './PascalCase';

describe('PascalCase', () => {
  it('fromKebabCase', () => {
    expect(PascalCase.fromKebabCase('kebab-case')).toEqual('KebabCase');
  });
});
