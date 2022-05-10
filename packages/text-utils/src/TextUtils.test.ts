import { TextUtils } from './TextUtils';

describe('TextUtils', () => {
  it('capitalize', () => {
    expect(TextUtils.capitalize('text')).toEqual('Text');
  });
});
