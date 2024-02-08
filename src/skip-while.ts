export class SkipWhileIterator<T> implements Iterator<T> {
  constructor(
    private readonly _iterator: Iterator<T>,
    private readonly _filter: (value: T) => boolean,
  ) {}

  next() {
    let next = this._iterator.next();
    while (!next.done && this._filter(next.value)) {
      if (next.done) {
        return next;
      }

      next = this._iterator.next();
    }

    return next;
  }
}

export class SkipWhileIterable<T> implements Iterable<T> {
  constructor(
    private readonly _iterable: Iterable<T>,
    private readonly _filter: (value: T) => boolean,
  ) {}

  [Symbol.iterator]() {
    return new SkipWhileIterator(this._iterable[Symbol.iterator](), this._filter);
  }
}

export const skipWhile =
  <T>(fn: (value: T) => boolean) =>
  (iter: Iterable<T>) =>
    new SkipWhileIterable(iter, fn);
