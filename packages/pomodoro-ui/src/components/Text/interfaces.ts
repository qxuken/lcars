import { HTMLAttributes, DetailedHTMLProps } from 'react';

interface IBase<T> extends HTMLAttributes<T> {
  as?: keyof JSX.IntrinsicElements;
}

interface ITextSpan extends IBase<HTMLSpanElement> {
  as?: 'span';
}

interface ITextHeading extends IBase<HTMLSpanElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

interface ITextParagraph extends IBase<HTMLParagraphElement> {
  as?: 'p';
}

export type ITextProps = ITextSpan | ITextHeading | ITextParagraph;
