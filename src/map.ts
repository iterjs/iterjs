export const map = <T, U>(fn: (value: T) => U) => {
  return function* (iter: Iterable<T>) {
    for (const value of iter) {
      yield fn(value);
    }
  };
};
