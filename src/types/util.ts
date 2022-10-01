export type PartialRecord<Key extends string, Value> = {
  [K in Key]?: Value;
};
