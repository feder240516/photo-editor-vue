export type BaseEnum = readonly string[];

export function createEnum<T extends BaseEnum>(values: T) {
  return values;
}

export function isInEnum<T extends BaseEnum>(
  value: string | undefined,
  en: T
): value is T[number] {
  if (value === undefined) return false;
  return en.includes(value);
}

export type EnumKeys<T extends BaseEnum> = T[number];
