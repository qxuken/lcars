import { HTMLAttributes } from 'react';

export enum TextSize {
  small = 'size-small',
  medium = 'size-medium',
  large = 'size-large',
  xlarge = 'size-xlarge',
}

interface IBase<T> extends HTMLAttributes<T> {
  as?: keyof JSX.IntrinsicElements;
  size?: TextSize;
}

interface ITextSpan extends IBase<HTMLSpanElement> {
  as?: 'span';
}

interface ITextHeading extends IBase<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

interface ITextParagraph extends IBase<HTMLParagraphElement> {
  as?: 'p';
}

export type ITextProps = ITextSpan | ITextHeading | ITextParagraph;
