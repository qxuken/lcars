import { StringKeyOf, ValueOf } from 'type-fest';

export type EnumProp<T> = StringKeyOf<T> | ValueOf<T>;
