export const ensureArray = <ArrayType>(value: ArrayType): ArrayType[] => {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
};
