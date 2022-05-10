import { Function } from 'ts-toolbelt';
import { curry } from 'ramda';

export const getClassNameFromModule: Function.Curry<(base: CSSModuleClasses, className: string) => string> =
  curry((base, className) => base[className] ?? className);
