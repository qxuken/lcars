import { TextUtils } from '../src';

describe('TextUtils', () => {
  it('capitalize', () => {
    expect(TextUtils.capitalize('text')).toEqual('Text');
  });
});
