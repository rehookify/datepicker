export const callAll =
  <Args extends readonly unknown[]>(
    ...fns: readonly (((...args: Args) => void) | undefined)[]
  ) =>
  (...args: Args): void =>
    fns.forEach((fn) => fn?.(...args));

export const skipFirst =
  <Arg1, Arg2>(fn: (arg: Arg2) => void) =>
  (_arg1: Arg1, arg2: Arg2) =>
    fn(arg2);

export const skipAll =
  (fn: () => void) =>
  (..._: unknown[]) => {
    fn();
    void _;
  };
