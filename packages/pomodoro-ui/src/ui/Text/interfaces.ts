import { HTMLAttributes } from 'react';
import { EnumProp } from '../../types';
import { Color } from '../global';

export enum TextSize {
  small = 'size-small',
  medium = 'size-medium',
  large = 'size-large',
  xlarge = 'size-xlarge',
  xxlarge = 'size-xxlarge',
}

export enum TextWeight {
  light = 'weight-light',
  regular = 'weight-regular',
  semibold = 'weight-semibold',
}

interface IBase<T> extends HTMLAttributes<T> {
  as?: keyof JSX.IntrinsicElements;
  color?: EnumProp<typeof Color>;
  size?: EnumProp<typeof TextSize>;
  weight?: EnumProp<typeof TextWeight>;
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
