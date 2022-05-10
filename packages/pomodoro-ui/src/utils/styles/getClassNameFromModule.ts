import { Curry } from 'Function/Curry';
import { curry } from 'ramda';

export const getClassNameFromModule: Curry<(base: CSSModuleClasses, className: string) => string> = curry(
  (base, className) => base[className] ?? className
);
