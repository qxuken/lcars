import { ReactNode, useMemo } from 'react';
import { Text } from './Text';

function canWrap(children: ReactNode): boolean {
  return ['string', 'number', 'boolean', 'undefined'].includes(typeof children);
}

export function useWrapIfText(children: ReactNode): ReactNode {
  const content = useMemo(() => {
    if ((Array.isArray(children) && children.every(canWrap)) || canWrap(children)) {
      return <Text>{children}</Text>;
    }
    return children;
  }, [children]);

  return content;
}
