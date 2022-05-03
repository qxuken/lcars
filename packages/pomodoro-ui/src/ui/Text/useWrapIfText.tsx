import { ReactNode, useMemo } from 'react';
import { Text } from './Text';

function canWrap(children: ReactNode): boolean {
  return ['undefined', 'string', 'number', 'boolean', 'symbol', 'bigint'].includes(typeof children);
}

export function useWrapIfText(children: ReactNode, className?: string): ReactNode {
  const content = useMemo(() => {
    if ((Array.isArray(children) && children.every(canWrap)) || canWrap(children)) {
      return <Text className={className}>{children}</Text>;
    }
    return children;
  }, [children]);

  return content;
}
