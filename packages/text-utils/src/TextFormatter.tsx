import React, { useMemo, DetailedHTMLProps, HTMLAttributes } from 'react';

export interface TextFormatterProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> {
  text: string;
  formatter: (text: string) => string;
}
export function TextFormatter({ text, formatter, ...spanProps }: TextFormatterProps): JSX.Element {
  let formattedText = useMemo(() => formatter(text), [text, formatter]);

  return <span {...spanProps}>{formattedText}</span>;
}
