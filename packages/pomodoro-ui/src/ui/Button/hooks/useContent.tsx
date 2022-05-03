import { ReactNode, useMemo } from 'react';
import { ITextProps, useWrapIfText } from '../../Text';
import { ButtonSize } from '../interfaces';
import { getTextSize } from '../utils';

export function useContent(children: ReactNode, size: ButtonSize): ReactNode {
  const textProps: ITextProps = useMemo(() => {
    return { size: getTextSize(size) };
  }, [size]);
  const content = useWrapIfText(children, textProps);

  return content;
}
