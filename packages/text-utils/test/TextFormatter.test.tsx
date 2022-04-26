import * as React from 'react';
import { createRoot, Root } from 'react-dom/client';
import { Maybe } from 'monet';
import { TextFormatter, Text } from '../src';

describe('TextFormatter', () => {
  let container: Maybe<HTMLDivElement> = Maybe.None();
  let rootNode: Maybe<Root> = Maybe.None();

  beforeEach(() => {
    container = Maybe.Some(document.createElement("div"));
    document.body.appendChild(container.some());
    rootNode = Maybe.Some(createRoot(document.createElement('div')));
  });

  afterEach(() => {
    if (rootNode.some()) {
      rootNode.some().unmount();
      rootNode = Maybe.None();
    }
    if (container.some()) {
      container.some().remove();
      container = Maybe.None();
    }
  });

  it('renders as expected', () => {
    let text = 'text';
    let formattedText = Text.capitalize('text');
    rootNode.some().render(<TextFormatter text={text} formatter={Text.capitalize} />);

    expect(container.some().querySelector('span')!.textContent).toBe(formattedText);
  });
});
