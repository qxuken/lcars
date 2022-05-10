import { ReactNode, useMemo } from 'react';
import { Text } from './Text';
import type { ITextProps } from './interfaces';

function canWrap(children: ReactNode): boolean {
  return ['undefined', 'string', 'number', 'boolean', 'symbol', 'bigint'].includes(typeof children);
}

export function useWrapIfText(children: ReactNode, props?: ITextProps): ReactNode {
  const content = useMemo(() => {
    if ((Array.isArray(children) && children.every(canWrap)) || canWrap(children)) {
      return <Text {...props}>{children}</Text>;
    }
    return children;
  }, [children, props]);

  return content;
}
