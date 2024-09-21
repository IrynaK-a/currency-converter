export const createCodes = (values: Record<string, number>): string[] =>
  Object.entries(values).map(value => value[0]);
