export class FilterIterator<T> implements Iterator<T> {
  constructor(
    private readonly _iterator: Iterator<T>,
    private readonly _filter: (value: T) => boolean,
  ) {}

  next() {
    for (;;) {
      const next = this._iterator.next();

      if (next.done) {
        return next;
      }

      if (this._filter(next.value)) {
        return next;
      }
    }
  }
}

export class FilterIterable<T> implements Iterable<T> {
  constructor(
    private readonly _iterable: Iterable<T>,
    private readonly _filter: (value: T) => boolean,
  ) {}

  [Symbol.iterator]() {
    return new FilterIterator(this._iterable[Symbol.iterator](), this._filter);
  }
}

export const filter =
  <T>(fn: (value: T) => boolean) =>
  (iter: Iterable<T>) =>
    new FilterIterable(iter, fn);
