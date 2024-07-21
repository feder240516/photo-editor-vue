export function createEnum<T extends readonly string[]>(values: T) {
  return values;
}

export function isInEnum<T extends readonly string[]>(
  value: string | undefined,
  en: T
): value is T[number] {
  if (value === undefined) return false;
  return en.includes(value);
}

export type EnumKeys<T extends readonly string[]> = T[number];
