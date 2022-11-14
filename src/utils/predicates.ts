export const isFunction = (fn: unknown): boolean =>
  !!(fn && typeof fn === 'function');

export const isBoolean = (bool: unknown): boolean =>
  !!(bool && typeof bool === 'boolean');
