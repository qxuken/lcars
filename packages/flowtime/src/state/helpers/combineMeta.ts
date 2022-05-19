export function combineMeta<K extends string, V, Meta = { [key in K]: V }>(meta: {
  [key: string]: Meta;
}): Meta {
  return Object.values(meta).reduce((acc: Meta, meta: Meta) => ({ ...acc, ...meta }), {} as Meta);
}
