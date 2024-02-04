export const take = (count: number) => {
  return function* <T>(iter: Iterable<T>) {
    let i = 0;
    for (const value of iter) {
      if (i++ === count) {
        return;
      }

      yield value;
    }
  };
};
