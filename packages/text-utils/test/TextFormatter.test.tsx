import * as React from 'react';
import TestRenderer from 'react-test-renderer';
import { TextFormatter, TextUtils } from '../src';

describe('TextFormatter', () => {
  it('renders as expected', () => {
    let text = 'text';
    let formattedText = TextUtils.capitalize('text');

    const testRenderer = TestRenderer.create(<TextFormatter text={text} formatter={TextUtils.capitalize} />);

    expect(testRenderer.root.findByType('span').children).toEqual([formattedText]);
  });
});
