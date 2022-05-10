import * as React from 'react';
import TestRenderer from 'react-test-renderer';
import { TextFormatter } from './TextFormatter';

describe('TextFormatter', () => {
  it('renders as expected', () => {
    let text = 'text';
    let formattedText = 'formatted';
    let formatter = (_: string) => formattedText;

    const testRenderer = TestRenderer.create(<TextFormatter text={text} formatter={formatter} />);

    expect(testRenderer.root.findByType('span').children).toEqual([formattedText]);
  });
});
