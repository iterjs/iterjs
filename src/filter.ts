export const filter = <T>(fn: (value: T, index?: number) => boolean) => {
  return function* (iter: Iterable<T>) {
    let index = 0;
    for (const value of iter) {
      if (fn(value, index)) {
        yield value;
      }
      index++;
    }
  };
};
