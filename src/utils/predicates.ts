export const isFunction = (fn: unknown): boolean =>
  !!(fn && typeof fn === 'function');
