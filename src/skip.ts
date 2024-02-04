export const skip = (count: number) => {
  return function* <T>(iter: Iterable<T>) {
    let i = 0;
    for (const value of iter) {
      if (i++ < count) {
        continue;
      }

      yield value;
    }
  };
};
